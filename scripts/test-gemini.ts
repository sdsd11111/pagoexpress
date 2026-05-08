import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('No GEMINI_API_KEY found');
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        // Since listModels is not on the genAI object directly in some versions, 
        // we use the REST API via fetch or check the docs. 
        // Actually, let's just try to generate a tiny text with gemini-1.5-flash
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("test");
        console.log("Gemini 1.5 Flash is working!");
        console.log(result.response.text());
    } catch (err: any) {
        console.error('Gemini 1.5 Flash failed:', err.message);
    }
}

listModels();
