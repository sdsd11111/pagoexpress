import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Query the database for the receipt content
        const [rows]: any = await pool.query(
            'SELECT content, mime_type FROM receipts WHERE id = ?',
            [id]
        );

        if (!rows || rows.length === 0) {
            return new NextResponse('Receipt not found', { status: 404 });
        }

        const receipt = rows[0];

        // Return the binary content as an image response
        return new NextResponse(receipt.content, {
            headers: {
                'Content-Type': receipt.mime_type,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });

    } catch (error) {
        console.error('Error fetching receipt from database:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
