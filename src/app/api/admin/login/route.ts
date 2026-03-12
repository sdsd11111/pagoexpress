
import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/admin-utils';

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        const adminUser = process.env.ADMIN_USER || 'PagoExpress';
        const adminPass = process.env.ADMIN_PASS || 'Contraseña123.';

        if (username === adminUser && password === adminPass) {
            await createSession(username);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { success: false, error: 'Credenciales inválidas' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Error en el servidor' },
            { status: 500 }
        );
    }
}
