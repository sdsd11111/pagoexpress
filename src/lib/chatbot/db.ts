// ═══════════════════════════════════════════════════════════════
// PagoExpress Elite Chatbot — MySQL Database Layer
// ═══════════════════════════════════════════════════════════════

import mysql from 'mysql2/promise';
import { config } from './config';
import type { Service, Conversation, Message, Transaction } from './types';
import { v4 as uuidv4 } from 'uuid';

// ─── Connection Pool ───
let pool: mysql.Pool | null = null;

function getPool(): mysql.Pool {
    if (!pool) {
        pool = mysql.createPool({
            host: config.db.host,
            port: config.db.port,
            user: config.db.user,
            password: config.db.password,
            database: config.db.database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 10000,
        });
    }
    return pool;
}

// ─── Generic query helper ───
async function query<T = unknown>(sql: string, params?: any[]): Promise<T[]> {
    const db = getPool();
    const [rows] = await db.execute(sql, params);
    return rows as T[];
}

async function execute(sql: string, params?: any[]): Promise<mysql.ResultSetHeader> {
    const db = getPool();
    const [result] = await db.execute(sql, params);
    return result as mysql.ResultSetHeader;
}

// ═══════════════════════════════════════════════════════════════
// SERVICE QUERIES (RAG Knowledge Base)
// ═══════════════════════════════════════════════════════════════

/**
 * Search services using LIKE matching (fallback-safe).
 * Tries fulltext first, falls back to LIKE if fulltext not available.
 */
export async function searchServices(searchQuery: string, limit = 5): Promise<Service[]> {
    const likePattern = `%${searchQuery}%`;

    try {
        // Try FULLTEXT first
        const rows = await query<Record<string, unknown>>(
            `SELECT *, MATCH(name, description) AGAINST(? IN NATURAL LANGUAGE MODE) AS relevance
       FROM services
       WHERE is_active = 1
         AND MATCH(name, description) AGAINST(? IN NATURAL LANGUAGE MODE)
       ORDER BY relevance DESC
       LIMIT ?`,
            [searchQuery, searchQuery, limit]
        );

        if (rows.length > 0) return rows.map(parseServiceRow);
    } catch {
        // FULLTEXT index might not exist yet, fall through to LIKE
    }

    // Fallback: LIKE search
    const rows = await query<Record<string, unknown>>(
        `SELECT * FROM services
     WHERE is_active = 1
       AND (name LIKE ? OR description LIKE ?)
     ORDER BY name ASC
     LIMIT ?`,
        [likePattern, likePattern, limit]
    );

    return rows.map(parseServiceRow);
}

/**
 * Get a service by its unique ID.
 */
export async function getServiceById(id: number): Promise<Service | null> {
    const rows = await query<Record<string, unknown>>(
        'SELECT * FROM services WHERE id = ? AND is_active = 1',
        [id]
    );
    return rows.length > 0 ? parseServiceRow(rows[0]) : null;
}

/**
 * Get all services (for admin/seed purposes).
 */
export async function getAllServices(): Promise<Service[]> {
    const rows = await query<Record<string, unknown>>(
        'SELECT * FROM services WHERE is_active = 1 ORDER BY category, name'
    );
    return rows.map(parseServiceRow);
}

function parseServiceRow(row: Record<string, unknown>): Service {
    return {
        id: row.id as number,
        name: row.name as string,
        slug: row.slug as string,
        category: row.category as Service['category'],
        description: row.description as string | null,
        requirements: safeParseJSON(row.requirements as string, []),
        steps: safeParseJSON(row.steps as string, null),
        cost: row.cost as string | null,
        estimated_time: row.estimated_time as string | null,
        schedule: row.schedule as string | null,
        notes: row.notes as string | null,
        is_active: Boolean(row.is_active),
        created_at: new Date(row.created_at as string),
        updated_at: new Date(row.updated_at as string),
    };
}

// ═══════════════════════════════════════════════════════════════
// CONVERSATION QUERIES
// ═══════════════════════════════════════════════════════════════

/**
 * Get or create a conversation for a phone number.
 */
export async function getOrCreateConversation(phone: string): Promise<Conversation> {
    const existing = await query<Record<string, unknown>>(
        'SELECT * FROM conversations WHERE phone = ?',
        [phone]
    );

    if (existing.length > 0) {
        return parseConversationRow(existing[0]);
    }

    const id = uuidv4();
    await execute(
        'INSERT INTO conversations (id, phone, status) VALUES (?, ?, ?)',
        [id, phone, 'active']
    );

    return {
        id,
        phone,
        customer_name: null,
        status: 'active',
        current_step: null,
        context_data: null,
        last_manual_interaction: null,
        created_at: new Date(),
        updated_at: new Date(),
    };
}

/**
 * Update conversation status or context.
 */
export async function updateConversation(
    id: string,
    updates: Partial<Pick<Conversation, 'status' | 'current_step' | 'context_data' | 'customer_name'>>
): Promise<void> {
    const sets: string[] = [];
    const params: unknown[] = [];

    if (updates.status !== undefined) {
        sets.push('status = ?');
        params.push(updates.status);
    }
    if (updates.current_step !== undefined) {
        sets.push('current_step = ?');
        params.push(updates.current_step);
    }
    if (updates.context_data !== undefined) {
        sets.push('context_data = ?');
        params.push(JSON.stringify(updates.context_data));
    }
    if (updates.customer_name !== undefined) {
        sets.push('customer_name = ?');
        params.push(updates.customer_name);
    }

    if (sets.length === 0) return;

    sets.push('updated_at = NOW()');
    params.push(id);

    await execute(`UPDATE conversations SET ${sets.join(', ')} WHERE id = ?`, params);
}

function parseConversationRow(row: Record<string, unknown>): Conversation {
    return {
        id: row.id as string,
        phone: row.phone as string,
        customer_name: row.customer_name as string | null,
        status: row.status as Conversation['status'],
        current_step: row.current_step as string | null,
        context_data: safeParseJSON(row.context_data as string, null),
        last_manual_interaction: row.last_manual_interaction ? new Date(row.last_manual_interaction as string) : null,
        created_at: new Date(row.created_at as string),
        updated_at: new Date(row.updated_at as string),
    };
}

// ═══════════════════════════════════════════════════════════════
// MESSAGE QUERIES
// ═══════════════════════════════════════════════════════════════

/**
 * Save a message to the database.
 */
export async function saveMessage(message: Omit<Message, 'id' | 'created_at'>): Promise<void> {
    await execute(
        `INSERT INTO messages (conversation_id, role, content, tool_name, tool_result, media_url)
     VALUES (?, ?, ?, ?, ?, ?)`,
        [
            message.conversation_id,
            message.role,
            message.content,
            message.tool_name || null,
            message.tool_result ? JSON.stringify(message.tool_result) : null,
            message.media_url || null,
        ]
    );
}

/**
 * Get conversation history (last N messages).
 */
export async function getConversationHistory(
    conversationId: string,
    limit = 20
): Promise<Message[]> {
    const rows = await query<Record<string, unknown>>(
        `SELECT * FROM messages
     WHERE conversation_id = ?
     ORDER BY created_at DESC
     LIMIT ?`,
        [conversationId, limit]
    );

    return rows.reverse().map((row) => ({
        id: row.id as number,
        conversation_id: row.conversation_id as string,
        role: row.role as Message['role'],
        content: row.content as string,
        tool_name: row.tool_name as string | null,
        tool_result: safeParseJSON(row.tool_result as string, null),
        media_url: row.media_url as string | null,
        created_at: new Date(row.created_at as string),
    }));
}

// ═══════════════════════════════════════════════════════════════
// MAINTENANCE QUERIES
// ═══════════════════════════════════════════════════════════════

/**
 * Deletes messages older than the specified number of days.
 */
export async function cleanupOldMessages(days: number): Promise<number> {
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - days);

    const result = await execute(
        'DELETE FROM messages WHERE created_at < ?',
        [dateLimit]
    );

    return result.affectedRows;
}

// ═══════════════════════════════════════════════════════════════
// TRANSACTION QUERIES
// ═══════════════════════════════════════════════════════════════

/**
 * Save a new transaction record.
 */
export async function saveTransaction(tx: Omit<Transaction, 'id' | 'created_at'>): Promise<number> {
    const result = await execute(
        `INSERT INTO transactions (conversation_id, service_id, phone, amount, receipt_data, status, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            tx.conversation_id,
            tx.service_id,
            tx.phone,
            tx.amount,
            tx.receipt_data ? JSON.stringify(tx.receipt_data) : null,
            tx.status,
            tx.notes,
        ]
    );

    return result.insertId;
}

/**
 * Marks a conversation as having manual human interaction.
 * This pauses the bot for 24 hours.
 */
export async function updateLastManualInteraction(phone: string): Promise<void> {
    await execute(
        'UPDATE conversations SET last_manual_interaction = CURRENT_TIMESTAMP WHERE phone = ?',
        [phone]
    );
}

// ═══════════════════════════════════════════════════════════════
// SCHEMA INITIALIZATION
// ═══════════════════════════════════════════════════════════════

/**
 * Create all tables if they don't exist.
 */
export async function initializeSchema(): Promise<void> {
    const db = getPool();
    const connection = await db.getConnection();

    try {
        await connection.execute(`
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        category ENUM('remesas','bancos','recargas','pagos','tramites','gaming','seguros','oficina','otros') NOT NULL DEFAULT 'otros',
        description TEXT,
        requirements JSON,
        steps JSON,
        cost VARCHAR(100),
        estimated_time VARCHAR(100),
        schedule VARCHAR(255),
        notes TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uk_slug (slug)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

        // Add FULLTEXT index if not exists (wrapped in try/catch for safety)
        try {
            await connection.execute(
                'ALTER TABLE services ADD FULLTEXT INDEX ft_services_search (name, description)'
            );
        } catch {
            // Index already exists, ignore
        }

        await connection.execute(`
      CREATE TABLE IF NOT EXISTS conversations (
        id VARCHAR(36) PRIMARY KEY,
        phone VARCHAR(20) NOT NULL,
        customer_name VARCHAR(255),
        status ENUM('active','escalated','closed') DEFAULT 'active',
        current_step VARCHAR(100),
        context_data JSON,
        last_manual_interaction TIMESTAMP NULL DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uk_phone (phone)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

        // Migration: Add customer_name if it doesn't exist
        try {
            await connection.execute('ALTER TABLE conversations ADD COLUMN IF NOT EXISTS customer_name VARCHAR(255) AFTER phone');
        } catch (e) {
            // Ignore if column exists or IF NOT EXISTS not supported
        }

        await connection.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        conversation_id VARCHAR(36) NOT NULL,
        role ENUM('user','assistant','tool','system') NOT NULL,
        content TEXT NOT NULL,
        tool_name VARCHAR(50),
        tool_result JSON,
        media_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_conv_id (conversation_id),
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

        await connection.execute(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        conversation_id VARCHAR(36),
        service_id INT,
        phone VARCHAR(20) NOT NULL,
        amount DECIMAL(10,2),
        receipt_data JSON,
        status ENUM('pending','confirmed','completed','cancelled') DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_phone (phone),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

        console.log('✅ Chatbot database schema initialized');
    } finally {
        connection.release();
    }
}

/**
 * Test database connectivity.
 */
export async function testConnection(): Promise<boolean> {
    try {
        await initializeSchema();
        const db = getPool();
        const connection = await db.getConnection();
        await connection.ping();
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Database connection/init failed:', error);
        return false;
    }
}

// ─── Utility ───
function safeParseJSON<T>(value: unknown, fallback: T): T {
    if (value === null || value === undefined) return fallback;
    if (typeof value === 'object') return value as T;
    try {
        return JSON.parse(value as string) as T;
    } catch {
        return fallback;
    }
}
