// ═══════════════════════════════════════════════════════════════
// PagoExpress Elite Chatbot — Groq LLM Provider (Primary)
// ═══════════════════════════════════════════════════════════════

import Groq from 'groq-sdk';
import { config } from '../config';
import type { LLMMessage, LLMResponse, ToolDefinition } from '../types';

let client: Groq | null = null;

function getClient(): Groq {
    if (!client) {
        client = new Groq({ apiKey: config.groq.apiKey });
    }
    return client;
}

/**
 * Chat with Groq using Llama 3.3 70B.
 * Primary LLM for fast conversational processing.
 */
export async function chatWithGroq(
    messages: LLMMessage[],
    tools?: ToolDefinition[]
): Promise<LLMResponse> {
    const groq = getClient();

    const groqMessages = messages.map((m) => {
        if (m.role === 'tool') {
            return {
                role: 'tool' as const,
                content: m.content,
                tool_call_id: m.tool_call_id || '',
            };
        }
        if (m.role === 'assistant' && m.tool_calls && m.tool_calls.length > 0) {
            return {
                role: 'assistant' as const,
                content: m.content || '',
                tool_calls: m.tool_calls.map((tc) => ({
                    id: tc.id,
                    type: 'function' as const,
                    function: {
                        name: tc.name,
                        arguments: JSON.stringify(tc.arguments),
                    },
                })),
            };
        }
        return {
            role: m.role as 'system' | 'user' | 'assistant',
            content: m.content,
        };
    });

    const groqTools = tools?.map((t) => ({
        type: 'function' as const,
        function: {
            name: t.name,
            description: t.description,
            parameters: t.parameters,
        },
    }));

    const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: groqMessages,
        tools: groqTools && groqTools.length > 0 ? groqTools : undefined,
        tool_choice: groqTools && groqTools.length > 0 ? 'auto' : undefined,
        temperature: 0.7,
        max_tokens: 2048,
    });

    const choice = response.choices[0];

    return {
        content: choice.message.content,
        tool_calls: choice.message.tool_calls
            ? choice.message.tool_calls.map((tc) => ({
                id: tc.id,
                name: tc.function.name,
                arguments: JSON.parse(tc.function.arguments || '{}'),
            }))
            : null,
        provider_used: 'groq',
        model_used: 'llama-3.3-70b-versatile',
    };
}
