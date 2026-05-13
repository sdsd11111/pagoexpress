"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { REDACTIVA_DATA } from '@/data/redactiva_data';
import { REDACTIVA_TARIFAS } from '@/data/redactiva_tarifas';
import {
    Send,
    ArrowRight,
    MessageCircle,
    Globe,
    Smartphone,
    CreditCard,
    Clock,
    ShieldCheck,
    MapPin,
    RefreshCcw,
    Zap,
    Scale,
    HelpCircle,
    CheckCircle2,
    ChevronDown,
    Calculator,
    Info,
    Upload,
    ChevronRight,
    QrCode,
    Banknote,
    FileText,
    ArrowLeft,
    Search
} from "lucide-react";
import Image from "next/image";

// Western Union Official Colors
const WU_YELLOW = "#FFDD00";
const WU_BLACK = "#000000";

const locations = [
    {
        name: "Agencia Matriz",
        address: "Miguel Riofrío 1203 y Olmedo",
        city: "Loja, Ecuador",
        phone: "07-2571234",
        hours: "Lun - Vie: 06h30 - 19h30 | Sáb: 08h00 - 16h00",
        mapsUrl: "https://maps.app.goo.gl/zeNg6ZCSPHosJvZw6"
    },
    {
        name: "Parque Bolívar",
        address: "Colón 6838 y Av. Manuel Agustín Aguirre",
        city: "Loja, Ecuador",
        phone: "07-2581234",
        hours: "Lun - Vie: 09h00 - 18h00 | Sáb: 09h00 - 13h00",
        mapsUrl: "https://maps.app.goo.gl/zeNg6ZCSPHosJvZw6"
    }
];

const faqs = [
    {
        q: "¿Cuánto tiempo tengo para cobrar una transferencia?",
        a: "Las transferencias de Western Union suelen estar disponibles por hasta 90 días. Sin embargo, recomendamos cobrarlas lo antes posible para evitar inconvenientes con la fecha de expiración del código MTCN proporcionado por el remitente."
    },
    {
        q: "¿Puedo recibir dinero si mi cédula está caducada?",
        a: "No. Por normativas de seguridad bancaria y de Western Union, es estrictamente obligatorio presentar la Cédula de Identidad original y vigente. En caso de pérdida, puedes presentar el pasaporte original o la licencia de conducir ecuatoriana vigente como identificación alternativa."
    },
    {
        q: "¿Qué es el código MTCN?",
        a: "El MTCN (Money Transfer Control Number) es un número de control de transferencia de 10 dígitos único para cada transferencia. Es indispensable presentarlo en ventanilla junto con tu identificación para procesar el cobro."
    }
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const sweepRight: Variants = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } };
const sweepLeft: Variants = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } };

// ═══ Data Helpers ═══
const COUNTRIES = Object.values(REDACTIVA_DATA)
    .map(c => c.pais)
    .sort((a, b) => a.localeCompare(b));

const COUNTRY_MAP = Object.values(REDACTIVA_DATA).reduce((acc, curr) => {
    acc[curr.pais] = curr;
    return acc;
}, {} as Record<string, any>);

const TARIFA_MAP = REDACTIVA_TARIFAS as Record<string, any>;

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-black/5 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <span className="text-lg font-black uppercase tracking-tight text-black group-hover:text-black/60 transition-colors">{question}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 text-pe-gray-500 font-medium leading-relaxed">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function WesternUnionPage() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [cobroStep, setCobroStep] = useState(1);
    const [appStep, setAppStep] = useState(1);
    const [channel, setChannel] = useState<"cobro" | "envio" | "app" | null>(null);
    const [formData, setFormData] = useState({
        mtcn: "",
        appCode: "",
        amount: "100",
        beneficiary: "",
        sender: "",
        idFront: null as File | null,
        idBack: null as File | null,
        receipt: null as File | null,
        idFrontUrl: "",
        idBackUrl: "",
        receiptUrl: ""
    });
    const [isUploading, setIsUploading] = useState(false);
    const [selectedCountryName, setSelectedCountryName] = useState("Estados Unidos");
    const [result, setResult] = useState<any>(null);
    const [isCountryListOpen, setIsCountryListOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Dynamic Calculation Logic
    const calculateCommission = (amount: number, countryName: string) => {
        const countryData = COUNTRY_MAP[countryName];
        const countryIso = countryData?.iso;
        const baseRateData = TARIFA_MAP[countryIso];

        // Base commission for $100 from JSON (raw.costDetails.charges is in cents)
        const jsonChargesCents = parseInt(countryData?.raw?.costDetails?.charges || "500");
        const baseCommissionFor100 = jsonChargesCents / 100;

        let commission = 0;
        const scaleFactor = baseCommissionFor100 / 5.00; // Scale relative to our standard $5.00 tier for $100

        // Tiered logic scaled by the country's base rate
        if (amount <= 50) commission = 3.50 * scaleFactor;
        else if (amount <= 100) commission = 5.00 * scaleFactor;
        else if (amount <= 200) commission = 8.00 * scaleFactor;
        else if (amount <= 300) commission = 12.00 * scaleFactor;
        else if (amount <= 400) commission = 16.00 * scaleFactor;
        else if (amount <= 500) commission = 20.00 * scaleFactor;
        else commission = amount * 0.04;

        // Ensure a reasonable minimum commission
        commission = Math.max(commission, 1.50);

        // IVA is 15% of the commission in Ecuador
        const iva = commission * 0.15;

        // ISD is 5% of the amount for international transfers (simplified)
        // If it's internal (EC), ISD is 0.
        const isd = (countryIso !== 'EC') ? amount * 0.05 : 0;

        return {
            commission,
            iva,
            isd,
            total: amount + commission + iva + isd
        };
    };

    useEffect(() => {
        const amt = parseFloat(formData.amount);
        if (amt >= 1 && selectedCountryName) {
            const results = calculateCommission(amt, selectedCountryName);
            setResult(results);
        } else {
            setResult(null);
        }
    }, [formData.amount, selectedCountryName]);

    const handleFileUpload = async (file: File, type: "idFront" | "idBack" | "receipt") => {
        setIsUploading(true);
        const data = new FormData();
        data.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: data });
            const result = await res.json();
            if (result.url) {
                setFormData(prev => ({ ...prev, [`${type}Url`]: result.url, [type]: file }));
            }
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleWhatsAppSubmit = (selectedChannel: "cobro" | "envio" | "app") => {
        let message = "";
        if (selectedChannel === "cobro") {
            message = `*NUEVO COBRO WESTERN UNION*%0A%0A` +
                `*MTCN:* ${formData.mtcn}%0A` +
                `*Beneficiario:* ${formData.beneficiary}%0A` +
                `*Cédula Frontal:* ${formData.idFrontUrl}%0A` +
                `*Cédula Posterior:* ${formData.idBackUrl}`;
        } else if (selectedChannel === "app") {
            message = `*NUEVO ENVÍO POR APP (WESTERN UNION)*%0A%0A` +
                `*Código App (6 dígitos):* ${formData.appCode}%0A` +
                `*Monto a Depositar:* $${formData.amount}%0A` +
                `*Comprobante Transferencia:* ${formData.receiptUrl}`;
        } else {
            message = `*SOLICITUD DE ENVÍO WESTERN UNION*%0A%0A` +
                `*Monto:* $${formData.amount}%0A` +
                `*País Destino:* ${selectedCountryName}%0A` +
                `*Tarifa:* $${result?.commission.toFixed(2)}%0A` +
                `*IVA:* $${result?.iva.toFixed(2)}%0A` +
                `*ISD:* $${result?.isd.toFixed(2)}%0A` +
                `*Total Estimado:* $${result?.total.toFixed(2)}`;
        }

        window.open(`https://wa.me/593990227203?text=${message}`, "_blank");
    };

    const [currentSlide, setCurrentSlide] = useState(0);
    const heroSlides = [
        { url: "/images/header logo/western-union.webp", alt: "Western Union Agente Oficial" },
        { url: "/paying-wu.png", alt: "Pagando en Western Union" }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    return (
        <main className="min-h-screen bg-white text-black selection:bg-black selection:text-[#FFDD00] font-sans">
            <section className="relative overflow-hidden min-h-[70vh] flex items-center bg-[#FFDD00]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side: Content */}
                        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center lg:text-left order-2 lg:order-1">
                            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-black/10 mb-8 bg-black/5 backdrop-blur-sm">
                                <div className="flex items-center gap-2 border-r border-black/20 pr-3">
                                    <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/70">Agente Oficial</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Image src="/images/header logo/western-union.webp" alt="Western Union" width={80} height={20} className="h-4 w-auto object-contain" />
                                    <div className="w-px h-3 bg-black/20" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-black/50">Red Activa</span>
                                </div>
                            </div>

                            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[1] tracking-tighter mb-4 uppercase text-black italic">
                                WESTERN UNION<br />
                                <span className="opacity-40 text-3xl sm:text-4xl lg:text-5xl block mt-2">EN TODO EL ECUADOR</span>
                            </h1>
                            <p className="text-xl sm:text-2xl font-medium text-black/70 mb-10">
                                Mejores tarifas, envío y recepción.
                            </p>

                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                <button
                                    onClick={() => {
                                        setChannel("cobro");
                                        setCobroStep(1);
                                        document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-[#FFDD00] font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20"
                                >
                                    <Zap className="w-5 h-5 group-hover:scale-110 transition-transform fill-[#FFDD00]" />
                                    Cobrar Giro
                                </button>
                                <button
                                    onClick={() => {
                                        setChannel("envio");
                                        document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-black text-black font-black rounded-full hover:bg-black/5 transition-all uppercase tracking-widest text-sm"
                                >
                                    Enviar Dinero
                                    <Send className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => {
                                        setChannel("app");
                                        setAppStep(1);
                                        document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-transparent text-black font-black rounded-full hover:shadow-xl hover:scale-105 transition-all uppercase tracking-widest text-sm shadow-md"
                                >
                                    <Smartphone className="w-4 h-4" />
                                    Pago por App
                                </button>
                            </div>
                        </motion.div>

                        {/* Right Side: Slider */}
                        <div className="relative h-[350px] sm:h-[450px] lg:h-[550px] order-1 lg:order-2">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="relative w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                                        <Image
                                            src={heroSlides[currentSlide].url}
                                            alt={heroSlides[currentSlide].alt}
                                            fill
                                            className="object-contain p-4 lg:p-8"
                                            priority
                                        />
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                            
                            {/* Decorative elements behind image */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-black/5 rounded-full blur-3xl -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Section 2: Diferenciadores Locales ═══ */}
            <section className="py-24 bg-black text-white relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase italic tracking-tighter leading-tight">
                                ¿POR QUÉ <span style={{ color: WU_YELLOW }}>PAGOEXPRESS</span> <br />EN LUGAR DEL BANCO?
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { title: "Sin Filas Bancarias", desc: "Atención ágil pensada en tu tiempo, sin esperas innecesarias.", icon: Clock },
                                    { title: "Horarios Extendidos", desc: "Atendemos cuando otros cierran, incluyendo fines de semana.", icon: RefreshCcw },
                                    { title: "Ubicaciones Estratégicas", desc: "En puntos estratégicos de la ciudad, cerca de donde te encuentras.", icon: MapPin }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-5 p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-[#FFDD00] flex items-center justify-center shrink-0">
                                            <item.icon className="w-6 h-6 text-black" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black mb-1 uppercase tracking-tight">{item.title}</h4>
                                            <p className="text-white/40 font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 group">
                            <Image src="/images/header logo/western-union.webp" alt="Western Union Official Agent" fill className="object-contain p-20 grayscale group-hover:grayscale-0 transition-all duration-700 opacity-20" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            <div className="absolute bottom-12 left-12 right-12 text-center">
                                <div className="text-5xl font-black text-[#FFDD00] mb-2 uppercase italic tracking-tighter">19+ Años</div>
                                <div className="text-xs font-black uppercase tracking-[0.3em] text-white/50">Sirviendo a la comunidad ecuatoriana</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Section: Interactive Simulator (The 3 Channels) ═══ */}
            <section id="simulador" className="py-24 bg-white border-b border-black/5 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-5xl font-black text-black uppercase italic tracking-tighter">
                            ¿QUÉ DESEAS <span className="text-black/30">REALIZAR HOY?</span>
                        </h2>
                        <p className="mt-4 text-pe-gray-500 font-medium">Inicia tu trámite digital directamente desde nuestras ventanillas virtuales.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        {/* Flow 1: COBRO DE GIRO */}
                        <div className="bg-pe-gray-50 border border-pe-gray-100 rounded-[3rem] p-8 md:p-10 relative overflow-hidden h-full flex flex-col">
                            <div className="text-center mb-10">
                                <div className="inline-block p-4 rounded-3xl bg-black text-[#FFDD00] mb-6">
                                    <Banknote className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-black uppercase italic tracking-tighter leading-tight">COBRO DE<br />TRANSFERENCIA</h3>
                            </div>

                            <div className="flex-1 space-y-8">
                                {cobroStep === 1 ? (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-black/40 px-4">Código MTCN (10 dígitos)</label>
                                                <input
                                                    type="text"
                                                    maxLength={10}
                                                    value={formData.mtcn}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, mtcn: e.target.value }))}
                                                    placeholder="000-000-0000"
                                                    className="w-full bg-white border border-pe-gray-100 rounded-2xl p-6 text-xl font-black focus:outline-none focus:border-[#FFDD00] transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-black/40 px-4">Beneficiario</label>
                                                <input
                                                    type="text"
                                                    value={formData.beneficiary}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, beneficiary: e.target.value }))}
                                                    placeholder="Nombres y Apellidos"
                                                    className="w-full bg-white border border-pe-gray-100 rounded-2xl p-6 text-lg font-bold focus:outline-none focus:border-[#FFDD00] transition-all"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            disabled={!formData.mtcn || !formData.beneficiary}
                                            onClick={() => setCobroStep(2)}
                                            className="w-full py-6 bg-black text-[#FFDD00] font-black rounded-2xl flex items-center justify-center gap-3 disabled:opacity-30 transition-all uppercase tracking-widest"
                                        >
                                            Identidad <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-black/40 block text-center">Cédula Frontal</label>
                                                <div className="relative aspect-[3/2] bg-white border-2 border-dashed border-pe-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                                                    {formData.idFrontUrl ? <Image src={formData.idFrontUrl} alt="ID Front" fill className="object-cover" /> : <Upload className="w-6 h-6 text-black/20" />}
                                                    <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "idFront")} className="absolute inset-0 opacity-0 cursor-pointer" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-black/40 block text-center">Cédula Posterior</label>
                                                <div className="relative aspect-[3/2] bg-white border-2 border-dashed border-pe-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                                                    {formData.idBackUrl ? <Image src={formData.idBackUrl} alt="ID Back" fill className="object-cover" /> : <Upload className="w-6 h-6 text-black/20" />}
                                                    <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "idBack")} className="absolute inset-0 opacity-0 cursor-pointer" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => setCobroStep(1)} className="p-6 bg-black/5 rounded-2xl"><ArrowLeft className="w-5 h-5" /></button>
                                            <button
                                                disabled={!formData.idFrontUrl || !formData.idBackUrl || isUploading}
                                                onClick={() => handleWhatsAppSubmit("cobro")}
                                                className="flex-1 py-6 bg-[#FFDD00] text-black font-black rounded-2xl uppercase tracking-widest shadow-xl shadow-[#FFDD00]/20"
                                            >
                                                Cobrar Ahora
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* Flow 2: ENVÍO POR APP */}
                        <div className="bg-pe-gray-50 border border-pe-gray-100 rounded-[3rem] p-8 md:p-10 relative overflow-hidden h-full flex flex-col">
                            <div className="text-center mb-10">
                                <div className="inline-block p-4 rounded-3xl bg-black text-[#FFDD00] mb-6">
                                    <Smartphone className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-black uppercase italic tracking-tighter leading-tight">PAGO DE<br />ENVÍO POR APP</h3>
                            </div>

                            <div className="flex-1 space-y-8">
                                {appStep === 1 ? (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-black/40 px-4">Código App (6 dígitos)</label>
                                                <input
                                                    type="text"
                                                    maxLength={6}
                                                    value={formData.appCode}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, appCode: e.target.value }))}
                                                    placeholder="000 000"
                                                    className="w-full bg-white border border-pe-gray-100 rounded-2xl p-6 text-xl font-black focus:outline-none focus:border-[#FFDD00] transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-black/40 px-4">Monto ($)</label>
                                                <input
                                                    type="number"
                                                    value={formData.amount}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                                                    className="w-full bg-white border border-pe-gray-100 rounded-2xl p-6 text-xl font-black focus:outline-none focus:border-[#FFDD00] transition-all"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            disabled={!formData.appCode || !formData.amount}
                                            onClick={() => setAppStep(2)}
                                            className="w-full py-6 bg-black text-[#FFDD00] font-black rounded-2xl flex items-center justify-center gap-3 disabled:opacity-30 transition-all uppercase tracking-widest"
                                        >
                                            Adjuntar Comprobante <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                        <div className="relative group aspect-video bg-white border-2 border-dashed border-pe-gray-100 rounded-3xl flex flex-col items-center justify-center overflow-hidden">
                                            {formData.receiptUrl ? <Image src={formData.receiptUrl} alt="Receipt" fill className="object-contain p-4" /> : <FileText className="w-10 h-10 text-black/10" />}
                                            <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "receipt")} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => setAppStep(1)} className="p-6 bg-black/5 rounded-2xl"><ArrowLeft className="w-5 h-5" /></button>
                                            <button
                                                disabled={!formData.receiptUrl || isUploading}
                                                onClick={() => handleWhatsAppSubmit("app")}
                                                className="flex-1 py-6 bg-[#FFDD00] text-black font-black rounded-2xl uppercase tracking-widest shadow-xl shadow-[#FFDD00]/20"
                                            >
                                                Pagar Ahora
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* Flow 3: COTIZADOR / ENVÍO */}
                        <div className="bg-black rounded-[3rem] p-8 md:p-10 relative overflow-hidden h-full flex flex-col text-white">
                            <div className="text-center mb-10">
                                <div className="inline-block p-4 rounded-3xl bg-[#FFDD00] text-black mb-6">
                                    <Send className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-tight">COTIZADOR DE<br />ENVÍOS</h3>
                            </div>

                            <div className="flex-1 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2 relative">
                                        <label className="text-[10px] font-black uppercase text-white/40 px-4 tracking-widest">País</label>
                                        <button
                                            onClick={() => setIsCountryListOpen(!isCountryListOpen)}
                                            className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 flex items-center justify-between group hover:border-[#FFDD00] transition-all"
                                        >
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <Globe className="w-4 h-4 text-[#FFDD00] shrink-0" />
                                                <span className="text-xs font-bold text-white truncate">{selectedCountryName}</span>
                                            </div>
                                            <ChevronDown className={`w-4 h-4 text-white/20 group-hover:text-white transition-all ${isCountryListOpen ? "rotate-180" : ""}`} />
                                        </button>
                                        
                                        <AnimatePresence>
                                            {isCountryListOpen && (
                                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute z-50 top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl overflow-hidden text-black p-2">
                                                    <div className="relative mb-2">
                                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pe-gray-400" />
                                                        <input
                                                            type="text"
                                                            placeholder="Buscar país..."
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                            className="w-full bg-pe-gray-50 rounded-xl py-3 pl-11 pr-4 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#FFDD00]"
                                                            autoFocus
                                                        />
                                                    </div>
                                                    <div className="max-h-[250px] overflow-y-auto custom-scrollbar">
                                                        {COUNTRIES.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase())).map((country) => (
                                                            <button 
                                                                key={country} 
                                                                onClick={() => { 
                                                                    setSelectedCountryName(country); 
                                                                    setIsCountryListOpen(false);
                                                                    setSearchTerm("");
                                                                }} 
                                                                className="w-full p-4 flex items-center gap-4 hover:bg-pe-gray-50 transition-colors text-left border-b border-pe-gray-50 last:border-0 rounded-xl"
                                                            >
                                                                <span className="text-xs font-bold">{country}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-white/40 px-4 tracking-widest">Monto ($)</label>
                                        <input
                                            type="number"
                                            value={formData.amount}
                                            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                                            className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-lg font-black text-white focus:outline-none focus:border-[#FFDD00] transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6 pt-4 border-t border-white/5">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[11px] font-bold text-[#FFDD00] uppercase tracking-widest">El mejor precio por App</p>
                                        <button className="px-4 py-2 bg-[#FFDD00] text-black text-[10px] font-black rounded-lg uppercase tracking-tighter">Calcular</button>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                            <span className="block text-[8px] font-black uppercase text-white/30 mb-1">Tarifa</span>
                                            <span className="text-sm font-black text-[#FFDD00]">$ {result?.commission.toFixed(2) || "0.00"}</span>
                                        </div>
                                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                            <span className="block text-[8px] font-black uppercase text-white/30 mb-1">ISD</span>
                                            <span className="text-sm font-black text-[#FFDD00]">$ {result?.isd.toFixed(2) || "0.00"}</span>
                                        </div>
                                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                            <span className="block text-[8px] font-black uppercase text-white/30 mb-1">IVA</span>
                                            <span className="text-sm font-black text-[#FFDD00]">$ {result?.iva.toFixed(2) || "0.00"}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center py-6 border-t border-white/10">
                                        <div className="space-y-1">
                                            <span className="block text-[10px] font-black uppercase text-white/40 tracking-widest">Total Estimado</span>
                                            <span className="text-3xl font-black text-white">$ {result?.total.toFixed(2) || "0.00"}</span>
                                        </div>
                                        <button
                                            onClick={() => handleWhatsAppSubmit("envio")}
                                            className="p-5 bg-[#FFDD00] text-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-[#FFDD00]/20 group"
                                        >
                                            <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>

                                    <div className="text-center pt-2">
                                        <p className="text-[9px] font-medium text-white/30 uppercase tracking-widest leading-relaxed">
                                            * Valores referenciales sujetos a cambios por parte de Western Union. <br/>
                                            IVA (15%) e ISD incluidos según normativa vigente.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Section 2: Servicios Específicos (Bento Grid) ═══ */}
            <section className="py-24 bg-white border-b border-black/5 overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl sm:text-5xl font-black text-black uppercase italic tracking-tighter">
                            SERVICIOS <span className="opacity-30">ESPECIALIZADOS</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-12 gap-6">
                        {/* Tarjeta: Cobros (Grande) */}
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="md:col-span-12 lg:col-span-7 group relative p-10 rounded-[3rem] bg-pe-gray-50 border border-pe-gray-100 hover:border-[#FFDD00] transition-all overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFDD00]/5 rounded-full blur-[120px]" />
                            <div className="relative z-10">
                                <Globe className="w-12 h-12 text-black mb-8" />
                                <h3 className="text-3xl font-black text-black mb-6 uppercase tracking-tight leading-tight">Cobro de Transferencias <br /><span className="text-black/30">Internacionales</span></h3>
                                <p className="text-pe-gray-500 font-medium text-lg max-w-md leading-relaxed">
                                    Recibe remesas de EE.UU., España, Italia y cualquier parte del mundo directamente en efectivo en nuestras ventanillas a nivel nacional.
                                </p>
                            </div>
                        </motion.div>

                        {/* Tarjeta: Envíos */}
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="md:col-span-6 lg:col-span-5 group relative p-10 rounded-[3rem] bg-black text-white hover:shadow-2xl transition-all"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[#FFDD00] flex items-center justify-center mb-8">
                                <Send className="w-8 h-8 text-black" />
                            </div>
                            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Envío de Dinero Nacional e Internacional</h3>
                            <p className="text-white/60 font-medium leading-relaxed">
                                Envía fondos con las mejores tasas competitivas del mercado y acreditación inmediata.
                            </p>
                        </motion.div>

                        {/* Tarjeta: Red Activa */}
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="md:col-span-6 lg:col-span-12 group relative p-10 rounded-[3rem] bg-white border-2 border-pe-gray-100 transition-all flex flex-col md:flex-row items-center gap-10"
                        >
                            <div className="w-24 h-24 rounded-3xl bg-black flex items-center justify-center shrink-0">
                                <Smartphone className="w-12 h-12 text-[#FFDD00]" />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-black text-black mb-2 uppercase tracking-tight">Depósitos a Bancos y Billeteras</h3>
                                <p className="text-pe-gray-500 font-medium leading-relaxed max-w-2xl">
                                    Aprovecha nuestra infraestructura <span className="text-black font-black">Red Activa</span> para enviar dinero directamente a cuentas bancarias o billeteras digitales en todo el país.
                                </p>
                            </div>
                            <div className="px-6 py-3 rounded-full bg-pe-gray-50 border border-pe-gray-100 text-[10px] font-black uppercase tracking-widest text-black/40">Infraestructura Oficial</div>
                        </motion.div>
                    </div>
                </div>
            </section>



            {/* ═══ Section 5: Banner de Acción (Reemplaza cotizador redundante) ═══ */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                        className="bg-black rounded-[4rem] p-12 md:p-20 relative overflow-hidden text-center shadow-2xl"
                    >
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
                            <Send className="w-96 h-96 text-white -rotate-12" />
                        </div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 opacity-5">
                            <Globe className="w-80 h-80 text-[#FFDD00] rotate-45" />
                        </div>

                        <div className="relative z-10 space-y-10">
                            <div className="inline-block px-4 py-1.5 rounded-full bg-[#FFDD00]/10 border border-[#FFDD00]/20 text-[#FFDD00] text-[10px] font-black uppercase tracking-[0.3em]">
                                Envío Seguro e Inmediato
                            </div>
                            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.9]">
                                ¿NECESITAS UNA <br /> <span className="text-[#FFDD00]">COTIZACIÓN EXACTA?</span>
                            </h2>
                            <p className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                                Usa nuestro simulador oficial al inicio de la página para obtener el desglose detallado de impuestos y comisiones vigentes para tu país de destino.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4">
                                <button
                                    onClick={() => document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="group px-12 py-6 bg-[#FFDD00] text-black font-black rounded-3xl hover:scale-105 transition-all uppercase tracking-widest text-sm shadow-xl shadow-[#FFDD00]/10 flex items-center gap-3"
                                >
                                    <Calculator className="w-5 h-5" />
                                    Subir al Simulador
                                </button>
                                <Link
                                    href="https://wa.me/593990227203"
                                    target="_blank"
                                    className="px-12 py-6 bg-white/5 text-white font-black rounded-3xl hover:bg-white/10 transition-all uppercase tracking-widest text-sm border border-white/10 backdrop-blur-md flex items-center gap-3"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Consultar en WhatsApp
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ Section 6: FAQ Específica de Remesas ═══ */}
            <section className="py-24 bg-pe-gray-50 overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <HelpCircle className="w-12 h-12 text-black mx-auto mb-6 opacity-20" />
                        <h2 className="text-3xl sm:text-5xl font-black text-black uppercase italic tracking-tighter">
                            PREGUNTAS <span className="text-black/30">FRECUENTES</span>
                        </h2>
                    </div>

                    <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-pe-gray-100 shadow-xl shadow-pe-gray-200/50">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} question={faq.q} answer={faq.a} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Section: Sucursales y Mapa (Standard) ═══ */}
            <section id="sucursales" className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 lg:mb-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Maps Side */}
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sweepRight}
                            className="order-2 lg:order-1 relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-pe-gray-100 h-[400px] lg:h-[600px]"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.103773883154!2d-79.1999948!3d-3.999083700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cb397d349953f7%3A0xdea692caf196a0e7!2sPago%20Express%20Servicios%20Financieros!5e0!3m2!1ses-419!2sec!4v1772581023091!5m2!1ses-419!2sec"
                                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                            />
                        </motion.div>

                        {/* Info Side */}
                        <div className="order-1 lg:order-2 space-y-8">
                            <div>
                                <h3 className="text-black font-black text-xs uppercase tracking-[0.3em] mb-4 bg-[#FFDD00]/20 inline-block px-3 py-1 rounded-md">Atención en Ecuador</h3>
                                <h2 className="text-4xl sm:text-5xl font-black text-black uppercase italic tracking-tighter leading-tight">
                                    PUNTO OFICIAL <br /> <span className="opacity-30">RED ACTIVA</span>
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {locations.map((loc, idx) => (
                                    <motion.div
                                        key={idx} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }}
                                        className="p-6 rounded-3xl bg-pe-gray-50 border border-pe-gray-100 hover:shadow-xl transition-all group"
                                    >
                                        <div className="flex gap-5">
                                            <div className="w-12 h-12 rounded-2xl bg-black text-[#FFDD00] flex items-center justify-center shrink-0">
                                                <MapPin size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-xl text-black mb-1 uppercase tracking-tight">{loc.name}</h4>
                                                <p className="text-pe-gray-500 font-medium mb-4 text-sm">{loc.address}</p>
                                                <div className="flex flex-wrap gap-4 text-[11px] font-bold uppercase tracking-wider text-black/40">
                                                    <span className="flex items-center gap-1.5"><RefreshCcw size={12} className="text-[#FFDD00]" /> {loc.hours}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <a
                                href="https://maps.app.goo.gl/zeNg6ZCSPHosJvZw6" target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-5 bg-black text-[#FFDD00] font-black rounded-2xl shadow-xl hover:bg-black-pure hover:scale-[1.02] transition-all w-full justify-center group uppercase tracking-widest text-sm"
                            >
                                <MapPin size={20} className="text-[#FFDD00] group-hover:animate-bounce" />
                                Obtener Ruta en Google Maps
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Footer Legal ═══ */}
            <section className="py-24 bg-black text-white relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <div className="flex flex-col items-center gap-10">
                        <div className="relative group w-32 h-32 rounded-3xl bg-black border border-white/10 flex flex-col items-center justify-center gap-2 shadow-2xl transition-transform hover:scale-105">
                            <ShieldCheck className="w-12 h-12 text-[#FFDD00]" />
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40">Autorizado</span>
                        </div>
                        <div className="max-w-2xl space-y-6">
                            <h3 className="text-white/20 font-black uppercase tracking-[0.5em] text-xs">Cumplimiento y Seguridad</h3>
                            <p className="text-white/40 text-sm leading-relaxed font-medium">
                                PagoExpress opera como agente oficial de la red <span className="text-white font-bold">Red Activa Western Union</span>. Todas las transacciones están sujetas a procesos de verificación de identidad internacional y cumplen con las normativas vigentes en Ecuador.
                            </p>
                            <p className="text-[#FFDD00]/30 text-[10px] font-black uppercase tracking-widest pt-4">
                                Servicio disponible en horario de oficina. Consulte disponibilidad de fondos para montos elevados.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
