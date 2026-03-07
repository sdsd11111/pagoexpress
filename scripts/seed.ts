import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { config } from 'dotenv';

// Load .env.local
config({ path: path.resolve(process.cwd(), '.env.local') });

async function seed() {
    console.log('🌱 Starting database seed...');

    const db = mysql.createPool({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });

    try {
        // 1. Initialize schema first
        console.log('📦 Initializing schema (if not exists)...');

        // We already have this logic in src/lib/chatbot/db.ts, but let's run a simple version here
        // just to be sure we can insert.
        await db.execute(`
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        category ENUM('remesas','bancos','recargas','pagos','tramites','gaming','seguros','oficina','otros') NOT NULL DEFAULT 'otros',
        description TEXT,
        requirements JSON,
        steps JSON,
        cost VARCHAR(100),
        estimated_time VARCHAR(100),
        schedule VARCHAR(255),
        notes TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uk_slug (slug)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

        // Add FULLTEXT index if not exists (wrapped in try/catch for safety)
        try {
            await db.execute('ALTER TABLE services ADD FULLTEXT INDEX ft_services_search (name, description)');
        } catch (e) { /* already exists */ }

        await db.execute(`
      CREATE TABLE IF NOT EXISTS conversations (
        id VARCHAR(36) PRIMARY KEY,
        phone VARCHAR(20) NOT NULL,
        status ENUM('active','escalated','closed') DEFAULT 'active',
        current_step VARCHAR(100),
        context_data JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uk_phone (phone)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

        await db.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        conversation_id VARCHAR(36) NOT NULL,
        role ENUM('user','assistant','tool','system') NOT NULL,
        content TEXT NOT NULL,
        tool_name VARCHAR(50),
        tool_result JSON,
        media_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_conv_id (conversation_id),
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

        await db.execute(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        conversation_id VARCHAR(36),
        service_id INT,
        phone VARCHAR(20) NOT NULL,
        amount DECIMAL(10,2),
        receipt_data JSON,
        status ENUM('pending','confirmed','completed','cancelled') DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_phone (phone),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

        // Clear existing services if we are reseeding. Be careful in production!
        // For this initial setup, we assume it's safe to clear.
        await db.execute('DELETE FROM services');
        console.log('🧹 Cleared existing services.');

        // 2. Read extract_output_utf8.txt
        const txtPath = path.resolve(process.cwd(), 'extract_output_utf8.txt');
        const content = fs.readFileSync(txtPath, 'utf8');
        const lines = content.split('\n');

        let inserted = 0;

        for (const line of lines) {
            if (!line.trim() || !line.startsWith('{')) continue;

            try {
                const row = JSON.parse(line.trim());
                const serviceName = row['SERVICIOS'];
                const reqString = row['REQUISITOS DE LOS SERVICIOS ejemplo(cedula-datos..etc)'];

                if (!serviceName) continue;

                // Auto-categorize based on keywords
                let category = 'otros';
                const nameLower = serviceName.toLowerCase();
                if (nameLower.includes('banco') || nameLower.includes('cooperativa') || nameLower.includes('deposito') || nameLower.includes('retiro')) {
                    category = 'bancos';
                } else if (nameLower.includes('giro') || nameLower.includes('western union') || nameLower.includes('money gram')) {
                    category = 'remesas';
                } else if (nameLower.includes('recarga') || nameLower.includes('netflix') || nameLower.includes('directv') || nameLower.includes('plan')) {
                    category = 'recargas';
                } else if (nameLower.includes('ecuabet') || nameLower.includes('betcris') || nameLower.includes('doradobet') || nameLower.includes('bet')) {
                    category = 'gaming';
                } else if (nameLower.includes('impresion') || nameLower.includes('copias') || nameLower.includes('escaneo') || nameLower.includes('cd')) {
                    category = 'oficina';
                } else if (nameLower.includes('luz') || nameLower.includes('agua') || nameLower.includes('municipio') || nameLower.includes('iess') || nameLower.includes('sri') || nameLower.includes('ant') || nameLower.includes('registro civil') || nameLower.includes('matriculacion')) {
                    category = 'tramites';
                } else {
                    category = 'pagos';
                }

                // Parse requirements into array
                const requirements = reqString
                    ? reqString.split('-').map((r: string) => r.trim()).filter(Boolean)
                    : [];

                // Generate slug
                const slug = serviceName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

                await db.execute(
                    `INSERT INTO services (name, slug, category, requirements) VALUES (?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE requirements = ?, category = ?`,
                    [serviceName, slug, category, JSON.stringify(requirements), JSON.stringify(requirements), category]
                );
                inserted++;
            } catch (e) {
                console.warn('Failed to parse/insert line:', line, e);
            }
        }

        console.log(`✅ Successfully seeded ${inserted} services!`);
    } catch (error) {
        console.error('❌ Seed failed:', error);
    } finally {
        await db.end();
    }
}

seed();
