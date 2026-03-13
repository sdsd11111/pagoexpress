
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('No GEMINI_API_KEY found in .env.local');
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    try {
        console.log('Fetching available models...');
        // Note: listModels is on the genAI instance or requires specific method
        // In @google/generative-ai ^0.24.1, we might need to use the generative model methods
        // Actually, the easiest way is to try a common one or check docs
        // But for diagnostic, we can try to fetch the list via REST or SDK if available
        
        // Try the standard way to list models (if SDK supports it)
        // Some versions use fetch under the hood.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        
        if (data.models) {
            console.log('Available Models:');
            data.models.forEach((m: any) => {
                console.log(`- ${m.name} (supports: ${m.supportedGenerationMethods.join(', ')})`);
            });
        } else {
            console.log('No models found or error in response:', data);
        }
    } catch (error) {
        console.error('Error listing models:', error);
    }
}

listModels();
