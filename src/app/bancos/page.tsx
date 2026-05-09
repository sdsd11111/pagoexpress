"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
    Search,
    Landmark,
    Building2,
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    Clock,
    UserCheck,
    CreditCard,
    MapPin,
    MessageCircle,
    Copy,
    X,
    ExternalLink,
    Wallet,
    Lock,
    FileText,
    HelpCircle,
    GanttChartSquare,
    Check
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MapSection from "@/components/MapSection";

/* ─── Data (Preserving existing bank data) ─── */
const featuredBanks = [
    {
        name: "Produbanco",
        account: "02125012701",
        description: "Cuenta ideal para transferencias interbancarias y pagos directos.",
        bgImage: "/bank_card_bg.png",
        textColor: "text-white",
        tags: ["Interbancaria"],
        titular: "CESAR AUGUSTO AMAY RIOS",
        id: "1103677546",
        color: "#0054A6"
    },
    {
        name: "Banco Pichincha",
        account: "3472909404",
        description: "Depósitos y transferencias directas a través de Mi Vecino.",
        bgImage: "/bank_card_bg.png",
        textColor: "text-white",
        tags: ["Punto Mi Vecino"],
        titular: "CESAR AUGUSTO AMAY RIOS",
        id: "1103677546",
        color: "#FFDD00"
    },
    {
        name: "Banco Guayaquil",
        account: "21026425",
        description: "Transferencias directas y depósitos rápidos en Banco del Barrio.",
        bgImage: "/bank_card_bg.png",
        textColor: "text-white",
        tags: ["Banco del Barrio"],
        titular: "CESAR AUGUSTO AMAY RIOS",
        id: "1103677546",
        color: "#E63946"
    },
    {
        name: "Banco Pacífico",
        account: "1042461405",
        description: "Realiza tus pagos de forma segura a nuestra cuenta del Pacífico.",
        bgImage: "/bank_card_bg.png",
        textColor: "text-white",
        tags: ["Empresarial"],
        titular: "CESAR AUGUSTO AMAY RIOS",
        id: "1103677546",
        color: "#0054A6"
    },
    {
        name: "CoopMego",
        account: "401010139960",
        description: "Transferencias internas inmediatas para socios locales.",
        bgImage: "/bank_card_bg.png",
        textColor: "text-white",
        tags: ["Cooperativa"],
        titular: "CESAR AUGUSTO AMAY RIOS",
        id: "1103677546",
        color: "#2D6A4F"
    },
    {
        name: "JEP",
        account: "406089279905",
        description: "Opción rápida para transferencias entre cooperativas JEP.",
        bgImage: "/bank_card_bg.png",
        textColor: "text-white",
        tags: ["Financiera"],
        titular: "CESAR AUGUSTO AMAY RIOS",
        id: "1103677546",
        color: "#F3CF1D"
    }
];

const allEntities = [
    { name: "Banco del Pacífico", type: "Nacional", color: "bg-[#0054A6]/10", border: "border-[#0054A6]/20", text: "text-[#0054A6]", services: ["Depósitos", "Préstamos"] },
    { name: "Banco Pichincha", type: "Nacional", color: "bg-[#FFDD00]/10", border: "border-[#FFDD00]/30", text: "text-[#B89B00]", services: ["Depósitos", "Recaudaciones"] },
    { name: "Banco Bolivariano", type: "Nacional", color: "bg-[#2C62A7]/10", border: "border-[#2C62A7]/20", text: "text-[#2C62A7]", services: ["Depósitos"] },
    { name: "Banco Guayaquil", type: "Nacional", color: "bg-[#E63946]/10", border: "border-[#E63946]/20", text: "text-[#E63946]", services: ["Depósitos", "Transferencias"] },
    { name: "CoopMego", type: "Cooperativa", color: "bg-[#2D6A4F]/10", border: "border-[#2D6A4F]/20", text: "text-[#2D6A4F]", services: ["Ahorros", "Cuotas"] },
    { name: "Jardín Azuayo", type: "Cooperativa", color: "bg-[#F3CF1D]/10", border: "border-[#F3CF1D]/30", text: "text-[#9B8400]", services: ["Ahorros", "Cuotas"] },
    { name: "Coop. JEP", type: "Cooperativa", color: "bg-[#004A99]/10", border: "border-[#004A99]/20", text: "text-[#004A99]", services: ["Depósitos"] },
    { name: "Banco de Loja", type: "Nacional", color: "bg-[#00A859]/10", border: "border-[#00A859]/20", text: "text-[#00A859]", services: ["Depósitos"] },
    { name: "Visa", type: "Crédito", color: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-600", services: ["Pagos de Cuota"] },
    { name: "Mastercard", type: "Crédito", color: "bg-red-500/10", border: "border-red-500/20", text: "text-red-600", services: ["Pagos de Cuota"] },
    { name: "American Express", type: "Crédito", color: "bg-slate-500/10", border: "border-slate-500/20", text: "text-slate-600", services: ["Pagos de Cuota"] },
    { name: "Diners Club", type: "Crédito", color: "bg-black/5", border: "border-black/10", text: "text-black", services: ["Pagos de Cuota"] },
];

const fadeUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const heroSlides = [
    { image: "/images/bancos/hero-1.png", label: "Depósitos Seguros" },
    { image: "/images/bancos/hero-2.png", label: "Pago de Créditos" },
    { image: "/images/bancos/hero-1.png", label: "Pago de Tarjetas" },
    { image: "/images/bancos/hero-2.png", label: "Préstamos y Créditos" },
];

export default function BancosPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBank, setSelectedBank] = useState<typeof featuredBanks[0] | null>(null);
    const [copied, setCopied] = useState(false);
    const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
    const [selectedEntity, setSelectedEntity] = useState<typeof allEntities[0] | null>(null);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [entityForm, setEntityForm] = useState({ cuenta: "", cedula: "", valor: "", tarjeta: "", operacion: "" });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const filteredEntities = allEntities.filter(entity =>
        entity.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleEntityWhatsApp = () => {
        if (!selectedEntity || !selectedService) return;
        const f = entityForm;
        
        // Validación de monto mínimo
        if (!f.valor || parseFloat(f.valor) < 1) {
            alert("⚠️ El valor mínimo por transacción es de $1.00");
            return;
        }

        let msg = `🏦 *Solicitud Bancaria - PagoExpress*\n\n*Banco:* ${selectedEntity.name}\n*Servicio:* ${selectedService}\n`;
        if (selectedService === "Depósitos") {
            msg += `*Nº Cuenta:* ${f.cuenta}\n*Cédula:* ${f.cedula}\n*Valor:* $${f.valor}`;
        } else if (selectedService === "Pago de Tarjetas de Crédito") {
            msg += `*Nº Tarjeta:* ${f.tarjeta}\n*Cédula:* ${f.cedula}\n*Valor:* $${f.valor}`;
        } else {
            msg += `*Cédula:* ${f.cedula}\n*Nº Operación:* ${f.operacion}\n*Valor:* $${f.valor}`;
        }
        window.open(`https://wa.me/593990227203?text=${encodeURIComponent(msg)}`, "_blank");
    };

    const closeEntityModal = () => {
        setSelectedEntity(null);
        setSelectedService(null);
        setEntityForm({ cuenta: "", cedula: "", valor: "", tarjeta: "", operacion: "" });
    };

    return (
        <main className="min-h-screen bg-white text-pe-black selection:bg-pe-yellow/30" style={{ fontFamily: 'var(--font-inter, "Inter", sans-serif)' }}>

            {/* Modal Detail (Preserved) */}
            <AnimatePresence>
                {selectedBank && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedBank(null)}
                            className="absolute inset-0 bg-pe-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-pe-black border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl overflow-y-auto max-h-[90vh]"
                        >
                            <div className="p-8 relative overflow-hidden">
                                <Image src="/bank_card_bg.png" alt="Background" fill className="object-cover opacity-30" />
                                <div className="absolute inset-0 bg-pe-black/60" />
                                <div className="relative z-10 flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-pe-yellow flex items-center justify-center shadow-lg">
                                            <Landmark className="w-7 h-7 text-pe-black" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-white">{selectedBank.name}</h3>
                                            <p className="text-[10px] font-bold text-pe-yellow uppercase tracking-widest">Acreditación Express</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedBank(null)} className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"><X className="w-5 h-5" /></button>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="space-y-6">
                                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Número de Cuenta</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-2xl font-black text-white">{selectedBank.account}</p>
                                            <button onClick={() => copyToClipboard(selectedBank.account)} className="p-3 bg-pe-yellow rounded-xl text-pe-black font-black text-xs">{copied ? "¡Listo!" : "Copiar"}</button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
                                            <p className="text-white/40 font-bold mb-1 uppercase">Titular</p>
                                            <p className="text-white font-black">{selectedBank.titular}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
                                            <p className="text-white/40 font-bold mb-1 uppercase">Cédula</p>
                                            <p className="text-white font-black">{selectedBank.id}</p>
                                        </div>
                                    </div>
                                    <Link href="https://wa.me/593990227203" target="_blank" className="w-full py-5 bg-pe-yellow text-pe-black font-black rounded-2xl flex items-center justify-center gap-2">
                                        <MessageCircle className="w-5 h-5" /> ENVIAR COMPROBANTE
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal: Entity Service Selector + Form */}
            <AnimatePresence>
                {selectedEntity && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeEntityModal} className="absolute inset-0 bg-pe-black/80 backdrop-blur-md" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-lg bg-white rounded-[2.5rem] overflow-hidden shadow-2xl overflow-y-auto max-h-[90vh]">
                            {/* Header */}
                            <div className="p-6 bg-pe-black text-white flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-pe-yellow flex items-center justify-center"><Landmark className="w-5 h-5 text-pe-black" /></div>
                                    <div>
                                        <h3 className="text-lg font-black">{selectedEntity.name}</h3>
                                        <p className="text-[10px] text-pe-yellow font-bold uppercase tracking-widest">{selectedEntity.type}</p>
                                    </div>
                                </div>
                                <button onClick={closeEntityModal} className="p-2 rounded-full bg-white/10 hover:bg-white/20"><X className="w-5 h-5" /></button>
                            </div>
                            <div className="p-6">
                                {!selectedService ? (
                                    /* Step 1: Choose service type */
                                    <div>
                                        <p className="text-sm font-bold text-pe-black/50 mb-4">¿Qué deseas realizar?</p>
                                        <div className="space-y-3">
                                            {[
                                                { key: "Depósitos", icon: Wallet, desc: "Realiza depósitos inmediatos" },
                                                { key: "Pago de Tarjetas de Crédito", icon: CreditCard, desc: "Pagar cuota de tarjeta" },
                                                { key: "Pago de Préstamos y Créditos", icon: FileText, desc: "Pagar cuota de crédito" }
                                            ].map((opt) => (
                                                <button key={opt.key} onClick={() => setSelectedService(opt.key)} className="w-full p-4 rounded-2xl border border-pe-gray-200 hover:border-pe-yellow hover:bg-pe-yellow/5 transition-all flex items-center gap-4 text-left group">
                                                    <div className="w-10 h-10 rounded-xl bg-pe-gray-50 group-hover:bg-pe-yellow/20 flex items-center justify-center transition-colors"><opt.icon className="w-5 h-5 text-pe-black/60" /></div>
                                                    <div>
                                                        <p className="font-black text-sm text-pe-black">{opt.key}</p>
                                                        <p className="text-xs text-pe-gray-400">{opt.desc}</p>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 ml-auto text-pe-gray-300 group-hover:text-pe-yellow-dark group-hover:translate-x-1 transition-all" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    /* Step 2: Form */
                                    <div>
                                        <button onClick={() => setSelectedService(null)} className="text-xs font-bold text-pe-black/40 hover:text-pe-black mb-4 flex items-center gap-1">← Cambiar servicio</button>
                                        <p className="text-sm font-black text-pe-black mb-4">{selectedService}</p>
                                        <div className="space-y-3">
                                            {selectedService === "Depósitos" && (
                                                <>
                                                    <div className="flex items-center gap-2 mb-1 px-1"><div className="w-1.5 h-1.5 rounded-full bg-pe-yellow" /><p className="text-[10px] font-black uppercase text-pe-black/40">Requisito: Nº de Cuenta</p></div>
                                                    <input placeholder="Número de Cuenta" value={entityForm.cuenta} onChange={(e) => setEntityForm({...entityForm, cuenta: e.target.value})} className="w-full p-3 rounded-xl border border-pe-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pe-yellow/50" />
                                                    <input placeholder="Cédula de Identidad" value={entityForm.cedula} onChange={(e) => setEntityForm({...entityForm, cedula: e.target.value})} className="w-full p-3 rounded-xl border border-pe-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pe-yellow/50" />
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pe-black/40 font-bold text-sm">$</span>
                                                        <input placeholder="Valor (Mín. $1)" type="number" step="0.01" min="1" value={entityForm.valor} onChange={(e) => setEntityForm({...entityForm, valor: e.target.value})} className="w-full pl-7 pr-3 py-3 rounded-xl border border-pe-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pe-yellow/50" />
                                                    </div>
                                                </>
                                            )}
                                            {selectedService === "Pago de Tarjetas de Crédito" && (
                                                <>
                                                    <div className="flex items-center gap-2 mb-1 px-1"><div className="w-1.5 h-1.5 rounded-full bg-pe-yellow" /><p className="text-[10px] font-black uppercase text-pe-black/40">Requisito: Nº de Tarjeta</p></div>
                                                    <input placeholder="Número de Tarjeta" value={entityForm.tarjeta} onChange={(e) => setEntityForm({...entityForm, tarjeta: e.target.value})} className="w-full p-3 rounded-xl border border-pe-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pe-yellow/50" />
                                                    <input placeholder="Cédula de Identidad" value={entityForm.cedula} onChange={(e) => setEntityForm({...entityForm, cedula: e.target.value})} className="w-full p-3 rounded-xl border border-pe-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pe-yellow/50" />
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pe-black/40 font-bold text-sm">$</span>
                                                        <input placeholder="Valor (Mín. $1)" type="number" step="0.01" min="1" value={entityForm.valor} onChange={(e) => setEntityForm({...entityForm, valor: e.target.value})} className="w-full pl-7 pr-3 py-3 rounded-xl border border-pe-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pe-yellow/50" />
                                                    </div>
                                                </>
                                            )}
                                            {selectedService === "Pago de Préstamos y Créditos" && (
                                                <>
                                                    <input placeholder="Cédula de Identidad" value={entityForm.cedula} onChange={(e) => setEntityForm({...entityForm, cedula: e.target.value})} className="w-full p-3 rounded-xl border border-pe-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pe-yellow/50" />
                                                    <input placeholder="Número de Operación" value={entityForm.operacion} onChange={(e) => setEntityForm({...entityForm, operacion: e.target.value})} className="w-full p-3 rounded-xl border border-pe-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pe-yellow/50" />
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pe-black/40 font-bold text-sm">$</span>
                                                        <input placeholder="Valor (Mín. $1)" type="number" step="0.01" min="1" value={entityForm.valor} onChange={(e) => setEntityForm({...entityForm, valor: e.target.value})} className="w-full pl-7 pr-3 py-3 rounded-xl border border-pe-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pe-yellow/50" />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <button onClick={handleEntityWhatsApp} className="w-full mt-6 py-4 bg-green-500 hover:bg-green-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 transition-colors">
                                            <MessageCircle className="w-5 h-5" /> Enviar por WhatsApp
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ═══ SECCIÓN 1: Hero de Conveniencia Bancaria (Rediseño Split) ═══ */}
            <section className="relative h-auto lg:h-[70vh] lg:min-h-0 flex flex-col justify-center bg-pe-black overflow-hidden">
                <div className="max-w-[1600px] mx-auto px-4 lg:px-12 w-full h-full">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center h-full py-12 lg:py-0">
                        
                        {/* COLUMNA IZQUIERDA: Contenido */}
                        <motion.div 
                            initial="hidden" 
                            animate="visible" 
                            variants={fadeUp} 
                            className="relative z-10 text-left order-2 lg:order-1"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pe-yellow/10 border border-pe-yellow/20 mb-8 backdrop-blur-sm">
                                <ShieldCheck className="w-4 h-4 text-pe-yellow" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pe-yellow">Corresponsal No Bancario Autorizado</span>
                            </div>
                            
                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-[1.05] tracking-tight mb-8 uppercase italic text-white" style={{ fontFamily: 'var(--font-lexend-deca, "Lexend Deca", sans-serif)' }}>
                                Depositos, pago de credito, <span className="text-pe-yellow">tarjeta y recaudaciones</span> <br />
                                <span className="text-white/40 italic font-black">de</span> <br />
                                Empresas.
                            </h1>
                            
                            

                            
                            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
                                <Link href="#directorio" className="w-full sm:w-auto px-10 py-5 bg-pe-yellow text-pe-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,221,0,0.15)] uppercase tracking-widest text-[11px]">
                                    Directorio Bancario
                                </Link>
                                <Link href="#servicios-bancarios" className="w-full sm:w-auto px-10 py-5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/5 transition-all uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 backdrop-blur-sm group">
                                    Servicios <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            {/* Slide indicators bottom left desktop */}
                            <div className="flex items-center gap-3">
                                {heroSlides.map((slide, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentHeroSlide(i)}
                                        className={`transition-all duration-700 rounded-full ${currentHeroSlide === i ? "w-12 h-1.5 bg-pe-yellow" : "w-3 h-1.5 bg-white/10 hover:bg-white/20"}`}
                                        aria-label={slide.label}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* COLUMNA DERECHA: Slider Swipe */}
                        <div className="relative h-[350px] sm:h-[450px] lg:h-[550px] order-1 lg:order-2">
                            <div className="absolute inset-0 bg-pe-yellow/5 rounded-[4rem] -rotate-3 scale-95 opacity-50 border border-pe-yellow/10" />
                            <div className="absolute inset-0 bg-pe-black rounded-[4rem] rotate-2 scale-95 border border-white/5 shadow-2xl" />
                            
                            <div className="relative w-full h-full rounded-[4rem] overflow-hidden border border-white/10 shadow-3xl group p-4 lg:p-6">
                                <AnimatePresence initial={false} mode="wait">
                                    <motion.div
                                        key={currentHeroSlide}
                                        initial={{ x: 300, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -300, opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className="absolute inset-4 lg:inset-6 rounded-[2.5rem] overflow-hidden"
                                    >
                                        <Image 
                                            src={heroSlides[currentHeroSlide].image} 
                                            alt={heroSlides[currentHeroSlide].label} 
                                            fill 
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                                            priority 
                                        />
                                        
                                        {/* Info Badge on Image */}
                                        <div className="absolute bottom-6 left-6 right-6 p-6 bg-pe-black/40 backdrop-blur-xl border border-white/10 rounded-2xl text-left transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                                            <p className="text-[9px] font-black text-pe-yellow uppercase tracking-[0.3em] mb-1">Destacado</p>
                                            <h3 className="text-xl font-black text-white uppercase italic leading-none">{heroSlides[currentHeroSlide].label}</h3>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Navigation Arrows */}
                                <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => setCurrentHeroSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
                                        className="w-12 h-12 rounded-full bg-pe-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-pe-yellow hover:text-pe-black transition-all"
                                    >
                                        <ArrowRight className="w-5 h-5 rotate-180" />
                                    </button>
                                    <button 
                                        onClick={() => setCurrentHeroSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
                                        className="w-12 h-12 rounded-full bg-pe-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-pe-yellow hover:text-pe-black transition-all"
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Floating decorative elements */}
                            <motion.div 
                                animate={{ y: [0, -20, 0] }} 
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -right-10 w-40 h-40 bg-pe-yellow/20 rounded-full blur-[80px] -z-10" 
                            />
                            <motion.div 
                                animate={{ y: [0, 20, 0] }} 
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-500/10 rounded-full blur-[100px] -z-10" 
                            />
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 1.5: Servicios Bancarios Unificados (Plan Maestro) ═══ */}
            <section id="servicios-bancarios" className="py-24 bg-white border-b border-pe-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pe-yellow-dark mb-2 block">Transparencia Total</span>
                        <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: 'var(--font-lexend-deca)' }}>Servicios Bancarios <span className="text-pe-yellow-dark">Unificados</span></h2>
                        <p className="text-pe-gray-500 max-w-2xl mx-auto font-medium">Depósitos, pagos de tarjeta y préstamos con comisiones claras. Sin sorpresas.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Wallet, title: "Depósitos",
                                desc: "Efectiviza tu dinero o ahorra al instante en cualquier banco o cooperativa del país.",
                                comision: "$0.39 - $1.00",
                                bancos: ["Pichincha", "Guayaquil", "Pacífico", "Loja", "Produbanco"],
                                requisitos: "Número de Cuenta · Cédula · Valor",
                                limite: "Hasta $2,000 por transacción"
                            },
                            {
                                icon: CreditCard, title: "Pago de Tarjetas de Crédito",
                                desc: "Cancela tus cuotas de tarjetas Visa, Mastercard, Diners y más, de cualquier banco.",
                                comision: "$0.50 - $1.50",
                                bancos: ["Pacificard", "Visa", "Mastercard", "Diners Club", "Bankard"],
                                requisitos: "Número de Tarjeta · Cédula · Valor",
                                limite: "Sin límite de monto"
                            },
                            {
                                icon: FileText, title: "Pago de Préstamos y Créditos",
                                desc: "Paga las cuotas de tus créditos quirografarios, hipotecarios o de consumo.",
                                comision: "$0.50 - $1.00",
                                bancos: ["Pichincha", "Guayaquil", "Solidario", "Cooperativas"],
                                requisitos: "Cédula · Número de Operación · Valor",
                                limite: "Hasta $5,000 por transacción"
                            }
                        ].map((serv, i) => (
                            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                className="p-8 rounded-[3rem] bg-pe-gray-50 border border-pe-gray-200 hover:border-pe-yellow/30 transition-all group hover:shadow-xl"
                            >
                                <serv.icon className="w-10 h-10 text-pe-yellow-dark mb-6 group-hover:scale-110 transition-transform" />
                                <h4 className="text-xl font-black mb-3">{serv.title}</h4>
                                <p className="text-sm text-pe-gray-500 font-medium leading-relaxed mb-6">{serv.desc}</p>


                                <div className="mb-4">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-pe-black/40 mb-2">Bancos Disponibles</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {serv.bancos.map((b, idx) => (
                                            <span key={idx} className="px-2.5 py-1 bg-white rounded-lg text-[10px] font-bold text-pe-black/60 border border-pe-gray-100">{b}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2 text-xs text-pe-black/50">
                                    <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /><span>{serv.requisitos}</span></div>
                                    <div className="flex items-start gap-2"><ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" /><span>{serv.limite}</span></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 2: Directorio de Instituciones (Bento Grid) ═══ */}
            <section id="directorio" className="py-24 bg-pe-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: 'var(--font-lexend-deca)' }}>Directorio de Instituciones</h2>
                            <p className="text-pe-gray-500 font-medium">Cada entidad brilla con su propia identidad bajo nuestro respaldo nacional.</p>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pe-gray-400" />
                            <input
                                type="text" placeholder="Buscar banco o coop..."
                                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white border border-pe-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pe-yellow/50"
                            />
                        </div>
                    </div>

                    {/* Desktop View: Standard Grid */}
                    <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredEntities.map((entity, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                onClick={() => setSelectedEntity(entity)}
                                className={`group p-8 rounded-[2.5rem] bg-white border ${entity.border} transition-all hover:scale-[1.03] shadow-sm hover:shadow-xl cursor-pointer`}
                            >
                                <div className={`w-12 h-12 rounded-xl ${entity.color} ${entity.text} flex items-center justify-center mb-6`}>
                                    <Landmark className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-black mb-1 text-pe-black">{entity.name}</h3>
                                <p className="text-[10px] font-bold text-pe-gray-400 uppercase tracking-widest mb-6">{entity.type}</p>
                                <div className="space-y-3">
                                    {entity.services.map((s, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-xs font-bold text-pe-black/70">
                                            <Check className={`w-4 h-4 ${entity.text}`} />
                                            {s}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile View: 3-item Paginated Carousel */}
                    <div className="sm:hidden overflow-hidden">
                        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 scrollbar-hide -mx-4 px-4">
                            {/* Chunking into groups of 3 for the slide experience */}
                            {Array.from({ length: Math.ceil(filteredEntities.length / 3) }).map((_, slideIndex) => (
                                <div key={slideIndex} className="min-w-[85vw] snap-center flex flex-col gap-4">
                                    {filteredEntities.slice(slideIndex * 3, slideIndex * 3 + 3).map((entity, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setSelectedEntity(entity)}
                                            className={`p-6 rounded-[2rem] bg-white border ${entity.border} shadow-sm cursor-pointer active:scale-[0.98] transition-transform`}
                                        >
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className={`w-10 h-10 rounded-xl ${entity.color} ${entity.text} flex items-center justify-center`}>
                                                    <Landmark className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black text-pe-black leading-tight">{entity.name}</h3>
                                                    <p className="text-[9px] font-bold text-pe-gray-400 uppercase tracking-widest">{entity.type}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 text-[10px] font-bold text-pe-black/70">
                                                {entity.services.map((s, idx) => (
                                                    <div key={idx} className="flex items-center gap-1 bg-pe-gray-50 px-2 py-1 rounded-lg">
                                                        <Check className={`w-3 h-3 ${entity.text}`} />
                                                        {s}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center gap-2 mt-2">
                            {Array.from({ length: Math.ceil(filteredEntities.length / 3) }).map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-pe-black/10" />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 2.1: Cuentas Destacadas (Preserving the card grid) */}
            <section className="py-24 bg-pe-black text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <h2 className="text-3xl font-black mb-12 text-center" style={{ fontFamily: 'var(--font-lexend-deca)' }}>Transferencias <span className="text-pe-yellow">Directas PagoExpress</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredBanks.map((bank, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                onClick={() => setSelectedBank(bank)}
                                className="relative h-64 rounded-[3rem] overflow-hidden group cursor-pointer border border-white/10"
                            >
                                <Image src={bank.bgImage} alt={bank.name} fill className="object-cover transition-transform group-hover:scale-110 opacity-40" />
                                <div className="absolute inset-0 bg-gradient-to-t from-pe-black p-8 flex flex-col justify-end">
                                    <h4 className="text-2xl font-black mb-2">{bank.name}</h4>
                                    <p className="text-xs text-pe-gray-400 mb-4 line-clamp-1">{bank.description}</p>
                                    <div className="flex items-center gap-2 text-pe-yellow font-bold text-[10px] uppercase tracking-widest">
                                        Ver datos <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>






            {/* ═══ SECCIÓN 6: Ubicaciones y Horarios (Rediseño 3 Columnas) ═══ */}
            <section className="py-24 bg-pe-gray-50 overflow-hidden">
                <div className="max-w-[1600px] mx-auto px-4">
                    <div className="bg-white rounded-[4rem] overflow-hidden shadow-3xl flex flex-col lg:flex-row border border-pe-gray-100 min-h-[750px]">

                        {/* COUMNA 1: Valor (Black) */}
                        <div className="lg:w-1/3 bg-pe-black p-10 lg:p-16 flex flex-col justify-center text-white border-r border-white/5">
                            <div className="inline-flex items-center gap-2 text-pe-yellow mb-8">
                                <Clock className="w-5 h-5" />
                                <span className="font-black uppercase tracking-[0.2em] text-[10px]">Diferenciador Clave</span>
                            </div>
                            <h3 className="text-4xl lg:text-5xl font-black mb-10 leading-[1.1]" style={{ fontFamily: 'var(--font-lexend-deca)' }}>
                                Atendemos cuando el banco <span className="text-pe-yellow">ya cerró.</span>
                            </h3>
                            <div className="space-y-4">
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                                    <p className="text-pe-yellow font-black text-[9px] uppercase tracking-widest mb-2">Fines de Semana</p>
                                    <p className="text-sm font-medium text-white/90">Atención especial Sábados y Domingos en La Castellana.</p>
                                </div>
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                                    <p className="text-pe-yellow font-black text-[9px] uppercase tracking-widest mb-2">Horarios Extendidos</p>
                                    <p className="text-sm font-medium text-white/90">Atención hasta las 18h00 en Matriz Miguel Riofrío.</p>
                                </div>
                            </div>
                        </div>

                        {/* COLUMNA 2: Mapa (Solo el iframe) */}
                        <div className="lg:w-1/3 bg-pe-gray-50 p-10 flex items-center justify-center border-r border-pe-gray-100">
                            <div className="w-full h-full max-h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border border-pe-gray-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.103773883154!2d-79.1999948!3d-3.999083700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cb397d349953f7%3A0xdea692caf196a0e7!2sPago%20Express%20Servicios%20Financieros!5e0!3m2!1ses-419!2sec!4v1772581023091!5m2!1ses-419!2sec"
                                    className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>

                        {/* COLUMNA 3: Agencias (White) */}
                        <div className="lg:w-1/3 bg-white p-10 lg:p-16 flex flex-col justify-center">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pe-black/40 mb-2">Canales de Atención</span>
                            <h3 className="text-3xl font-black mb-10 text-pe-black uppercase leading-none" style={{ fontFamily: 'var(--font-lexend-deca)' }}>
                                Visítanos <br /> en <span className="text-pe-black/30">nuestras agencias</span>
                            </h3>

                            <div className="space-y-4 mb-8">
                                {[
                                    { name: "Agencia Matriz", dir: "Miguel Riofrío y Olmedo", h1: "Lun - Sáb: 08:00 - 19:00", h2: "Dom: 09:00 - 14:00" },
                                    { name: "Sucursal La Castellana", dir: "Av. Salvador Bustamante Celi", h1: "Lun - Vie: 08:30 - 18:30", h2: "Sáb: 09:00 - 16:00" }
                                ].map((agency, i) => (
                                    <div key={i} className="p-5 rounded-3xl bg-pe-gray-50 border border-pe-gray-100 group hover:border-pe-yellow transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-pe-black flex items-center justify-center shrink-0">
                                                <MapPin className="w-5 h-5 text-pe-yellow" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-pe-black uppercase text-xs">{agency.name}</h4>
                                                <p className="text-[10px] text-pe-gray-500 mb-2 italic">{agency.dir}</p>
                                                <div className="flex flex-col gap-0.5">
                                                    <p className="text-[8px] font-bold text-pe-black/40 uppercase tracking-widest">{agency.h1}</p>
                                                    <p className="text-[8px] font-bold text-pe-black/40 uppercase tracking-widest">{agency.h2}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="https://maps.google.com"
                                target="_blank"
                                className="w-full py-4 bg-pe-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all shadow-xl"
                            >
                                <MapPin className="w-4 h-4 text-pe-yellow" /> ABRIR EN GOOGLE MAPS
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 text-center">
                <p className="text-xs font-bold text-pe-gray-400 uppercase tracking-[0.3em] mb-8">PagoExpress Ecuador · Agente Multibanco</p>
                <div className="flex justify-center gap-4">
                    <Link href="https://wa.me/593" className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
                        <MessageCircle className="w-6 h-6" />
                    </Link>
                    <Link href="#guia" className="w-14 h-14 bg-pe-black rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
                        <HelpCircle className="w-6 h-6" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
