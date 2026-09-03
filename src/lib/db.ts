import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.DB_HOST || "mysql.us.stackcp.com",
    port: Number(process.env.DB_PORT) || 44641,
    user: process.env.DB_USER || "dbpagoexpress-353039382b30",
    password: process.env.DB_PASS || "tbP^CDIK£XEK",
    database: process.env.DB_NAME || "dbpagoexpress-353039382b30",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
