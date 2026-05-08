
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

async function checkDB() {
    console.log("DB URL:", process.env.DATABASE_URL);
    // Strip quotes if any
    let dbUrl = process.env.DATABASE_URL;
    if (dbUrl && dbUrl.startsWith('"') && dbUrl.endsWith('"')) {
        dbUrl = dbUrl.slice(1, -1);
    }
    const connection = await mysql.createConnection(dbUrl);
    try {
        const [slides] = await connection.execute('SELECT * FROM hero_slides');
        console.log('--- Hero Slides ---');
        console.log(JSON.stringify(slides, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await connection.end();
    }
}

checkDB();
