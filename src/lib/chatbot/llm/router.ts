// ═══════════════════════════════════════════════════════════════
// PagoExpress Elite Chatbot — LLM Waterfall Router
// ═══════════════════════════════════════════════════════════════
//
// Strategy:
//   1. Groq (Llama 3.3) → Fast, primary for chat
//   2. Gemini 1.5 Flash  → Fallback for text, primary for vision
//   3. OpenRouter         → Final fallback safety net
//
// ═══════════════════════════════════════════════════════════════

import { chatWithGroq } from './groq';
import { chatWithGemini } from './gemini';
import { chatWithOpenRouter } from './openrouter';
import type { LLMMessage, LLMResponse, ToolDefinition } from '../types';

/**
 * Send a chat request through the LLM waterfall.
 * Tries Groq first, then Gemini, then OpenRouter.
 */
export async function chat(
    messages: LLMMessage[],
    tools?: ToolDefinition[]
): Promise<LLMResponse> {
    // ─── Attempt 1: Groq (fastest) ───
    try {
        console.log('[LLM Router] Trying Groq...');
        const response = await chatWithGroq(messages, tools);
        console.log('[LLM Router] ✅ Groq responded');
        return response;
    } catch (error) {
        console.warn('[LLM Router] ⚠️ Groq failed:', (error as Error).message);
    }

    // ─── Attempt 2: Gemini text (no tool calling in this mode) ───
    try {
        console.log('[LLM Router] Trying Gemini...');
        const response = await chatWithGemini(messages);
        console.log('[LLM Router] ✅ Gemini responded');
        return response;
    } catch (error) {
        console.warn('[LLM Router] ⚠️ Gemini failed:', (error as Error).message);
    }

    // ─── Attempt 3: OpenRouter (safety net) ───
    try {
        console.log('[LLM Router] Trying OpenRouter...');
        const response = await chatWithOpenRouter(messages, tools);
        console.log('[LLM Router] ✅ OpenRouter responded');
        return response;
    } catch (error) {
        console.error('[LLM Router] ❌ All providers failed:', (error as Error).message);
        // Return a graceful fallback response
        return {
            content: 'Disculpe, estoy experimentando dificultades técnicas en este momento. Por favor, intente nuevamente en unos minutos o comuníquese directamente con nuestras oficinas al WhatsApp +593 99 022 7203.',
            tool_calls: null,
            provider_used: 'openrouter',
            model_used: 'fallback',
        };
    }
}
