import './load-env';
import { config } from '../src/lib/chatbot/config';

console.log('--- Env Check ---');
console.log('DB_HOST:', config.db.host ? 'Present' : 'MISSING');
console.log('GROQ:', config.groq.apiKey ? 'Present' : 'MISSING');
console.log('--- SUCCESS ---');
