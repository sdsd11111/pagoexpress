import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function transcribe() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('No GEMINI_API_KEY found');
        return;
    }

    const fileManager = new GoogleAIFileManager(apiKey);
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Use gemini-1.5-pro for audio
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const audioPath = "D:/Abel paginas/PagoExpress/Pagina web/pagoexpress-web/cambios/cambio 1 Mayo/Pagoexpress.mp3";
    
    if (!fs.existsSync(audioPath)) {
        console.error('Audio file not found at:', audioPath);
        return;
    }

    console.log('Uploading file...');
    const uploadResult = await fileManager.uploadFile(audioPath, {
        mimeType: "audio/mpeg",
        displayName: "Pagoexpress Audio",
    });

    console.log(`Uploaded file: ${uploadResult.file.name}`);

    // Wait for the file to be processed
    let file = await fileManager.getFile(uploadResult.file.name);
    process.stdout.write(`File state: ${file.state}`);
    
    while (file.state === "PROCESSING") {
        process.stdout.write(".");
        await new Promise((resolve) => setTimeout(resolve, 5000));
        file = await fileManager.getFile(uploadResult.file.name);
    }

    console.log(`\nFinal state: ${file.state}`);

    if (file.state === "FAILED") {
        throw new Error(`File processing failed: ${file.error?.message}`);
    }

    console.log('Generating transcription...');
    try {
        const result = await model.generateContent([
            {
                fileData: {
                    mimeType: file.mimeType,
                    fileUri: file.uri
                }
            },
            { text: "Eres un experto en transcripción. Transcribe este audio íntegramente. Luego identifica todos los requerimientos del cliente para el proyecto Pago Express. EN ESPECIAL LOS REQUISITOS O COMENTARIOS SOBRE 'SECURITY DATA'." },
        ]);

        const transcription = result.response.text();
        const outputPath = "D:/Abel paginas/PagoExpress/Pagina web/pagoexpress-web/cambios/cambio 1 Mayo/transcripcion_pagoexpress.md";
        
        fs.writeFileSync(outputPath, transcription);
        console.log('Transcription saved to:', outputPath);
    } catch (err: any) {
        console.error('Error during generation:', err);
    }
}

transcribe().catch(console.error);
