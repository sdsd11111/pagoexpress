import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import crypto from 'crypto';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('receipt') as File | null;
        const userId = formData.get('userId') as string;
        const amount = formData.get('amount') as string;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Convert to WebP and compress
        let finalBuffer: any = buffer;
        let mimeType = file.type;
        const uniqueSuffix = crypto.randomBytes(8).toString('hex');

        if (file.type.startsWith('image/')) {
            finalBuffer = await sharp(buffer)
                .webp({ quality: 80 })
                .toBuffer();
            mimeType = 'image/webp';
        }

        const filename = `receipt-${uniqueSuffix}.${mimeType.split('/')[1]}`;

        // Create table with BLOB support if it doesn't exist
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS receipts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id VARCHAR(100),
                amount DECIMAL(10,2),
                filename VARCHAR(255),
                mime_type VARCHAR(100),
                content LONGBLOB,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await pool.query(createTableQuery);

        // Save DIRECTLY to Database (BLOB)
        const insertQuery = `INSERT INTO receipts (user_id, amount, filename, mime_type, content) VALUES (?, ?, ?, ?, ?)`;
        const [result]: any = await pool.query(insertQuery, [userId, amount, filename, mimeType, finalBuffer]);
        
        const insertId = result.insertId;

        // Generate the link that points to our database viewer
        const protocol = req.headers.get('x-forwarded-proto') || 'https';
        const host = req.headers.get('host');
        const fullUrl = `${protocol}://${host}/api/receipts/${insertId}`;

        return NextResponse.json({ success: true, url: fullUrl });

    } catch (error) {
        console.error('Error uploading to database:', error);
        return NextResponse.json({ error: 'Error uploading to database' }, { status: 500 });
    }
}
