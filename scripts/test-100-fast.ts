import './load-env';
import { chat } from '../src/lib/chatbot/llm/router';
import { buildSystemPrompt } from '../src/lib/chatbot/prompt';
import { toolDefinitions } from '../src/lib/chatbot/tools/index';
import * as fs from 'fs';

const servicesFlowA = [
    { name: 'SUPA', req: '1101-555 y 2 cuotas' },
    { name: 'LUZ EERSSA', req: 'Contrato 123456' },
    { name: 'AGUA', req: 'ID 1103677546 y servicio 555' },
    { name: 'IESS Empleador', req: 'ID 1103677546, Sucursal 001, 6 digitos 123456' },
    { name: 'IESS Afiliado', req: 'cedula 1103' },
    { name: 'IESS Préstamos', req: 'cedula 1103' },
    { name: 'Western Union Cobro', req: 'MTCN 1234567890 y cedula 1105' },
    { name: 'Western Union Envío', req: 'Colombia, cedula 1105, $100, Juan Perez' },
    { name: 'MoneyGram Cobro', req: 'Ref 999888 y cedula 1104' },
    { name: 'MoneyGram Envío', req: 'Peru, cedula 1104, $50, Maria Lopez' },
    { name: 'SRI Impuestos', req: 'CEP 123456789' },
    { name: 'Matricula Vehicular', req: 'Placa LBA-1234' },
    { name: 'ANT Citaciones', req: 'Cedula 1105' },
    { name: 'ANT Orden de Pago', req: 'Orden 98765' },
    { name: 'Renovacion Licencia', req: 'Orden 54321' },
    { name: 'Netlife', req: 'titular 1105106866' },
    { name: 'Xtrim TV Cable', req: 'Contrato 998877' },
    { name: 'Netplus', req: 'cedula 1105' },
    { name: 'Puntonet', req: 'cedula 1105' },
    { name: 'Municipio de Loja', req: 'cedula 1105 y predio 55' },
    { name: 'Municipio de Quito', req: 'cedula 1105 y predio 66' },
    { name: 'Municipio de Guayaquil', req: 'codigo 7788' },
    { name: 'Registro Civil', req: 'cedula 1103' },
    { name: 'UTPL', req: 'cedula 1103' },
    { name: 'Yanbal', req: 'codigo 12345' },
    { name: 'Belcorp', req: 'codigo 54321' },
    { name: 'Avon', req: 'cedula 1105' },
    { name: 'Banco Pichincha Credito', req: 'cedula 1103' },
    { name: 'Banco de Loja Credito', req: 'cedula 1103' },
    { name: 'Seguridad Data Firma', req: 'cedula 1105, test@test.com, calle falsa, 0999' },
    { name: 'Equifax Buro', req: 'cedula 1105 y test@test.com' },
    { name: 'Giro Nacional Cobro', req: 'codigo 555 y cedula 1105' },
    { name: 'Giro Nacional Envio', req: 'cedula mia, cedula receptor, $10' },
    { name: 'Claro Hogar', req: 'cedula 1105' },
    { name: 'SRI Vehiculos', req: 'Placa LBA' },
    { name: 'Bomberos', req: 'predio 123' },
    { name: 'Junta de Agua', req: 'medidor 44' },
    { name: 'Patentes', req: 'RUC 1100' },
    { name: 'CNT Fijo', req: 'numero 072555555' },
    { name: 'IESS Historia Clinica', req: 'cedula 1103' },
    { name: 'SRI RISE', req: 'RUC 1103' },
    { name: 'Tarjetas PacifiCard', req: 'numero 4545, cedula 1105, $20' },
    { name: 'Tarjetas Alia', req: 'numero 1234, cedula 1105, $10' },
    { name: 'Tarjetas Diners', req: 'numero 3000, cedula 1105, $50' },
    { name: 'Tarjetas Visa', req: 'numero 4000, cedula 1105, $30' },
    { name: 'Tarjetas Mastercard', req: 'numero 5000, cedula 1105, $40' },
    { name: 'Tarjetas American Express', req: 'numero 6000, cedula 1105, $60' },
    { name: 'Tarjetas Discover', req: 'numero 7000, cedula 1105, $70' },
    { name: 'Pago de multas ANT', req: 'cedula 1103' },
    { name: 'Impuesto predial', req: 'predio 99' }
];

const servicesFlowB = [
    { name: 'Ecuabet Recarga', req: 'ID 2421412 y monto $10' },
    { name: 'Ecuabet Retiro', req: 'retiro 123, clave 456, cedula 1103' },
    { name: 'Bet593', req: 'ID 12345 y monto $20' },
    { name: 'Betcris', req: 'ID 9876 y monto $50' },
    { name: 'Doradobet', req: 'codigo 555 y monto $15' },
    { name: 'Latribet', req: 'ID 777 y monto $5' },
    { name: 'Recarga Claro', req: 'numero 0963410409 y monto $5' },
    { name: 'Recarga Movistar', req: 'numero 0990000000 y monto $3' },
    { name: 'Recarga CNT', req: 'numero 0988888888 y monto $10' },
    { name: 'Recarga Tuenti', req: 'numero 0977777777 y monto $5' },
    { name: 'Recarga Maxiplus', req: 'numero 0966666666 y monto $2' },
    { name: 'Plan Claro', req: 'numero 0963410409' },
    { name: 'Plan Movistar', req: 'numero 0990000000' },
    { name: 'Plan CNT', req: 'numero 0988888888' },
    { name: 'Plan Tuenti', req: 'numero 0977777777' },
    { name: 'Netflix', req: 'correo test@gmail.com y monto $10' },
    { name: 'Directv Prepago', req: 'smartcard 1234 y monto $15' },
    { name: 'Spotify', req: 'correo test@gmail.com y monto $5' },
    { name: 'Amazon Prime', req: 'correo test@gmail.com y monto $6' },
    { name: 'Disney Plus', req: 'correo test@gmail.com y monto $8' },
    { name: 'HBO Max', req: 'correo test@test.com y monto $9' },
    { name: 'Star Plus', req: 'correo test@test.com y monto $10' },
    { name: 'Crunchyroll', req: 'correo test@test.com y monto $5' },
    { name: 'Paramount Plus', req: 'correo test@test.com y monto $5' },
    { name: 'Youtube Premium', req: 'correo test@test.com y monto $7' },
    { name: 'Free Fire Diamantes', req: 'ID 12345 y monto $5' },
    { name: 'Roblox Premium', req: 'ID 54321 y monto $10' },
    { name: 'PlayStation Network', req: 'correo test@test.com y monto $20' },
    { name: 'Xbox Live', req: 'correo test@test.com y monto $25' },
    { name: 'Nintendo eShop', req: 'correo test@test.com y monto $15' },
    { name: 'Steam Wallet', req: 'correo test@test.com y monto $30' },
    { name: 'V-Bucks Fortnite', req: 'ID 999 y monto $10' },
    { name: 'Call of Duty Points', req: 'ID 888 y monto $10' },
    { name: 'League of Legends RP', req: 'ID 777 y monto $10' },
    { name: 'Valorant Points', req: 'ID 666 y monto $10' },
    { name: 'PUBG Mobile UC', req: 'ID 555 y monto $10' },
    { name: 'Minecraft Coins', req: 'ID 444 y monto $10' },
    { name: 'Genshin Impact Genesis', req: 'ID 333 y monto $15' },
    { name: 'Deposito Pichincha', req: 'cuenta 3472 y cedula 1103 y monto $100' },
    { name: 'Deposito Guayaquil', req: 'cuenta 2102 y cedula 1103 y monto $50' },
    { name: 'Deposito Pacifico', req: 'cuenta 1042 y cedula 1103 y monto $30' },
    { name: 'Deposito Loja', req: 'cuenta 2903 y cedula 1103 y monto $20' },
    { name: 'Deposito Produbanco', req: 'cuenta 0212 y cedula 1103 y monto $40' },
    { name: 'Deposito CoopMego', req: 'cuenta 4010 y cedula 1103 y monto $25' },
    { name: 'Deposito JEP', req: 'cuenta 4060 y cedula 1103 y monto $35' },
    { name: 'Deposito Jardin Azuayo', req: 'cuenta 555 y cedula 1103 y monto $15' },
    { name: 'Deposito BanEcuador', req: 'cuenta 666 y cedula 1103 y monto $10' },
    { name: 'Deposito Banco Internacional', req: 'cuenta 777 y cedula 1103 y monto $5' },
    { name: 'Deposito Banco Bolivariano', req: 'cuenta 888 y cedula 1103 y monto $5' },
    { name: 'Deposito Mutualista Pichincha', req: 'cuenta 999 y cedula 1103 y monto $5' }
];

const allTests = [
    ...servicesFlowA.map(s => ({ ...s, type: 'A' })),
    ...servicesFlowB.map(s => ({ ...s, type: 'B' }))
];

async function runFastTest(test: any, index: number) {
    const systemPrompt = buildSystemPrompt();

    // Simulamos la memoria:
    // 1. Cliente pidió el servicio
    // 2. Bot pidió datos
    // 3. Cliente envió los datos (nuestro input real para el LLM ahora)

    // Obtenemos solo la respuesta LLM a los datos, ignorando llamadas a DB
    const finalMessages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `[Cliente: Tester ${index}]\nHola, quiero pagar el ${test.name}` },
        { role: 'assistant', content: `¡Claro! Por favor, envíame tus datos para el servicio de ${test.name}.` },
        { role: 'user', content: test.req }
    ];

    try {
        const response = await chat(finalMessages as any, toolDefinitions);

        // Si el LLM decide llamar una tool (como get_service_info), la cortamos y vemos su respuesta después de eso.
        let finalResponse = response.content || '';

        if (response.tool_calls && response.tool_calls.length > 0) {
            // Simulated tool response for get_service_info
            finalMessages.push({ role: 'assistant', content: '', tool_calls: response.tool_calls } as any);
            const toolName = response.tool_calls[0].name;
            const toolArgs = response.tool_calls[0].arguments;

            finalMessages.push({ role: 'tool', tool_call_id: response.tool_calls[0].id, name: toolName, content: `Datos consultados.` } as any);
            const secondResponse = await chat(finalMessages as any, toolDefinitions);
            finalResponse = secondResponse.content || '';
        }

        let status = 'FAIL';
        let reason = '';

        if (test.type === 'A') {
            if (finalResponse.toLowerCase().includes('minutos') || finalResponse.toLowerCase().includes('consulto')) {
                status = 'PASS';
            } else {
                reason = 'No usó el flujo de consulta (A)';
            }
        } else {
            if (finalResponse.toLowerCase().includes('titular') || finalResponse.toLowerCase().includes('transferencia')) {
                status = 'PASS';
            } else {
                reason = 'No usó el flujo de pago directo (B)';
            }
        }

        return {
            id: index + 1,
            name: test.name,
            type: test.type,
            status,
            reason,
            botResp: finalResponse.replace(/<function=[\s\S]*?>[\s\S]*?<\/function>/g, '')
        };
    } catch (e) {
        return { id: index + 1, name: test.name, type: test.type, status: 'FAIL', reason: 'Error LLM', botResp: String(e) };
    }
}

async function runWithConcurrencyLimit(items: any[], limit: number, fn: any) {
    const results = [];
    for (let i = 0; i < items.length; i += limit) {
        process.stdout.write(`\rEjecutando lote rápido ${i / limit + 1}/${Math.ceil(items.length / limit)} (${Math.min(limit, items.length - i)} items)... `);
        const batch = items.slice(i, i + limit);
        const batchResults = await Promise.all(batch.map((item, idx) => fn(item, i + idx)));
        results.push(...batchResults);
    }
    console.log('\nPruebas completadas.');
    return results;
}

async function runMain() {
    console.log(`🚀 Iniciando versión ultrarrápida de 100 pruebas (sin DB, solo lógica LLM)...`);
    // Corremos más en paralelo porque no hay I/O de base de datos
    const results = await runWithConcurrencyLimit(allTests, 8, runFastTest);

    const passedCount = results.filter((r: any) => r.status === 'PASS').length;
    console.log(`\n📊 INFORME FINAL (${passedCount}/100 PASS)`);

    let reportMd = `# ⚡ Informe de Pruebas Ultrarrápido: 100 Servicios

> \*\*Resultado General:\*\* ${passedCount} correctos de ${results.length} simulados.

Se ha omitido la validación de base de datos para priorizar la rapidez y validar estrictamente el conocimiento de flujos A y B del Prompt.

`;

    // Flow A
    reportMd += `## 🟢 FLUJO A: Consulta (50 Servicios)\n\n`;
    for (const r of results.filter((r: any) => r.type === 'A')) {
        reportMd += `### ${r.id}. ${r.name} [${r.status}] ${r.reason ? `(${r.reason})` : ''}\n`;
        reportMd += `**Cierre Bot:**\n> ${r.botResp.trim()}\n\n`;
    }

    // Flow B
    reportMd += `## 🔵 FLUJO B: Pago Directo (50 Servicios)\n\n`;
    for (const r of results.filter((r: any) => r.type === 'B')) {
        reportMd += `### ${r.id}. ${r.name} [${r.status}] ${r.reason ? `(${r.reason})` : ''}\n`;
        reportMd += `**Cierre Bot:**\n> ${r.botResp.trim()}\n\n`;
    }

    fs.writeFileSync('./transcripciones_100_rapido.md', reportMd, 'utf-8');
    console.log('✅ Generado en ./transcripciones_100_rapido.md');
}

runMain();
