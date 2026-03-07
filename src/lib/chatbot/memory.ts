// ═══════════════════════════════════════════════════════════════
// PagoExpress Elite Chatbot — Conversation Memory Manager
// ═══════════════════════════════════════════════════════════════

import {
    getOrCreateConversation,
    getConversationHistory,
    saveMessage,
    updateConversation,
} from './db';
import type { Conversation, Message, LLMMessage } from './types';

// ─── In-Memory Cache (TTL: 30 min) ───
interface CacheEntry {
    conversation: Conversation;
    lastAccessed: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

// Cleanup stale entries every 10 min
if (typeof setInterval !== 'undefined') {
    setInterval(() => {
        const now = Date.now();
        for (const [key, entry] of cache.entries()) {
            if (now - entry.lastAccessed > CACHE_TTL_MS) {
                cache.delete(key);
            }
        }
    }, 10 * 60 * 1000);
}

/**
 * Get the conversation context for a phone number.
 * Uses in-memory cache with MySQL fallback.
 */
export async function getContext(phone: string): Promise<{
    conversation: Conversation;
    history: LLMMessage[];
}> {
    // Check cache first
    const cached = cache.get(phone);
    if (cached && Date.now() - cached.lastAccessed < CACHE_TTL_MS) {
        cached.lastAccessed = Date.now();
        const history = await loadHistory(cached.conversation.id);
        return { conversation: cached.conversation, history };
    }

    // Fetch from DB
    const conversation = await getOrCreateConversation(phone);
    cache.set(phone, { conversation, lastAccessed: Date.now() });

    const history = await loadHistory(conversation.id);
    return { conversation, history };
}

/**
 * Load and format conversation history for the LLM.
 */
async function loadHistory(
    conversationId: string,
    limit = 20
): Promise<LLMMessage[]> {
    const messages = await getConversationHistory(conversationId, limit);

    return messages
        .filter((m) => m.role !== 'system') // System prompt is injected separately
        .map((m): LLMMessage => ({
            role: m.role as LLMMessage['role'],
            content: m.content,
            tool_call_id: m.tool_name ? m.tool_name : undefined, // Simplified
        }));
}

/**
 * Save a user message to conversation history.
 */
export async function saveUserMessage(
    conversationId: string,
    content: string,
    mediaUrl?: string
): Promise<void> {
    await saveMessage({
        conversation_id: conversationId,
        role: 'user',
        content,
        media_url: mediaUrl || null,
    });
}

/**
 * Save an assistant response to conversation history.
 */
export async function saveAssistantMessage(
    conversationId: string,
    content: string
): Promise<void> {
    await saveMessage({
        conversation_id: conversationId,
        role: 'assistant',
        content,
    });
}

/**
 * Save a tool result to conversation history.
 */
export async function saveToolMessage(
    conversationId: string,
    toolName: string,
    result: string
): Promise<void> {
    await saveMessage({
        conversation_id: conversationId,
        role: 'tool',
        content: result,
        tool_name: toolName,
    });
}

/**
 * Update the customer name in the DB and cache.
 */
export async function updateCustomerName(
    conversationId: string,
    name: string
): Promise<void> {
    await updateConversation(conversationId, { customer_name: name });

    // Update cache
    for (const [, entry] of cache.entries()) {
        if (entry.conversation.id === conversationId) {
            entry.conversation.customer_name = name;
            break;
        }
    }
}

/**
 * Update conversation step/status.
 */
export async function updateStep(
    conversationId: string,
    step: string | null,
    contextData?: Record<string, unknown>
): Promise<void> {
    await updateConversation(conversationId, {
        current_step: step,
        context_data: contextData,
    });

    // Update cache
    for (const [, entry] of cache.entries()) {
        if (entry.conversation.id === conversationId) {
            entry.conversation.current_step = step;
            if (contextData) {
                entry.conversation.context_data = contextData;
            }
            break;
        }
    }
}

/**
 * Clear conversation context (reset session).
 */
export async function clearContext(phone: string): Promise<void> {
    cache.delete(phone);
    const conversation = await getOrCreateConversation(phone);
    await updateConversation(conversation.id, {
        status: 'active',
        current_step: null,
        context_data: null,
    });
}
