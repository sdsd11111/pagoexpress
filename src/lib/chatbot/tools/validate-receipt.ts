// ═══════════════════════════════════════════════════════════════
// Tool: validate_payment_receipt — Gemini Vision Receipt Analysis
// ═══════════════════════════════════════════════════════════════

import { analyzeReceipt } from '../llm/gemini';
import type { ToolDefinition } from '../types';

export const definition: ToolDefinition = {
    name: 'validate_payment_receipt',
    description:
        'Analiza una imagen de comprobante de pago o voucher bancario usando visión por computadora (Gemini Vision). Extrae datos como monto, fecha, banco, referencia y nombre del pagador. Usa esta herramienta cuando el cliente envíe una foto de un comprobante.',
    parameters: {
        type: 'object',
        properties: {
            image_url: {
                type: 'string',
                description: 'URL de la imagen del comprobante de pago a analizar.',
            },
        },
        required: ['image_url'],
    },
};

export async function execute(args: Record<string, unknown>): Promise<string> {
    const imageUrl = args.image_url as string;

    if (!imageUrl) {
        return JSON.stringify({
            success: false,
            error: 'No se proporcionó URL de imagen.',
        });
    }

    try {
        const analysisResult = await analyzeReceipt(imageUrl);

        // Try to parse as JSON (the prompt asks for JSON)
        try {
            const parsed = JSON.parse(analysisResult);
            return JSON.stringify({
                success: true,
                receipt_data: parsed,
            });
        } catch {
            // If Gemini didn't return valid JSON, return raw text
            return JSON.stringify({
                success: true,
                receipt_data: { raw_analysis: analysisResult },
            });
        }
    } catch (error) {
        return JSON.stringify({
            success: false,
            error: `No se pudo analizar la imagen: ${(error as Error).message}`,
            suggestion:
                'Pide al cliente que envíe una imagen más clara del comprobante, o que proporcione los datos manualmente (monto, fecha, banco, referencia).',
        });
    }
}
