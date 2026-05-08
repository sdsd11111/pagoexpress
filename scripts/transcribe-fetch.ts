
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function transcribe() {
    const apiKey = process.env.GEMINI_API_KEY;
    const audioPath = "D:/Abel paginas/PagoExpress/Pagina web/pagoexpress-web/cambios/cambio 1 Mayo/Pagoexpress.mp3";
    
    if (!fs.existsSync(audioPath)) {
        console.error('File not found');
        return;
    }

    const stats = fs.statSync(audioPath);
    const audioBuffer = fs.readFileSync(audioPath);
    const base64Audio = audioBuffer.toString('base64');

    console.log('Sending request to Gemini v1beta...');
    
    // For files under 20MB we can use inline, but this is 40MB.
    // However, maybe the API allows it if we use the right endpoint or if it's slightly over?
    // 40MB is too much for inline.
    
    // Let's try to upload it first using fetch to v1beta
    const uploadUrl = `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${apiKey}`;
    
    const metadata = {
        file: {
            display_name: "Pagoexpress Audio",
        }
    };

    // Resumable upload or simple upload? Simple is easier for small files.
    // For 40MB, simple might fail. Let's try.
    
    console.log('Uploading file via fetch...');
    const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
            'X-Goog-Upload-Protocol': 'multipart',
            'X-Goog-Upload-Command': 'upload, finalize',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            metadata,
            file: {
                mime_type: "audio/mpeg",
                data: base64Audio
            }
        })
    });

    const data = await response.json();
    console.log('Upload response:', JSON.stringify(data, null, 2));
    
    if (data.file) {
        const fileUri = data.file.uri;
        console.log('File URI:', fileUri);
        
        // Now generate content
        const genUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const genResponse = await fetch(genUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { file_data: { mime_type: "audio/mpeg", file_uri: fileUri } },
                        { text: "Transcribe toda la conversación de este audio y extrae todos los requerimientos del cliente para Pago Express." }
                    ]
                }]
            })
        });
        
        const genData = await genResponse.json();
        console.log('Generation response:', JSON.stringify(genData, null, 2));
    }
}

transcribe().catch(console.error);
