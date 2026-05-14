"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import {
    Search,
    FileCheck,
    ArrowRight,
    MessageCircle,
    CheckCircle,
    Info,
    ChevronDown,
    Receipt,
    AlertCircle,
    User,
    Upload,
    RefreshCcw,
    X,
    CreditCard
} from "lucide-react";
import MapSection from "@/components/MapSection";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

export default function SupaClient() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    
    // Simulator States
    const [step, setStep] = useState(1);
    const [isUploading, setIsUploading] = useState(false);
    
    // Form Data
    const [leadName, setLeadName] = useState("");
    const [leadPhone, setLeadPhone] = useState("");
    const [supaCode, setSupaCode] = useState("");
    const [quotas, setQuotas] = useState("1");
    const [receipt, setReceipt] = useState<File | null>(null);

    const [currentSlide, setCurrentSlide] = useState(0);
    const heroSlides = [
        { url: "/supa-sq.webp", alt: "SUPA Logo Oficial" },
        { url: "/supa_payment_experience_1778251340774.png", alt: "Experiencia de Pago SUPA" }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    const nextStep = () => setStep(s => Math.min(s + 1, 4));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const handleWhatsAppSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        
        let receiptUrl = "";
        if (receipt) {
            try {
                setIsUploading(true);
                const formData = new FormData();
                formData.append("receipt", receipt);
                formData.append("userId", supaCode);
                formData.append("amount", quotas);

                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    receiptUrl = data.url;
                }
            } catch (error) {
                console.error("Error uploading receipt:", error);
            } finally {
                setIsUploading(false);
            }
        }

        const message = `Hola PagoExpress, deseo realizar el pago de mi pensión SUPA.\n\n👤 *Cliente:* ${leadName}\n🆔 *Código SUPA:* ${supaCode}\n🔢 *Cuotas:* ${quotas}\n📱 *Teléfono:* ${leadPhone}\n\n${receiptUrl ? `✅ *Comprobante de pago:* ${receiptUrl}` : "⏳ *Adjuntaré el comprobante en un momento.*"}\n\nQuedo a la espera del registro oficial.`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/593990227203?text=${encodedMessage}`, "_blank");
    };

    const faqs = [
        {
            q: "¿El pago se refleja inmediatamente en el sistema SUPA?",
            a: "Sí, al ser un punto de recaudación autorizado, los pagos ingresan al sistema oficial de forma segura y se reflejan según los tiempos establecidos por el Consejo de la Judicatura."
        },
        {
            q: "¿Qué necesito para pagar mi pensión?",
            a: "Solo necesitas el Código SUPA de la tarjeta o el número de proceso judicial."
        },
        {
            q: "¿Puedo pagar pensiones atrasadas o de meses anteriores?",
            a: "Totalmente. El sistema permite visualizar y cancelar tanto la cuota del mes actual como cualquier valor pendiente o atrasado."
        },
        {
            q: "¿Cuánto tiempo tarda en llegar el dinero al beneficiario?",
            a: "Una vez realizado el pago, el Consejo de la Judicatura procesa la transferencia a la cuenta de la persona beneficiaria en un plazo de 24 a 48 horas laborables."
        }
    ];

    return (
        <main className="min-h-screen bg-white text-slate-800 selection:bg-cyan-500 selection:text-white">
            <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                                <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Punto Autorizado Consejo de la Judicatura</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-[#003366] leading-[1.1] mb-8">
                                Sistema Único de <span className="text-[#00AEEF]">Pensiones Alimenticias</span>
                            </h1>

                            <div className="flex flex-wrap gap-4 mb-12">
                                <button 
                                    onClick={() => document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-12 py-6 bg-[#003366] text-white text-xl font-black rounded-2xl shadow-2xl hover:bg-slate-800 transition-all flex items-center gap-4 group"
                                >
                                    Paga Aquí
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative"
                        >
                            <div className="relative z-10 bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden h-[350px] md:h-[450px] lg:h-[550px]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentSlide}
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                        className="absolute inset-0 flex items-center justify-center p-8"
                                    >
                                        <Image 
                                            src={heroSlides[currentSlide].url} 
                                            alt={heroSlides[currentSlide].alt}
                                            fill
                                            className={`${currentSlide === 0 ? "object-contain" : "object-cover"} p-4`}
                                            priority
                                        />
                                        {currentSlide === 1 && <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/40 to-transparent" />}
                                    </motion.div>
                                </AnimatePresence>
                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                                    {heroSlides.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentSlide(i)}
                                            className={`h-2 rounded-full transition-all duration-500 ${currentSlide === i ? "bg-[#00AEEF] w-10" : "bg-slate-200 w-2"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-100 rounded-full blur-3xl opacity-50" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50" />
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-10"
                        >
                            <div className="space-y-4">
                                <h2 className="text-4xl lg:text-5xl font-black text-[#003366] leading-tight">
                                    Información Requerida <br />
                                    <span className="text-[#00AEEF] italic">para tu Pago</span>
                                </h2>
                                <p className="text-lg text-slate-500 font-medium max-w-md">
                                    Evita errores o retrasos en el sistema. Asegúrate de tener los siguientes datos a la mano al acercarte a nuestra ventanilla.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex gap-6 items-start group">
                                    <div className="flex-shrink-0 w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-[#003366] group-hover:bg-[#003366] group-hover:text-white transition-all">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xl font-black text-[#003366]">Código de Tarjeta SUPA</h4>
                                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                            El número único asignado por el Consejo de la Judicatura a tu caso. Es el requisito esencial.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start group">
                                    <div className="flex-shrink-0 w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-[#003366] group-hover:bg-[#003366] group-hover:text-white transition-all">
                                        <Info className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xl font-black text-[#003366]">Cédula de Identidad</h4>
                                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                            Cédula del alimentante (quien realiza el pago) o del beneficiario según requiera la consulta.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative cursor-pointer"
                            onClick={() => document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <div className="bg-[#003366] rounded-[3rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700" />
                                
                                <div className="relative z-10 space-y-8">
                                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                        <Search className="w-8 h-8 text-[#00AEEF]" />
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-black italic tracking-tight">Consulta Exacta de Valores</h3>
                                        <p className="text-lg text-blue-100/80 leading-relaxed font-medium">
                                            Recuerda que en ventanilla podemos consultar el saldo pendiente exacto antes de pagar. Podrás verificar <span className="text-white font-bold">multas, meses acumulados y el total actualizado</span> al día de hoy.
                                        </p>
                                    </div>

                                    <div className="pt-8 border-t border-white/10 flex items-center gap-3">
                                        <AlertCircle className="w-5 h-5 text-[#00AEEF]" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00AEEF]">Sin costo adicional por consulta</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section id="simulador" className="py-24 bg-white relative">
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-black text-[#003366] mb-4">Inicia tu Pago Aquí</h2>
                        <p className="text-slate-500">Sigue los pasos para registrar tu pensión de forma segura.</p>
                    </div>

                    <motion.div 
                        className="bg-slate-50 border border-slate-200 rounded-[3rem] p-8 md:p-12 shadow-xl overflow-hidden relative"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex justify-between mb-12 relative">
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0" />
                            <div className="absolute top-1/2 left-0 h-1 bg-[#003366] -translate-y-1/2 z-0 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }} />
                            
                            {[1, 2, 3, 4].map((s) => (
                                <div 
                                    key={s} 
                                    className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-all duration-500 border-4 ${
                                        step >= s ? "bg-[#003366] border-[#003366] text-white" : "bg-white border-slate-200 text-slate-300"
                                    }`}
                                >
                                    {step > s ? <CheckCircle className="w-5 h-5" /> : <span className="font-bold text-sm">{s}</span>}
                                </div>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <h3 className="text-2xl font-black text-[#003366] mb-6">Tus Datos</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Nombre Completo</label>
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#00AEEF] transition-colors" />
                                                <input 
                                                    type="text" 
                                                    placeholder="Ej: Juan Pérez" 
                                                    value={leadName}
                                                    onChange={(e) => setLeadName(e.target.value)}
                                                    className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-[#00AEEF] transition-all text-slate-700 font-medium"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase ml-1">WhatsApp</label>
                                            <div className="relative group">
                                                <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#00AEEF] transition-colors" />
                                                <input 
                                                    type="tel" 
                                                    placeholder="099 999 9999" 
                                                    value={leadPhone}
                                                    onChange={(e) => setLeadPhone(e.target.value)}
                                                    className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-[#00AEEF] transition-all text-slate-700 font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={nextStep} 
                                        disabled={!leadName || !leadPhone}
                                        className="w-full py-5 bg-[#003366] text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Continuar
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <h3 className="text-2xl font-black text-[#003366] mb-6">Detalles SUPA</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Código de Tarjeta SUPA</label>
                                            <div className="relative group">
                                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#00AEEF] transition-colors" />
                                                <input 
                                                    type="text" 
                                                    placeholder="Ej: 1101-12345" 
                                                    value={supaCode}
                                                    onChange={(e) => setSupaCode(e.target.value)}
                                                    className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-[#00AEEF] transition-all text-slate-700 font-medium"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Número de Cuotas</label>
                                            <div className="relative group">
                                                <Receipt className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#00AEEF] transition-colors" />
                                                <select 
                                                    value={quotas}
                                                    onChange={(e) => setQuotas(e.target.value)}
                                                    className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-[#00AEEF] transition-all text-slate-700 font-medium appearance-none"
                                                >
                                                    <option value="1">1 Cuota (Mes actual)</option>
                                                    <option value="2">2 Cuotas</option>
                                                    <option value="3">3 Cuotas</option>
                                                    <option value="4">4 o más cuotas</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={prevStep} className="flex-1 py-5 bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all">Atrás</button>
                                        <button 
                                            onClick={nextStep} 
                                            disabled={!supaCode}
                                            className="flex-[2] py-5 bg-[#003366] text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all disabled:opacity-50"
                                        >
                                            Continuar
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <h3 className="text-2xl font-black text-[#003366] mb-6">Comprobante de Pago</h3>
                                    <div 
                                        className="border-4 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center group hover:border-[#00AEEF] transition-all cursor-pointer relative overflow-hidden"
                                        onClick={() => document.getElementById('receipt-upload')?.click()}
                                    >
                                        <input 
                                            type="file" 
                                            id="receipt-upload" 
                                            className="hidden" 
                                            accept="image/*"
                                            onChange={(e) => setReceipt(e.target.files?.[0] || null)}
                                        />
                                        {receipt ? (
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-4">
                                                    <FileCheck className="w-8 h-8" />
                                                </div>
                                                <p className="text-sm font-bold text-slate-700">{receipt.name}</p>
                                                <button onClick={(e) => { e.stopPropagation(); setReceipt(null); }} className="mt-4 text-xs font-bold text-red-500 uppercase flex items-center gap-1">
                                                    <X className="w-3 h-3" /> Eliminar
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-20 h-20 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300 group-hover:text-[#00AEEF] group-hover:scale-110 transition-all mb-4">
                                                    <Upload className="w-10 h-10" />
                                                </div>
                                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Carga tu foto aquí</p>
                                                <p className="text-slate-300 text-xs mt-2">Formatos aceptados: JPG, PNG (Max 5MB)</p>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={prevStep} className="flex-1 py-5 bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all">Atrás</button>
                                        <button onClick={nextStep} className="flex-[2] py-5 bg-[#003366] text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all">Continuar</button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                    <h3 className="text-2xl font-black text-[#003366] mb-6">Resumen de Solicitud</h3>
                                    <div className="bg-white rounded-3xl p-6 border border-slate-100 space-y-4">
                                        <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                                            <span className="text-xs font-bold text-slate-400 uppercase">Cliente</span>
                                            <span className="font-bold text-[#003366]">{leadName}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                                            <span className="text-xs font-bold text-slate-400 uppercase">Código SUPA</span>
                                            <span className="font-bold text-[#003366]">{supaCode}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                                            <span className="text-xs font-bold text-slate-400 uppercase">Cuotas</span>
                                            <span className="font-bold text-[#003366]">{quotas}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold text-slate-400 uppercase">Comprobante</span>
                                            <span className={`text-xs font-black uppercase px-3 py-1 rounded-full ${receipt ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}>
                                                {receipt ? "Cargado" : "Pendiente"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={prevStep} disabled={isUploading} className="flex-1 py-5 bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all disabled:opacity-50">Atrás</button>
                                        <button 
                                            onClick={() => handleWhatsAppSubmit()}
                                            disabled={isUploading}
                                            className="flex-[2] py-5 text-white font-black uppercase rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
                                            style={{ backgroundColor: "#25D366" }}
                                        >
                                            {isUploading ? <RefreshCcw className="w-6 h-6 animate-spin" /> : <MessageCircle className="w-6 h-6" />}
                                            {isUploading ? "Procesando..." : "Finalizar en WhatsApp"}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-[#003366]">Información Importante</h2>
                        <p className="text-slate-500 mt-2">Todo lo que necesitas saber sobre el sistema SUPA.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                                <button 
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full flex justify-between items-center p-6 text-left"
                                >
                                    <span className="font-bold text-[#003366]">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-cyan-500 transition-transform ${activeFaq === i ? "rotate-180" : ""}`} />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === i && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-6"
                                        >
                                            <p className="text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-4">{faq.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-[#003366] mb-4">Nuestras Agencias</h2>
                        <p className="text-slate-500">Visítanos para realizar tus pagos de forma presencial.</p>
                    </div>
                    <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
                        <MapSection />
                    </div>
                </div>
            </section>

            <footer className="py-12 bg-[#003366] text-white">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-12 h-12 relative opacity-50 grayscale invert">
                            <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
                        </div>
                        <div className="h-8 w-px bg-white/20" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Red de Recaudación Oficial</span>
                    </div>
                    <p className="text-[10px] font-medium uppercase tracking-widest opacity-40 max-w-2xl mx-auto leading-relaxed">
                        PAGOEXPRESS OPERA COMO RED DE RECAUDACIÓN AUTORIZADA MEDIANTE COMPENSADORES. LOS PAGOS SE REFLEJAN EN EL SISTEMA ÚNICO DE PENSIONES ALIMENTICIAS (SUPA).
                    </p>
                </div>
            </footer>
        </main>
    );
}
