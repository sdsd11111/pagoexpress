// ═══════════════════════════════════════════════════════════════
// Tool: get_service_info — RAG: Query service requirements from MySQL
// ═══════════════════════════════════════════════════════════════

import { searchServices, getServiceById } from '../db';
import type { ToolDefinition } from '../types';

export const definition: ToolDefinition = {
    name: 'get_service_info',
    description:
        'Busca información detallada de un servicio o trámite de PagoExpress. Consulta la base de datos de 200+ servicios para obtener requisitos, pasos y costos. SIEMPRE usa esta herramienta antes de dar información sobre cualquier trámite. Nunca inventes requisitos.',
    parameters: {
        type: 'object',
        properties: {
            service_name: {
                type: 'string',
                description:
                    'Nombre o palabra clave del servicio a buscar (ej: "Western Union", "depósito Pichincha", "firma electrónica", "SUPA", "luz")',
            },
            service_id: {
                type: 'string',
                description:
                    'ID numérico del servicio si se conoce de una búsqueda previa. Si se proporciona, se consulta directamente.',
            },
        },
        required: ['service_name'],
    },
};

export async function execute(args: Record<string, unknown>): Promise<string> {
    const serviceName = args.service_name as string;
    const serviceId = args.service_id ? parseInt(args.service_id as string) : null;

    try {
        // Direct ID lookup if provided
        if (serviceId) {
            const service = await getServiceById(serviceId);
            if (service) {
                return JSON.stringify({
                    found: true,
                    service: {
                        id: service.id,
                        nombre: service.name,
                        categoria: service.category,
                        descripcion: service.description,
                        requisitos: service.requirements,
                        pasos: service.steps,
                        costo: service.cost,
                        tiempo_estimado: service.estimated_time,
                        horario: service.schedule,
                        notas: service.notes,
                    },
                });
            }
        }

        // Search by name/keyword
        const results = await searchServices(serviceName, 5);

        if (results.length === 0) {
            return JSON.stringify({
                found: false,
                message: `No se encontró información sobre "${serviceName}" en nuestra base de datos. Este trámite puede no estar disponible o puede que el nombre sea diferente. Sugiere al cliente verificar el nombre exacto del servicio o consultar directamente en nuestras oficinas.`,
            });
        }

        // If only one result, return full details
        if (results.length === 1) {
            const s = results[0];
            return JSON.stringify({
                found: true,
                service: {
                    id: s.id,
                    nombre: s.name,
                    categoria: s.category,
                    descripcion: s.description,
                    requisitos: s.requirements,
                    pasos: s.steps,
                    costo: s.cost,
                    tiempo_estimado: s.estimated_time,
                    horario: s.schedule,
                    notas: s.notes,
                },
            });
        }

        // Multiple results — return list for disambiguation
        return JSON.stringify({
            found: true,
            multiple_results: true,
            message: `Se encontraron ${results.length} servicios relacionados con "${serviceName}". Pide al cliente que especifique cuál necesita:`,
            services: results.map((s) => ({
                id: s.id,
                nombre: s.name,
                categoria: s.category,
                requisitos: s.requirements,
            })),
        });
    } catch (error) {
        return JSON.stringify({
            found: false,
            error: `Error consultando la base de datos: ${(error as Error).message}`,
        });
    }
}
