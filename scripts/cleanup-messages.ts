import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

/**
 * Deletes messages older than the specified number of days.
 * 
 * Usage: npx tsx scripts/cleanup-messages.ts [days]
 * Example: npx tsx scripts/cleanup-messages.ts 30
 */
async function cleanupMessages(days: number) {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 1,
        queueLimit: 0
    });

    try {
        console.log(`🧹 Starting cleanup of messages older than ${days} days...`);

        // 1. Find sessions that are old
        const dateLimit = new Date();
        dateLimit.setDate(dateLimit.getDate() - days);
        const sqlDate = dateLimit.toISOString().slice(0, 19).replace('T', ' ');

        console.log(`Target date: ${sqlDate}`);

        // 2. Delete messages
        const [msgRes]: any = await pool.execute(
            'DELETE FROM messages WHERE created_at < ?',
            [sqlDate]
        );
        console.log(`✅ Deleted ${msgRes.affectedRows} old messages.`);

        // 3. Optional: Delete closed conversations that are very old and have no messages
        // (Keeping them for now as they take very little space, but history is the main bloat)

        console.log('✨ Cleanup finished.');
    } catch (error) {
        console.error('❌ Error during cleanup:', error);
    } finally {
        await pool.end();
    }
}

const daysArg = parseInt(process.argv[2] || '60');
cleanupMessages(daysArg);
