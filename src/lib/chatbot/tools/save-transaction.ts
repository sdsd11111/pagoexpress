// ═══════════════════════════════════════════════════════════════
// Tool: save_transaction — Register transaction in MySQL
// ═══════════════════════════════════════════════════════════════

import { saveTransaction as dbSaveTransaction } from '../db';
import type { ToolDefinition } from '../types';

export const definition: ToolDefinition = {
    name: 'save_transaction',
    description:
        'Registra una transacción o solicitud de servicio en la base de datos. Usa esta herramienta cuando tengas suficiente información del cliente para crear un registro de la transacción (servicio solicitado, monto, datos del comprobante si aplica).',
    parameters: {
        type: 'object',
        properties: {
            phone: {
                type: 'string',
                description: 'Número de teléfono del cliente (formato: 593XXXXXXXXX)',
            },
            service_id: {
                type: 'string',
                description: 'ID del servicio solicitado (obtenido de get_service_info)',
            },
            amount: {
                type: 'string',
                description: 'Monto de la transacción en dólares (ej: "25.50")',
            },
            receipt_data: {
                type: 'string',
                description:
                    'Datos del comprobante en formato JSON string (si se validó un comprobante con validate_payment_receipt)',
            },
            notes: {
                type: 'string',
                description:
                    'Notas adicionales sobre la transacción (ej: "Cliente solicita depósito a cuenta 2200XXXXX del Banco Pichincha")',
            },
        },
        required: ['phone', 'notes'],
    },
};

export async function execute(
    args: Record<string, unknown>,
    context?: { conversation_id?: string }
): Promise<string> {
    const phone = args.phone as string;
    const notes = args.notes as string;

    try {
        let receiptData = null;
        if (args.receipt_data) {
            try {
                receiptData = JSON.parse(args.receipt_data as string);
            } catch {
                receiptData = { raw: args.receipt_data };
            }
        }

        const txId = await dbSaveTransaction({
            conversation_id: context?.conversation_id || null,
            service_id: args.service_id ? parseInt(args.service_id as string) : null,
            phone,
            amount: args.amount ? parseFloat(args.amount as string) : null,
            receipt_data: receiptData,
            status: 'pending',
            notes,
        });

        return JSON.stringify({
            success: true,
            transaction_id: txId,
            message: `Transacción registrada exitosamente con ID #${txId}. El equipo de PagoExpress procesará esta solicitud.`,
        });
    } catch (error) {
        return JSON.stringify({
            success: false,
            error: `Error al registrar la transacción: ${(error as Error).message}`,
        });
    }
}
