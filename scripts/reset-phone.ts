
import { execute } from '../src/lib/chatbot/db';

async function reset() {
    const phone = '593983237491';
    try {
        console.log(`Resetting status for ${phone}...`);
        await execute(
            "UPDATE conversations SET status = 'active', last_manual_interaction = NULL WHERE phone = ?",
            [phone]
        );
        console.log('Done!');
    } catch (e) {
        console.error('Error:', e);
    }
}

reset();
