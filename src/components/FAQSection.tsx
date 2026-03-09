"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "¿Dónde puedo pagar mi planilla de luz (EERSSA) y agua en Loja?",
        answer: "Puedes pagarlas en nuestra Matriz (Miguel Riofrío 160-62 y Olmedo) o cualquiera de nuestras agencias en Loja y el país. Aceptamos pagos de EERSSA, Agua Potable, CNT y Municipio de Loja con acreditación inmediata."
    },
    {
        question: "¿Qué documentos necesito para cobrar un giro de Western Union o MoneyGram?",
        answer: "Solo necesitas tu cédula de identidad original y vigente, junto con el código de transferencia (MTCN) proporcionado por quien envía el dinero."
    },
    {
        question: "¿Qué bancos y cooperativas están disponibles para depósitos y retiros?",
        answer: "Operamos con Banco del Pacífico, Bolivariano, Pichincha y cooperativas líderes como CoopMego y Jardín Azuayo, funcionando como corresponsal oficial."
    },
    {
        question: "¿Atienden los fines de semana y feriados en Loja?",
        answer: "Sí, contamos con horarios extendidos que incluyen fines de semana para tu comodidad. El horario depende de la agencia; puedes consultar el estado actual en nuestra sección de sucursales."
    },
    {
        question: "¿Cuándo puedo cobrar el Bono de Desarrollo Humano?",
        answer: "El pago se realiza en las fechas asignadas según el último dígito de tu cédula (ej. si termina en 1, puedes cobrar el 1, 11 o 21 de cada mes), cumpliendo con la normativa vigente."
    }
];

export default function FAQSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // Schema.org FAQPage JSON-LD
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <section
            ref={sectionRef}
            id="faq"
            className="py-24 bg-white relative overflow-hidden"
        >
            {/* SEO Schema Injection */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pe-black/5 border border-pe-black/10 mb-6">
                        <HelpCircle className="w-4 h-4 text-pe-black" />
                        <span className="text-xs font-bold text-pe-black uppercase tracking-widest">Resolviendo Dudas</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-pe-black mb-6">Resolvemos tus <span className="text-pe-yellow-dark italic font-normal">Dudas en Ecuador</span></h2>
                    <p className="text-lg text-pe-gray-600">
                        Todo lo que necesitas saber para tus trámites bancarios y pagos en la ciudad de Loja.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                className={`rounded-2xl border transition-all duration-300 ${isOpen ? "border-pe-black bg-pe-black/[0.02] shadow-md" : "border-pe-gray-100 bg-pe-gray-50/50 hover:border-pe-black/30"
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left group"
                                >
                                    <span className={`text-lg sm:text-xl font-bold transition-colors ${isOpen ? "text-pe-black" : "text-pe-black group-hover:text-pe-yellow-dark"
                                        }`}>
                                        {faq.question}
                                    </span>
                                    <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? "bg-pe-black text-white rotate-180" : "bg-white text-pe-gray-400 group-hover:bg-pe-black/10"
                                        }`}>
                                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 sm:px-8 pb-8 pt-0">
                                                <p className="text-pe-gray-600 text-lg leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    className="mt-12 p-8 rounded-3xl bg-pe-gray-50 border border-dashed border-pe-gray-200 text-center"
                >
                    <p className="text-pe-gray-600 font-medium">
                        ¿Tienes otra duda? Nuestro equipo está listo para ayudarte en nuestras ventanillas físicas o vía WhatsApp.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
