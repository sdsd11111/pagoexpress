"use client";

import { motion } from "framer-motion";
import { Scale, CheckCircle2, AlertCircle, FileText } from "lucide-react";

export default function TerminosServicioPage() {
    return (
        <main className="min-h-screen bg-white text-pe-black selection:bg-pe-yellow/30 font-inter">
            {/* Simple Header */}
            <section className="pt-32 pb-16 bg-pe-black text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-pe-yellow rounded-full blur-[120px]" />
                </div>
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Scale className="w-12 h-12 text-pe-yellow mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl font-black mb-4">Términos de Servicio</h1>
                        <p className="text-pe-gray-400 font-medium">Tu seguridad legal es nuestra base operativa.</p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-20">
                <div className="max-w-3xl mx-auto px-4 prose prose-slate">
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 text-pe-yellow-dark" /> 1. Aceptación del Servicio
                            </h2>
                            <p className="text-pe-gray-600 leading-relaxed">
                                Al utilizar los servicios de PagoExpress, usted acepta cumplir con las normativas vigentes en el territorio ecuatoriano para transacciones financieras y recaudación de servicios.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                                <FileText className="w-6 h-6 text-pe-yellow-dark" /> 2. Responsabilidad del Usuario
                            </h2>
                            <p className="text-pe-gray-600 leading-relaxed mb-4">
                                El cliente es responsable de:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-pe-gray-600">
                                <li>Proporcionar información veraz y actualizada (cédula, números de cuenta, códigos de cliente).</li>
                                <li>Verificar los datos en la pantalla o borrador antes de finalizar la transacción.</li>
                                <li>Conservar su comprobante de pago físico para cualquier reclamo posterior.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                                <AlertCircle className="w-6 h-6 text-pe-yellow-dark" /> 3. Límites y Comisiones
                            </h2>
                            <p className="text-pe-gray-600 leading-relaxed">
                                Todas las transacciones están sujetas a los límites diarios establecidos por cada institución financiera aliada y las regulaciones locales. Las comisiones por servicios (como depósitos o retiros) se informarán claramente antes de realizar el cobro.
                            </p>
                        </div>

                        <div className="p-8 bg-pe-yellow/5 rounded-[2rem] border border-pe-yellow/20 text-pe-black font-medium">
                            PagoExpress actúa como agente corresponsal autorizado y no es el emisor directo de los servicios bancarios o de remesas. Nuestra responsabilidad se limita a la correcta recaudación y transferencia de fondos al sistema oficial correspondiente.
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
