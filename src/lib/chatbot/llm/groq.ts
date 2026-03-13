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

/**
 * Transcribe audio using Groq Whisper.
 * Accepts base64 audio and returns the transcription text.
 */
export async function transcribeAudioWithGroq(
    base64Audio: string,
    mimeType: string
): Promise<string> {
    const groq = getClient();

    // Clean base64 if it has data-uri prefix
    const cleanBase64 = base64Audio.includes(';base64,')
        ? base64Audio.split(';base64,').pop() || ''
        : base64Audio;

    // Convert base64 to a File-like object for the Groq API
    const audioBuffer = Buffer.from(cleanBase64, 'base64');

    // Determine file extension from mime type
    const extMap: Record<string, string> = {
        'audio/ogg': 'ogg',
        'audio/opus': 'ogg',
        'audio/mpeg': 'mp3',
        'audio/mp3': 'mp3',
        'audio/wav': 'wav',
        'audio/webm': 'webm',
        'audio/mp4': 'mp4',
        'audio/ogg; codecs=opus': 'ogg',
    };
    const ext = extMap[mimeType] || 'ogg';

    // Create a File object from the buffer
    const file = new File([audioBuffer], `audio.${ext}`, { type: mimeType });

    console.log(`[Groq Whisper] Transcribing audio. Size: ${audioBuffer.length} bytes, Mime: ${mimeType}`);

    const transcription = await groq.audio.transcriptions.create({
        file: file,
        model: 'whisper-large-v3',
        language: 'es',
        response_format: 'text',
    });

    const text = typeof transcription === 'string' ? transcription : (transcription as any).text || '';
    console.log(`[Groq Whisper] Transcription result: "${text.substring(0, 50)}..."`);
    return text;
}
