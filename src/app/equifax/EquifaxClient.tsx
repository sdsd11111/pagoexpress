"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Calendar,
    ChevronDown,
    FileText,
    MapPin,
    ShieldCheck,
    ShieldAlert,
    CheckCircle2,
    MonitorSmartphone,
    Briefcase,
    ChevronLeft,
    ChevronRight,
    Smartphone,
    X,
    User
} from "lucide-react";
import MapSection from "@/components/MapSection";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const }
    }
};

export default function EquifaxClient() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [momentIndex, setMomentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string; color?: string } | null>(null);
    const [formData, setFormData] = useState({
        cedula: "",
        email: "",
        direccion: "",
        celular: ""
    });

    const openModal = (plan: { name: string; price: string }) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPlan) return;

        const message = `Hola PagoExpress, deseo obtener mi Reporte Equifax: ${selectedPlan.name} ($${selectedPlan.price}).%0A%0A` +
                        `*Mis Datos:*%0A` +
                        `- Cédula: ${formData.cedula}%0A` +
                        `- Correo: ${formData.email}%0A` +
                        `- Dirección: ${formData.direccion}%0A` +
                        `- Celular: ${formData.celular}`;
        
        window.open(`https://wa.me/593990227203?text=${message}`, "_blank");
        setIsModalOpen(false);
    };

    const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
    const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && momentIndex < futureMoments.length - 1) {
            setMomentIndex(prev => prev + 1);
        }
        if (isRightSwipe && momentIndex > 0) {
            setMomentIndex(prev => prev - 1);
        }
        setTouchStart(0);
        setTouchEnd(0);
    };

    const faqs = [
        {
            q: "¿Cada cuánto se actualiza mi historial?",
            a: "El reporte se actualiza mensualmente con la información que las instituciones financieras y comerciales reportan a la Superintendencia de Bancos (SEPS) y SICOM."
        },
        {
            q: "¿Tener deudas es malo?",
            a: "No. Tener deudas y pagarlas a tiempo es de hecho la mejor manera de construir un historial positivo. Lo que afecta tu score es el atraso en los pagos (morosidad) o un endeudamiento que supere tu capacidad de pago."
        },
        {
            q: "¿PagoExpress puede borrar mis deudas?",
            a: "No. PagoExpress es un canal de información oficial (Agente Autorizado de Equifax). No modificamos, borramos ni alteramos datos del buró de crédito. Si existe un error en tu reporte, debes presentar el reclamo directamente a la institución que originó la deuda."
        }
    ];

    const futureMoments = [
        {
            title: "Planificando tu Hogar",
            desc: "Validación indispensable para calificar a créditos hipotecarios con el BIESS o banca privada.",
            image: "/images/equifax/vivienda.webp",
            tag: "Vivienda"
        },
        {
            title: "Impulso Emprendedor",
            desc: "El primer paso para obtener microcréditos y capital de trabajo para tu negocio en Loja.",
            image: "/images/equifax/negocios.webp",
            tag: "Negocios"
        },
        {
            title: "Metas Educativas",
            desc: "Fortalece tu perfil para aplicar a créditos de estudios de grado o posgrado.",
            image: "/images/equifax/educacion.webp",
            tag: "Educación"
        },
        {
            title: "Historial de Consumo",
            desc: "Asegura mejores condiciones en planes de telefonía, tarjetas y crédito vehicular.",
            image: "/images/equifax/movilidad.webp",
            tag: "Movilidad"
        }
    ];

    return (
        <main className="min-h-screen bg-white text-slate-900 selection:bg-[#E31837] selection:text-white font-sans">
            <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-white">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 skew-x-[-15deg] translate-x-24 -z-0" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#E31837]/5 rounded-full blur-3xl" />
                <div className="absolute -top-24 right-1/4 w-64 h-64 bg-[#006F8E]/5 rounded-full blur-3xl" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-8">
                                <Image src="/images/header logo/equifax.webp" alt="Equifax" width={80} height={20} className="w-[80px] h-auto" />
                                <span className="w-1 h-1 rounded-full bg-[#E31837]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                                    Punto Autorizado Loja
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tighter mb-8 text-[#006F8E]">
                                Tu Reporte de Crédito <br />
                                <span className="text-[#E31837] relative">
                                    Oficial Equifax
                                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#006F8E]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                                    </svg>
                                </span>
                            </h1>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="#planes"
                                    className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-[#006F8E] hover:bg-[#005a74] text-white text-xl font-black rounded-2xl transition-all shadow-2xl shadow-[#006F8E]/30 hover:scale-105 active:scale-95"
                                >
                                    Ver Productos
                                    <ArrowRight className="w-6 h-6" />
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative aspect-square w-full max-w-lg mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#E31837]/10 to-transparent rounded-[3rem] rotate-6" />
                                <div className="absolute inset-0 bg-white border border-slate-100 rounded-[3rem] shadow-2xl overflow-hidden">
                                    <motion.div
                                        animate={{
                                            x: ["0%", "-100%", "0%"]
                                        }}
                                        transition={{
                                            duration: 12,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="flex h-full"
                                    >
                                        <div className="min-w-full h-full relative p-8 flex items-center justify-center">
                                            <Image 
                                                src="/images/equifax/hero-1.png" 
                                                alt="Equifax Report" 
                                                width={500} height={500} 
                                                className="w-full h-full object-contain rounded-2xl"
                                            />
                                        </div>
                                        <div className="min-w-full h-full relative p-8 flex items-center justify-center">
                                            <Image 
                                                src="/images/equifax/hero-2.png" 
                                                alt="Equifax Office" 
                                                width={500} height={500} 
                                                className="w-full h-full object-contain rounded-2xl"
                                            />
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-50 flex items-center gap-4"
                                >
                                    <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
                                        <CheckCircle2 className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Entrega</p>
                                        <p className="text-lg font-black text-[#006F8E]">Inmediata</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black text-[#006F8E] tracking-tight">
                            Proceso de Entrega Inmediata
                        </h2>
                        <p className="text-slate-500 mt-4 font-medium">Obtén tu historial oficial en 3 simples pasos en Loja.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-0.5 bg-slate-100 -z-10" />

                        <div className="text-center relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="w-16 h-16 rounded-full bg-[#006F8E] text-white flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-lg shadow-[#006F8E]/20">1</div>
                            <MapPin className="w-8 h-8 text-[#E31837] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-[#006F8E] mb-3">Identificación</h3>
                            <p className="text-slate-500 font-medium text-sm leading-relaxed">
                                Acércate a nuestra Matriz o sucursal Parque Bolívar con tu **cédula original**.
                            </p>
                        </div>

                        <div className="text-center relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="w-16 h-16 rounded-full bg-[#E31837] text-white flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-lg shadow-[#E31837]/20">2</div>
                            <ShieldCheck className="w-8 h-8 text-[#006F8E] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-[#006F8E] mb-3">Validación</h3>
                            <p className="text-slate-500 font-medium text-sm leading-relaxed">
                                Confirmamos tu identidad por seguridad y protección estricta de tus datos financieros.
                            </p>
                        </div>

                        <div className="text-center relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="w-16 h-16 rounded-full bg-[#006F8E] text-white flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-lg shadow-[#006F8E]/20">3</div>
                            <MonitorSmartphone className="w-8 h-8 text-[#E31837] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-[#006F8E] mb-3">Impresión/Envío</h3>
                            <p className="text-slate-500 font-medium text-sm leading-relaxed">
                                Recibe tu reporte oficial Equifax **impreso** o en tu **correo electrónico** al instante.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="planes" className="py-24 bg-[#F5F7F8] relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <span className="text-[#E31837] font-black uppercase tracking-[0.3em] text-xs mb-3 block">Agente Autorizado</span>
                        <h2 className="text-3xl sm:text-5xl font-black text-[#006F8E] tracking-tight mb-4 uppercase italic">Productos y Soluciones</h2>
                        <p className="text-lg text-slate-500 font-medium italic">Precios oficiales actualizados con IVA.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { 
                                name: "Informe de Crédito", 
                                priceBase: "9.61",
                                priceTotal: "11.05", 
                                desc: "Conoce tu situación financiera, detalle de tus deudas, score crediticio y más.", 
                                icon: FileText, 
                                tag: "Más Vendido", 
                                accent: "#E31837" 
                            },
                            { 
                                name: "Informe de Crédito Histórico", 
                                priceBase: "5.40",
                                priceTotal: "6.21", 
                                desc: "Detalle de tus créditos históricos de los últimos 24 meses.", 
                                icon: Calendar, 
                                accent: "#64748b" 
                            },
                            { 
                                name: "Informe de Crédito Ilimitado", 
                                priceBase: "19.99",
                                priceTotal: "22.99", 
                                desc: "Accede a tu informe de crédito de forma ilimitada por 6 meses.", 
                                icon: MonitorSmartphone, 
                                accent: "#006F8E" 
                            },
                            { 
                                name: "Kit Financiero", 
                                priceBase: "12.52",
                                priceTotal: "14.40", 
                                desc: "Informe de crédito + kit para conocer, administrar y mejorar tus finanzas.", 
                                icon: Briefcase, 
                                accent: "#006F8E" 
                            },
                            { 
                                name: "Alertas Crediticias", 
                                priceBase: "16.10",
                                priceTotal: "18.52", 
                                desc: "Recibe alertas por 12 meses ante cualquier cambio en tu información.", 
                                icon: ShieldAlert, 
                                accent: "#E31837" 
                            },
                        ].map((plan, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                className="bg-white rounded-3xl p-8 border border-slate-100 flex flex-col hover:shadow-2xl transition-all group relative overflow-hidden"
                            >
                                {plan.tag && (
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-[#E31837] text-white text-[9px] font-black uppercase tracking-widest rounded-full z-10">
                                        {plan.tag}
                                    </div>
                                )}
                                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110" style={{ backgroundColor: `${plan.accent}10` }}>
                                    <plan.icon className="w-7 h-7" style={{ color: plan.accent }} />
                                </div>
                                <h3 className="text-xl font-black text-[#006F8E] uppercase tracking-tight mb-2">{plan.name}</h3>
                                <p className="text-slate-500 text-sm mb-8 font-medium leading-relaxed h-12 line-clamp-2">{plan.desc}</p>
                                
                                <div className="mt-auto pt-6 border-t border-slate-50 flex items-end justify-between">
                                    <div className="flex flex-col">
                                        <div className="flex items-start gap-0.5">
                                            <span className="text-lg font-bold text-[#006F8E] mt-1">$</span>
                                            <span className="text-4xl font-black text-[#006F8E] tracking-tighter">{plan.priceBase}</span>
                                            <span className="text-xs font-bold text-slate-400 mt-4 ml-1">+ IVA</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                            ${plan.priceTotal} Incl. IVA
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => openModal({ name: plan.name, price: plan.priceTotal })}
                                        className="px-6 py-3 bg-[#006F8E] hover:bg-[#005a74] text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all shadow-lg shadow-[#006F8E]/20 active:scale-95"
                                    >
                                        Comprar
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-32 bg-white relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl sm:text-6xl font-black text-[#006F8E] uppercase italic tracking-tighter mb-6 leading-tight">
                            MOMENTOS QUE <br /><span className="text-slate-200">IMPULSAN TU FUTURO</span>
                        </h2>
                        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto italic">
                            Estar al tanto de tu historial crediticio es la llave para las metas más importantes de tu vida.
                        </p>
                    </div>

                    <div className="lg:hidden relative">
                        <div
                            className="overflow-hidden px-1"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div
                                className="flex transition-transform duration-500 ease-out"
                                style={{ transform: `translateX(-${momentIndex * 100}%)` }}
                            >
                                {futureMoments.map((moment, i) => (
                                    <div key={i} className="w-full flex-shrink-0 px-2">
                                        <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-200 relative overflow-hidden flex flex-col h-full">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#E31837]/5 rounded-full blur-3xl" />
                                            <div className="w-full h-48 rounded-3xl overflow-hidden mb-6 relative shadow-md">
                                                <Image
                                                    src={moment.image}
                                                    alt={moment.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="inline-flex items-center w-fit px-3 py-1 rounded-full bg-white border border-slate-100 text-[9px] font-black uppercase tracking-wider text-[#E31837] mb-4">{moment.tag}</div>
                                            <h3 className="text-2xl font-black text-[#006F8E] mb-4 uppercase tracking-tighter leading-tight">{moment.title}</h3>
                                            <p className="text-slate-600 font-medium leading-relaxed text-sm">{moment.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-6 mt-8">
                            <button
                                onClick={() => setMomentIndex(prev => Math.max(0, prev - 1))}
                                disabled={momentIndex === 0}
                                className="w-10 h-10 rounded-full bg-[#006F8E] text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <div className="flex gap-2">
                                {futureMoments.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${momentIndex === i ? 'bg-[#E31837] w-6' : 'bg-slate-300'}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => setMomentIndex(prev => Math.min(futureMoments.length - 1, prev + 1))}
                                disabled={momentIndex === futureMoments.length - 1}
                                className="w-10 h-10 rounded-full bg-[#006F8E] text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <div className="hidden lg:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {futureMoments.map((moment, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                transition={{ delay: i * 0.1 }}
                                className="group p-8 rounded-[3rem] bg-slate-50 border border-transparent hover:border-[#E31837] transition-all hover:shadow-2xl relative overflow-hidden flex flex-col"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#E31837]/5 rounded-full blur-3xl group-hover:bg-[#E31837]/10 transition-colors" />

                                <div className="w-full h-48 rounded-3xl overflow-hidden mb-8 relative group-hover:scale-[1.02] transition-transform duration-500 shadow-lg border border-white/50">
                                    <Image
                                        src={moment.image}
                                        alt={moment.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#006F8E]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <div className="inline-flex items-center w-fit px-3 py-1 rounded-full bg-white border border-slate-100 text-[9px] font-black uppercase tracking-wider text-[#006F8E]/40 mb-4 group-hover:bg-[#E31837]/10 group-hover:text-[#E31837] transition-all">{moment.tag}</div>
                                <h3 className="text-2xl font-black text-[#006F8E] mb-4 uppercase tracking-tighter leading-tight relative z-10">{moment.title}</h3>
                                <p className="text-slate-600 font-medium leading-relaxed relative z-10 text-sm">{moment.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 bg-[#006F8E] rounded-[3rem] p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E31837_1px,transparent_1px)] [background-size:30px_30px]" />
                        <h4 className="text-white text-2xl font-black mb-6 uppercase italic relative z-10">¿Buscas financiamiento en Loja?</h4>
                        <Link
                            href="#planes"
                            className="inline-flex items-center gap-4 px-12 py-5 bg-[#E31837] text-white font-black uppercase tracking-widest rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-[#E31837]/40 relative z-10"
                        >
                            <FileText className="w-6 h-6" />
                            Obtener Reporte Oficial
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-[#F8FAFC]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-[#006F8E]">Preguntas sobre el Score</h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full flex justify-between items-center p-6 text-left transition-colors hover:bg-slate-50"
                                >
                                    <span className="font-bold text-[#006F8E] pr-8">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-[#E31837] shrink-0 transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`} />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-6 text-slate-500 font-medium text-sm"
                                        >
                                            <div className="pt-4 border-t border-slate-100 leading-relaxed">
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

            <MapSection />

            <footer className="py-12 bg-white border-t border-slate-100">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-6">
                        <Image src="/images/header logo/equifax.webp" alt="Equifax" width={120} height={35} className="opacity-70 hover:opacity-100 transition-opacity" />
                        <div className="w-px h-6 bg-slate-200" />
                        <Image src="/logo.jpg" alt="PagoExpress" width={100} height={30} className="opacity-70 hover:opacity-100 transition-opacity rounded" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center md:text-right max-w-sm">
                        Agente Autorizado de Equifax en Loja. <br />Entrega de informes físicos y digitales oficiales.
                    </p>
                </div>
            </footer>

            <AnimatePresence>
                {isModalOpen && selectedPlan && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-[#006F8E]/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
                        >
                            <div className="bg-[#E31837] p-6 text-white relative">
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold italic uppercase tracking-tight">Solicitud de Reporte</h3>
                                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{selectedPlan.name} - ${selectedPlan.price}</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-5">
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block group-focus-within:text-[#E31837] transition-colors">Número de Cédula</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#E31837] transition-colors" />
                                            <input 
                                                required
                                                type="text" 
                                                placeholder="0000000000"
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E31837]/20 focus:border-[#E31837] transition-all font-bold text-[#006F8E]"
                                                onChange={(e) => setFormData({...formData, cedula: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    <div className="relative group">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block group-focus-within:text-[#E31837] transition-colors">Correo Electrónico</label>
                                        <div className="relative">
                                            <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#E31837] transition-colors" />
                                            <input 
                                                required
                                                type="email" 
                                                placeholder="tu@email.com"
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E31837]/20 focus:border-[#E31837] transition-all font-bold text-[#006F8E]"
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    <div className="relative group">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block group-focus-within:text-[#E31837] transition-colors">Dirección de Domicilio</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#E31837] transition-colors" />
                                            <input 
                                                required
                                                type="text" 
                                                placeholder="Calle Principal y Secundaria"
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E31837]/20 focus:border-[#E31837] transition-all font-bold text-[#006F8E]"
                                                onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    <div className="relative group">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block group-focus-within:text-[#E31837] transition-colors">Celular / WhatsApp</label>
                                        <div className="relative">
                                            <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#E31837] transition-colors" />
                                            <input 
                                                required
                                                type="tel" 
                                                placeholder="0999999999"
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E31837]/20 focus:border-[#E31837] transition-all font-bold text-[#006F8E]"
                                                onChange={(e) => setFormData({...formData, celular: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full py-5 bg-[#E31837] hover:bg-[#c1142e] text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-[#E31837]/30 hover:scale-[1.02] active:scale-[0.98] mt-4"
                                >
                                    Confirmar y Solicitar
                                </button>

                                <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-tighter">
                                    Al solicitar, un agente se contactará contigo para la validación de identidad.
                                </p>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
