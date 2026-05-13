import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const searchParams = req.nextUrl.searchParams;
        const isRaw = searchParams.get('raw') === 'true';

        // Query the database for the receipt content
        const [rows]: any = await pool.query(
            'SELECT content, mime_type, created_at FROM receipts WHERE id = ?',
            [id]
        );

        if (!rows || rows.length === 0) {
            return new NextResponse('Receipt not found', { status: 404 });
        }

        const receipt = rows[0];

        // If raw image is requested (for the img src or direct download)
        if (isRaw) {
            return new NextResponse(receipt.content, {
                headers: {
                    'Content-Type': receipt.mime_type,
                    'Cache-Control': 'public, max-age=31536000, immutable',
                },
            });
        }

        // Otherwise, return a branded HTML page for Open Graph and nice viewing
        const protocol = req.headers.get('x-forwarded-proto') || 'https';
        const host = req.headers.get('host');
        const baseUrl = `${protocol}://${host}`;
        const rawImageUrl = `${baseUrl}/api/receipts/${id}?raw=true`;
        const logoUrl = `${baseUrl}/logo.jpg`;

        const html = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Comprobante PagoExpress - #${id}</title>
                
                <!-- Open Graph / WhatsApp Tags -->
                <meta property="og:title" content="Comprobante PagoExpress">
                <meta property="og:description" content="Documento digital oficial de PagoExpress. Generado el ${new Date(receipt.created_at).toLocaleDateString()}.">
                <meta property="og:image" content="${logoUrl}">
                <meta property="og:url" content="${baseUrl}/api/receipts/${id}">
                <meta property="og:type" content="website">
                <meta property="og:site_name" content="PagoExpress Ecuador">
                <meta name="theme-color" content="#F3CF1D">

                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        background-color: #0a0a0a;
                        color: white;
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                    }
                    .container {
                        max-width: 600px;
                        width: 90%;
                        text-align: center;
                        padding: 40px 0;
                    }
                    .logo {
                        width: 150px;
                        margin-bottom: 30px;
                        filter: brightness(1.2);
                    }
                    .receipt-card {
                        background: #1a1a1a;
                        border-radius: 24px;
                        padding: 10px;
                        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                        border: 1px solid rgba(255,255,255,0.05);
                        overflow: hidden;
                    }
                    .receipt-image {
                        width: 100%;
                        height: auto;
                        display: block;
                        border-radius: 16px;
                    }
                    .footer-text {
                        margin-top: 25px;
                        font-size: 12px;
                        color: #666;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        font-weight: bold;
                    }
                    .btn-download {
                        margin-top: 30px;
                        display: inline-block;
                        padding: 12px 24px;
                        background: #F3CF1D;
                        color: black;
                        text-decoration: none;
                        border-radius: 12px;
                        font-weight: 900;
                        font-size: 13px;
                        transition: transform 0.2s;
                    }
                    .btn-download:active {
                        transform: scale(0.95);
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <img src="${logoUrl}" alt="PagoExpress" class="logo">
                    <div class="receipt-card">
                        <img src="${rawImageUrl}" alt="Comprobante PagoExpress" class="receipt-image">
                    </div>
                    <a href="${rawImageUrl}" download="comprobante-pagoexpress-${id}.webp" class="btn-download">DESCARGAR IMAGEN</a>
                    <p class="footer-text">PagoExpress — 19 años de confianza</p>
                </div>
            </body>
            </html>
        `;

        return new NextResponse(html, {
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
            },
        });

    } catch (error) {
        console.error('Error fetching receipt from database:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
