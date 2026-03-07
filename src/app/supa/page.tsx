"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    Search,
    Wallet,
    FileCheck,
    ArrowRight,
    MessageCircle,
    CheckCircle2,
    Info,
    ChevronDown,
    Building2,
    Scale,
    Gavel,
    CalendarCheck,
    Receipt,
    Shield,
    Clock,
    CreditCard,
    AlertCircle
} from "lucide-react";
import MapSection from "@/components/MapSection";
// Import next/font/google to use Libre Baskerville for titles (optional, using tailwind generic or standard webfonts for simplicity here since no app-wide next/font setup is done)
// We will apply style={{ fontFamily: 'Libre Baskerville, serif' }} to titles.

const SUPA_DARK_BLUE = "#123453";
const SUPA_LIGHT_BLUE = "#2DABE3";
const BG_LIGHT = "#EBEBEB";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

export default function SupaPage() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    // SECCIÓN 3: Beneficios
    const services = [
        {
            title: "Acreditación Inmediata",
            icon: Shield,
            desc: "Tu pago se refleja en el sistema judicial en tiempo real, brindándote tranquilidad instantánea.",
            tag: "Oficial",
            color: "bg-white"
        },
        {
            title: "Comprobante Oficial",
            icon: Receipt,
            desc: "Entrega física de recibo validado por el sistema, esencial para cualquier trámite legal o justificación.",
            tag: "Documento Válido",
            color: "bg-[#2DABE3]/5 border border-[#2DABE3]/30"
        },
        {
            title: "Historial Seguro",
            icon: CalendarCheck,
            desc: "Registro inmutable de tus pagos realizados con nosotros para futuras consultas o aclaraciones.",
            tag: "Respaldo Total",
            color: "bg-white"
        }
    ];

    // SECCIÓN 4: Guía de Pasos
    const workflow = [
        {
            title: "Código SUPA",
            desc: "Acércate a nuestras ventanillas con tu Código SUPA (o el número de proceso judicial correspondiente).",
            step: "01",
            icon: Gavel
        },
        {
            title: "Monto a Cancelar",
            desc: "Consulta y elige el monto exacto a cancelar (ya sea el mes corriente o cuotas pendientes atrasadas).",
            step: "02",
            icon: Wallet
        },
        {
            title: "Recibe tu Recibo",
            desc: "Realiza el pago y recibe instantáneamente tu comprobante oficial sellado y validado por el sistema.",
            step: "03",
            icon: CheckCircle2
        }
    ];

    // SECCIÓN 6: FAQ - Preguntas Legales Frecuentes
    const faqs = [
        {
            q: "¿El pago se refleja inmediatamente en el sistema SUPA?",
            a: "Sí, al ser un punto de recaudación de redes aliadas, los pagos ingresan al sistema oficial de forma segura y se reflejan según los tiempos establecidos por el Consejo de la Judicatura."
        },
        {
            q: "¿Qué necesito llevar para consultar o pagar?",
            a: "Solo necesitas acercarte con el Código SUPA."
        },
        {
            q: "¿Puedo pagar pensiones atrasadas?",
            a: "Totalmente. El sistema nos permite visualizar tanto la cuota del mes en curso como cualquier valor pendiente o atrasado para que puedas ponerte al día en Pago SUPA Loja."
        },
        {
            q: "¿Puedo pagar con tarjeta de crédito?",
            a: "En nuestros locales de PagoExpress Loja priorizamos el pago en efectivo o transferencia directa para evitar recargos adicionales y agilizar el depósito en el sistema oficial del Consejo."
        },
        {
            q: "¿Qué pasa si el sistema del SUPA está caído?",
            a: "PagoExpress cuenta con sistemas aliados de contingencia. En caso de intermitencia nacional del SUPA, tu requerimiento queda en nuestra cola segura de transacciones para ser procesado automáticamente apenas el servicio se restablezca, garantizando el registro en la fecha de abono."
        },
        {
            q: "¿Cuánto tiempo tarda en reflejarse el pago en la cuenta del beneficiario?",
            a: "El sistema del Consejo de la Judicatura generalmente procesa las acreditaciones a nivel interbancario hacia la cuenta de la madre/tutor en un plazo de 24 a 48 horas laborables desde que realizas el pago con nosotros."
        }
    ];

    return (
        <main className="min-h-screen bg-[#EBEBEB] text-[#334155] selection:bg-[#2DABE3] selection:text-white">

            {/* ═══ SECCIÓN 1: Hero de Cumplimiento Legal ═══ */}
            <section className="relative overflow-hidden min-h-[calc(100dvh-64px)] lg:h-[70vh] lg:min-h-[550px] flex flex-col justify-start lg:justify-center bg-[#EBEBEB] pt-4 pb-12 lg:pt-28 lg:pb-0">
                {/* Background Decorators */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(${SUPA_DARK_BLUE} 1px, transparent 1px), linear-gradient(90deg, ${SUPA_DARK_BLUE} 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2DABE3]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#123453]/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/4" />
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full flex-grow flex flex-col justify-start lg:justify-center mb-10 mt-2 lg:mt-0">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
                            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-sm bg-white border border-slate-200 shadow-sm mb-8">
                                <Scale className="w-5 h-5 text-[#123453]" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#123453]">Punto de Recaudación Autorizado en Loja</span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight mb-4 lg:mb-6 text-[#123453]" style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>
                                Pago del <span className="text-[#2DABE3]">SUPA en Loja</span>: Pensiones Alimenticias
                                <span className="block text-[#123453]/80 mt-2 italic font-normal text-2xl sm:text-3xl lg:text-4xl border-b-4 border-[#2DABE3] inline-block pb-1 lg:pb-2">Garantía y Rapidez Oficial</span>
                            </h1>

                            <p className="text-base sm:text-lg lg:text-xl text-[#334155] mb-6 lg:mb-8 leading-relaxed font-medium max-w-xl">
                                Cumple con tus obligaciones legales sin filas ni demoras. <span className="hidden lg:inline">Somos punto de recaudación autorizado para el Sistema Único de Pensiones Alimenticias del Consejo de la Judicatura.</span>
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 lg:gap-5">
                                <Link
                                    href="https://wa.me/593990227203?text=Hola%20PagoExpress,%20necesito%20pagar%20mi%20pensión%20SUPA."
                                    target="_blank"
                                    className="group inline-flex items-center justify-center gap-4 px-10 py-4 bg-[#123453] text-white font-bold uppercase tracking-widest rounded-sm transition-all hover:bg-[#1a4a75] shadow-lg shadow-[#123453]/20"
                                >
                                    Pagar mi Pensión Ahora
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="#requisitos"
                                    className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white border border-slate-300 text-[#123453] font-bold rounded-sm hover:bg-slate-50 transition-all uppercase tracking-widest text-sm shadow-sm"
                                >
                                    ¿Qué necesito para pagar?
                                </Link>
                            </div>
                        </motion.div>

                        {/* Hero Visual: Composición Limpia */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex justify-center lg:justify-end relative w-full mt-12 lg:mt-0"
                        >
                            <div className="relative w-full max-w-md bg-white rounded-sm shadow-xl p-6 lg:p-10 border border-slate-200 flex flex-col items-center text-center">
                                {/* Decoración de "Tranquilidad / Responsabilidad" */}
                                <div className="absolute -top-6 -left-6 lg:-left-6 w-20 h-20 lg:w-24 lg:h-24 bg-[#EBEBEB] rounded-full flex items-center justify-center border-4 border-white shadow-lg z-20">
                                    <CalendarCheck className="w-8 h-8 lg:w-10 lg:h-10 text-[#2DABE3]" />
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-16 h-16 lg:w-20 lg:h-20 bg-[#123453] rounded-full flex items-center justify-center border-4 border-white shadow-lg z-20">
                                    <Scale className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                                </div>

                                <div className="w-full flex justify-center mb-6 lg:mb-8 border-b border-slate-100 pb-6 lg:pb-8">
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 overflow-hidden border-4 border-[#EBEBEB]">
                                            <Image src="/logo.jpg" alt="PagoExpress Logo" width={80} height={80} className="object-contain" />
                                        </div>
                                        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Respaldo Judicial</span>
                                    </div>
                                </div>

                                <h3 className="text-xl lg:text-2xl font-bold text-[#123453] mb-4" style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>Garantía Legal</h3>
                                <p className="text-slate-600 font-medium text-xs lg:text-sm leading-relaxed">
                                    Aportamos a la tranquilidad y bienestar familiar. "Pensiones alimenticias Loja" con acreditación directa, evitando contratiempos con la administración de justicia.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 2: Información Requerida (Tarjeta de Datos) ═══ */}
            <section id="requisitos" className="py-24 bg-white border-y border-slate-200 overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#123453] mb-6" style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>
                                Información Requerida <span className="text-[#2DABE3] italic">para tu Pago</span>
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Evita errores o retrasos en el sistema. Asegúrate de tener los siguientes datos a la mano al acercarte a nuestra ventanilla.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-sm bg-[#EBEBEB] flex items-center justify-center shrink-0 border border-slate-200">
                                        <CreditCard className="w-6 h-6 text-[#123453]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#123453] text-lg">Código de Tarjeta SUPA</h4>
                                        <p className="text-slate-500 text-sm mt-1">El número único asignado por el Consejo de la Judicatura a tu caso. Es el requisito esencial.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-sm bg-[#EBEBEB] flex items-center justify-center shrink-0 border border-slate-200">
                                        <Info className="w-6 h-6 text-[#123453]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#123453] text-lg">Cédula de Identidad</h4>
                                        <p className="text-slate-500 text-sm mt-1">Cédula del alimentante (quien realiza el pago) o del beneficiario según requiera la consulta.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative">
                            <div className="bg-[#123453] p-10 rounded-sm shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#2DABE3]/20 rounded-bl-[100px]" />
                                <Search className="w-10 h-10 text-[#2DABE3] mb-6" />
                                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>Consulta Exacta de Valores</h3>
                                <p className="text-white/80 leading-relaxed text-sm mb-6">
                                    Recuerda que en ventanilla podemos consultar el saldo pendiente exacto antes de pagar. Podrás verificar <span className="font-bold text-white">multas, meses acumulados y el total actualizado</span> al día de hoy.
                                </p>
                                <div className="flex items-center gap-2 text-[#2DABE3] font-bold text-sm uppercase tracking-wider">
                                    <AlertCircle className="w-4 h-4" />
                                    Sin costo adicional por consulta
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 3: Beneficios de pagar en PagoExpress ═══ */}
            <section className="py-24 bg-[#EBEBEB] relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <span className="text-[#2DABE3] font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Garantía del Servicio</span>
                        <h2 className="text-3xl sm:text-5xl font-bold text-[#123453] mb-6" style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>
                            Beneficios de tu Pago
                        </h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                            Tu tranquilidad legal es nuestra prioridad. Nuestro sistema está interconectado directamente.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((srv, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                className={`group p-10 rounded-sm shadow-sm hover:shadow-lg transition-shadow border border-slate-200 relative ${srv.color}`}
                            >
                                <div className="absolute top-6 right-6 px-3 py-1 bg-slate-100 border border-slate-200 text-[10px] font-bold uppercase tracking-wider text-[#123453] rounded-sm">{srv.tag}</div>
                                <div className="w-14 h-14 bg-[#EBEBEB] border border-slate-200 flex items-center justify-center mb-6 rounded-sm">
                                    <srv.icon className="w-7 h-7 text-[#123453]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#123453] mb-3" style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>{srv.title}</h3>
                                <p className="text-slate-600 font-medium leading-relaxed">{srv.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 4: Guía de Pasos ═══ */}
            <section className="py-24 bg-[#123453] text-white relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>
                            Paga en Solo <span className="text-[#2DABE3] italic">3 Pasos</span> con PagoExpress
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Only LG) */}
                        <div className="absolute top-1/2 left-0 w-full h-px bg-slate-700 hidden lg:block -translate-y-1/2" />

                        {workflow.map((item, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                className="relative z-10 p-10 bg-[#1a4a75] rounded-sm border border-slate-600 flex flex-col items-center text-center shadow-lg"
                            >
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#2DABE3] text-[#123453] font-black flex items-center justify-center shadow-lg rounded-sm border border-white/20">{item.step}</div>
                                <div className="w-16 h-16 bg-[#123453] flex items-center justify-center mb-6 rounded-sm border border-slate-500">
                                    <item.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>{item.title}</h3>
                                <p className="text-white/70 font-medium text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 5: Ubicaciones y Facilidades (Text Overlay over Map Area) ═══ */}
            <section className="pt-24 pb-8 bg-white border-t border-slate-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <div className="max-w-3xl mx-auto mb-12">
                        <Clock className="w-12 h-12 text-[#2DABE3] mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-[#123453] mb-4" style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>No esperes al último día del mes</h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-medium">
                            Visítanos en la <strong className="text-[#123453]">Miguel Riofrío y Olmedo</strong> o en <strong className="text-[#123453]">La Castellana</strong>.
                            <br /><span className="mt-2 inline-block bg-[#EBEBEB] px-4 py-2 rounded-sm text-[#123453] border border-slate-200">Atendemos en horarios extendidos para que el cumplimiento de tus obligaciones no interfiera con tu trabajo.</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Map Section itself */}
            <div className="bg-white">
                <div className="max-w-6xl mx-auto px-4 pb-20">
                    <div className="border border-slate-200 shadow-lg p-2 bg-[#EBEBEB] rounded-sm">
                        <MapSection />
                    </div>
                </div>
            </div>

            {/* ═══ SECCIÓN 6: FAQ - Preguntas Legales Frecuentes ═══ */}
            <section className="py-32 bg-[#EBEBEB] border-t border-slate-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-[#123453]" style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}>Preguntas Legales Frecuentes</h2>
                        <p className="text-slate-500 mt-4">Todo lo que necesitas saber sobre procesos y contingencias.</p>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border border-slate-300 bg-white shadow-sm transition-all hover:border-[#2DABE3]">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full flex justify-between items-center p-6 text-left transition-colors hover:bg-slate-50"
                                >
                                    <span className="text-base font-bold text-[#123453] pr-6">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 shrink-0 text-[#2DABE3] transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`} />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-6 text-slate-600 font-medium leading-relaxed bg-white"
                                        >
                                            <div className="pt-4 border-t border-slate-100 text-sm">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Legal Footer ═══ */}
            <footer className="py-8 bg-[#123453] border-t border-slate-700">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 opacity-80">
                    <div className="flex items-center gap-3 text-white text-xs font-bold uppercase tracking-widest">
                        <Info className="w-4 h-4 text-[#2DABE3]" />
                        AGENTE AUTORIZADO
                    </div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-slate-400 text-center md:text-right max-w-2xl leading-relaxed">
                        PAGOEXPRESS OPERA COMO RED DE RECAUDACIÓN AUTORIZADA MEDIANTE COMPENSADORES. LOS PAGOS SE REFLEJAN EN EL SISTEMA ÚNICO DE PENSIONES ALIMENTICIAS (SUPA).
                    </p>
                </div>
            </footer>
        </main>
    );
}
