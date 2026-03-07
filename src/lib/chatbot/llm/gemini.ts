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
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
        model_used: 'gemini-1.5-flash',
    };
}

/**
 * Analyze an image using Gemini Vision.
 * Downloads the image from URL and sends as inline data.
 */
export async function analyzeImage(
    imageUrl: string,
    prompt: string
): Promise<string> {
    const ai = getClient();
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Download the image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
        throw new Error(`Failed to download image: ${imageResponse.status}`);
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const mimeType = imageResponse.headers.get('content-type') || 'image/jpeg';

    const result = await model.generateContent([
        {
            inlineData: {
                mimeType,
                data: base64Image,
            },
        },
        { text: prompt },
    ]);

    return result.response.text();
}

/**
 * Analyze a receipt/voucher image — structured extraction.
 */
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
