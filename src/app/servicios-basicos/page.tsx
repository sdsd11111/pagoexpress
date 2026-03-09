"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    Zap,
    Droplets,
    Smartphone,
    Home,
    ArrowRight,
    CheckCircle2,
    MapPin,
    FileText,
    Clock,
    ShieldCheck,
    ChevronDown,
    MessageCircle,
    Info,
    Building2,
    Lightbulb,
    Rss,
    MonitorPlay
} from "lucide-react";
import MapSection from "@/components/MapSection";

// Animations
const fadeUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function ServiciosBasicosPage() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const categories = [
        {
            title: "Energía Eléctrica",
            services: "EERSSA, CNEL y empresas nacionales.",
            icon: Zap,
            color: "shadow-[0_0_20px_rgba(0,45,84,0.2)]",
            accent: "bg-[#002D54]"
        },
        {
            title: "Agua Potable",
            services: "UMAPAL (Loja), EPMAPAL y juntas.",
            icon: Droplets,
            color: "shadow-[0_0_20px_rgba(70,123,166,0.1)]",
            accent: "bg-[#467BA6]"
        },
        {
            title: "Telecomunicaciones",
            services: "TV Cable, Claro, Movistar.",
            icon: Rss,
            color: "shadow-[0_0_20px_rgba(0,26,51,0.2)]",
            accent: "bg-[#001A33]"
        },
        {
            title: "Impuestos & Tasas",
            services: "Predios, patentes y multas municipales.",
            icon: Home,
            color: "shadow-[0_0_20px_rgba(77,176,220,0.1)]",
            accent: "bg-[#4DB0DC]"
        }
    ];

    const faqs = [
        { q: "¿En cuánto tiempo se refleja mi pago?", a: "Los pagos en PagoExpress se acreditan de forma inmediata en los sistemas de EERSSA y UMAPAL. Recibirás tu comprobante físico al instante." },
        { q: "¿Qué datos necesito para pagar la planilla de luz?", a: "Solo necesitamos tu Código de Cliente o Número de Cuenta Contrato que aparece en la parte superior derecha de tu planilla física o digital." },
        { q: "¿Puedo pagar planillas vencidas?", a: "Sí, puedes pagar planillas vencidas siempre y cuando el sistema de la entidad aún permita la recaudación. Te recomendamos pagar antes de la fecha de corte para evitar recargos." }
    ];

    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#2C62A7] selection:text-white" style={{ fontFamily: 'var(--font-inter, "Inter", sans-serif)' }}>

            {/* ═══ SECCIÓN 1: Hero Civic-Tech ═══ */}
            <section className="relative min-h-[calc(100dvh-64px)] lg:h-[70vh] lg:min-h-[600px] flex flex-col justify-start lg:justify-center overflow-hidden pt-4 lg:pt-12 bg-[#001A33]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/servicios-basicos/hero-bg.webp"
                        alt="Background"
                        fill
                        className="object-cover opacity-30 mix-blend-overlay"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#001A33]/80 via-[#001A33]/40 to-[#0A0A0A]" />
                    <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-[#4DB0DC]/20 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full flex-grow flex flex-col justify-start lg:justify-center mt-2 lg:mt-0">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl text-center lg:text-left mt-4 lg:mt-0">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 lg:mb-6">
                                <Building2 className="w-4 h-4 text-[#4DB0DC]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Centro de Pagos Autorizado</span>
                            </div>
                            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black leading-[1.1] tracking-tight mb-4 lg:mb-6 text-white uppercase italic">
                                Pago de <span className="text-[#4DB0DC]">Servicios Básicos</span> en Ecuador: Luz, Agua y Más
                            </h1>
                            <p className="text-base sm:text-lg text-white/70 mb-8 lg:mb-10 leading-relaxed font-medium">
                                En PagoExpress facilitamos el pago de tus planillas de luz, agua, telefonía e impuestos municipales con acreditación inmediata.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    href="#grid"
                                    className="px-10 py-4 bg-[#002D54] text-white font-bold rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,45,84,0.3)] uppercase tracking-widest text-xs"
                                >
                                    Ver Servicios Disponibles
                                </Link>
                                <Link
                                    href="#mapa"
                                    className="px-10 py-4 border border-[#002D54]/30 text-white font-bold rounded-xl hover:bg-white/5 transition-all uppercase tracking-widest text-xs"
                                >
                                    Ubicar Punto de Pago
                                </Link>
                            </div>
                        </motion.div>

                        {/* Visual Composition */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="flex justify-center lg:justify-end mt-8 lg:mt-0"
                        >
                            <div className="relative w-full max-w-[320px] lg:w-[400px] h-full flex flex-col gap-4">
                                <div className="p-6 lg:p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] lg:rounded-3xl shadow-2xl relative z-20">
                                    <div className="flex justify-between items-start mb-6 lg:mb-8">
                                        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-2xl flex items-center justify-center overflow-hidden border-2 border-[#4DB0DC] shadow-[0_0_35px_rgba(77,176,220,0.6)] animate-pulse-slow">
                                            <Image src="/logo.jpg" alt="PagoExpress Logo" width={75} height={75} className="object-contain" />
                                        </div>
                                        <span className="text-[9px] lg:text-[10px] bg-[#4DB0DC]/20 text-[#4DB0DC] px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-[0_0_15px_rgba(77,176,220,0.3)]">Oficial</span>
                                    </div>
                                    <p className="text-[10px] lg:text-sm font-bold text-white/40 uppercase tracking-widest mb-1">EERSSA</p>
                                    <p className="text-xl lg:text-2xl font-black mb-4">Empresa Eléctrica</p>
                                    <div className="h-1.5 lg:h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full w-full bg-[#4DB0DC]" />
                                    </div>
                                </div>
                                <div className="p-6 lg:p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] lg:rounded-3xl shadow-2xl ml-8 lg:ml-12 relative z-10 -mt-8 opacity-40">
                                    <p className="text-[10px] lg:text-sm font-bold text-white/40 uppercase tracking-widest mb-1">UMAPAL</p>
                                    <p className="text-lg lg:text-xl font-black">Servicio de Agua</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 2: Bento Grid de Categorías ═══ */}
            <section id="grid" className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-black mb-4 tracking-tight">Servicios a tu alcance</h2>
                        <p className="text-black/40 font-medium">Categorías de pago habilitadas en el país.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                className={`group p-8 rounded-[32px] bg-slate-50 border border-slate-200 transition-all hover:scale-105 ${cat.color} hover:border-[#002D54]/20`}
                            >
                                <div className={`w-14 h-14 ${cat.accent} rounded-2xl flex items-center justify-center mb-6`}>
                                    <cat.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-black">{cat.title}</h3>
                                <p className="text-sm text-black/40 leading-relaxed font-medium">{cat.services}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 3: Inmersive EERSSA ═══ */}
            <section id="eerssa" className="relative py-32 bg-[#001A33] overflow-hidden border-y border-white/5">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#002D54]/40 to-transparent" />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:w-1/2">
                        <div className="w-16 h-1 bg-white mb-6 opacity-30" />
                        <h2 className="text-4xl sm:text-5xl font-black mb-6">
                            Planilla de Luz <span className="text-[#4DB0DC]">EERSSA</span>
                        </h2>
                        <p className="text-lg text-white/70 mb-8 leading-relaxed font-medium">
                            Paga tus facturas de la Empresa Eléctrica Regional del Sur con total seguridad. Solo necesitas tu código de cliente para la acreditación inmediata.
                        </p>
                        <div className="space-y-4 mb-10">
                            {[
                                { t: "Consulta de Valores", d: "Revisamos tu deuda pendiente al instante." },
                                { t: "Acreditación Directa", d: "Notificación inmediata al sistema de EERSSA." },
                                { t: "Cobertura Regional", d: "Loja, Zamora Chinchipe y Morona Santiago." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-[#4DB0DC]" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white tracking-tight">{item.t}</p>
                                        <p className="text-sm text-white/40">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:w-1/2">
                        <div className="p-12 bg-gradient-to-br from-[#002D54] to-[#001A33] rounded-[48px] border border-white/10 shadow-3xl text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05),transparent)]" />
                            <Zap className="w-20 h-20 text-white/5 absolute -top-4 -right-4 rotate-12" />
                            <div className="w-32 h-32 mx-auto mb-6 relative z-10 bg-white rounded-full p-6 shadow-[0_0_30px_rgba(255,255,255,0.4)] overflow-hidden flex items-center justify-center border-4 border-white/20">
                                <Image
                                    src="/images/servicios-basicos/eerssa.webp"
                                    alt="EERSSA Logo"
                                    width={120}
                                    height={120}
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-2 relative z-10 tracking-tighter uppercase">EERSSA</h3>
                            <p className="text-white/60 font-bold tracking-[0.2em] relative z-10 text-[10px]">LA ENERGÍA SOMOS TODOS</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ SECCIÓN 4: Inmersive UMAPAL ═══ */}
            <section id="umapal" className="relative py-32 bg-[#001A33] overflow-hidden border-b border-white/5">
                <div className="absolute bottom-0 left-0 w-1/3 h-full bg-[#467BA6]/5 blur-[120px]" />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col lg:flex-row-reverse items-center gap-16">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:w-1/2">
                        <div className="w-16 h-1 bg-[#467BA6] mb-6" />
                        <h2 className="text-4xl sm:text-5xl font-black mb-6">
                            Agua Potable <span className="text-[#467BA6]">UMAPAL</span>
                        </h2>
                        <p className="text-lg text-white/60 mb-8 leading-relaxed">
                            Gestión rápida para el pago de planillas de agua potable del Municipio de Loja. Olvídate de las largas filas en el ayuntamiento.
                        </p>
                        <ul className="grid sm:grid-cols-2 gap-4 mb-10">
                            {["Saldo al Día", "Convenios Municipales", "Evita Cortes", "Pago Centralizado"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-white/80 font-medium">
                                    <div className="w-2 h-2 rounded-full bg-[#467BA6]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:w-1/2">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-[#467BA6] rounded-[48px] blur opacity-25" />
                            <div className="relative bg-[#467BA6] p-16 rounded-[40px] border border-white/20 flex flex-col items-center">
                                <div className="w-32 h-32 mb-6 relative bg-white rounded-full p-6 shadow-[0_0_30px_rgba(255,255,255,0.3)] overflow-hidden flex items-center justify-center border-4 border-white/10">
                                    <Image
                                        src="/images/servicios-basicos/umapal.webp"
                                        alt="UMAPAL Logo"
                                        width={120}
                                        height={120}
                                        className="object-contain"
                                    />
                                </div>
                                <p className="text-4xl font-black text-white tracking-tighter uppercase">UMAPAL</p>
                                <div className="mt-4 px-6 py-2 bg-black/20 rounded-full">
                                    <p className="text-white/80 font-black text-[10px] tracking-widest uppercase">Municipio de Loja</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ SECCIÓN 5: Telecom & Otros ═══ */}
            <section className="py-24 bg-[#001A33] relative">
                <div className="absolute inset-0 bg-blue-500/5 blur-[120px] pointer-events-none" />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black mb-4 text-white">Telecomunicaciones y Otros</h2>
                        <p className="text-white/40">Más de 200 convenios disponibles para tu comodidad.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {[
                            { name: "TV Cable / Claro", desc: "Planes de cable y telefonía nacional.", image: "/images/servicios-basicos/telecom.webp" },
                            { name: "Internet Local", desc: "Clippers, K-Net y otros proveedores.", image: "/images/servicios-basicos/internet.webp" }
                        ].map((serv, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                className="p-10 bg-white/5 border border-white/10 rounded-[32px] hover:bg-white/10 transition-all group text-center flex flex-col items-center"
                            >
                                <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#2C62A7] transition-all shadow-xl relative overflow-hidden border border-white/10">
                                    <Image
                                        src={serv.image}
                                        alt={serv.name}
                                        fill
                                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="text-2xl font-black mb-3 text-white">{serv.name}</h3>
                                <p className="text-sm text-white/40 font-medium leading-relaxed max-w-[250px]">{serv.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 6: Impuestos Municipales ═══ */}
            <section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-4xl font-black mb-6 text-black">Impuestos y Predios Municipales</h2>
                            <p className="text-lg text-black/50 mb-8 leading-relaxed font-medium">
                                Cumple con tus obligaciones tributarias de forma ágil. Recaudamos impuestos prediales urbanos y rurales del Municipio de Loja.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
                                    <p className="text-[#002D54] font-black text-2xl mb-1">2026</p>
                                    <p className="text-xs text-black/40 font-bold uppercase tracking-widest">Año Fiscal</p>
                                </div>
                                <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
                                    <p className="text-[#002D54] font-black text-2xl mb-1">En segundos</p>
                                    <p className="text-xs text-black/40 font-bold uppercase tracking-widest">Tiempo de Pago</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 gap-4">
                            {["Predio Urbano", "Predio Rural", "Patente Municipal", "Multas de Tránsito"].map((tax, i) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl hover:border-[#002D54]/50 transition-all cursor-default group shadow-sm">
                                    <span className="font-bold text-black group-hover:text-[#002D54] transition-colors">{tax}</span>
                                    <ArrowRight className="w-5 h-5 text-[#4DB0DC]" />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 7: Infografía de Proceso ═══ */}
            <section className="py-24 bg-[#001A33] border-y border-white/5">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl font-black mb-16">Paga en <span className="text-[#2C62A7] font-normal italic underline decoration-[#2C62A7]/30 underline-offset-8">segundos</span></h2>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {[
                            { step: "01", title: "Dicta tu Código", t: "Indícanos tu número de cédula o código de cliente." },
                            { step: "02", title: "Confirma el Valor", t: "Verificamos el monto exacto en el sistema oficial." },
                            { step: "03", title: "Recibe tu Recibo", t: "Paga en efectivo y recibe tu comprobante oficial." }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                className="relative p-12 bg-white/5 border border-white/10 rounded-[48px]"
                            >
                                <div className="absolute top-8 right-8 text-5xl font-black text-white/5 italic">{step.step}</div>
                                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                                <p className="text-sm text-white/40 leading-relaxed">{step.t}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 8: FAQ Ciudadano ═══ */}
            <section className="py-32 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-black">Dudas del Ciudadano</h2>
                        <p className="text-black/40 mt-4 font-medium">Todo sobre tus trámites y pagos en nuestra red.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border border-slate-200 rounded-2xl bg-slate-50 overflow-hidden transition-all">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full flex justify-between items-center p-6 text-left hover:bg-slate-100 transition-all"
                                >
                                    <span className="text-lg font-bold pr-6 text-black">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 shrink-0 text-[#002D54] transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`} />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-6 text-black/50 font-medium leading-relaxed"
                                        >
                                            <div className="pt-4 border-t border-slate-200">
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

            {/* Map Section */}
            <div id="mapa" className="bg-[#001A33] py-24 relative overflow-hidden text-center">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-black mb-4">Ubicaciones Estratégicas</h2>
                    <p className="text-white/40 mb-12">Encuentra tu punto PagoExpress más cercano en Ecuador.</p>
                    <div className="border border-white/10 p-2 bg-white/5 rounded-[48px] shadow-3xl overflow-hidden">
                        <MapSection />
                    </div>
                </div>
            </div>

            {/* Final Legal Footer */}
            <footer className="py-12 bg-[#000F1F] border-t border-white/5">
                <div className="max-w-6xl mx-auto px-4 text-center opacity-30">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed max-w-2xl mx-auto">
                        AGENTE AUTORIZADO PAGOEXPRESS. ESTA PÁGINA ES INFORMATIVA. LOS LOGOS DE EERSSA Y UMAPAL SON PROPIEDAD DE SUS RESPECTIVAS ENTIDADES. PAGOEXPRESS OPERA BAJO LAS REGULACIONES DEL ECUADOR.
                    </p>
                </div>
            </footer>
        </main>
    );
}
