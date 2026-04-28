// ═══════════════════════════════════════════════════════════════
// PagoExpress Elite Chatbot — DeepSeek LLM Provider (Primary)
// ═══════════════════════════════════════════════════════════════

import OpenAI from 'openai';
import { config } from '../config';
import type { LLMMessage, LLMResponse, ToolDefinition } from '../types';

let client: OpenAI | null = null;

function getClient(): OpenAI {
    if (!client) {
        client = new OpenAI({
            baseURL: 'https://api.deepseek.com',
            apiKey: config.deepseek.apiKey,
        });
    }
    return client;
}

/**
 * Chat with DeepSeek (Primary LLM).
 * Uses deepseek-chat model.
 */
export async function chatWithDeepSeek(
    messages: LLMMessage[],
    tools?: ToolDefinition[]
): Promise<LLMResponse> {
    const openai = getClient();
    const model = 'deepseek-chat';

    const openaiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = messages.map((m) => {
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

    const openaiTools: OpenAI.Chat.Completions.ChatCompletionTool[] | undefined = tools?.map((t) => ({
        type: 'function' as const,
        function: {
            name: t.name,
            description: t.description,
            parameters: t.parameters,
        },
    }));

    const response = await openai.chat.completions.create({
        model,
        messages: openaiMessages,
        tools: openaiTools && openaiTools.length > 0 ? openaiTools : undefined,
        tool_choice: openaiTools && openaiTools.length > 0 ? 'auto' : undefined,
        temperature: 0.7,
        max_tokens: 2048,
    });

    const choice = response.choices[0];

    return {
        content: choice.message.content,
        tool_calls: choice.message.tool_calls
            ? (choice.message.tool_calls as any[]).map((tc) => ({
                id: tc.id,
                name: tc.function.name,
                arguments: JSON.parse(tc.function.arguments || '{}'),
            }))
            : null,
        provider_used: 'deepseek',
        model_used: model,
    };
}
