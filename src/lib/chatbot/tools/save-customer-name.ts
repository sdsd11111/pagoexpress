import { updateCustomerName } from '../memory';
import type { ToolDefinition } from '../types';

/**
 * Tool definition for saving the customer's name.
 */
export const definition: ToolDefinition = {
    name: 'save_customer_name',
    description: 'Guarda el nombre del cliente en la base de datos para recordarlo en futuras conversaciones.',
    parameters: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                description: 'El nombre completo del cliente.',
            },
        },
        required: ['name'],
    },
};

/**
 * Execute the tool to update the customer's name.
 */
export async function execute(
    args: Record<string, unknown>,
    context?: { conversation_id?: string }
): Promise<string> {
    const { name } = args as { name: string };
    const conversationId = context?.conversation_id;

    if (!conversationId) {
        return JSON.stringify({ success: false, error: 'No conversation ID provided' });
    }

    try {
        await updateCustomerName(conversationId, name);
        return JSON.stringify({
            success: true,
            message: `Nombre "${name}" guardado correctamente.`,
        });
    } catch (error) {
        return JSON.stringify({
            success: false,
            error: (error as Error).message,
        });
    }
}
