import './load-env';
import { processMessage } from '../src/lib/chatbot/agent';
import { deleteConversationByPhone, execute } from '../src/lib/chatbot/db';
import { setMockHandler } from '../src/lib/chatbot/evolution';

// Mock sendTextMessage to capture responses instead of sending them
const capturedResponses: Record<string, string[]> = {};
setMockHandler(async (phone: string, text: string) => {
    if (!capturedResponses[phone]) capturedResponses[phone] = [];
    capturedResponses[phone].push(text);
    return { status: 'success' };
});

const TEST_PHONE = '593900000001';

async function runVerification() {
    console.log('🚀 Iniciando verificación de mejoras de comportamiento...');

    // --- 1. Reset ---
    await deleteConversationByPhone(TEST_PHONE);

    // --- CASE 1: Greeting Threshold (12h) ---
    console.log('\n--- Escenario 1: Saludo tras 12h ---');

    // User message 1
    await processMessage({
        messageId: 'v-1',
        timestamp: Math.floor(Date.now() / 1000),
        phone: TEST_PHONE,
        content: 'Hola, quiero pagar la luz',
        type: 'text',
        pushName: 'César'
    });
    console.log('Bot (1st message):', capturedResponses[TEST_PHONE].join(' '));
    capturedResponses[TEST_PHONE] = [];

    // FAKE: Update last message to 13 hours ago in DB
    await execute(
        'UPDATE conversations SET updated_at = DATE_SUB(NOW(), INTERVAL 13 HOUR) WHERE phone = ?',
        [TEST_PHONE]
    );

    // User message 2 (after 13h)
    await processMessage({
        messageId: 'v-2',
        timestamp: Math.floor(Date.now() / 1000),
        phone: TEST_PHONE,
        content: 'Ya tengo el código de luz',
        type: 'text',
        pushName: 'César'
    });
    const resp2 = capturedResponses[TEST_PHONE].join(' ');
    console.log('Bot (After 13h):', resp2);

    if (resp2.toLowerCase().includes('hola') || resp2.toLowerCase().includes('gusto')) {
        console.log('✅ PASS: Bot saludó de nuevo tras 12h.');
    } else {
        console.log('❌ FAIL: Bot NO saludó tras 12h.');
    }
    capturedResponses[TEST_PHONE] = [];

    // --- CASE 2: Audio Transcription (Simulation) ---
    console.log('\n--- Escenario 2: Procesamiento de Audio ---');
    // Note: This requires real Gemini API credit if run, or mocking Gemini.
    // For this test, we assume analyzeAudio is called.
    // If we want a pure logic test without real Gemini, we'd need to mock it.
    // Let's try it with a real call if the key is present.

    await processMessage({
        messageId: 'v-3',
        timestamp: Math.floor(Date.now() / 1000),
        phone: TEST_PHONE,
        content: '',
        type: 'audio',
        mediaUrl: 'https://pagoexpressec.com/test-audio.ogg', // Mock URL
        pushName: 'César'
    });
    const resp3 = capturedResponses[TEST_PHONE].join(' ');
    console.log('Bot (Resp to Audio):', resp3);

    if (resp3.toLowerCase().includes('luz') || resp3.toLowerCase().includes('contrato') || resp3.includes('audio')) {
        console.log('✅ PASS: Bot respondió al contenido del audio/indicó transcripción.');
    } else {
        console.log('❌ FAIL: Bot no parece haber entendido el audio.');
    }
    capturedResponses[TEST_PHONE] = [];

    // --- CASE 3: Context Switching ---
    console.log('\n--- Escenario 3: Cambio de Contexto (YouTube) ---');
    await processMessage({
        messageId: 'v-4',
        timestamp: Math.floor(Date.now() / 1000),
        phone: TEST_PHONE,
        content: 'Mira este video https://youtube.com/watch?v=123',
        type: 'text',
        pushName: 'César'
    });
    const resp4 = capturedResponses[TEST_PHONE].join(' ');
    console.log('Bot (Resp to Link):', resp4);

    if (!resp4.toLowerCase().includes('eerssa') && !resp4.toLowerCase().includes('luz')) {
        console.log('✅ PASS: Bot NO insistió en el trámite anterior tras el link.');
    } else {
        console.log('❓ WARN: Bot mencionó el trámite anterior (EERSSA), verificar si fue apropiado.');
    }

    console.log('\n✅ Verificación finalizada.');
}

runVerification().catch(console.error);
