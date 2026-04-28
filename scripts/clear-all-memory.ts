import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function clearAllMemory() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });

    try {
        console.log('Clearing ALL chatbot memory (conversations, messages, transactions)...');

        await connection.execute('SET FOREIGN_KEY_CHECKS = 0');
        
        const [msgRes]: any = await connection.execute('DELETE FROM messages');
        console.log(`Deleted ${msgRes.affectedRows} messages.`);

        const [txRes]: any = await connection.execute('DELETE FROM transactions');
        console.log(`Deleted ${txRes.affectedRows} transactions.`);

        const [convRes]: any = await connection.execute('DELETE FROM conversations');
        console.log(`Deleted ${convRes.affectedRows} conversations.`);

        await connection.execute('SET FOREIGN_KEY_CHECKS = 1');

        console.log('✅ ALL memory cleared successfully. Bot is at 0.');
    } catch (error) {
        console.error('❌ Error clearing memory:', error);
    } finally {
        await connection.end();
    }
}

clearAllMemory();
