import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/admin-utils';
import { config } from '@/lib/chatbot/config';

// OBTENER QR
export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { url: baseUrl, apiKey, instance } = config.evolution;

    try {
        const connectRes = await fetch(`${baseUrl}/instance/connect/${instance}`, {
            headers: { apikey: apiKey },
        });

        if (!connectRes.ok) {
            throw new Error('Error al conectar con Evolution API');
        }

        const connectData = await connectRes.json();
        const qr = connectData.qrcode?.base64 || connectData.base64 || connectData.qr?.base64 || connectData.code;

        return NextResponse.json({ qr, instance });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}

// CERRAR SESIÓN (DESCONECTAR)
export async function DELETE() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { url: baseUrl, apiKey, instance } = config.evolution;

    try {
        const logoutRes = await fetch(`${baseUrl}/instance/logout/${instance}`, {
            method: 'DELETE',
            headers: { apikey: apiKey },
        });

        if (!logoutRes.ok) {
            throw new Error('Error al desconectar en Evolution API');
        }

        return NextResponse.json({ success: true, message: 'Sesión cerrada correctamente' });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
