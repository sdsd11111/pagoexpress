"use client";

import { useState } from "react";
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
    { name: "Banco del Pacífico", type: "Nacional", color: "bg-[#0054A6]/10", border: "border-[#0054A6]/20", text: "text-[#0054A6]", services: ["Depósitos", "Retiros", "Préstamos"] },
    { name: "Banco Pichincha", type: "Nacional", color: "bg-[#FFDD00]/10", border: "border-[#FFDD00]/30", text: "text-[#B89B00]", services: ["Depósitos", "Retiros", "Recaudaciones"] },
    { name: "Banco Bolivariano", type: "Nacional", color: "bg-[#2C62A7]/10", border: "border-[#2C62A7]/20", text: "text-[#2C62A7]", services: ["Depósitos", "Retiros"] },
    { name: "Banco Guayaquil", type: "Nacional", color: "bg-[#E63946]/10", border: "border-[#E63946]/20", text: "text-[#E63946]", services: ["Depósitos", "Retiros", "Transferencias"] },
    { name: "CoopMego", type: "Cooperativa", color: "bg-[#2D6A4F]/10", border: "border-[#2D6A4F]/20", text: "text-[#2D6A4F]", services: ["Ahorros", "Retiros", "Cuotas"] },
    { name: "Jardín Azuayo", type: "Cooperativa", color: "bg-[#F3CF1D]/10", border: "border-[#F3CF1D]/30", text: "text-[#9B8400]", services: ["Ahorros", "Cuotas"] },
    { name: "Coop. JEP", type: "Cooperativa", color: "bg-[#004A99]/10", border: "border-[#004A99]/20", text: "text-[#004A99]", services: ["Depósitos", "Retiros"] },
    { name: "Coop. Loja", type: "Cooperativa", color: "bg-[#00A859]/10", border: "border-[#00A859]/20", text: "text-[#00A859]", services: ["Depósitos", "Retiros"] },
    { name: "Visa", type: "Crédito", color: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-600", services: ["Pagos de Cuota"] },
    { name: "Mastercard", type: "Crédito", color: "bg-red-500/10", border: "border-red-500/20", text: "text-red-600", services: ["Pagos de Cuota"] },
    { name: "American Express", type: "Crédito", color: "bg-slate-500/10", border: "border-slate-500/20", text: "text-slate-600", services: ["Pagos de Cuota"] },
    { name: "Diners Club", type: "Crédito", color: "bg-black/5", border: "border-black/10", text: "text-black", services: ["Pagos de Cuota"] },
];

const fadeUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function BancosPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBank, setSelectedBank] = useState<typeof featuredBanks[0] | null>(null);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const filteredEntities = allEntities.filter(entity =>
        entity.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

            {/* ═══ SECCIÓN 1: Hero de Conveniencia Bancaria ═══ */}
            <section className="relative min-h-[calc(100dvh-64px)] lg:h-[70vh] lg:min-h-[600px] flex flex-col justify-center overflow-hidden bg-white pt-20 lg:pt-0">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(247,239,77,0.1),transparent)]" />
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-pe-yellow/5 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center flex-grow flex flex-col justify-start lg:justify-center mt-2 lg:mt-0">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pe-black/5 border border-pe-black/10 mb-6">
                            <ShieldCheck className="w-4 h-4 text-pe-yellow-dark" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pe-black/60">Corresponsal No Bancario Autorizado</span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6 lg:mb-8 uppercase italic" style={{ fontFamily: 'var(--font-lexend-deca, "Lexend Deca", sans-serif)' }}>
                            Corresponsal Bancario en Loja: <span className="text-pe-yellow-dark">Toda la Banca</span> en un Solo Lugar.
                        </h1>
                        <p className="text-base sm:text-xl text-pe-gray-500 mb-10 lg:mb-12 leading-relaxed font-medium">
                            Realiza depósitos y retiros de Banco Pichincha, Guayaquil, Pacífico, Produbanco y cooperativas. Sin filas, con seguridad total y atención en Loja.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="#directorio" className="px-12 py-5 bg-pe-black text-white font-bold rounded-2xl hover:bg-pe-black-pure transition-all shadow-xl uppercase tracking-widest text-xs">
                                Consultar Bancos Disponibles
                            </Link>
                            <Link href="#guia" className="px-12 py-5 border border-pe-black/10 text-pe-black font-bold rounded-2xl hover:bg-pe-gray-50 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                                Límites de Retiro <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
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
                                className={`group p-8 rounded-[2.5rem] bg-white border ${entity.border} transition-all hover:scale-[1.03] shadow-sm hover:shadow-xl`}
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
                                            className={`p-6 rounded-[2rem] bg-white border ${entity.border} shadow-sm`}
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

            {/* ═══ SECCIÓN 3: Servicios Financieros Específicos ═══ */}
            <section className="py-24 bg-white border-b border-pe-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: 'var(--font-lexend-deca)' }}>Servicios Financieros Especializados</h2>
                        <p className="text-pe-gray-500 max-w-2xl mx-auto">Más que corresponsalía, somos tu aliado para trámites bancarios complejos.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { t: "Depósitos y Retiros", d: "Efectiviza tu dinero o ahorra al instante sin filas.", icon: Wallet },
                            { t: "Pago de Tarjetas", d: "Cancela tus cuotas de cualquier banco nacional.", icon: CreditCard },
                            { t: "Recaudaciones", d: "IESS, ANT, Multas de Tránsito y Municipales.", icon: FileText },
                            { t: "Consulta de Saldos", d: "Verifica tu estado de cuenta antes de retirar.", icon: GanttChartSquare }
                        ].map((serv, i) => (
                            <div key={i} className="p-10 rounded-[3rem] bg-pe-gray-50 hover:bg-pe-yellow/5 transition-colors border border-transparent hover:border-pe-yellow/20 group">
                                <serv.icon className="w-10 h-10 text-pe-yellow-dark mb-6 group-hover:scale-110 transition-transform" />
                                <h4 className="text-xl font-black mb-3">{serv.t}</h4>
                                <p className="text-sm text-pe-gray-500 font-medium leading-relaxed">{serv.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 4: Seguridad y Cumplimiento ═══ */}
            <section className="py-32 relative overflow-hidden bg-pe-black text-white">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pe-yellow via-white to-pe-yellow opacity-20" />
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <div className="w-20 h-20 rounded-3xl bg-pe-yellow/20 flex items-center justify-center mx-auto mb-10 border border-pe-yellow/30">
                            <ShieldCheck className="w-10 h-10 text-pe-yellow" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-8" style={{ fontFamily: 'var(--font-lexend-deca)' }}>Seguridad y Cumplimiento</h2>
                        <p className="text-xl text-pe-gray-300 font-medium mb-12 leading-relaxed">
                            "Operamos bajo la normativa de la <span className="text-white font-black">Superintendencia de Bancos</span> y la <span className="text-white font-black">SEPS</span>. Todas tus transacciones emiten un comprobante físico legal".
                        </p>
                        <div className="grid sm:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center gap-3">
                                <Lock className="w-6 h-6 text-pe-yellow" />
                                <p className="text-[10px] font-black tracking-widest uppercase">Encriptación SSL</p>
                            </div>
                            <div className="flex flex-col items-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-pe-yellow" />
                                <p className="text-[10px] font-black tracking-widest uppercase">Certificados SEPS</p>
                            </div>
                            <div className="flex flex-col items-center gap-3">
                                <UserCheck className="w-6 h-6 text-pe-yellow" />
                                <p className="text-[10px] font-black tracking-widest uppercase">Protección de Datos</p>
                            </div>
                        </div>
                        <p className="mt-16 text-xs text-white/30 font-bold uppercase tracking-[0.2em] italic">Tus datos bancarios son confidenciales y están protegidos por leyes de seguridad financiera.</p>
                    </motion.div>
                </div>
            </section>

            {/* ═══ SECCIÓN 5: Guía para el Usuario (Requisitos) ═══ */}
            <section id="guia" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center mb-16">
                    <h2 className="text-4xl font-black mb-6" style={{ fontFamily: 'var(--font-lexend-deca)' }}>Guía de Requisitos</h2>
                    <p className="text-pe-gray-500 font-medium max-w-xl mx-auto">Revisa lo que necesitas antes de acercarte a cualquiera de nuestros puntos.</p>
                </div>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {[
                            { t: "Para Retiros", i: ["Cédula de Identidad original", "Teléfono para código OTP (si aplica)", "Tarjeta de débito (si el banco requiere)"] },
                            { t: "Para Depósitos", i: ["Número de cuenta de destino", "Nombre completo del beneficiario", "Cédula del depositante"] },
                            { t: "Para Pagos", i: ["Código de operación o contrato", "Monto exacto de la cuota", "Número de cédula del titular"] }
                        ].map((req, i) => (
                            <div key={i} className="p-10 rounded-[3rem] bg-pe-gray-50 border border-pe-gray-200">
                                <h3 className="text-xl font-black mb-6 flex items-center gap-3 underline decoration-pe-yellow decoration-4 underline-offset-4">{req.t}</h3>
                                <ul className="space-y-4">
                                    {req.i.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm font-bold text-pe-black/60">
                                            <div className="w-5 h-5 rounded-full bg-pe-yellow flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3 h-3 text-pe-black" /></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
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
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pe-black/40 mb-2">Ubicados en Loja</span>
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
                <p className="text-xs font-bold text-pe-gray-400 uppercase tracking-[0.3em] mb-8">PagoExpress Loja · Agente Multibanco</p>
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
