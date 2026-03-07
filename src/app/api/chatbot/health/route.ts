// ═══════════════════════════════════════════════════════════════
// API Route: GET /api/chatbot/health
// Health check for the chatbot system
// ═══════════════════════════════════════════════════════════════

import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/chatbot/db';
import { checkInstanceStatus } from '@/lib/chatbot/evolution';

export async function GET(): Promise<NextResponse> {
    const checks = {
        timestamp: new Date().toISOString(),
        database: { status: 'unknown' as string, connected: false },
        whatsapp: { status: 'unknown' as string, connected: false, state: '' },
        llm: { groq: '✅ configured', gemini: '✅ configured', openrouter: '✅ configured' },
    };

    // Test database
    try {
        const dbConnected = await testConnection();
        checks.database = {
            status: dbConnected ? '✅ connected' : '❌ failed',
            connected: dbConnected,
        };
    } catch (error) {
        checks.database = {
            status: `❌ error: ${(error as Error).message}`,
            connected: false,
        };
    }

    // Test Evolution API
    try {
        const waStatus = await checkInstanceStatus();
        checks.whatsapp = {
            status: waStatus.connected ? '✅ connected' : `⚠️ ${waStatus.state}`,
            connected: waStatus.connected,
            state: waStatus.state,
        };
    } catch (error) {
        checks.whatsapp = {
            status: `❌ error: ${(error as Error).message}`,
            connected: false,
            state: 'error',
        };
    }

    // Check LLM keys presence
    checks.llm = {
        groq: process.env.GROQ_API_KEY ? '✅ configured' : '❌ missing',
        gemini: process.env.GEMINI_API_KEY ? '✅ configured' : '❌ missing',
        openrouter: process.env.OPENROUTER_API_KEY ? '✅ configured' : '❌ missing',
    };

    const allHealthy = checks.database.connected;

    return NextResponse.json(checks, {
        status: allHealthy ? 200 : 503,
    });
}
