
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/admin-utils';
import { config } from '@/lib/chatbot/config';

export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { url: baseUrl, apiKey, instance } = config.evolution;

    try {
        // 1. Get Connection State
        const stateRes = await fetch(`${baseUrl}/instance/connectionState/${instance}`, {
            headers: { apikey: apiKey },
        });

        if (!stateRes.ok) throw new Error('Error al obtener estado');
        const stateData = await stateRes.json();
        const state = stateData.instance.state; // 'open', 'close', 'connecting', etc.

        // 2. If not open, get QR
        let qr = null;
        if (state !== 'open') {
            const connectRes = await fetch(`${baseUrl}/instance/connect/${instance}`, {
                headers: { apikey: apiKey },
            });
            if (connectRes.ok) {
                const connectData = await connectRes.json();
                qr = connectData.base64 || connectData.code; // Evolution API returns base64 or code
            }
        }

        return NextResponse.json({
            connected: state === 'open',
            state,
            qr,
            instance,
        });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
