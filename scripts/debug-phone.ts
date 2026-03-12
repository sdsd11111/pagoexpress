
import { getOrCreateConversation } from '../src/lib/chatbot/db';

async function check() {
    const phone = '593963410409';
    try {
        const conv = await getOrCreateConversation(phone);
        console.log('CONVERSATION_DATA_START');
        console.log(JSON.stringify(conv, null, 2));
        console.log('CONVERSATION_DATA_END');
    } catch (error) {
        console.error('Error fetching conversation:', error);
    } finally {
        process.exit();
    }
}

check();
