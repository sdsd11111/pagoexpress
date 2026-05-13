"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Gamepad2,
    ArrowRight,
    CheckCircle2,
    DollarSign,
    User,
    CheckCircle,
    Upload,
    RefreshCcw,
    MessageCircle,
    ShieldCheck,
    Zap,
    MapPin,
    Banknote,
    Smartphone,
    CreditCard,
    ShieldAlert,
    Send,
    Play,
    X
} from "lucide-react";
import { AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";

// Ecuabet Official Colors
const ECUABET_GOLD = "#F3CF1D"; // Official Logo/Highlight Yellow
const ECUABET_GREEN = "#1CA51C"; // Official Action Green

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

const fadeUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const sweepRight: Variants = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } };

export default function EcuabetPage() {
    const [formType, setFormType] = useState<"recharge" | "withdraw">("recharge");
    const [userId, setUserId] = useState("");
    const [amount, setAmount] = useState("");
    const [withdrawNote, setWithdrawNote] = useState("");
    const [withdrawClave, setWithdrawClave] = useState("");
    const [withdrawId, setWithdrawId] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountType, setAccountType] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [leadName, setLeadName] = useState("");
    const [receipt, setReceipt] = useState<File | null>(null);
    const [receiptUrl, setReceiptUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const resetForm = (type: "recharge" | "withdraw") => {
        setFormType(type);
        setStep(1);
        setUserId("");
        setAmount("");
        setWithdrawNote("");
        setWithdrawClave("");
        setWithdrawId("");
        setReceipt(null);
        setReceiptUrl("");
        // We don't necessarily reset bank info as user might want to reuse it, 
        // but let's keep it for now unless requested otherwise.
    };

    const uploadReceipt = async (file: File) => {
        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append("receipt", file);
            formData.append("userId", userId);
            formData.append("amount", amount);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setReceiptUrl(data.url);
                return data.url;
            } else {
                console.error("Upload failed");
                return "";
            }
        } catch (error) {
            console.error("Error uploading receipt:", error);
            return "";
        } finally {
            setIsUploading(false);
        }
    };

    const handleWhatsAppSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        

        const bankInfo = `\n\n🏦 *DATOS PARA EL PAGO:* \n- Banco: ${bankName}\n- Cuenta: ${accountNumber}\n- Tipo: ${accountType}`;
        
        // Final attempt with official API URL and explicit string building
        const text = `Hola PagoExpress, deseo realizar una ${formType === "recharge" ? "recarga" : "retiro"} de Ecuabet.\n\n` +
                     `👤 *Cliente:* ${leadName}\n` +
                     (formType === "recharge" ? `🆔 *ID o Cédula:* ${userId}\n` : `📝 *Nota de Retiro:* ${withdrawNote}\n`) +
                     (formType === "recharge" ? `💰 *Valor:* $${amount}\n` : `🔑 *Clave:* ${withdrawClave}\n`) +
                     (formType === "withdraw" ? `🪪 *Cédula:* ${withdrawId}\n` : "") +
                     "\n" +
                     (receiptUrl ? `✅ *${formType === "recharge" ? "Comprobante de pago" : "Nota de Retiro (Imagen)"}:* ${receiptUrl}\n` : `⏳ _No se adjuntó comprobante._\n`) +
                     (formType === "withdraw" ? bankInfo : "") +
                     "\nQuedo a la espera de la acreditación.";

        const whatsappUrl = `https://api.whatsapp.com/send?phone=593990227203&text=${encodeURIComponent(text)}`;
        
        window.open(whatsappUrl, "_blank");
        setStep(formType === "recharge" ? 5 : 6); 
    };

    const [currentSlide, setCurrentSlide] = useState(0);
    const heroImages = [
        "/ecuabet.webp",
        "/ecuabet_mockup_betting.png"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <main className="min-h-screen bg-black text-white selection:bg-pe-yellow selection:text-black font-sans">
            {/* ═══ Section 1: Hero ═══ */}
            <section className="relative overflow-hidden min-h-[100svh] lg:min-h-[70vh] flex items-center bg-black pt-28 pb-16 lg:pt-20 lg:pb-0">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[600px] rounded-full blur-[140px] opacity-20 pointer-events-none" style={{ background: ECUABET_GOLD }} />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-5 pointer-events-none" style={{ background: ECUABET_GOLD }} />
                </div>

                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle, white 0.5px, transparent 0.5px)`, backgroundSize: "32px 32px" }} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center lg:text-left flex flex-col items-center lg:items-start">
                            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border mb-8 bg-white/5 border-white/10">
                                <div className="flex items-center gap-2 border-r border-white/20 pr-3">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ECUABET_GOLD }} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Punto Autorizado</span>
                                </div>
                                <Image src="/logo.jpg" alt="PagoExpress" width={70} height={20} className="h-3.5 w-auto brightness-0 invert opacity-60" />
                            </div>

                            <h1 className="text-4xl sm:text-6xl lg:text-[5.5rem] font-black leading-[1.1] tracking-tighter mb-10 uppercase italic px-0">
                                Recargas de{" "}
                                <span style={{ color: ECUABET_GOLD }}>Ecuabet</span>
                                <br />desde 1$ USD
                            </h1>

                            <div className="flex flex-col sm:flex-row gap-4 lg:gap-5 justify-center lg:justify-start w-full px-0">
                                <button
                                    onClick={() => {
                                        resetForm("recharge");
                                        document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 text-black font-black uppercase tracking-widest rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-pe-yellow/20"
                                    style={{ backgroundColor: ECUABET_GOLD }}
                                >
                                    <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    Recargar Ahora
                                </button>
                                <Link
                                    href="#sucursales"
                                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-5 bg-transparent border-2 text-white font-black rounded-xl hover:bg-white/5 transition-all uppercase tracking-widest text-sm"
                                    style={{ borderColor: ECUABET_GOLD, color: ECUABET_GOLD }}
                                >
                                    Ubicaciones en Loja
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Hero Slider */}
                        <motion.div 
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative aspect-[4/3] lg:aspect-video w-full rounded-[2rem] lg:rounded-[3rem] overflow-hidden border-4 border-white/5 shadow-3xl bg-neutral-900 mt-4 lg:mt-0"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, scale: 1.1, x: 50 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, x: -50 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <Image 
                                        src={heroImages[currentSlide]}
                                        alt={`Ecuabet Experience ${currentSlide + 1}`}
                                        fill
                                        className={`transition-all duration-700 ${currentSlide === 0 ? "object-contain p-8 sm:p-12" : "object-cover"}`}
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                </motion.div>
                            </AnimatePresence>

                            {/* Slider Indicators */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                                {heroImages.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentSlide(i)}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${
                                            currentSlide === i ? "w-12 bg-pe-yellow" : "w-3 bg-white/20"
                                        }`}
                                        style={{ backgroundColor: currentSlide === i ? ECUABET_GOLD : undefined }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══ Section 2: Servicios Autorizados (Bento Grid) ═══ */}
            <section id="accion" className="py-24 bg-[#0a0a0a] border-b border-white/5 overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tighter">
                            Agencia oficial <span style={{ color: ECUABET_GOLD }}>ECUABET</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Tarjeta Izquierda: Recargas */}
                        <div 
                            onClick={() => {
                                resetForm("recharge");
                                document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' });
                            }} 
                            className="block group cursor-pointer"
                        >
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={sweepRight}
                                className="relative bg-black p-10 rounded-[2.5rem] border border-white/5 group-hover:border-pe-yellow/30 transition-all overflow-hidden h-full cursor-pointer active:scale-[0.98]"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-pe-yellow/5 rounded-full blur-[100px] group-hover:bg-pe-yellow/10 transition-all" />

                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-pe-yellow/10 group-hover:scale-110 transition-transform">
                                    <Zap className="w-8 h-8" style={{ color: ECUABET_GOLD }} />
                                </div>

                                <h3 className="text-4xl font-black text-white mb-6 uppercase italic tracking-tight">Recargas al <br /><span style={{ color: ECUABET_GOLD }}>Instante (Desde $1.00)</span></h3>

                                <div className="space-y-6">
                                    <p className="text-white/60 text-lg leading-relaxed">
                                        ¡Activa tu saldo en minutos! Solo envía el comprobante de tu transferencia junto con tu ID de usuario o número de cédula. Nosotros nos encargamos del resto para que tu cuenta esté lista al instante.
                                    </p>
                                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-all">
                                        <Zap className="w-6 h-6" style={{ color: ECUABET_GOLD }} />
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Disponible ya</div>
                                            <div className="text-sm font-bold text-white/80">Recargar Ahora</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Tarjeta Derecha: Seguridad */}
                        <div 
                            onClick={() => {
                                resetForm("withdraw");
                                document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' });
                            }} 
                            className="block group cursor-pointer"
                        >
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={sweepRight}
                                className="relative bg-[#0D131A] p-10 rounded-[2.5rem] border border-white/5 group-hover:border-pe-yellow/30 transition-all overflow-hidden h-full cursor-pointer active:scale-[0.98]"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-pe-yellow/5 rounded-full blur-[100px]" />

                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-pe-yellow/10 group-hover:scale-110 transition-transform">
                                    <Banknote className="w-8 h-8" style={{ color: ECUABET_GOLD }} />
                                </div>

                                <h3 className="text-4xl font-black text-white mb-6 uppercase italic tracking-tight">Retiros <br /><span style={{ color: ECUABET_GOLD }}>Seguros y Directos</span></h3>

                                <div className="space-y-6">
                                    <p className="text-white/60 text-lg leading-relaxed">
                                        Convierte tus ganancias en efectivo sin complicaciones. Cobra tus notas de retiro de manera ágil y recibe el dinero directamente en tu cuenta bancaria, con la seguridad y rapidez que necesitas.
                                    </p>
                                    <div className="flex items-center gap-3 p-4 bg-pe-yellow/10 rounded-2xl border border-pe-yellow/20 group-hover:bg-pe-yellow/20 transition-all">
                                        <CheckCircle2 className="w-6 h-6" style={{ color: ECUABET_GOLD }} />
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-pe-yellow/50">Cobros</div>
                                            <div className="text-sm font-bold text-white/80">Retirar mis Ganancias</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Feature: Simulador Dinámico Ecuabet ═══ */}
            <section id="simulador" className="py-24 bg-black relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="bg-white/[0.03] border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-xl relative overflow-hidden"
                    >
                        {/* Tabs Selector */}
                        <div className="flex p-1 bg-white/5 rounded-2xl mb-8 border border-white/5">
                            <button 
                                onClick={() => resetForm("recharge")}
                                className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${formType === "recharge" ? "bg-pe-yellow text-black shadow-lg" : "text-white/40 hover:text-white"}`}
                                style={{ backgroundColor: formType === "recharge" ? ECUABET_GOLD : undefined }}
                            >
                                Solicitud Recarga
                            </button>
                            <button 
                                onClick={() => resetForm("withdraw")}
                                className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${formType === "withdraw" ? "bg-pe-yellow text-black shadow-lg" : "text-white/40 hover:text-white"}`}
                                style={{ backgroundColor: formType === "withdraw" ? ECUABET_GOLD : undefined }}
                            >
                                Solicitud Retiro
                            </button>
                        </div>

                        <div className="text-center mb-10 mt-4">
                            <h2 className="text-3xl font-black text-white mb-2 uppercase italic">
                                SOLICITUD DE <span style={{ color: ECUABET_GOLD }}>{formType === "recharge" ? "RECARGA" : "RETIRO"}</span>
                            </h2>
                            <p className="text-white/40 text-sm font-medium tracking-wide uppercase">Paso {step} de 5</p>
                        </div>

                        <div className="bg-neutral-900 border border-white/5 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                            <div className="flex justify-between items-center mb-10">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <div key={s} className="flex flex-col items-center gap-2">
                                        <div 
                                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 text-xs sm:text-base ${
                                                step >= s ? "scale-110" : "opacity-30 scale-90"
                                            }`}
                                            style={{ 
                                                backgroundColor: step >= s ? ECUABET_GOLD : "transparent",
                                                color: step >= s ? "black" : "white",
                                                border: step < s ? "2px solid white" : "none"
                                            }}
                                        >
                                            {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                                        </div>
                                        <span className="text-[8px] sm:text-[10px] uppercase tracking-widest font-black opacity-30 text-center">
                                            {s === 1 ? "Datos" : s === 2 ? (formType === "recharge" ? "Monto" : "Retiro") : s === 3 ? "Recibo" : s === 4 ? "Pago" : "Final"}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <h3 className="text-2xl font-black uppercase italic" style={{ color: ECUABET_GOLD }}>Tus Datos</h3>
                                    <div className="space-y-4">
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-pe-yellow transition-colors" />
                                            <input 
                                                type="text" 
                                                placeholder="NOMBRE COMPLETO" 
                                                value={leadName}
                                                onChange={(e) => setLeadName(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-pe-yellow/50 transition-all font-bold uppercase placeholder:text-white/20"
                                            />
                                        </div>
                                    </div>
                                    <button 
                                        onClick={nextStep}
                                        disabled={!leadName}
                                        className="w-full py-5 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3"
                                    >
                                        Siguiente Paso <ArrowRight className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <h3 className="text-2xl font-black uppercase italic" style={{ color: ECUABET_GOLD }}>
                                        {formType === "recharge" ? "Monto e ID" : "Datos de Retiro"}
                                    </h3>
                                    
                                    {formType === "recharge" ? (
                                        <>
                                            <div className="bg-pe-yellow/5 border border-pe-yellow/20 rounded-2xl p-4 space-y-3">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Banknote className="w-4 h-4 text-pe-yellow" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-pe-yellow">Cuentas para depósito/transferencia</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-[10px] font-medium text-white/70">
                                                    <div className="bg-white/5 p-2 rounded-lg">🏦 Produbanco: <span className="text-white">02125012701</span></div>
                                                    <div className="bg-white/5 p-2 rounded-lg">🏦 Pichincha: <span className="text-white">3472909404</span></div>
                                                    <div className="bg-white/5 p-2 rounded-lg">🏦 Guayaquil: <span className="text-white">21026425</span></div>
                                                    <div className="bg-white/5 p-2 rounded-lg">🏦 Banco Loja: <span className="text-white">2903772441</span></div>
                                                    <div className="bg-white/5 p-2 rounded-lg">🏦 CoopMego: <span className="text-white">401010139960</span></div>
                                                    <div className="bg-white/5 p-2 rounded-lg">🏦 JEP: <span className="text-white">406089279905</span></div>
                                                </div>
                                                <div className="pt-2 border-t border-pe-yellow/10">
                                                    <p className="text-[9px] text-white/50 leading-tight">
                                                        👤 Titular: <strong>César Augusto Amay Ríos</strong><br />
                                                        🪪 CI: <strong>1103677546</strong> | 📧 info@pagoexpressec.com
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="relative group">
                                                    <Gamepad2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-pe-yellow transition-colors" />
                                                    <input 
                                                        type="text" 
                                                        placeholder="ID DE USUARIO O CÉDULA" 
                                                        value={userId}
                                                        onChange={(e) => setUserId(e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-pe-yellow/50 transition-all font-bold uppercase placeholder:text-white/20"
                                                    />
                                                </div>
                                                
                                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                                    {["5", "10", "20", "50", "100"].map((val) => (
                                                        <button 
                                                            key={val} 
                                                            onClick={() => { setAmount(val); setStep(formType === "recharge" ? 3 : 4); }}
                                                            className={`py-3 rounded-xl border font-bold transition-all ${
                                                                amount === val ? "bg-pe-yellow/20 border-pe-yellow text-pe-yellow" : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                                                            }`}
                                                        >
                                                            ${val}
                                                        </button>
                                                    ))}
                                                </div>

                                                <div className="relative group">
                                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-pe-yellow transition-colors" />
                                                    <input 
                                                        type="number" 
                                                        min="1"
                                                        placeholder="VALOR (MÍN $1)" 
                                                        value={amount}
                                                        onChange={(e) => setAmount(e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-pe-yellow/50 transition-all font-bold uppercase placeholder:text-white/20"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="relative group">
                                                <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-pe-yellow transition-colors" />
                                                <input 
                                                    type="text" 
                                                    placeholder="NOTA DE RETIRO NO." 
                                                    value={withdrawNote}
                                                    onChange={(e) => setWithdrawNote(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-pe-yellow/50 transition-all font-bold uppercase placeholder:text-white/20"
                                                />
                                            </div>
                                            <div className="relative group">
                                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-pe-yellow transition-colors" />
                                                <input 
                                                    type="text" 
                                                    placeholder="CLAVE" 
                                                    value={withdrawClave}
                                                    onChange={(e) => setWithdrawClave(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-pe-yellow/50 transition-all font-bold uppercase placeholder:text-white/20"
                                                />
                                            </div>
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-pe-yellow transition-colors" />
                                                <input 
                                                    type="text" 
                                                    placeholder="NÚMERO DE CÉDULA" 
                                                    value={withdrawId}
                                                    onChange={(e) => setWithdrawId(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-pe-yellow/50 transition-all font-bold uppercase placeholder:text-white/20"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-3">
                                        <button onClick={prevStep} className="flex-1 py-5 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-widest rounded-2xl transition-all">Atrás</button>
                                        <button 
                                            onClick={nextStep}
                                            disabled={formType === "recharge" ? (!userId || !amount || Number(amount) < 1) : (!withdrawNote || !withdrawClave || !withdrawId)}
                                            className="flex-[2] py-5 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3"
                                        >
                                            {formType === "recharge" ? "Subir Comprobante" : "Subir Nota"} <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <h3 className="text-2xl font-black uppercase italic" style={{ color: ECUABET_GOLD }}>{formType === "recharge" ? "Comprobante" : "Imagen de Nota"}</h3>
                                    <p className="text-white/40 text-sm">Sube una foto de tu {formType === "recharge" ? "pago" : "nota de retiro"} para agilizar el proceso.</p>
                                    
                                    <div 
                                        className={`border-2 border-dashed rounded-[2rem] p-12 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer ${
                                            receipt ? "border-pe-yellow/50 bg-pe-yellow/5" : "border-white/10 hover:border-white/20 bg-white/5"
                                        }`}
                                        onClick={() => document.getElementById("receipt-upload")?.click()}
                                    >
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${receipt ? "bg-pe-yellow text-black" : "bg-white/10 text-white/30"}`}>
                                            {receipt ? <CheckCircle className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
                                        </div>
                                        <div className="text-center">
                                            <span className="block font-black uppercase tracking-wider text-sm mb-1">
                                                {receipt ? "Recibo Cargado" : "Haz clic para subir"}
                                            </span>
                                            <span className="text-[10px] text-white/30 uppercase">PNG, JPG o PDF</span>
                                        </div>
                                        <input 
                                            id="receipt-upload"
                                            type="file" 
                                            className="hidden" 
                                            onChange={(e) => setReceipt(e.target.files?.[0] || null)}
                                        />
                                    </div>

                                    <div className="flex gap-3">
                                        <button onClick={prevStep} disabled={isUploading} className="flex-1 py-5 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-widest rounded-2xl transition-all disabled:opacity-50">Atrás</button>
                                        <button 
                                            onClick={async () => {
                                                if (receipt && !receiptUrl) {
                                                    const url = await uploadReceipt(receipt);
                                                    if (url) {
                                                        setStep(4);
                                                    } else alert("Error al subir el comprobante. Por favor intenta de nuevo.");
                                                } else {
                                                    setStep(4);
                                                }
                                            }}
                                            disabled={isUploading}
                                            className="flex-[2] py-5 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3"
                                        >
                                            {isUploading ? "Subiendo..." : "Ver Resumen"} <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    {formType === "withdraw" ? (
                                        <>
                                            <h3 className="text-2xl font-black uppercase italic" style={{ color: ECUABET_GOLD }}>Datos de Pago</h3>
                                            <p className="text-white/40 text-sm">¿Dónde deseas recibir tu acreditación apenas esté lista?</p>
                                            
                                            <div className="space-y-4">
                                                <div className="relative group">
                                                    <input 
                                                        type="text" 
                                                        placeholder="🏦 NOMBRE DEL BANCO" 
                                                        value={bankName}
                                                        onChange={(e) => setBankName(e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-pe-yellow/50 transition-all font-bold uppercase placeholder:text-white/20"
                                                    />
                                                </div>
                                                <div className="relative group">
                                                    <input 
                                                        type="text" 
                                                        placeholder="🔢 NÚMERO DE CUENTA" 
                                                        value={accountNumber}
                                                        onChange={(e) => setAccountNumber(e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-pe-yellow/50 transition-all font-bold uppercase placeholder:text-white/20"
                                                    />
                                                </div>
                                                <select 
                                                    value={accountType}
                                                    onChange={(e) => setAccountType(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-pe-yellow/50 transition-all font-bold uppercase"
                                                >
                                                    <option value="" className="bg-neutral-900">👤 TIPO DE CUENTA</option>
                                                    <option value="AHORROS" className="bg-neutral-900">AHORROS</option>
                                                    <option value="CORRIENTE" className="bg-neutral-900">CORRIENTE</option>
                                                </select>
                                            </div>

                                            <div className="flex gap-3">
                                                <button onClick={prevStep} className="flex-1 py-5 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-widest rounded-2xl transition-all">Atrás</button>
                                                <button 
                                                    onClick={() => setStep(5)}
                                                    disabled={!bankName || !accountNumber || !accountType}
                                                    className="flex-[2] py-5 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3"
                                                >
                                                    Ver Resumen <ArrowRight className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        /* For Recharge, Step 4 IS the Summary */
                                        <div className="space-y-6">
                                            <h3 className="text-2xl font-black uppercase italic" style={{ color: ECUABET_GOLD }}>Resumen de Solicitud</h3>
                                            
                                            <div className="bg-white/5 rounded-3xl p-6 border border-white/5 space-y-6">
                                                <div className="space-y-3">
                                                    <p className="text-[10px] font-black text-pe-yellow uppercase tracking-widest">Información Ecuabet</p>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <span className="text-white/40 text-[9px] uppercase font-bold block">ID Usuario</span>
                                                            <span className="font-black text-white text-sm uppercase">{userId}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-white/40 text-[9px] uppercase font-bold block">Monto</span>
                                                            <span className="font-black text-pe-yellow text-sm">${amount}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                                                    <span className="text-white/40 text-xs uppercase font-bold">Comprobante</span>
                                                    <span className="text-[10px] font-black uppercase text-pe-yellow bg-pe-yellow/10 px-3 py-1 rounded-full">Listo</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <button onClick={prevStep} className="flex-1 py-5 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-widest rounded-2xl transition-all">Atrás</button>
                                                <button 
                                                    onClick={() => handleWhatsAppSubmit()}
                                                    className="flex-[2] py-5 text-white font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
                                                    style={{ backgroundColor: "#25D366" }}
                                                >
                                                    <MessageCircle className="w-6 h-6" />
                                                    Enviar a WhatsApp
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {step === 5 && (
                                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    {formType === "withdraw" ? (
                                        <div className="space-y-6">
                                            <h3 className="text-2xl font-black uppercase italic" style={{ color: ECUABET_GOLD }}>Resumen de Solicitud</h3>
                                            
                                            <div className="bg-white/5 rounded-3xl p-6 border border-white/5 space-y-6">
                                                <div className="space-y-3">
                                                    <p className="text-[10px] font-black text-pe-yellow uppercase tracking-widest">Información Ecuabet</p>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <span className="text-white/40 text-[9px] uppercase font-bold block">Nota No.</span>
                                                            <span className="font-black text-white text-sm uppercase">{withdrawNote}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-white/40 text-[9px] uppercase font-bold block">Cédula</span>
                                                            <span className="font-black text-white text-sm uppercase">{withdrawId}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                                    <h4 className="text-white/40 text-[10px] uppercase tracking-widest font-black mb-4">Datos de Pago (Destino)</h4>
                                                    <div className="space-y-4">
                                                        <div className="flex justify-between">
                                                            <span className="text-white/40 text-sm">Banco</span>
                                                            <span className="text-white font-medium">{bankName}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-white/40 text-sm">Cuenta</span>
                                                            <span className="text-white font-medium">{accountNumber}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-white/40 text-sm">Tipo</span>
                                                            <span className="text-white font-medium">{accountType}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                                                    <span className="text-white/40 text-xs uppercase font-bold">Nota de Retiro</span>
                                                    <span className="text-[10px] font-black uppercase text-pe-yellow bg-pe-yellow/10 px-3 py-1 rounded-full">Lista</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <button onClick={prevStep} className="flex-1 py-5 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-widest rounded-2xl transition-all">Atrás</button>
                                                <button 
                                                    onClick={() => handleWhatsAppSubmit()}
                                                    className="flex-[2] py-5 text-white font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
                                                    style={{ backgroundColor: "#25D366" }}
                                                >
                                                    <MessageCircle className="w-6 h-6" />
                                                    Enviar a WhatsApp
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* For Recharge, Step 5 is the Success screen */
                                        <div className="text-center space-y-8 py-8">
                                            <div className="w-20 h-20 bg-pe-yellow rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-pe-yellow/20">
                                                <CheckCircle2 className="w-10 h-10 text-black" />
                                            </div>
                                            
                                            <div className="space-y-4">
                                                <h3 className="text-2xl font-black text-white uppercase italic leading-tight">
                                                    ¡Solicitud <span style={{ color: ECUABET_GOLD }}>Enviada!</span>
                                                </h3>
                                                <p className="text-white/60 text-sm font-medium max-w-xs mx-auto">
                                                    Hemos recibido tus datos correctamente. El tiempo de acreditación es de aproximadamente <span className="text-white font-bold">1 hora ⏳</span>.
                                                </p>
                                            </div>

                                            <button 
                                                onClick={() => { setStep(1); setReceipt(null); setReceiptUrl(""); }}
                                                className="py-4 px-10 border border-white/10 hover:border-white/30 text-white/50 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all rounded-2xl flex items-center justify-center gap-2 mx-auto"
                                            >
                                                <RefreshCcw className="w-3 h-3" /> Realizar otra solicitud
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {step === 6 && formType === "withdraw" && (
                                <motion.div key="step6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8 py-8">
                                    <div className="w-20 h-20 bg-pe-yellow rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-pe-yellow/20">
                                        <CheckCircle2 className="w-10 h-10 text-black" />
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-black text-white uppercase italic leading-tight">
                                            ¡Solicitud <span style={{ color: ECUABET_GOLD }}>Enviada!</span>
                                        </h3>
                                        <p className="text-white/60 text-sm font-medium max-w-xs mx-auto">
                                            Hemos recibido tus datos correctamente. El tiempo de validación es de aproximadamente <span className="text-white font-bold">1 hora ⏳</span>.
                                        </p>
                                    </div>

                                    <button 
                                        onClick={() => { setStep(1); setReceipt(null); setReceiptUrl(""); setBankName(""); setAccountNumber(""); setAccountType(""); }}
                                        className="py-4 px-10 border border-white/10 hover:border-white/30 text-white/50 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all rounded-2xl flex items-center justify-center gap-2 mx-auto"
                                    >
                                        <RefreshCcw className="w-3 h-3" /> Realizar otra solicitud
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>


            {/* ═══ Section 4: Experiencia Ecuabet (Video) ═══ */}
            <section className="py-24 bg-black relative overflow-hidden text-white">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            className="lg:col-span-5"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 font-sans">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: ECUABET_GOLD }}>PROCESO 100% DIGITAL</span>
                            </div>
                            <h2 className="text-4xl sm:text-6xl font-black text-white leading-none mb-6 uppercase italic tracking-tighter">
                                TU DINERO, <br /> A TU <span style={{ color: ECUABET_GOLD }}>MANERA</span>
                            </h2>
                            <p className="text-white/50 text-lg mb-8 leading-relaxed font-medium">
                                Gestiona tus recargas y cobros con la rapidez que mereces. Sin procesos lentos ni esperas innecesarias: atención ágil, depósitos inmediatos y la seguridad de un servicio diseñado para tu comodidad.
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-7 relative group"
                        >
                            <div className="absolute -inset-6 rounded-[2.5rem] blur-3xl opacity-20 pointer-events-none" style={{ background: ECUABET_GOLD }} />

                            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border-4 border-white/10 bg-[#0D131A] shadow-3xl transition-transform duration-500 group-hover:scale-[1.01]">
                                <video
                                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                >
                                    <source src="/images/video/videoecuabet.mp4" type="video/mp4" />
                                </video>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-20 group/btn"
                                    style={{ backgroundColor: ECUABET_GOLD }}
                                >
                                    <div className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ backgroundColor: ECUABET_GOLD }} />
                                    <Play className="w-8 h-8 fill-black text-black ml-1" />
                                </button>
                                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                    <div className="p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
                                        <p className="text-xs font-black uppercase" style={{ color: ECUABET_GOLD }}>Pagos al Instante 💸</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══ Section 5: Guía Paso a Paso (Infografía Digital) ═══ */}
            <section className="py-24 bg-pe-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-5xl font-black text-pe-black uppercase italic tracking-tighter">
                            RECARGAS 100% <span className="text-pe-yellow-dark">DIGITALES</span>
                        </h2>
                        <p className="text-pe-gray-500 mt-4 text-lg font-medium">Activa tu saldo desde cualquier lugar en tres sencillos pasos.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-pe-gray-200 z-0" />

                        {[
                            { 
                                step: "01", 
                                title: "1. Transfiere", 
                                text: "Realiza tu transferencia bancaria desde cualquier banco por el monto que desees.", 
                                icon: Send 
                            },
                            { 
                                step: "02", 
                                title: "2. Envía", 
                                text: "Envía el comprobante con tu ID o Cédula a nuestro canal digital.", 
                                icon: Smartphone 
                            },
                            { 
                                step: "03", 
                                title: "3. ¡Juega!", 
                                text: "¡Listo en minutos! Activamos tu saldo al instante para que no dejes de ganar.", 
                                icon: Zap 
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="relative z-10 flex flex-col items-center text-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-white border-4 border-pe-gray-100 flex items-center justify-center mb-8 shadow-xl shadow-pe-gray-200 group hover:border-pe-yellow transition-colors">
                                    <item.icon className="w-8 h-8 text-pe-black group-hover:scale-110 transition-transform" />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-pe-yellow text-pe-black font-black flex items-center justify-center text-xs shadow-lg font-sans">{item.step}</div>
                                </div>
                                <h4 className="text-pe-black font-black text-xl mb-3 uppercase italic tracking-tight">{item.title}</h4>
                                <p className="text-pe-gray-600 font-medium text-base max-w-[250px] leading-snug">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Section 5: Sucursales y Seguridad (Rediseño 3 Columnas) ═══ */}
            <section id="sucursales" className="py-24 bg-white overflow-hidden">
                <div className="max-w-[1600px] mx-auto px-4">
                    <div className="bg-white rounded-[4rem] overflow-hidden shadow-3xl flex flex-col lg:flex-row border border-pe-gray-100 min-h-[750px]">

                        {/* COLUMNA 1: Seguridad Total (Black) */}
                        <div className="lg:w-1/3 bg-pe-black p-10 lg:p-16 flex flex-col justify-center text-white border-r border-white/5">
                            <div className="inline-flex items-center gap-2 text-pe-yellow mb-8">
                                <ShieldCheck className="w-5 h-5" style={{ color: ECUABET_GOLD }} />
                                <span className="font-black uppercase tracking-[0.2em] text-[10px]" style={{ color: ECUABET_GOLD }}>Seguridad Total</span>
                            </div>
                            <h3 className="text-4xl lg:text-5xl font-black mb-10 leading-[1.1] uppercase italic" style={{ color: ECUABET_GOLD }}>
                                SEGURIDAD REAL <br /><span className="text-white">Y RESPALDADA</span>
                            </h3>
                            <p className="text-white/50 text-sm mb-10 font-medium italic">
                                "Tu dinero está protegido. Contamos con locales físicos y atención digital inmediata para tu total tranquilidad".
                            </p>
                            <div className="space-y-4">
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <p className="font-black text-[9px] uppercase tracking-widest mb-2" style={{ color: ECUABET_GOLD }}>Punto Matriz</p>
                                    <p className="text-sm font-medium text-white/90 leading-relaxed italic pr-4">Miguel Riofrío 1203 y Olmedo. Atención profesional y garantizada.</p>
                                </div>
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <p className="font-black text-[9px] uppercase tracking-widest mb-2" style={{ color: ECUABET_GOLD }}>Punto Bolívar</p>
                                    <p className="text-sm font-medium text-white/90 leading-relaxed italic pr-4">Colón y Av. Manuel Agustín Aguirre (Junto al cajero Pichincha). Ubicación estratégica para tu confianza.</p>
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

                        {/* COLUMNA 3: Visítanos o Escríbenos (White) */}
                        <div className="lg:w-1/3 bg-white p-10 lg:p-16 flex flex-col justify-center">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pe-black/40 mb-2">PRESENCIA FÍSICA EN LOJA</span>
                            <h3 className="text-3xl font-black mb-6 text-pe-black uppercase leading-none italic" style={{ color: ECUABET_GOLD }}>
                                <span className="text-pe-black">Visítanos</span> <br /> o <span className="text-pe-black/30">Escríbenos</span>
                            </h3>
                            <p className="text-pe-gray-500 text-sm mb-10 font-medium leading-relaxed italic">
                                "No arriesgues tu dinero. Operamos con transparencia en agencias físicas y canales oficiales".
                            </p>

                            <div className="space-y-4 mb-8">
                                {[
                                    { name: "Agencia Matriz", dir: "Miguel Riofrío 1203 y Olmedo", h1: "Lun - Vie: 06:30 - 19:30", h2: "Sáb: 08:00 - 16:00" },
                                    { name: "Parque Bolívar", dir: "Colón 6838 y Av. Manuel Agustín Aguirre", h1: "Lun - Vie: 09:00 - 18:00", h2: "Sáb: 09:00 - 13:00" }
                                ].map((agency, i) => (
                                    <div key={i} className="p-5 rounded-3xl bg-pe-gray-50 border border-pe-gray-100 group hover:border-pe-yellow transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-pe-black flex items-center justify-center shrink-0">
                                                <MapPin className="w-5 h-5" style={{ color: ECUABET_GOLD }} />
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
                                
                                <div className="p-5 rounded-3xl bg-pe-yellow/5 border border-pe-yellow/20">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-pe-black flex items-center justify-center shrink-0">
                                            <MessageCircle className="w-5 h-5" style={{ color: ECUABET_GOLD }} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-pe-black uppercase text-xs">Canal Directo</h4>
                                            <p className="text-[10px] text-pe-gray-500 italic">WhatsApp: 0983084842</p>
                                            <p className="text-[8px] font-bold text-pe-yellow-dark uppercase tracking-widest">Soporte real al instante</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="https://maps.google.com"
                                target="_blank"
                                className="w-full py-4 bg-pe-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all shadow-xl"
                            >
                                <MapPin className="w-4 h-4" style={{ color: ECUABET_GOLD }} /> OBTENER RUTA EN GOOGLE MAPS
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Section 6: Footer Legal & Authority ═══ */}
            <section className="py-24 bg-black border-t border-white/10 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <div className="flex flex-col items-center gap-10">
                        <div className="relative">
                            <div className="absolute -inset-10 bg-pe-yellow/10 blur-[50px] rounded-full" />
                            <div className="relative group w-32 h-32 rounded-3xl bg-black border border-white/10 flex flex-col items-center justify-center gap-2 shadow-2xl transition-transform hover:scale-105">
                                <ShieldCheck className="w-12 h-12" style={{ color: ECUABET_GOLD }} />
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40">Verificado</span>
                            </div>
                        </div>

                        <div className="max-w-2xl space-y-6">
                            <h3 className="text-white/20 font-black uppercase tracking-[0.5em] text-xs">Punto de Recaudación Autorizado</h3>
                            <p className="text-white/40 text-sm leading-relaxed font-medium">
                                PagoExpress es un socio comercial estratégico **oficialmente autorizado** por Ecuabet. Todas las operaciones de recarga realizadas en nuestras ventanillas cuentan con el respaldo directo de la plataforma.
                            </p>
                            <p className="text-pe-yellow/30 text-[10px] font-black uppercase tracking-widest pt-4 font-sans">
                                +18 · Juega con responsabilidad · Ecuabet es una marca registrada.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Ecuabet Video Modal ─── */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-[95vw] md:max-w-5xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-3xl border border-white/10 bg-pe-dark flex items-center justify-center p-2"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] w-10 h-10 md:w-12 md:h-12 rounded-full bg-pe-black/60 md:bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-pe-black transition-all hover:scale-110 shadow-lg"
                                aria-label="Cerrar video"
                            >
                                <X className="w-5 h-5 md:w-6 md:h-6" />
                            </button>

                            <video
                                className="max-w-full max-h-[85vh] rounded-2xl shadow-inner shadow-white/5"
                                controls
                                autoPlay
                                playsInline
                            >
                                <source src="/images/video/videoecuabet.mp4" type="video/mp4" />
                                Tu navegador no soporta el formato de video.
                            </video>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
