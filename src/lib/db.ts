import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.DB_HOST || "mysql.gb.stackcp.com",
    port: Number(process.env.DB_PORT) || 41827,
    user: process.env.DB_USER || "Pagoexpressprueba-353038396b0b",
    password: process.env.DB_PASS || "hjc1u375jn",
    database: process.env.DB_NAME || "Pagoexpressprueba-353038396b0b",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
