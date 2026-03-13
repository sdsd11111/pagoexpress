// ═══════════════════════════════════════════════════════════════
// PagoExpress Elite Chatbot — Gemini LLM Provider (Vision)
// ═══════════════════════════════════════════════════════════════

import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config';
import type { LLMMessage, LLMResponse, ToolDefinition } from '../types';

let genAI: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
    if (!genAI) {
        genAI = new GoogleGenerativeAI(config.gemini.apiKey);
    }
    return genAI;
}

/**
 * Chat with Gemini 1.5 Flash (text mode).
 * Used as secondary LLM and for fallback.
 */
export async function chatWithGemini(
    messages: LLMMessage[],
    _tools?: ToolDefinition[]
): Promise<LLMResponse> {
    const ai = getClient();
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Convert our message format to Gemini format
    const systemInstruction = messages.find((m) => m.role === 'system')?.content || '';
    const chatMessages = messages
        .filter((m) => m.role !== 'system' && m.role !== 'tool')
        .map((m) => ({
            role: m.role === 'assistant' ? ('model' as const) : ('user' as const),
            parts: [{ text: m.content }],
        }));

    const chat = model.startChat({
        history: chatMessages.slice(0, -1),
        systemInstruction,
    });

    const lastMessage = chatMessages[chatMessages.length - 1];
    const result = await chat.sendMessage(lastMessage?.parts[0]?.text || '');

    return {
        content: result.response.text(),
        tool_calls: null, // Gemini text mode doesn't handle our tool format
        provider_used: 'gemini',
        model_used: 'gemini-2.0-flash',
    };
}

/**
 * Analyze any media file (Image or Audio) using Gemini 1.5 Flash via Base64.
 */
async function analyzeMediaBase64(
    base64Media: string,
    mimeType: string,
    prompt: string
): Promise<string> {
    const ai = getClient();
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Clean base64 if it has data-uri prefix
    const cleanBase64 = base64Media.includes(';base64,') 
        ? base64Media.split(';base64,').pop() || ''
        : base64Media;

    console.log(`[Gemini] Sending media to API. Mime: ${mimeType}, Base64 Length: ${cleanBase64.length}`);

    try {
        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType,
                    data: cleanBase64,
                },
            },
            { text: prompt },
        ]);

        const text = result.response.text();
        console.log(`[Gemini] API Response Success. Text length: ${text.length}`);
        return text;
    } catch (error) {
        console.error('[Gemini] API Error during media analysis:', (error as Error).message);
        throw error;
    }
}

/**
 * ─── Exported Functions (Base64) ───
 */

export async function analyzeImageBase64(
    base64Media: string,
    mimeType: string,
    prompt: string
): Promise<string> {
    return analyzeMediaBase64(base64Media, mimeType, prompt);
}

export async function analyzeAudioBase64(
    base64Media: string,
    mimeType: string,
    prompt: string = 'Transcribe and summarize this audio message in Spanish.'
): Promise<string> {
    return analyzeMediaBase64(base64Media, mimeType, prompt);
}

export async function analyzeReceiptBase64(
    base64Media: string,
    mimeType: string
): Promise<string> {
    const prompt = `Eres un experto analizando comprobantes de pago y vouchers bancarios de Ecuador.
Analiza esta imagen y extrae la siguiente información en formato JSON:

{
  "tipo": "transferencia | depósito | pago | recarga | otro",
  "monto": "valor en dólares (ej: 25.50)",
  "fecha": "fecha de la transacción",
  "banco_origen": "nombre del banco o entidad",
  "referencia": "número de referencia o comprobante",
  "nombre_pagador": "nombre de quien realizó el pago (si es visible)",
  "cuenta_destino": "número de cuenta destino (si es visible)",
  "estado": "aprobado | pendiente | rechazado",
  "notas": "cualquier información adicional relevante"
}

Si no puedes leer algún campo, coloca "no_visible". 
Si la imagen no es un comprobante de pago, responde con:
{"error": "La imagen proporcionada no parece ser un comprobante de pago"}

IMPORTANTE: Responde SOLO con el JSON, sin texto adicional.`;

    return analyzeImageBase64(base64Media, mimeType, prompt);
}

/**
 * ─── Compatibility Wrappers (URL-based) ───
 * These are for tools or logic that only have a URL.
 */

async function analyzeMediaFromUrl(
    mediaUrl: string,
    prompt: string,
    mimeType: string = 'image/jpeg'
): Promise<string> {
    const ai = getClient();
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // naively download (fails for protected Evolution URLs, but works for public ones)
    const mediaResponse = await fetch(mediaUrl);
    if (!mediaResponse.ok) {
        throw new Error(`Failed to download media: ${mediaResponse.status}`);
    }

    const mediaBuffer = await mediaResponse.arrayBuffer();
    const base64Media = Buffer.from(mediaBuffer).toString('base64');
    const finalMimeType = mediaResponse.headers.get('content-type') || mimeType;
    
    return analyzeMediaBase64(base64Media, finalMimeType, prompt);
}

export async function analyzeImage(imageUrl: string, prompt: string): Promise<string> {
    return analyzeMediaFromUrl(imageUrl, prompt, 'image/jpeg');
}

export async function analyzeAudio(audioUrl: string, prompt: string): Promise<string> {
    return analyzeMediaFromUrl(audioUrl, prompt, 'audio/ogg');
}

export async function analyzeReceipt(imageUrl: string): Promise<string> {
    const prompt = `Eres un experto analizando comprobantes de pago y vouchers bancarios de Ecuador.
Analiza esta imagen y extrae la siguiente información en formato JSON:

{
  "tipo": "transferencia | depósito | pago | recarga | otro",
  "monto": "valor en dólares (ej: 25.50)",
  "fecha": "fecha de la transacción",
  "banco_origen": "nombre del banco o entidad",
  "referencia": "número de referencia o comprobante",
  "nombre_pagador": "nombre de quien realizó el pago (si es visible)",
  "cuenta_destino": "número de cuenta destino (si es visible)",
  "estado": "aprobado | pendiente | rechazado",
  "notas": "cualquier información adicional relevante"
}

Si no puedes leer algún campo, coloca "no_visible". 
Si la imagen no es un comprobante de pago, responde con:
{"error": "La imagen proporcionada no parece ser un comprobante de pago"}

IMPORTANTE: Responde SOLO con el JSON, sin texto adicional.`;

    return analyzeImage(imageUrl, prompt);
}
