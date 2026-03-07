import { inngest } from "./client";
import { processMessage } from "../lib/chatbot/agent";

/**
 * Función de Inngest para procesar mensajes de WhatsApp con Debounce.
 * 
 * El debounce de 20 segundos asegura que si el usuario envía 5 mensajes rápidos,
 * el bot espere 20 segundos de silencio antes de procesar todos juntos.
 */
export const processWhatsAppMessage = inngest.createFunction(
    {
        id: "process-whatsapp-message",
        // Agrupamos por número de teléfono para que el debounce sea individual por usuario
        debounce: {
            key: "event.data.phone",
            period: "20s",
        },
    },
    { event: "chatbot/message.received" },
    async ({ event, step }) => {
        const { incoming } = event.data;

        // Ejecutamos el procesamiento del agente
        // Inngest se encarga de que esto corra en background sin límites de Vercel
        await step.run("agent-process", async () => {
            return await processMessage(incoming);
        });

        return { status: "success", phone: incoming.phone };
    }
);

/**
 * Tarea programada para limpiar mensajes antiguos de la base de datos.
 * Se ejecuta todos los lunes a las 00:00 (Cron: 0 0 * * 1)
 */
export const scheduledDbCleanup = inngest.createFunction(
    { id: "scheduled-db-cleanup" },
    { cron: "0 0 * * 1" }, // Cada lunes a medianoche
    async ({ step }) => {
        const { cleanupOldMessages } = await import("../lib/chatbot/db");

        const deletedCount = await step.run("cleanup-old-messages", async () => {
            // Mantener solo los últimos 60 días de historial
            return await cleanupOldMessages(60);
        });

        return {
            status: "success",
            message: `Cleanup completed. Deleted ${deletedCount} messages older than 60 days.`
        };
    }
);
