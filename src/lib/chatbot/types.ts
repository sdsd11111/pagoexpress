// ═══════════════════════════════════════════════════════════════
// PagoExpress Elite Chatbot — TypeScript Types
// ═══════════════════════════════════════════════════════════════

// ─── Service (Knowledge Base / RAG) ───
export interface Service {
    id: number;
    name: string;
    slug: string;
    category: ServiceCategory;
    description: string | null;
    requirements: string[];
    steps: string[] | null;
    cost: string | null;
    estimated_time: string | null;
    schedule: string | null;
    notes: string | null;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

export type ServiceCategory =
    | 'remesas'
    | 'bancos'
    | 'recargas'
    | 'pagos'
    | 'tramites'
    | 'gaming'
    | 'seguros'
    | 'oficina'
    | 'otros';

// ─── Conversation ───
export interface Conversation {
    id: string;
    phone: string;
    customer_name: string | null;
    status: ConversationStatus;
    current_step: string | null;
    context_data: Record<string, unknown> | null;
    last_manual_interaction: Date | null;
    created_at: Date;
    updated_at: Date;
}

export type ConversationStatus = 'active' | 'escalated' | 'closed';

// ─── Message ───
export interface Message {
    id?: number;
    conversation_id: string;
    role: MessageRole;
    content: string;
    tool_name?: string | null;
    tool_result?: Record<string, unknown> | null;
    media_url?: string | null;
    created_at?: Date;
}

export type MessageRole = 'user' | 'assistant' | 'tool' | 'system';

// ─── Transaction ───
export interface Transaction {
    id?: number;
    conversation_id: string | null;
    service_id: number | null;
    phone: string;
    amount: number | null;
    receipt_data: Record<string, unknown> | null;
    status: TransactionStatus;
    notes: string | null;
    created_at?: Date;
}

export type TransactionStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

// ─── Tool System ───
export interface ToolDefinition {
    name: string;
    description: string;
    parameters: {
        type: 'object';
        properties: Record<string, {
            type: string;
            description: string;
            enum?: string[];
        }>;
        required: string[];
    };
}

export interface ToolCall {
    id: string;
    name: string;
    arguments: Record<string, unknown>;
}

export interface ToolResult {
    tool_call_id: string;
    name: string;
    result: string;
    success: boolean;
}

// ─── LLM ───
export interface LLMMessage {
    role: 'system' | 'user' | 'assistant' | 'tool';
    content: string;
    tool_calls?: ToolCall[];
    tool_call_id?: string;
    name?: string;
}

export interface LLMResponse {
    content: string | null;
    tool_calls: ToolCall[] | null;
    provider_used: 'groq' | 'gemini' | 'openrouter';
    model_used: string;
}

// ─── Agent State ───
export interface AgentState {
    conversation_id: string;
    phone: string;
    messages: LLMMessage[];
    iteration_count: number;
    tools_used: string[];
    should_escalate: boolean;
    final_response: string | null;
}

// ─── Evolution API Webhook Payload ───
export interface EvolutionWebhookPayload {
    event: string;
    instance: string;
    data: {
        key: {
            remoteJid: string;
            fromMe: boolean;
            id: string;
        };
        pushName?: string;
        message?: {
            conversation?: string;
            extendedTextMessage?: {
                text: string;
            };
            imageMessage?: {
                url: string;
                mimetype: string;
                caption?: string;
                mediaUrl?: string;
            };
            audioMessage?: {
                url: string;
                mimetype: string;
                mediaUrl?: string;
            };
            documentMessage?: {
                url: string;
                mimetype: string;
                fileName?: string;
                mediaUrl?: string;
            };
        };
        messageType?: string;
        messageTimestamp?: number;
    };
}

// ─── Parsed Incoming Message ───
export interface IncomingMessage {
    phone: string;
    pushName: string;
    type: 'text' | 'image' | 'audio' | 'document' | 'unknown';
    content: string;
    mediaUrl?: string;
    mediaKey?: string;
    messageId: string;
    timestamp: number;
}
