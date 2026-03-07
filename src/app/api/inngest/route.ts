import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { processWhatsAppMessage, scheduledDbCleanup } from "@/inngest/functions";

// Next.js API route handle for Inngest
// Este endpoint permite a Inngest comunicarse con nuestra aplicación Vercel
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        processWhatsAppMessage, // Registramos nuestra función de background
        scheduledDbCleanup,     // Registramos la limpieza automática
    ],
});
