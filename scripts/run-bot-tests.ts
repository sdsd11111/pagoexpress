import './load-env';
import { processMessage } from '../src/lib/chatbot/agent';
import { deleteConversationByPhone } from '../src/lib/chatbot/db';
import { setMockHandler } from '../src/lib/chatbot/evolution';

// Mock sendTextMessage to capture responses instead of sending them
const capturedResponses: Record<string, string[]> = {};
setMockHandler(async (phone: string, text: string) => {
    if (!capturedResponses[phone]) capturedResponses[phone] = [];
    capturedResponses[phone].push(text);
    return { status: 'success' };
});

const TEST_PHONE = '593900000000';

const testCases = [
    // FLUJO A: CONSULTA
    { name: 'SUPA', req: '1101-555 y 2 cuotas', type: 'A' },
    { name: 'LUZ EERSSA', req: 'Contrato 123456', type: 'A' },
    { name: 'IESS Afiliado', req: 'cedula 1103', type: 'A' },

    // FLUJO B: PAGO DIRECTO
    { name: 'Ecuabet Recarga', req: 'ID 2421412 y monto $10', type: 'B' },
    { name: 'Netflix', req: 'correo test@gmail.com y monto $10', type: 'B' },
];

async function runTests() {
    console.log('🚀 Iniciando pruebas automatizadas del bot (Muestreo de 12 servicios clave)...');
    const results: any[] = [];

    for (const test of testCases) {
        console.log(`\n--- Test: ${test.name} ---`);
        capturedResponses[TEST_PHONE] = [];

        // 1. Reset memory
        await deleteConversationByPhone(TEST_PHONE);

        // 2. Message 1: Request service
        await processMessage({
            messageId: `test-1-${test.name}`,
            timestamp: Math.floor(Date.now() / 1000),
            phone: TEST_PHONE,
            content: `Hola, quiero pagar ${test.name}`,
            type: 'text',
            pushName: 'Tester'
        });

        const resp1 = capturedResponses[TEST_PHONE].join(' ');
        console.log(`Bot pide: ${resp1}`);

        // 3. Message 2: Send requirements
        capturedResponses[TEST_PHONE] = [];
        await processMessage({
            messageId: `test-2-${test.name}`,
            timestamp: Math.floor(Date.now() / 1000) + 1,
            phone: TEST_PHONE,
            content: test.req,
            type: 'text',
            pushName: 'Tester'
        });

        const resp2 = capturedResponses[TEST_PHONE].join(' ');
        console.log(`Bot cierra: ${resp2}`);

        // 4. Validation
        let status = 'FAIL';
        let reason = '';

        if (test.type === 'A') {
            if (resp2.toLowerCase().includes('minutos') || resp2.toLowerCase().includes('consulto')) {
                status = 'PASS';
            } else {
                reason = 'No usó el flujo de consulta (A)';
            }
        } else {
            if (resp2.includes('transferencia') || resp2.includes('comprobante')) {
                status = 'PASS';
            } else {
                reason = 'No usó el flujo de pago directo (B)';
            }
        }

        // Anti-hallucination check
        if (resp2.includes('ID #') || resp2.includes('registrado con éxito')) {
            status = 'FAIL';
            reason = 'ALUCINACIÓN: El bot mintió sobre el éxito del pago.';
        }

        results.push({ name: test.name, status, reason, response: resp2 });
    }

    console.log('\n\n📊 INFORME FINAL DE PRUEBAS');
    console.table(results.map(r => ({ Servicio: r.name, Resultado: r.status, Error: r.reason })));
}

runTests().catch(console.error);
