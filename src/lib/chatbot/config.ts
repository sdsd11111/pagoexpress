import { z } from 'zod';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local only in development or if the file exists
if (process.env.NODE_ENV !== 'production') {
    const envPath = path.resolve(process.cwd(), '.env.local');
    dotenv.config({ path: envPath });
}

const envSchema = z.object({
    // LLM Providers
    GROQ_API_KEY: z.string().min(1, 'GROQ_API_KEY is required'),
    GEMINI_API_KEY: z.string().min(1, 'GEMINI_API_KEY is required'),
    OPENROUTER_API_KEY: z.string().min(1, 'OPENROUTER_API_KEY is required'),

    // Evolution API
    EVOLUTION_API_URL: z.string().url('EVOLUTION_API_URL must be a valid URL'),
    EVOLUTION_API_KEY: z.string().min(1, 'EVOLUTION_API_KEY is required'),
    EVOLUTION_INSTANCE: z.string().min(1, 'EVOLUTION_INSTANCE is required'),

    // Database
    DB_HOST: z.string().min(1, 'DB_HOST is required'),
    DB_PORT: z.string().default('3306'),
    DB_USER: z.string().min(1, 'DB_USER is required'),
    DB_PASS: z.string().min(1, 'DB_PASS is required'),
    DB_NAME: z.string().min(1, 'DB_NAME is required'),

    // Chatbot Config
    STRICT_KNOWLEDGE: z.string().default('true'),
    MAX_ITERATIONS: z.string().default('5'),
    ADMIN_PHONE: z.string().default('593990227203'),
    CHATBOT_WEBHOOK_SECRET: z.string().default('pe-webhook-secret-2026'),
});

function loadConfig() {
    const parsed = envSchema.safeParse(process.env);

    if (!parsed.success) {
        console.error('❌ Chatbot configuration error:', parsed.error.flatten().fieldErrors);
        // In development, return defaults to avoid crashing the entire Next.js app
        return {
            groq: { apiKey: process.env.GROQ_API_KEY || '' },
            gemini: { apiKey: process.env.GEMINI_API_KEY || '' },
            openrouter: { apiKey: process.env.OPENROUTER_API_KEY || '' },
            evolution: {
                url: process.env.EVOLUTION_API_URL || '',
                apiKey: process.env.EVOLUTION_API_KEY || '',
                instance: process.env.EVOLUTION_INSTANCE || 'PagoExpress',
            },
            db: {
                host: process.env.DB_HOST || '',
                port: parseInt(process.env.DB_PORT || '3306'),
                user: process.env.DB_USER || '',
                password: process.env.DB_PASS || '',
                database: process.env.DB_NAME || '',
            },
            strictKnowledge: process.env.STRICT_KNOWLEDGE === 'true',
            maxIterations: parseInt(process.env.MAX_ITERATIONS || '5'),
            adminPhone: process.env.ADMIN_PHONE || '593990227203',
            webhookSecret: process.env.CHATBOT_WEBHOOK_SECRET || '',
        };
    }

    const env = parsed.data;
    return {
        groq: { apiKey: env.GROQ_API_KEY },
        gemini: { apiKey: env.GEMINI_API_KEY },
        openrouter: { apiKey: env.OPENROUTER_API_KEY },
        evolution: {
            url: env.EVOLUTION_API_URL,
            apiKey: env.EVOLUTION_API_KEY,
            instance: env.EVOLUTION_INSTANCE,
        },
        db: {
            host: env.DB_HOST,
            port: parseInt(env.DB_PORT),
            user: env.DB_USER,
            password: env.DB_PASS,
            database: env.DB_NAME,
        },
        strictKnowledge: env.STRICT_KNOWLEDGE === 'true',
        maxIterations: parseInt(env.MAX_ITERATIONS),
        adminPhone: env.ADMIN_PHONE,
        webhookSecret: env.CHATBOT_WEBHOOK_SECRET,
    };
}

let memoizedConfig: ReturnType<typeof loadConfig> | null = null;

function getConfigInternal(): ReturnType<typeof loadConfig> {
    if (!memoizedConfig || (!memoizedConfig.groq.apiKey && process.env.GROQ_API_KEY)) {
        memoizedConfig = loadConfig();
    }
    return memoizedConfig;
}

// Export a Proxy that lazily initializes the config on first access
export const config = new Proxy({} as ReturnType<typeof loadConfig>, {
    get: (_target, prop) => {
        return (getConfigInternal() as any)[prop];
    }
});

export type ChatbotConfig = ReturnType<typeof loadConfig>;
