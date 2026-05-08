import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { pool } from '@/lib/db';
import crypto from 'crypto';

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

        // Make sure uploads directory exists
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // Directory might already exist, ignore
        }

        // Generate unique filename
        const uniqueSuffix = crypto.randomBytes(8).toString('hex');
        const extension = file.name.split('.').pop() || 'png';
        const filename = `receipt-${uniqueSuffix}.${extension}`;
        
        const filePath = join(uploadDir, filename);
        await writeFile(filePath, buffer);

        const publicUrl = `/uploads/${filename}`;
        
        // Full URL for WhatsApp
        const protocol = req.headers.get('x-forwarded-proto') || 'https';
        const host = req.headers.get('host');
        const fullUrl = `${protocol}://${host}${publicUrl}`;

        // Create table if it doesn't exist
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS receipts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id VARCHAR(100),
                amount DECIMAL(10,2),
                filename VARCHAR(255),
                url VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await pool.query(createTableQuery);

        // Save to Database
        const insertQuery = `INSERT INTO receipts (user_id, amount, filename, url) VALUES (?, ?, ?, ?)`;
        await pool.query(insertQuery, [userId, amount, filename, publicUrl]);

        return NextResponse.json({ success: true, url: fullUrl });

    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
    }
}
