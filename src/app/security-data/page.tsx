"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    ShieldCheck,
    Zap,
    FileCheck,
    Users,
    Building2,
    CheckCircle2,
    ChevronDown,
    ArrowRight,
    Download,
    Globe,
    Cpu,
    Briefcase,
    Stamp,
    HelpCircle,
    Fingerprint,
    MonitorSmartphone,
    FileText,
    History,
    Scale,
    ShieldAlert,
    Smartphone
} from "lucide-react";
import MapSection from "@/components/MapSection";

const SD_NAVY = "#002855";
const SD_LIME = "#97C93E";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function SecurityDataPage() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<"natural" | "juridica">("natural");

    const solutions = [
        {
            title: "Firma Electrónica",
            icon: Fingerprint,
            desc: "Disponible en formato Archivo (.p12) para facturación rápida o Token (USB) de alta seguridad para gestiones públicas y Quipux.",
            tag: "Más solicitado",
            color: "bg-pe-gray-50"
        },
        {
            title: "Facturación Electrónica",
            icon: MonitorSmartphone,
            desc: "Sistema en la nube 100% compatible con el SRI. La solución ideal para contribuyentes en RIMPE o Régimen General.",
            tag: "Empresarial",
            color: "bg-[#97C93E]/5"
        },
        {
            title: "Renovaciones",
            icon: History,
            desc: "Proceso exprés para usuarios que ya poseen su firma y desean extender su vigencia sin complicaciones.",
            tag: "Ahorra tiempo",
            color: "bg-slate-50"
        }
    ];

    const requirements = {
        natural: [
            { label: "Cédula", desc: "Documento de identidad original y vigente (o pasaporte)." },
            { label: "Votación", desc: "Certificado de votación del último proceso electoral." },
            { label: "Correo", desc: "Email personal activo para recibir el certificado digital." },
            { label: "RUC (Opcional)", desc: "En caso de requerir que el RUC conste en la firma." }
        ],
        juridica: [
            { label: "Nombramiento", desc: "Copia del nombramiento vigente inscrito en el registro correspondiente." },
            { label: "RUC Empresa", desc: "Registro Único de Contribuyentes de la institución." },
            { label: "Autorización", desc: "Documentos de identidad del representante legal." },
            { label: "Constitución", desc: "Escritura de constitución de la empresa (si aplica)." }
        ]
    };

    const workflow = [
        {
            title: "Validación",
            desc: "Revisamos tus documentos físicamente y validamos tu identidad mediante biometría oficial.",
            step: "01",
            icon: FileCheck
        },
        {
            title: "Pago",
            desc: "Cancelas el valor del certificado directamente en nuestras cajas (efectivo, transferencia o tarjeta).",
            step: "02",
            icon: Stamp
        },
        {
            title: "Entrega",
            desc: "Recibes tu firma en tu correo electrónico o configuramos tu Token USB en el acto.",
            step: "03",
            icon: Zap
        }
    ];

    const benefits = [
        {
            title: "Validez Legal",
            desc: "Tus firmas tienen la misma validez jurídica que la manuscrita, amparada bajo la Ley de Comercio Electrónico.",
            icon: Scale
        },
        {
            title: "Soporte Técnico",
            desc: "No te dejamos solo. Te ayudamos con la instalación inicial y pruebas de firma en tu equipo.",
            icon: Cpu
        },
        {
            title: "Inmediatez",
            desc: "Evita esperas de días. En PagoExpress sales de nuestra oficina con tu firma lista para usar.",
            icon: Zap
        }
    ];

    const faqs = [
        {
            q: "¿Cuánto tiempo dura la firma electrónica?",
            a: "Puedes elegir vigencias de 1, 2, 3 o hasta 5 años, dependiendo de tu necesidad profesional o empresarial."
        },
        {
            q: "¿Sirve para el sistema Quipux y SERCOP?",
            a: "Sí, nuestras firmas son totalmente compatibles con Quipux, SOCE (SERCOP), Ecuapass y todos los sistemas gubernamentales de Ecuador."
        },
        {
            q: "¿Puedo facturar desde mi celular?",
            a: "Totalmente. Con nuestro sistema de facturación en la nube, puedes emitir comprobantes legales desde cualquier dispositivo móvil con internet."
        }
    ];

    return (
        <main className="min-h-screen bg-white text-slate-900 selection:bg-[#97C93E] selection:text-white font-sans">

            {/* ═══ Section 1: Hero (Fullscreen Mobile) ═══ */}
            <section className="relative overflow-hidden min-h-[calc(100dvh-64px)] lg:h-[70vh] lg:min-h-[550px] flex items-center bg-[#002855] text-white pt-20 lg:pt-0">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(${SD_LIME} 1px, transparent 1px), linear-gradient(90deg, ${SD_LIME} 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#97C93E]/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full mb-10">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl pt-8 lg:pt-0">
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl">
                            <ShieldCheck className="w-5 h-5 text-[#97C93E]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Punto Oficial Autorizado</span>
                        </div>

                        <h1 className="text-4xl sm:text-7xl lg:text-[5.5rem] font-black leading-[1.1] tracking-tighter mb-6 uppercase">
                            Firma Electrónica<br />
                            <span className="text-[#97C93E] italic font-serif lowercase">en Loja</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-white/60 mb-10 leading-relaxed font-medium max-w-2xl">
                            En PagoExpress somos tu punto <span className="text-white font-bold">Security Data</span> en Loja. Obtén tu certificado digital en archivo o token en minutos, con seguridad y soporte técnico garantizado.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5">
                            <Link
                                href="https://wa.me/593990227203?text=Hola%20PagoExpress,%20necesito%20obtener%20mi%20Firma%20Electrónica."
                                target="_blank"
                                className="group inline-flex items-center justify-center gap-4 px-12 py-5 bg-[#97C93E] text-white font-black uppercase tracking-widest rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-[#97C93E]/40"
                            >
                                <Zap className="w-5 h-5 fill-current" />
                                Comprar Ahora
                            </Link>
                            <Link
                                href="#soluciones"
                                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-sm backdrop-blur-sm"
                            >
                                Ver Soluciones
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ Section 2: Soluciones Digitales (Bento Grid) ═══ */}
            <section id="soluciones" className="py-32 bg-white relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl sm:text-6xl font-black text-[#002855] uppercase italic tracking-tighter mb-6">
                            SOLUCIONES <span className="text-slate-200">DIGITALES</span>
                        </h2>
                        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto italic">
                            Herramientas tecnológicas diseñadas para potenciar tu gestión profesional y empresarial.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {solutions.map((sol, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                className={`group p-10 rounded-[3rem] ${sol.color} border border-transparent hover:border-[#97C93E] transition-all hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden`}
                            >
                                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-white border text-[9px] font-black uppercase tracking-wider text-[#002855]/40">{sol.tag}</div>
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                                    <sol.icon className="w-8 h-8 text-[#002855]" />
                                </div>
                                <h3 className="text-2xl font-black text-[#002855] mb-4 uppercase tracking-tighter">{sol.title}</h3>
                                <p className="text-slate-600 font-medium leading-relaxed">{sol.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Section 3: Requisitos (Tabs) ═══ */}
            <section className="py-32 bg-pe-gray-50 border-y border-slate-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h3 className="text-[#97C93E] font-black uppercase tracking-[0.3em] text-sm mb-6">Emisión de Certificados</h3>
                            <h2 className="text-4xl sm:text-6xl font-black text-[#002855] uppercase italic tracking-tighter leading-tight mb-8">
                                REQUISITOS <br /><span className="text-slate-300">ACTUALIZADOS</span>
                            </h2>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10">
                                Preparamos todo para que tu trámite sea rápido. Recuerda que la **validación de identidad es presencial** en nuestras oficinas de Loja (Matriz o La Castellana).
                            </p>

                            {/* Tabs Switcher */}
                            <div className="flex gap-4 p-2 bg-slate-200/50 rounded-2xl w-fit">
                                <button
                                    onClick={() => setActiveTab("natural")}
                                    className={`px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === "natural" ? "bg-[#002855] text-white shadow-lg" : "text-slate-500 hover:text-[#002855]"}`}
                                >
                                    Persona Natural
                                </button>
                                <button
                                    onClick={() => setActiveTab("juridica")}
                                    className={`px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === "juridica" ? "bg-[#002855] text-white shadow-lg" : "text-slate-500 hover:text-[#002855]"}`}
                                >
                                    P. Jurídica (Empresa)
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="p-10 bg-white rounded-[3rem] shadow-2xl space-y-8"
                                >
                                    {requirements[activeTab].map((req, i) => (
                                        <div key={i} className="flex gap-6 group">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-[#97C93E]/20 transition-colors">
                                                <CheckCircle2 className="w-6 h-6 text-[#97C93E]" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-[#002855] uppercase tracking-tight text-sm mb-1">{req.label}</h4>
                                                <p className="text-slate-500 text-sm font-medium">{req.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Section 4: Workflow ═══ */}
            <section className="py-32 bg-white overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-3xl sm:text-5xl font-black text-[#002855] uppercase italic tracking-tighter">
                            TU FIRMA <span className="text-slate-200">EN 3 PASOS</span>
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12 relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 hidden lg:block -translate-y-1/2" />

                        {workflow.map((item, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                className="relative z-10 p-10 bg-white rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center group hover:border-[#97C93E] hover:shadow-2xl transition-all"
                            >
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#002855] text-white font-black flex items-center justify-center shadow-xl group-hover:bg-[#97C93E] transition-colors">{item.step}</div>
                                <div className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-10 h-10 text-[#002855]" />
                                </div>
                                <h3 className="text-xl font-black text-[#002855] uppercase tracking-tighter mb-4">{item.title}</h3>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Section 5: Beneficios ═══ */}
            <section className="py-32 bg-[#002855] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#97C93E_1px,transparent_1px)] [background-size:40px_40px]" />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid lg:grid-cols-3 gap-16">
                        {benefits.map((ben, i) => (
                            <div key={i} className="space-y-6">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#97C93E]">
                                    <ben.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter">{ben.title}</h3>
                                <p className="text-white/40 font-medium leading-relaxed">{ben.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Section 6: Compatibilidad ═══ */}
            <section className="py-32 bg-white border-b border-slate-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-3xl sm:text-5xl font-black text-[#002855] uppercase italic tracking-tighter">
                            SISTEMAS <span className="text-slate-200">COMPATIBLES</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12">
                        {[
                            { name: "SRI / Facturación", logo: "/images/security/sri.webp" },
                            { name: "QUIPUX / SITRA", logo: "/images/security/quipux.webp" },
                            { name: "ADUANA / SENAE", logo: "/images/security/aduana.webp" },
                            { name: "C. JUDICATURA", logo: "/images/security/judicatura.webp" },
                            { name: "SUPERCIAS", logo: "/images/security/supercias.webp" },
                            { name: "SERCOP", logo: "/images/security/sercop.webp" }
                        ].map((item, i) => (
                            <motion.div
                                key={i} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}
                                className="flex flex-col items-center gap-6 group"
                            >
                                <div className="w-24 h-24 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:border-[#97C93E] hover:shadow-xl transition-all duration-500 overflow-hidden p-4">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={item.logo}
                                            alt={item.name}
                                            fill
                                            className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    </div>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-[#002855] text-center px-2">{item.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <MapSection />

            {/* ═══ Section 7: FAQ ═══ */}
            <section className="py-32 bg-white overflow-hidden border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-[#002855] uppercase italic">FAQ <span className="text-slate-300">PROFESIONAL</span></h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="rounded-3xl border border-slate-100 overflow-hidden transition-all hover:shadow-md">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full flex justify-between items-center p-8 text-left bg-white transition-colors hover:bg-slate-50"
                                >
                                    <span className="text-lg font-black text-[#002855] uppercase tracking-tight">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-[#97C93E] transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`} />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="bg-slate-50 px-8 pb-8 text-slate-500 font-medium leading-relaxed"
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

                    <div className="mt-20 p-12 bg-[#002855] rounded-[3rem] text-center relative overflow-hidden group shadow-2xl shadow-blue-900/20">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#97C93E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h4 className="text-white text-2xl font-black mb-4 uppercase italic relative z-10">¿LISTO PARA TU FIRMA?</h4>
                        <p className="text-white/50 mb-8 font-medium relative z-10">Obtén tu **Facturación electrónica SRI Loja** hoy mismo.</p>
                        <Link
                            href="https://wa.me/593990227203"
                            target="_blank"
                            className="inline-flex items-center gap-3 px-12 py-5 bg-[#97C93E] text-white font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all relative z-10"
                        >
                            Hablar con un Experto
                            <Smartphone className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══ Legal Footer ═══ */}
            <footer className="py-12 bg-[#002855] border-t border-white/5">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
                    <div className="flex items-center gap-6 text-white text-xs font-black uppercase tracking-widest">
                        SECURITY DATA <span className="text-[#97C93E]">PUNTO OFICIAL</span> LOJA
                    </div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white text-center md:text-right max-w-sm">
                        PagoExpress es Agente Autorizado de Security Data. Emisión cumpliendo con la Ley de Comercio Electrónico de Ecuador.
                    </p>
                </div>
            </footer>
        </main>
    );
}

// Custom Icons
function Ship(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
            <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.2.9 4.3 2.38 6" />
            <path d="M12 10V2" />
            <path d="M12 2 9 5" />
            <path d="M12 2l3 3" />
        </svg>
    )
}
