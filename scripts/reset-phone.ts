
import { execute } from '../src/lib/chatbot/db';

async function reset() {
    const phone = '593963410409';
    try {
        console.log(`Resetting status for ${phone}...`);
        await execute(
            "UPDATE conversations SET status = 'active', last_manual_interaction = NULL WHERE phone = ?",
            [phone]
        );
        console.log('✅ Status reset to active.');
    } catch (error) {
        console.error('Error resetting status:', error);
    } finally {
        process.exit();
    }
}

reset();
