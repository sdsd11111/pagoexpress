// ═══════════════════════════════════════════════════════════════
// Tool: handoff_to_human — Escalate to human agent
// ═══════════════════════════════════════════════════════════════

import { updateConversation } from '../db';
import { sendTextMessage } from '../evolution';
import { config } from '../config';
import type { ToolDefinition } from '../types';

export const definition: ToolDefinition = {
    name: 'handoff_to_human',
    description:
        'Escala la conversación a un agente humano de PagoExpress. Usa esta herramienta cuando: 1) El trámite no está en la base de datos, 2) El cliente está molesto o insatisfecho, 3) La situación requiere intervención humana, 4) No puedes resolver la consulta, 5) El cliente pide hablar con una persona real.',
    parameters: {
        type: 'object',
        properties: {
            reason: {
                type: 'string',
                description:
                    'Razón por la cual se escala a humano (será visible para el agente que reciba el caso)',
            },
            urgency: {
                type: 'string',
                description: 'Nivel de urgencia: low, medium, high',
                enum: ['low', 'medium', 'high'],
            },
            customer_summary: {
                type: 'string',
                description:
                    'Resumen breve del caso del cliente para que el agente humano tenga contexto inmediato',
            },
        },
        required: ['reason', 'urgency'],
    },
};

export async function execute(
    args: Record<string, unknown>,
    context?: { conversation_id?: string; phone?: string }
): Promise<string> {
    const reason = args.reason as string;
    const urgency = (args.urgency as string) || 'medium';
    const customerSummary = args.customer_summary as string || '';

    try {
        // Mark conversation as escalated
        if (context?.conversation_id) {
            await updateConversation(context.conversation_id, {
                status: 'escalated',
                current_step: 'waiting_for_human',
            });
        }

        // Notify admin via WhatsApp
        const urgencyEmoji = urgency === 'high' ? '🔴' : urgency === 'medium' ? '🟡' : '🟢';
        const adminMessage = [
            `${urgencyEmoji} *ESCALAMIENTO DE CHATBOT*`,
            ``,
            `📱 *Cliente*: ${context?.phone || 'Desconocido'}`,
            `⚡ *Urgencia*: ${urgency.toUpperCase()}`,
            `📝 *Razón*: ${reason}`,
            customerSummary ? `📋 *Resumen*: ${customerSummary}` : '',
            ``,
            `_Responda directamente al cliente desde WhatsApp._`,
        ]
            .filter(Boolean)
            .join('\n');

        try {
            await sendTextMessage(config.adminPhone, adminMessage);
        } catch (notifyError) {
            console.error('[Handoff] Failed to notify admin:', notifyError);
        }

        return JSON.stringify({
            success: true,
            message:
                'La conversación ha sido escalada a un agente humano. Un asesor de PagoExpress se comunicará con el cliente en breve. Informa al cliente que un asesor lo atenderá pronto.',
            escalated_to: config.adminPhone,
        });
    } catch (error) {
        return JSON.stringify({
            success: false,
            error: `Error al escalar: ${(error as Error).message}`,
            message:
                'No se pudo escalar automáticamente. Pide al cliente que se comunique directamente al WhatsApp +593 99 022 7203.',
        });
    }
}
