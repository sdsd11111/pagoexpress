"use client";

import { useState, useEffect } from "react";
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
    MonitorPlay,
    X,
    Send
} from "lucide-react";
import MapSection from "@/components/MapSection";

// Animations
const fadeUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function ServiciosBasicosClient() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState<any>({
        ciudad: "",
        cedula: "",
        codigo: "",
    });

    const [currentSlide, setCurrentSlide] = useState(0);
    const heroSlides = [
        { icon: Lightbulb, title: "Luz", subtitle: "EERSSA, CNEL", color: "#FFDD00", bg: "bg-[#FFDD00]/10" },
        { icon: Droplets, title: "Agua", subtitle: "UMAPAL, Juntas", color: "#4DB0DC", bg: "bg-[#4DB0DC]/10" },
        { icon: Smartphone, title: "Telefonía", subtitle: "Claro, Movistar, CNT", color: "#2C62A7", bg: "bg-[#2C62A7]/10" }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    const categories = [
        {
            title: "Energía Eléctrica",
            services: "EERSSA, CNEL y empresas nacionales.",
            icon: Zap,
            color: "shadow-[0_0_20px_rgba(0,45,84,0.2)]",
            accent: "bg-[#002D54]",
            fields: [
                { id: "empresa", label: "Empresa Eléctrica", placeholder: "Ej: EERSSA, CNEL, EEQ..." }
            ]
        },
        {
            title: "Agua Potable",
            services: "UMAPAL (Loja), EPMAPAL y juntas.",
            icon: Droplets,
            color: "shadow-[0_0_20px_rgba(70,123,166,0.1)]",
            accent: "bg-[#467BA6]",
            fields: [
                { id: "municipio", label: "Municipio o Junta de Agua", placeholder: "Ej: UMAPAL, Municipio de..." }
            ]
        },
        {
            title: "Telecomunicaciones",
            services: "TV Cable, Claro, Movistar.",
            icon: Rss,
            color: "shadow-[0_0_20px_rgba(0,26,51,0.2)]",
            accent: "bg-[#001A33]",
            fields: [
                { id: "compania", label: "Compañía / Proveedor", placeholder: "Ej: Netlife, CNT, Claro, Xtrim..." }
            ]
        },
        {
            title: "Impuestos & Tasas",
            services: "Predios, patentes y multas municipales.",
            icon: Home,
            color: "shadow-[0_0_20px_rgba(77,176,220,0.1)]",
            accent: "bg-[#4DB0DC]",
            placeholder: "Código Predial o Placa",
            fields: [
                { id: "impuesto", label: "Tipo de Impuesto / Municipio", placeholder: "Ej: Predio Urbano Loja, Patente..." }
            ]
        }
    ];

    const handleWhatsApp = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCategory) return;
        
        let extraInfo = "";
        if (selectedCategory.fields) {
            selectedCategory.fields.forEach((f: any) => {
                if (formData[f.id]) {
                    extraInfo += `\n🔹 *${f.label}:* ${formData[f.id]}`;
                }
            });
        }

        const message = `Hola PagoExpress, deseo pagar mi planilla de *${selectedCategory.title}*.\n\n📍 *Ciudad:* ${formData.ciudad}\n🆔 *Cédula:* ${formData.cedula}\n🔢 *Código/Contrato:* ${formData.codigo}${extraInfo}`;
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/593990227203?text=${encoded}`, '_blank');
        setSelectedCategory(null);
    };

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
                    <div className="absolute inset-0 bg-[#001A33]" />
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
                                En PagoExpress facilitamos el pago de tus planillas de luz, agua, telefonía e impuestos municipales en linea.
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
                        <div className="relative w-full h-[300px] lg:h-[400px] flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -30, scale: 0.95 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="relative w-full max-w-[360px] lg:w-[480px] h-full flex flex-col gap-4">
                                        <div className="p-10 lg:p-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl relative z-20 flex flex-col items-center text-center">
                                            <div className="flex justify-between items-start w-full mb-10">
                                                <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center border-2 border-white/10 ${heroSlides[currentSlide]?.bg || ""}`}>
                                                    {(() => {
                                                        const slide = heroSlides[currentSlide];
                                                        if (!slide) return null;
                                                        const Icon = slide.icon;
                                                        return <Icon className="w-12 h-12" style={{ color: slide.color }} />;
                                                    })()}
                                                </div>
                                                <span className="text-xs bg-[#4DB0DC]/20 text-[#4DB0DC] px-5 py-2 rounded-full font-black uppercase tracking-widest shadow-[0_0_15px_rgba(77,176,220,0.3)]">Oficial</span>
                                            </div>
                                            <div className="w-full text-left">
                                                <p className="text-sm font-bold text-white/40 uppercase tracking-[0.2em] mb-3">{heroSlides[currentSlide]?.subtitle}</p>
                                                <p className="text-4xl lg:text-5xl font-black mb-8">{heroSlides[currentSlide]?.title}</p>
                                                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full w-full animate-pulse-slow" style={{ backgroundColor: heroSlides[currentSlide]?.color || "#4DB0DC" }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 2: Información Detallada (Tabs) ═══ */}
            <section className="py-24 bg-white border-b border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#2C62A7]/5 blur-[120px]" />
                
                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-black uppercase italic tracking-tighter">
                            Detalles de <span className="text-[#2C62A7]">Nuestros Servicios</span>
                        </h2>
                        <p className="text-black/40 font-medium mt-2">Explora los requisitos y beneficios de cada categoría.</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        {/* Tab Selectors */}
                        <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
                            {categories.map((cat, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveTab(i)}
                                    className={`flex items-center gap-4 px-6 py-5 rounded-2xl transition-all text-left whitespace-nowrap lg:whitespace-normal shrink-0 lg:shrink ${
                                        activeTab === i 
                                        ? "bg-[#2C62A7]/5 border-l-4 border-[#2C62A7] shadow-sm" 
                                        : "bg-gray-50 border-l-4 border-transparent hover:bg-gray-100 opacity-60 hover:opacity-100"
                                    }`}
                                >
                                    <div className={`p-3 rounded-xl ${activeTab === i ? "bg-[#2C62A7] text-white" : "bg-gray-200 text-gray-500"}`}>
                                        <cat.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black uppercase tracking-widest text-black">{cat.title}</p>
                                        <p className="text-[10px] text-black/40 font-bold">Información y socios</p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="w-full lg:w-2/3 min-h-[400px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-8 lg:p-12 flex flex-col md:flex-row gap-12 items-center shadow-inner"
                                >
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-4xl font-black mb-6 uppercase tracking-tighter italic text-black">
                                            {categories[activeTab]?.title}
                                        </h3>
                                        <p className="text-lg text-black/60 mb-8 leading-relaxed font-medium">
                                            {activeTab === 0 && "Gestión rápida y segura para el pago de tu consumo eléctrico. Acreditamos tus pagos en línea de forma inmediata para evitar cortes y asegurar la continuidad de tu servicio."}
                                            {activeTab === 1 && "Pago centralizado de planillas de agua potable. Contamos con conexión directa a los sistemas municipales para garantizar que tu saldo se actualice al instante."}
                                            {activeTab === 2 && "Mantén tu conectividad al máximo. Recaudamos pagos de internet fibra óptica, telefonía móvil (recargas y planes) y televisión por suscripción con las mejores operadoras."}
                                            {activeTab === 3 && "Cumple con tus obligaciones tributarias sin complicaciones. Recaudamos impuestos prediales, patentes municipales y tasas administrativas con total respaldo legal."}
                                        </p>
                                        
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2C62A7]">Compañías de Trabajo</p>
                                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                                {(activeTab === 0 ? ["EERSSA", "CNEL", "EEQ", "Centro Sur"] :
                                                  activeTab === 1 ? ["UMAPAL", "EPMAPS", "EMAPA", "Interagua"] :
                                                  activeTab === 2 ? ["Netlife", "CNT", "Claro", "Movistar", "Xtrim", "DirectTV"] :
                                                  ["Municipio de Loja", "Municipio de Quito", "ANT", "SRI", "GAD Provincial"])
                                                  .map((comp, j) => (
                                                    <span key={j} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-black/70 shadow-sm">
                                                        {comp}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => setSelectedCategory(categories[activeTab])}
                                            className="mt-10 w-full md:w-auto px-10 py-5 bg-[#002D54] text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:scale-105 transition-all shadow-[0_10px_20px_rgba(0,45,84,0.2)] flex items-center justify-center gap-3 group"
                                        >
                                            <span>Ir al Formulario de Pago</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                    
                                    <div className="shrink-0 w-full md:w-64 h-64 relative bg-gradient-to-br from-[#002D54] to-black rounded-[2rem] border border-white/10 overflow-hidden group shadow-2xl">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(77,176,220,0.2),transparent)] animate-pulse" />
                                        <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                                            {/* Mockup Representation */}
                                            {activeTab === 0 && <Zap className="w-24 h-24 text-[#FFDD00] drop-shadow-[0_0_20px_rgba(255,221,0,0.4)]" />}
                                            {activeTab === 1 && <Droplets className="w-24 h-24 text-[#4DB0DC] drop-shadow-[0_0_20px_rgba(77,176,220,0.4)]" />}
                                            {activeTab === 2 && <Smartphone className="w-24 h-24 text-[#2C62A7] drop-shadow-[0_0_20px_rgba(44,98,167,0.4)]" />}
                                            {activeTab === 3 && <Home className="w-24 h-24 text-white opacity-40" />}
                                            
                                            {/* Floating Glow */}
                                            <motion.div 
                                                animate={{ 
                                                    scale: [1, 1.2, 1],
                                                    opacity: [0.3, 0.6, 0.3]
                                                }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                                className="absolute w-32 h-32 bg-[#4DB0DC]/20 rounded-full blur-[40px] z-0"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 3: Bento Grid de Categorías ═══ */}
            <section id="grid" className="py-24 bg-[#001A33] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent opacity-5" />
                
                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-white mb-4 tracking-tight uppercase italic">Servicios a tu alcance</h2>
                        <p className="text-white/40 font-medium uppercase tracking-[0.2em] text-[10px]">Categorías de pago habilitadas en el país.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                onClick={() => setSelectedCategory(cat)}
                                className={`group p-8 rounded-[32px] bg-slate-50 border border-slate-200 transition-all hover:scale-105 ${cat.color} hover:border-[#002D54]/20 cursor-pointer`}
                            >
                                <div className={`w-14 h-14 ${cat.accent} rounded-2xl flex items-center justify-center mb-6`}>
                                    <cat.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-black">{cat.title}</h3>
                                <p className="text-sm text-black/40 leading-relaxed font-medium">{cat.services}</p>
                                <div className="mt-6 flex items-center gap-2 text-[#002D54] font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                                    <span>Pagar ahora</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ═══ MODAL DE FORMULARIO ═══ */}
                <AnimatePresence>
                    {selectedCategory && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedCategory(null)}
                                className="absolute inset-0 bg-[#001A33]/80 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white/20"
                            >
                                <div className={`p-8 ${selectedCategory?.accent || "bg-[#002D54]"} text-white relative`}>
                                    <button 
                                        onClick={() => setSelectedCategory(null)}
                                        className="absolute top-6 right-6 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="p-3 bg-white/10 rounded-xl">
                                            {selectedCategory?.icon && <selectedCategory.icon className="w-6 h-6 text-white" />}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Pago en línea</span>
                                    </div>
                                    <h3 className="text-3xl font-black italic uppercase tracking-tighter">
                                        {selectedCategory?.title}
                                    </h3>
                                </div>

                                <form onSubmit={handleWhatsApp} className="p-8 space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1 mb-2 block">Ciudad del Servicio</label>
                                            <input 
                                                type="text"
                                                required
                                                list="ciudades-list"
                                                placeholder="Escriba su ciudad..."
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-black font-bold placeholder:text-black/20 focus:ring-2 focus:ring-[#002D54] focus:border-transparent outline-none transition-all"
                                                onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
                                            />
                                            <datalist id="ciudades-list">
                                                <option value="Loja" />
                                                <option value="Quito" />
                                                <option value="Guayaquil" />
                                                <option value="Cuenca" />
                                                <option value="Zamora" />
                                                <option value="Catamayo" />
                                                <option value="Machala" />
                                                <option value="Manta" />
                                                <option value="Portoviejo" />
                                                <option value="Ambato" />
                                                <option value="Riobamba" />
                                                <option value="Ibarra" />
                                            </datalist>
                                        </div>

                                        {/* Campos Específicos por Categoría */}
                                        {selectedCategory?.fields?.map((field: any) => (
                                            <div key={field.id}>
                                                <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1 mb-2 block">{field.label}</label>
                                                <input 
                                                    type="text"
                                                    required
                                                    placeholder={field.placeholder}
                                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-black font-bold placeholder:text-black/20 focus:ring-2 focus:ring-[#002D54] focus:border-transparent outline-none transition-all"
                                                    onChange={(e) => setFormData({...formData, [field.id]: e.target.value})}
                                                />
                                            </div>
                                        ))}

                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1 mb-2 block">Cédula del Titular</label>
                                            <input 
                                                type="text"
                                                required
                                                placeholder="Ej: 1104567890"
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-black font-bold placeholder:text-black/20 focus:ring-2 focus:ring-[#002D54] focus:border-transparent outline-none transition-all"
                                                onChange={(e) => setFormData({...formData, cedula: e.target.value})}
                                            />
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1 mb-2 block">
                                                {selectedCategory?.placeholder || "Código de Contrato / Cuenta"}
                                            </label>
                                            <input 
                                                type="text"
                                                required
                                                placeholder="Ingrese el código de su planilla"
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-black font-bold placeholder:text-black/20 focus:ring-2 focus:ring-[#002D54] focus:border-transparent outline-none transition-all"
                                                onChange={(e) => setFormData({...formData, codigo: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit"
                                        className={`w-full py-5 ${selectedCategory?.accent || "bg-[#002D54]"} text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3`}
                                    >
                                        <span>Enviar al WhatsApp</span>
                                        <Send className="w-4 h-4" />
                                    </button>

                                    <p className="text-[10px] text-center text-black/30 font-medium leading-relaxed">
                                        Al hacer clic, serás redirigido a nuestro canal oficial de atención para finalizar el pago. Acreditación en línea.
                                    </p>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
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
