"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    ShieldCheck,
    Zap,
    FileCheck,
    CheckCircle2,
    ChevronDown,
    ArrowRight,
    Cpu,
    Fingerprint,
    MonitorSmartphone,
    History,
    Scale,
    Smartphone,
    X,
    User,
    Mail,
    MapPin,
    Phone,
    Stamp
} from "lucide-react";
import MapSection from "@/components/MapSection";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export default function SecurityDataClient() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<"natural" | "juridica">("natural");
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [formData, setFormData] = useState({
        cedula: "",
        email: "",
        direccion: "",
        celular: ""
    });

    const openModal = (plan: any) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPlan) return;
        
        const message = `Hola PagoExpress, deseo contratar la Firma Electrónica por ${selectedPlan?.time} ($${selectedPlan?.price}).%0A%0A` +
                        `*Mis Datos:*%0A` +
                        `- Cédula: ${formData.cedula}%0A` +
                        `- Correo: ${formData.email}%0A` +
                        `- Dirección: ${formData.direccion}%0A` +
                        `- Celular: ${formData.celular}`;
        
        window.open(`https://wa.me/593990227203?text=${message}`, "_blank");
        setIsModalOpen(false);
    };

    const slides = [
        {
            url: "/images/header logo/security-data.webp",
            alt: "Security Data Logo",
            caption: "Respaldo Oficial"
        },
        {
            url: "/images/security/firma-electronica-banner.webp",
            alt: "Firma Electrónica",
            caption: "Tecnología de Punta"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const solutions = [
        {
            title: "Firma Electrónica",
            icon: Fingerprint,
            desc: "Disponible en formato Archivo (.p12) para facturación rápida o Token (USB) de alta seguridad para gestiones públicas y Quipux.",
            tag: "Más solicitado",
            color: "bg-white"
        },
        {
            title: "Facturación Electrónica",
            icon: MonitorSmartphone,
            desc: "Sistema en la nube 100% compatible con el SRI. La solución ideal para contribuyentes en RIMPE o Régimen General.",
            tag: "Empresarial",
            color: "bg-white"
        },
        {
            title: "Renovación de Firma",
            icon: History,
            desc: "Proceso exprés para usuarios que ya poseen su firma y desean extender su vigencia sin complicaciones.",
            tag: "Ahorra tiempo",
            color: "bg-white"
        }
    ];

    const requirements = {
        natural: [
            { label: "Cédula de Identidad", desc: "Documento de identidad original y vigente (o pasaporte)." },
            { label: "Certificado de Votación", desc: "Certificado de votación del último proceso electoral." },
            { label: "Correo Electrónico", desc: "Email personal activo para recibir el certificado digital." },
            { label: "RUC (Opcional)", desc: "En caso de requerir que el RUC conste en la firma electrónica." }
        ],
        juridica: [
            { label: "Nombramiento de Representante", desc: "Copia del nombramiento vigente inscrito en el registro correspondiente." },
            { label: "RUC de la Empresa", desc: "Registro Único de Contribuyentes de la institución actualizado." },
            { label: "Cédula y Votación", desc: "Documentos de identidad del representante legal." },
            { label: "Constitución (Opcional)", desc: "Escritura de constitución de la empresa en ciertos casos." }
        ]
    };

    const faqs = [
        {
            q: "¿Cuál es la vigencia de la firma electrónica?",
            a: "Puedes contratar tu firma electrónica con vigencias desde 1 año hasta 5 años, según las políticas y promociones vigentes de Security Data."
        },
        {
            q: "¿Es compatible con Quipux y SERCOP?",
            a: "Completamente. Nuestras firmas en formato Token son el estándar exigido para portales gubernamentales como Quipux, SOCE (SERCOP) y Ecuapass."
        },
        {
            q: "¿Sirve para la facturación electrónica del SRI?",
            a: "Sí. Para facturación electrónica recomendamos adquirir la firma en archivo (.p12) ya que se integra de manera transparente con todos los sistemas de facturación en la nube autorizados."
        }
    ];

    return (
        <main className="min-h-screen bg-[#F8F9FA] text-[#333333] font-sans">
            {/* ═══ Section 1: Hero Corporativo con Slider ═══ */}
            <section className="relative overflow-hidden bg-[#002855] text-white pt-24 pb-20 lg:pt-0 lg:pb-0 lg:min-h-[70vh] flex items-center">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#97C93E]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#97C93E]/30 bg-[#97C93E]/10 mb-6">
                                <ShieldCheck className="w-4 h-4 text-[#97C93E]" />
                                <span className="text-xs font-semibold text-[#97C93E]">Agente Civil Autorizado - Loja</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-8 text-white">
                                Tu Firma Electrónica <br />
                                <span className="text-[#97C93E]">En pocos minutos</span>
                            </h1>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="#precios"
                                    className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-[#97C93E] hover:bg-[#86b535] text-[#002855] text-xl font-black rounded-2xl transition-all shadow-2xl shadow-[#97C93E]/30 hover:scale-105 active:scale-95"
                                >
                                    Ver Planes y Precios
                                    <ArrowRight className="w-6 h-6" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* ═══ Slider de Imágenes ═══ */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square w-full max-w-lg mx-auto"
                        >
                            <div className="absolute inset-0 bg-[#97C93E]/10 rounded-3xl blur-2xl -rotate-6 scale-95" />
                            <div className="relative h-full w-full rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-[#001a33]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentSlide}
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.6 }}
                                        className="absolute inset-0 p-8 sm:p-12 flex flex-col items-center justify-center"
                                    >
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={slides[currentSlide].url}
                                                alt={slides[currentSlide].alt}
                                                fill
                                                className="object-contain"
                                                priority
                                            />
                                        </div>
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                            {slides.map((_, i) => (
                                                <div 
                                                    key={i} 
                                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? "w-8 bg-[#97C93E]" : "w-2 bg-white/20"}`} 
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                                
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#002855]/40 to-transparent" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* ═══ Section 2: Soluciones (Cards Corporativas) ═══ */}
            <section id="servicios" className="py-20 bg-[#F8F9FA]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-[#002855] mb-4">Servicios Digitales Seguros</h2>
                        <div className="w-16 h-1 bg-[#97C93E] mx-auto rounded-full mb-6"></div>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Proveemos las mejores herramientas criptográficas para la gestión de tus documentos electrónicos bajo la estricta normativa del Ecuador.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {solutions.map((sol, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                className={`p-8 rounded-2xl ${sol.color} border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#97C93E]/50 transition-all relative flex flex-col`}
                            >
                                <div className="absolute top-6 right-6 px-3 py-1 rounded-md bg-[#F0F4F8] text-[11px] font-bold text-[#002855]">{sol.tag}</div>
                                <div className="w-14 h-14 rounded-xl bg-[#002855]/5 flex items-center justify-center mb-6">
                                    <sol.icon className="w-7 h-7 text-[#002855]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#002855] mb-3">{sol.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed flex-grow">{sol.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Section 3: Requisitos (Tabs Clean) ═══ */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-[#002855] mb-6">
                                Requisitos para la Emisión
                            </h2>
                            <p className="text-slate-600 leading-relaxed mb-8">
                                Asegúrate de contar con los siguientes documentos vigentes al momento de acercarte a nuestras instalaciones en Loja para la validación de identidad y emisión de la firma.
                            </p>

                            <div className="flex gap-2 p-1 bg-slate-100 rounded-lg w-fit mb-8">
                                <button
                                    onClick={() => setActiveTab("natural")}
                                    className={`px-6 py-2.5 rounded-md font-semibold text-sm transition-all ${activeTab === "natural" ? "bg-white text-[#002855] shadow-sm" : "text-slate-500 hover:text-[#002855]"}`}
                                >
                                    Persona Natural
                                </button>
                                <button
                                    onClick={() => setActiveTab("juridica")}
                                    className={`px-6 py-2.5 rounded-md font-semibold text-sm transition-all ${activeTab === "juridica" ? "bg-white text-[#002855] shadow-sm" : "text-slate-500 hover:text-[#002855]"}`}
                                >
                                    Persona Jurídica
                                </button>
                            </div>
                        </div>

                        <div className="relative bg-[#F8F9FA] p-8 rounded-2xl border border-slate-200">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    {(requirements[activeTab] as any[]).map((req, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="mt-1">
                                                <CheckCircle2 className="w-5 h-5 text-[#97C93E]" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#002855] mb-1">{req.label}</h4>
                                                <p className="text-slate-600 text-sm">{req.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Section 2: Planes y Precios (NUEVO) ═══ */}
            <section id="precios" className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-[#002855] mb-4">Planes de Firma Electrónica</h2>
                        <div className="w-16 h-1 bg-[#97C93E] mx-auto rounded-full mb-6"></div>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Emisión inmediata en formato **Archivo (.p12)**. Ideal para facturación electrónica, SRI y gestiones legales.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { time: "7 Días", price: "5.00", desc: "Uso temporal / Emergencias", popular: false },
                            { time: "90 Días", price: "10.00", desc: "Proyectos cortos", popular: false },
                            { time: "1 Año", price: "20.00", desc: "El más solicitado por PYMES", popular: true },
                            { time: "2 Años", price: "27.00", desc: "Mejor relación costo-beneficio", popular: false }
                        ].map((plan, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                className={`relative p-8 rounded-2xl border ${plan.popular ? "border-[#97C93E] shadow-xl scale-105 z-10" : "border-slate-200 shadow-sm"} bg-white flex flex-col`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#97C93E] text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                                        Recomendado
                                    </div>
                                )}
                                <div className="text-[#002855] font-bold text-sm mb-2 uppercase tracking-wide">Vigencia {plan.time}</div>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-black text-[#002855]">${plan.price}</span>
                                    <span className="text-slate-400 text-sm font-medium">/ total</span>
                                </div>
                                <p className="text-slate-500 text-xs mb-8 leading-relaxed">{plan.desc}</p>
                                
                                <button
                                    onClick={() => openModal(plan)}
                                    className={`w-full py-3 rounded-lg font-bold text-sm text-center transition-all ${plan.popular ? "bg-[#002855] text-white hover:bg-[#001A33]" : "bg-slate-100 text-[#002855] hover:bg-slate-200"}`}
                                >
                                    Solicitar Ahora
                                </button>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>

            <MapSection />

            {/* ═══ Section 6: FAQ ═══ */}
            <section className="py-20 bg-[#F8F9FA] border-t border-slate-200">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#002855] mb-4">Preguntas Frecuentes</h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full flex justify-between items-center p-6 text-left"
                                >
                                    <span className="font-semibold text-[#002855] pr-4">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-[#97C93E] flex-shrink-0 transition-transform ${activeFaq === i ? "rotate-180" : ""}`} />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-6 text-slate-600 text-sm"
                                        >
                                            {faq.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CTA Footer ═══ */}
            <section className="py-16 bg-[#002855] text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                        Inicia tu proceso de Firma Electrónica hoy mismo
                    </h2>
                    <Link
                        href="https://wa.me/593990227203"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-[#97C93E] text-white font-bold rounded-lg hover:bg-[#86b535] transition-colors"
                    >
                        <Smartphone className="w-5 h-5" />
                        Contactar a un Asesor
                    </Link>
                </div>
            </section>

            {/* ═══ Legal Footer ═══ */}
            <footer className="py-8 bg-[#001A33] border-t border-white/10">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-xs text-white/50 mb-2">
                        PAGOEXPRESS LOJA - AGENTE AUTORIZADO SECURITY DATA
                    </p>
                    <p className="text-[10px] text-white/30">
                        La emisión de firmas electrónicas se rige bajo las políticas de Security Data Seguridad en Datos y Firma Digital S.A.
                    </p>
                </div>
            </footer>

            {/* ═══ MODAL FORM ═══ */}
            <AnimatePresence>
                {isModalOpen && selectedPlan && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-[#002855]/60 backdrop-blur-sm"
                        />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
                        >
                            {/* Modal Header */}
                            <div className="bg-[#002855] p-6 text-white relative">
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#97C93E] flex items-center justify-center shadow-lg">
                                        <FileCheck className="w-6 h-6 text-[#002855]" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">Solicitud de Firma</h3>
                                        <p className="text-white/60 text-xs">Vigencia {selectedPlan?.time} - ${selectedPlan?.price}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleSubmit} className="p-8 space-y-5">
                                <div className="space-y-4">
                                    <div className="relative">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1 block">Número de Cédula</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <User className="h-4 w-4 text-slate-400 group-focus-within:text-[#97C93E] transition-colors" />
                                            </div>
                                            <input
                                                type="text"
                                                name="cedula"
                                                required
                                                placeholder="0000000000"
                                                value={formData.cedula}
                                                onChange={handleInputChange}
                                                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#97C93E]/20 focus:border-[#97C93E] transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1 block">Correo Electrónico</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail className="h-4 w-4 text-slate-400 group-focus-within:text-[#97C93E] transition-colors" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="ejemplo@correo.com"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#97C93E]/20 focus:border-[#97C93E] transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1 block">Dirección de Domicilio</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <MapPin className="h-4 w-4 text-slate-400 group-focus-within:text-[#97C93E] transition-colors" />
                                            </div>
                                            <input
                                                type="text"
                                                name="direccion"
                                                required
                                                placeholder="Ciudad, Calle Principal y Secundaria"
                                                value={formData.direccion}
                                                onChange={handleInputChange}
                                                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#97C93E]/20 focus:border-[#97C93E] transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1 block">Número de Celular</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Phone className="h-4 w-4 text-slate-400 group-focus-within:text-[#97C93E] transition-colors" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="celular"
                                                required
                                                placeholder="0900000000"
                                                value={formData.celular}
                                                onChange={handleInputChange}
                                                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#97C93E]/20 focus:border-[#97C93E] transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[#97C93E] hover:bg-[#86b535] text-[#002855] font-black rounded-2xl transition-all shadow-lg shadow-[#97C93E]/20 flex items-center justify-center gap-3 mt-4"
                                >
                                    <Smartphone className="w-5 h-5" />
                                    ENVIAR POR WHATSAPP
                                </button>
                                
                                <p className="text-[10px] text-center text-slate-400 px-8">
                                    Al hacer clic, serás redirigido a WhatsApp para finalizar tu trámite con un asesor.
                                </p>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
