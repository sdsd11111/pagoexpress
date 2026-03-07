// ═══════════════════════════════════════════════════════════════
// PagoExpress Elite Chatbot — Agentic Loop Controller
// ═══════════════════════════════════════════════════════════════
//
// This is the BRAIN of the chatbot. It orchestrates:
//   1. Loading conversation context
//   2. Building the prompt with system instructions + history
//   3. Calling the LLM through the waterfall router
//   4. Executing tool calls when the LLM requests them
//   5. Iterating until a final response is produced
//   6. Sending the response via WhatsApp
//   7. Persisting everything to MySQL
//
// ═══════════════════════════════════════════════════════════════

import { chat } from './llm/router';
import { analyzeImage } from './llm/gemini';
import { buildSystemPrompt } from './prompt';
import { toolDefinitions, executeTool } from './tools/index';
import {
    getContext,
    saveUserMessage,
    saveAssistantMessage,
    saveToolMessage,
} from './memory';
import { sendTextMessage } from './evolution';
import { config } from './config';
import type { LLMMessage, AgentState, IncomingMessage } from './types';

/**
 * Main entry point: Process an incoming WhatsApp message.
 */
export async function processMessage(incoming: IncomingMessage): Promise<void> {
    const { phone, content, type, mediaUrl, pushName } = incoming;

    console.log(`[Agent] Processing ${type} message from ${phone}: "${content.substring(0, 50)}..."`);

    try {
        // ─── 1. Load Context ───
        const { conversation, history } = await getContext(phone);

        // If conversation is escalated, don't process (human is handling it)
        if (conversation.status === 'escalated') {
            console.log(`[Agent] Conversation ${conversation.id} is escalated, skipping.`);
            return;
        }

        // ─── 2. Build User Content ───
        let userContent = content;

        // If the user sent an image, analyze it and add context
        if (type === 'image' && mediaUrl) {
            try {
                const analysis = await analyzeImage(
                    mediaUrl,
                    'Describe this image briefly. If it appears to be a payment receipt or bank voucher, extract the key financial details.'
                );
                userContent = `[El cliente envió una imagen]\n\nAnálisis de la imagen: ${analysis}\n\n${content ? `Mensaje del cliente: ${content}` : 'El cliente no incluyó texto con la imagen.'}`;
            } catch (error) {
                console.error('[Agent] Image analysis failed:', error);
                userContent = `[El cliente envió una imagen que no se pudo analizar]\n\n${content || 'Sin texto adicional.'}`;
            }
        }

        // If audio, note it (audio transcription could be added later)
        if (type === 'audio') {
            userContent = `[El cliente envió un audio] Nota: La transcripción de audios no está disponible aún. Pide al cliente que escriba su consulta.\n\n${content || ''}`;
        }

        // ─── 3. Save User Message ───
        await saveUserMessage(conversation.id, userContent, mediaUrl);

        // ─── 4. Build Message Array ───
        const systemPrompt = buildSystemPrompt();
        const messages: LLMMessage[] = [
            { role: 'system', content: systemPrompt },
            ...history,
            {
                role: 'user',
                content: pushName
                    ? `[Cliente: ${pushName}]\n${userContent}`
                    : userContent,
            },
        ];

        // ─── 5. Agentic Loop ───
        const state: AgentState = {
            conversation_id: conversation.id,
            phone,
            messages,
            iteration_count: 0,
            tools_used: [],
            should_escalate: false,
            final_response: null,
        };

        const maxIterations = config.maxIterations;

        while (state.iteration_count < maxIterations) {
            state.iteration_count++;
            console.log(`[Agent] Iteration ${state.iteration_count}/${maxIterations}`);

            // Call LLM
            const llmResponse = await chat(state.messages, toolDefinitions);
            console.log(`[Agent] LLM responded via ${llmResponse.provider_used} (${llmResponse.model_used})`);

            // ─── Handle Tool Calls ───
            if (llmResponse.tool_calls && llmResponse.tool_calls.length > 0) {
                // Add assistant message with tool calls to history
                state.messages.push({
                    role: 'assistant',
                    content: llmResponse.content || '',
                    tool_calls: llmResponse.tool_calls,
                });

                // Execute each tool call
                for (const toolCall of llmResponse.tool_calls) {
                    console.log(`[Agent] Executing tool: ${toolCall.name}(${JSON.stringify(toolCall.arguments)})`);

                    const result = await executeTool(
                        toolCall.name,
                        toolCall.arguments,
                        toolCall.id,
                        { conversation_id: conversation.id, phone }
                    );

                    state.tools_used.push(toolCall.name);

                    // Save tool result to DB
                    await saveToolMessage(conversation.id, toolCall.name, result.result);

                    // Add tool result to LLM message history
                    state.messages.push({
                        role: 'tool',
                        content: result.result,
                        tool_call_id: toolCall.id,
                        name: toolCall.name,
                    });

                    // Check if handoff was triggered
                    if (toolCall.name === 'handoff_to_human') {
                        state.should_escalate = true;
                    }
                }

                // Continue loop — LLM needs to process tool results
                continue;
            }

            // ─── No Tool Calls → Final Response ───
            state.final_response = llmResponse.content || 'Lo siento, no pude procesar tu consulta. ¿Podrías intentar de nuevo?';
            break;
        }

        // Safety: if loop exhausted without response
        if (!state.final_response) {
            state.final_response =
                'Disculpe, estoy procesando mucha información. ¿Podría ser más específico con lo que necesita? También puede comunicarse directamente al +593 99 022 7203.';
        }

        // ─── 6. Send Response via WhatsApp ───
        // Split long messages (WhatsApp limit ~4096 chars)
        const chunks = splitMessage(state.final_response, 4000);
        for (const chunk of chunks) {
            await sendTextMessage(phone, chunk);
            // Small delay between chunks
            if (chunks.length > 1) {
                await new Promise((resolve) => setTimeout(resolve, 500));
            }
        }

        // ─── 7. Save Assistant Response ───
        await saveAssistantMessage(conversation.id, state.final_response);

        console.log(`[Agent] ✅ Responded to ${phone} (${state.iteration_count} iterations, tools: ${state.tools_used.join(', ') || 'none'})`);
    } catch (error) {
        console.error(`[Agent] ❌ Error processing message from ${phone}:`, error);

        // Send a graceful error message
        try {
            await sendTextMessage(
                phone,
                'Disculpe, estoy experimentando dificultades técnicas. Por favor, intente nuevamente en unos minutos o comuníquese directamente al WhatsApp +593 99 022 7203. 🙏'
            );
        } catch (sendError) {
            console.error('[Agent] Failed to send error message:', sendError);
        }
    }
}

/**
 * Split a long message into chunks that respect WhatsApp's limit.
 */
function splitMessage(text: string, maxLength: number): string[] {
    if (text.length <= maxLength) return [text];

    const chunks: string[] = [];
    let remaining = text;

    while (remaining.length > 0) {
        if (remaining.length <= maxLength) {
            chunks.push(remaining);
            break;
        }

        // Try to split at a natural break point
        let splitIndex = remaining.lastIndexOf('\n', maxLength);
        if (splitIndex === -1 || splitIndex < maxLength * 0.5) {
            splitIndex = remaining.lastIndexOf('. ', maxLength);
        }
        if (splitIndex === -1 || splitIndex < maxLength * 0.5) {
            splitIndex = remaining.lastIndexOf(' ', maxLength);
        }
        if (splitIndex === -1) {
            splitIndex = maxLength;
        }

        chunks.push(remaining.substring(0, splitIndex + 1).trim());
        remaining = remaining.substring(splitIndex + 1).trim();
    }

    return chunks;
}
