// ═══════════════════════════════════════════════════════════════
// PagoExpress Elite Chatbot — Evolution API Client (WhatsApp)
// ═══════════════════════════════════════════════════════════════

import { config } from './config';

const BASE_URL = config.evolution.url;
const API_KEY = config.evolution.apiKey;
const INSTANCE = config.evolution.instance;

interface EvolutionResponse {
    key?: { id: string };
    message?: string;
    status?: string;
}

/**
 * Mocking support for tests
 */
let mockHandler: ((phone: string, text: string) => Promise<any>) | null = null;
export function setMockHandler(handler: typeof mockHandler) {
    mockHandler = handler;
}

/**
 * Send a text message via WhatsApp (Evolution API).
 */
export async function sendTextMessage(
    phone: string,
    text: string
): Promise<EvolutionResponse> {
    if (mockHandler) {
        return mockHandler(phone, text);
    }
    // Ensure phone is in correct format (no @s.whatsapp.net suffix)
    const cleanPhone = phone.replace('@s.whatsapp.net', '');

    const response = await fetch(
        `${BASE_URL}/message/sendText/${INSTANCE}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                apikey: API_KEY,
            },
            body: JSON.stringify({
                number: cleanPhone,
                text,
            }),
        }
    );

    if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`Evolution API error ${response.status}: ${errorText}`);
    }

    return response.json();
}

/**
 * Send a media message (image, document, etc.) via WhatsApp.
 */
export async function sendMediaMessage(
    phone: string,
    mediaUrl: string,
    caption?: string,
    mediaType: 'image' | 'document' | 'audio' = 'image'
): Promise<EvolutionResponse> {
    const cleanPhone = phone.replace('@s.whatsapp.net', '');
    const endpoint = mediaType === 'image'
        ? 'sendMedia'
        : mediaType === 'document'
            ? 'sendMedia'
            : 'sendWhatsAppAudio';

    const response = await fetch(
        `${BASE_URL}/message/${endpoint}/${INSTANCE}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                apikey: API_KEY,
            },
            body: JSON.stringify({
                number: cleanPhone,
                mediatype: mediaType,
                media: mediaUrl,
                caption: caption || '',
            }),
        }
    );

    if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`Evolution API media error ${response.status}: ${errorText}`);
    }

    return response.json();
}

/**
 * Download media from a received WhatsApp message.
 * Returns the media as a base64 string.
 */
export async function getMediaBase64(messageId: string): Promise<{
    base64: string;
    mimetype: string;
}> {
    const response = await fetch(
        `${BASE_URL}/chat/getBase64FromMediaMessage/${INSTANCE}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                apikey: API_KEY,
            },
            body: JSON.stringify({
                message: { key: { id: messageId } },
                convertToMp4: false,
            }),
        }
    );

    if (!response.ok) {
        throw new Error(`Evolution API media download error: ${response.status}`);
    }

    return response.json();
}

/**
 * Check instance connection status.
 */
export async function checkInstanceStatus(): Promise<{
    connected: boolean;
    state: string;
}> {
    try {
        const response = await fetch(
            `${BASE_URL}/instance/connectionState/${INSTANCE}`,
            {
                headers: { apikey: API_KEY },
            }
        );

        if (!response.ok) {
            return { connected: false, state: 'error' };
        }

        const data = await response.json();
        return {
            connected: data.instance?.state === 'open',
            state: data.instance?.state || 'unknown',
        };
    } catch {
        return { connected: false, state: 'unreachable' };
    }
}
