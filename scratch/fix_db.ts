import { pool } from '../src/lib/db';

async function fix() {
    try {
        console.log('Verificando tabla receipts...');
        
        // Intentar añadir las nuevas columnas si no existen
        try {
            await pool.query('ALTER TABLE receipts ADD COLUMN mime_type VARCHAR(100) AFTER filename');
            console.log('Columna mime_type añadida.');
        } catch (e) {}

        try {
            await pool.query('ALTER TABLE receipts ADD COLUMN content LONGBLOB AFTER mime_type');
            console.log('Columna content (LONGBLOB) añadida.');
        } catch (e) {}

        console.log('Base de datos actualizada con éxito.');
        process.exit(0);
    } catch (error) {
        console.error('Error actualizando DB:', error);
        process.exit(1);
    }
}

fix();
