import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function deleteMemory() {
    const phone = process.argv[2];
    if (!phone) {
        console.error('Usage: npx tsx scripts/delete-memory.ts <phone_number>');
        process.exit(1);
    }

    const cleanPhone = phone.replace(/\D/g, '');

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });

    try {
        console.log(`Deleting memory for phone: ${cleanPhone}...`);

        // 1. Get conversation ID
        const [rows]: any = await connection.execute(
            'SELECT id FROM conversations WHERE phone = ?',
            [cleanPhone]
        );

        if (rows.length === 0) {
            console.log('No conversation found for this phone number.');
            return;
        }

        const conversationId = rows[0].id;

        // 2. Delete messages
        const [msgRes]: any = await connection.execute(
            'DELETE FROM messages WHERE conversation_id = ?',
            [conversationId]
        );
        console.log(`Deleted ${msgRes.affectedRows} messages.`);

        // 3. Delete transactions
        const [txRes]: any = await connection.execute(
            'DELETE FROM transactions WHERE phone = ?',
            [cleanPhone]
        );
        console.log(`Deleted ${txRes.affectedRows} transactions.`);

        // 4. Delete conversation
        await connection.execute(
            'DELETE FROM conversations WHERE id = ?',
            [conversationId]
        );
        console.log(`Deleted conversation record for ${cleanPhone}.`);

        console.log('✅ Memory cleared successfully.');
    } catch (error) {
        console.error('❌ Error deleting memory:', error);
    } finally {
        await connection.end();
    }
}

deleteMemory();
