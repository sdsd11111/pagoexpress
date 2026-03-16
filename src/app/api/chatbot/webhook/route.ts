// ═══════════════════════════════════════════════════════════════
// API Route: POST /api/chatbot/webhook
// Evolution API WhatsApp Webhook Receiver
// ═══════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { processMessage } from '@/lib/chatbot/agent';
import type { EvolutionWebhookPayload, IncomingMessage } from '@/lib/chatbot/types';

/**
 * POST — Receive webhook events from Evolution API.
 * Processes incoming WhatsApp messages and triggers the agent.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body = (await request.json()) as EvolutionWebhookPayload;

        // ─── Filter: Only process message events ───
        if (!body.event || !body.event.includes('messages')) {
            return NextResponse.json({ status: 'ignored', reason: 'not a message event' });
        }

        const data = body.data;
        if (!data || !data.key) {
            return NextResponse.json({ status: 'ignored', reason: 'no data' });
        }

        // ─── Filter: Handle outgoing messages ───
        if (data.key.fromMe) {
            // If the message is outgoing, it could be the bot or a human on WhatsApp Web.
            // For now, we update last_manual_interaction to be safe.
            // Ideally we should distinguish bot messages (e.g. by checking a cache of sent messages).
            const remoteJid = data.key.remoteJid || '';
            const phone = remoteJid.replace('@s.whatsapp.net', '');
            if (phone) {
                const { updateLastManualInteraction } = await import('@/lib/chatbot/db');
                await updateLastManualInteraction(phone).catch(console.error);
                console.log(`[Webhook] Manual interaction (fromMe) detected for ${phone}. Bot will pause.`);
            }
            return NextResponse.json({ status: 'ignored', reason: 'own message / manual interaction updated' });
        }

        // ─── Filter: Ignore group messages ───
        const remoteJid = data.key.remoteJid || '';
        if (remoteJid.includes('@g.us')) {
            return NextResponse.json({ status: 'ignored', reason: 'group message' });
        }

        // ─── Extract phone number ───
        const phone = remoteJid.replace('@s.whatsapp.net', '');
        if (!phone) {
            return NextResponse.json({ status: 'ignored', reason: 'no phone number' });
        }

        // ─── Parse message content ───
        const message = data.message;
        if (!message) {
            return NextResponse.json({ status: 'ignored', reason: 'no message content' });
        }

        const incoming: IncomingMessage = parseIncomingMessage(phone, data);

        // ─── Trigger Inngest Event ───
        // En lugar de procesar aquí (que daría timeout en Vercel),
        // enviamos un evento a Inngest para que lo procese en background con un debounce de 20s.
        try {
            const { inngest } = await import('@/inngest/client');
            await inngest.send({
                name: 'chatbot/message.received',
                data: {
                    phone,
                    incoming
                }
            });
        } catch (error) {
            console.error('[Webhook] Error sending to Inngest:', error);
            // Fallback: Si Inngest falla, intentamos procesar directo para no perder el mensaje
            // (Aunque esto podría dar timeout, es mejor que nada)
            await processMessage(incoming).catch(e => console.error('[Webhook] Fallback error:', e));
        }

        return NextResponse.json({
            status: 'queued',
            phone,
            type: incoming.type,
        });
    } catch (error) {
        console.error('[Webhook] Error parsing webhook:', error);
        return NextResponse.json(
            { status: 'error', message: (error as Error).message },
            { status: 400 }
        );
    }
}

/**
 * Parse the Evolution API webhook payload into our IncomingMessage format.
 */
function parseIncomingMessage(
    phone: string,
    data: EvolutionWebhookPayload['data']
): IncomingMessage {
    const message = data.message!;
    const pushName = data.pushName || '';
    const messageId = data.key.id;
    const timestamp = data.messageTimestamp || Math.floor(Date.now() / 1000);

    // ─── Text Message ───
    if (message.conversation) {
        return {
            phone,
            pushName,
            type: 'text',
            content: message.conversation,
            messageId,
            timestamp,
        };
    }

    // Extended text message (replies, links, etc.)
    if (message.extendedTextMessage?.text) {
        return {
            phone,
            pushName,
            type: 'text',
            content: message.extendedTextMessage.text,
            messageId,
            timestamp,
        };
    }

    // ─── Image Message ───
    if (message.imageMessage) {
        return {
            phone,
            pushName,
            type: 'image',
            content: message.imageMessage.caption || '',
            mediaUrl: message.imageMessage.mediaUrl || message.imageMessage.url,
            messageId,
            timestamp,
        };
    }

    // ─── Audio Message ───
    if (message.audioMessage) {
        return {
            phone,
            pushName,
            type: 'audio',
            content: '',
            mediaUrl: message.audioMessage.mediaUrl || message.audioMessage.url,
            messageId,
            timestamp,
        };
    }

    // ─── Document Message ───
    if (message.documentMessage) {
        return {
            phone,
            pushName,
            type: 'document',
            content: message.documentMessage.fileName || '',
            mediaUrl: message.documentMessage.mediaUrl || message.documentMessage.url,
            messageId,
            timestamp,
        };
    }

    // ─── Unknown Message Type ───
    return {
        phone,
        pushName,
        type: 'unknown',
        content: JSON.stringify(message).substring(0, 200),
        messageId,
        timestamp,
    };
}
