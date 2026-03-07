process.env.SKIP_CONFIG_VALIDATION = 'true';
import * as dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve('d:/Abel paginas/PagoExpress/Pagina web/pagoexpress-web', '.env.local');
dotenv.config({ path: envPath });

if (!process.env.GROQ_API_KEY) {
    console.warn('⚠️  Warning: GROQ_API_KEY is not defined after dotenv.config()');
}
