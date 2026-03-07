"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PoliticaPrivacidadPage() {
    return (
        <main className="min-h-screen bg-white text-pe-black selection:bg-pe-yellow/30 font-inter">
            {/* Simple Header */}
            <section className="pt-32 pb-16 bg-pe-black text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-pe-yellow rounded-full blur-[120px]" />
                </div>
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Shield className="w-12 h-12 text-pe-yellow mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl font-black mb-4">Política de Privacidad</h1>
                        <p className="text-pe-gray-400 font-medium">Última actualización: Marzo 2026</p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-20">
                <div className="max-w-3xl mx-auto px-4 prose prose-slate">
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                                <Lock className="w-6 h-6 text-pe-yellow-dark" /> 1. Protección de Datos
                            </h2>
                            <p className="text-pe-gray-600 leading-relaxed">
                                En PagoExpress, la seguridad de su información es nuestra prioridad. Cumplimos con la Ley Orgánica de Protección de Datos Personales de Ecuador para garantizar que su información financiera y personal sea tratada con la máxima confidencialidad.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                                <Eye className="w-6 h-6 text-pe-yellow-dark" /> 2. Información que Recolectamos
                            </h2>
                            <p className="text-pe-gray-600 leading-relaxed">
                                Recolectamos información necesaria para procesar sus transacciones financieras, incluyendo nombres, números de cédula, y detalles de contacto. Esta información es requerida por las instituciones financieras y agentes autorizados con los que operamos (Red Activa Western Union, Bancos, etc.).
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                                <FileText className="w-6 h-6 text-pe-yellow-dark" /> 3. Uso de la Información
                            </h2>
                            <p className="text-pe-gray-600 leading-relaxed mb-4">
                                Sus datos se utilizan exclusivamente para:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-pe-gray-600">
                                <li>Procesar depósitos, retiros y transferencias internacionales.</li>
                                <li>Emitir comprobantes de pago legales.</li>
                                <li>Verificar su identidad para prevenir fraude financiero.</li>
                                <li>Cumplir con regulaciones de la Superintendencia de Bancos y la SEPS.</li>
                            </ul>
                        </div>

                        <div className="p-8 bg-pe-gray-50 rounded-[2rem] border border-pe-gray-100 italic text-pe-gray-500 text-sm">
                            Información importante: PagoExpress no almacena sus claves bancarias ni datos de acceso a servicios externos. Todas nuestras transacciones se realizan a través de canales oficiales y encriptados proporcionados por nuestras entidades aliadas.
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
