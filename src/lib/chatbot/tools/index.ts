// ═══════════════════════════════════════════════════════════════
// Tool Registry — Central hub for all chatbot tools
// ═══════════════════════════════════════════════════════════════

import type { ToolDefinition, ToolResult } from '../types';

import * as getServiceInfo from './get-service-info';
import * as validateReceipt from './validate-receipt';
import * as saveTransaction from './save-transaction';
import * as handoffToHuman from './handoff-to-human';
import * as saveCustomerName from './save-customer-name';

// ─── Tool Definitions (for LLM) ───
export const toolDefinitions: ToolDefinition[] = [
    getServiceInfo.definition,
    validateReceipt.definition,
    saveTransaction.definition,
    handoffToHuman.definition,
    saveCustomerName.definition,
];

// ─── Tool Executor ───
interface ToolContext {
    conversation_id?: string;
    phone?: string;
}

const toolExecutors: Record<
    string,
    (args: Record<string, unknown>, context?: ToolContext) => Promise<string>
> = {
    get_service_info: getServiceInfo.execute,
    validate_payment_receipt: validateReceipt.execute,
    save_transaction: saveTransaction.execute,
    handoff_to_human: handoffToHuman.execute,
    save_customer_name: saveCustomerName.execute,
};

/**
 * Execute a tool by name with given arguments.
 */
export async function executeTool(
    name: string,
    args: Record<string, unknown>,
    toolCallId: string,
    context?: ToolContext
): Promise<ToolResult> {
    const executor = toolExecutors[name];

    if (!executor) {
        return {
            tool_call_id: toolCallId,
            name,
            result: JSON.stringify({
                error: `Herramienta "${name}" no encontrada. Herramientas disponibles: ${Object.keys(toolExecutors).join(', ')}`,
            }),
            success: false,
        };
    }

    try {
        const result = await executor(args, context);
        return {
            tool_call_id: toolCallId,
            name,
            result,
            success: true,
        };
    } catch (error) {
        return {
            tool_call_id: toolCallId,
            name,
            result: JSON.stringify({
                error: `Error ejecutando herramienta "${name}": ${(error as Error).message}`,
            }),
            success: false,
        };
    }
}
