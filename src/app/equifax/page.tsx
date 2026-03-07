"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    Activity,
    ArrowRight,
    Calendar,
    ChevronDown,
    CreditCard,
    Eye,
    FileText,
    Lock,
    MapPin,
    ShieldCheck,
    Wallet,
    CheckCircle2,
    MonitorSmartphone,
    TrendingUp,
    ShieldAlert,
    Home,
    Briefcase,
    GraduationCap,
    Car,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import MapSection from "@/components/MapSection";

const EFX_RED = "#E31837";
const EFX_NAVY = "#002855";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const }
    }
};

const ScoreMeter = () => {
    return (
        <div className="relative w-full max-w-[320px] mx-auto mt-12 mb-8">
            <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-2xl">
                {/* Background Arc */}
                <path
                    d="M 10 100 A 90 90 0 0 1 190 100"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="16"
                    strokeLinecap="round"
                />
                {/* Color Zones (Poor, Fair, Good, Excellent) */}
                <path d="M 10 100 A 90 90 0 0 1 50 25" fill="none" stroke="#ef4444" strokeWidth="16" strokeLinecap="round" strokeDasharray="140" strokeDashoffset="0" className="opacity-50" />
                <path d="M 50 25 A 90 90 0 0 1 100 10" fill="none" stroke="#f59e0b" strokeWidth="16" strokeLinecap="round" strokeDasharray="140" strokeDashoffset="0" className="opacity-50" />
                <path d="M 100 10 A 90 90 0 0 1 150 25" fill="none" stroke="#84cc16" strokeWidth="16" strokeLinecap="round" strokeDasharray="140" strokeDashoffset="0" className="opacity-50" />
                <path d="M 150 25 A 90 90 0 0 1 190 100" fill="none" stroke="#22c55e" strokeWidth="16" strokeLinecap="round" strokeDasharray="140" strokeDashoffset="0" className="opacity-50" />

                {/* Animated Foreground Arc (Score) */}
                <motion.path
                    d="M 10 100 A 90 90 0 0 1 190 100"
                    fill="none"
                    stroke={EFX_RED}
                    strokeWidth="16"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 0.78 }} // 780 score approx 78%
                    transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                />

                {/* Center Pivot */}
                <circle cx="100" cy="100" r="12" fill={EFX_RED} />
                <circle cx="100" cy="100" r="6" fill="#002855" />

                {/* Animated Needle */}
                <motion.path
                    d="M 96 100 L 100 20 L 104 100 Z"
                    fill={EFX_RED}
                    initial={{ rotate: -90, originX: "100px", originY: "100px" }}
                    animate={{ rotate: 50, originX: "100px", originY: "100px" }} // 78% of 180 = 140deg. -90 + 140 = 50deg
                    transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                />
            </svg>

            <motion.div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-center w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2 }}
            >
                <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-5xl font-black text-white tracking-tighter">780</span>
                    <TrendingUp className="w-6 h-6 text-[#22c55e]" />
                </div>
                <span className="inline-block px-3 py-1 bg-white/10 text-white text-xs font-black uppercase tracking-widest rounded-full backdrop-blur-sm border border-white/20">
                    Excelente Perfil
                </span>
            </motion.div>
        </div>
    );
};

export default function EquifaxPage() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [momentIndex, setMomentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

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

    const educationalCards = [
        {
            title: "Tu Score",
            desc: "El puntaje que ven los bancos para decidir si te prestan dinero (varía de 1 a 999).",
            icon: Activity,
            color: "text-red-500",
            bg: "bg-red-50"
        },
        {
            title: "Historial de Pagos",
            desc: "El registro mensual de tus tarjetas de crédito, préstamos y servicios básicos.",
            icon: Calendar,
            color: "text-blue-500",
            bg: "bg-blue-50"
        },
        {
            title: "Deudas Actuales",
            desc: "Detalle completo de tus saldos pendientes en el sistema financiero y comercial.",
            icon: Wallet,
            color: "text-emerald-500",
            bg: "bg-emerald-50"
        },
        {
            title: "Consultas",
            desc: "Registro de qué empresas o bancos han revisado tu perfil crediticio recientemente.",
            icon: Eye,
            color: "text-purple-500",
            bg: "bg-purple-50"
        }
    ];

    const benefits = [
        {
            title: "Prepárate para un crédito",
            desc: "Revisa si estás apto antes de ir al banco o cooperativa, aumentando tus probabilidades de aprobación.",
            icon: CheckCircle2
        },
        {
            title: "Detecta errores o fraudes",
            desc: "Asegúrate de que no haya deudas reportadas que no te corresponden o suplantación de identidad.",
            icon: ShieldAlert
        },
        {
            title: "Mejora tu perfil",
            desc: "Entiende qué factores bajan tu puntaje y toma medidas estratégicas para subirlos mes a mes.",
            icon: TrendingUp
        }
    ];

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

            {/* ═══ Section 1: Hero (Empoderamiento Financiero) ═══ */}
            <section className="relative overflow-hidden min-h-[calc(100dvh-64px)] lg:h-[70vh] lg:min-h-[550px] flex flex-col justify-start lg:justify-center bg-[#002855] text-white pt-2 pb-8 lg:pt-28 lg:pb-0">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(white 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E31837]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#002855] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full flex-grow flex flex-col justify-start lg:justify-center">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl text-center lg:text-left mt-0 lg:mt-0">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 lg:mb-8 backdrop-blur-md">
                                <Image src="/images/header logo/equifax.webp" alt="Equifax" width={80} height={20} className="w-[60px] lg:w-[80px] h-auto opacity-90" />
                                <span className="w-1 h-1 rounded-full bg-[#E31837]" />
                                <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                                    Punto Autorizado
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-4 lg:mb-6">
                                Buró de Crédito <span className="text-[#E31837]">Equifax</span> en Loja
                            </h1>

                            <p className="text-base lg:text-xl text-white/70 mb-8 leading-relaxed font-medium">
                                Obtén tu reporte de crédito oficial en segundos en nuestras agencias. Toma el control de tus finanzas y abre las puertas de tu próximo préstamo.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="https://wa.me/593990227203?text=Hola%20PagoExpress,%20quiero%20obtener%20mi%20reporte%20Equifax."
                                    target="_blank"
                                    className="group inline-flex items-center justify-center gap-3 px-6 lg:px-8 py-4 bg-[#E31837] text-white font-bold rounded-lg transition-all hover:bg-[#c1142e] active:scale-95 shadow-xl shadow-[#E31837]/20"
                                >
                                    <FileText className="w-5 h-5" />
                                    Obtener mi Reporte Ahora
                                </Link>
                                <Link
                                    href="#educacion"
                                    className="inline-flex items-center justify-center gap-2 px-6 lg:px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm"
                                >
                                    ¿Qué incluye el reporte?
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative lg:h-[400px] w-full flex items-center justify-center mt-2 lg:mt-0"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl border border-white/10 backdrop-blur-sm shadow-2xl flex flex-col items-center justify-center p-6 lg:p-8">
                                <div className="text-center mb-4">
                                    <h3 className="text-white font-bold text-xl uppercase tracking-widest">Score Meter</h3>
                                    <p className="text-white/50 text-xs font-medium mt-1">Simulación de Puntaje Equifax</p>
                                </div>
                                <ScoreMeter />
                                <div className="mt-12 text-center text-white/40 text-xs italic max-w-xs leading-relaxed">
                                    "Un score alto demuestra buen comportamiento de pago y te abre las puertas del sistema financiero."
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══ Section 2: ¿Qué es el Reporte de Crédito? ═══ */}
            <section id="educacion" className="py-24 bg-slate-50 relative border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <span className="text-[#E31837] font-bold uppercase tracking-widest text-sm mb-4 block">Educación Financiera</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-[#002855] tracking-tight mb-6">
                            ¿Qué incluye tu Reporte de Crédito?
                        </h2>
                        <p className="text-lg text-slate-600 font-medium">
                            El Buró de Crédito es tu carta de presentación ante los bancos. Conoce exactamente qué variables evalúan para otorgarte financiamiento.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {educationalCards.map((card, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
                            >
                                <div className={`w-14 h-14 rounded-xl ${card.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <card.icon className={`w-7 h-7 ${card.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-[#002855] mb-3">{card.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed text-sm">{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Section 3: Proceso de Entrega Inmediata ═══ */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black text-[#002855] tracking-tight">
                            Proceso de Entrega Inmediata
                        </h2>
                        <p className="text-slate-500 mt-4 font-medium">Obtén tu historial oficial en 3 simples pasos en Loja.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-0.5 bg-slate-100 -z-10" />

                        <div className="text-center relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="w-16 h-16 rounded-full bg-[#002855] text-white flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-lg shadow-[#002855]/20">1</div>
                            <MapPin className="w-8 h-8 text-[#E31837] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-[#002855] mb-3">Identificación</h3>
                            <p className="text-slate-500 font-medium text-sm leading-relaxed">
                                Acércate a nuestra Matriz o sucursal La Castellana con tu **cédula original**.
                            </p>
                        </div>

                        <div className="text-center relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="w-16 h-16 rounded-full bg-[#E31837] text-white flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-lg shadow-[#E31837]/20">2</div>
                            <ShieldCheck className="w-8 h-8 text-[#002855] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-[#002855] mb-3">Validación</h3>
                            <p className="text-slate-500 font-medium text-sm leading-relaxed">
                                Confirmamos tu identidad por seguridad y protección estricta de tus datos financieros.
                            </p>
                        </div>

                        <div className="text-center relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="w-16 h-16 rounded-full bg-[#002855] text-white flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-lg shadow-[#002855]/20">3</div>
                            <MonitorSmartphone className="w-8 h-8 text-[#E31837] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-[#002855] mb-3">Impresión/Envío</h3>
                            <p className="text-slate-500 font-medium text-sm leading-relaxed">
                                Recibe tu reporte oficial Equifax **impreso** o en tu **correo electrónico** al instante.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Section 4: Beneficios ═══ */}
            <section className="py-24 bg-[#002855] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M0,100 L100,0 L100,100 Z" fill="currentColor" />
                    </svg>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-5xl font-black mb-8 leading-tight">
                                Beneficios de conocer <br />tu <span className="text-[#E31837]">Buró de Crédito</span>
                            </h2>
                            <p className="text-lg text-white/70 mb-10 font-medium leading-relaxed">
                                La información es poder. Un perfil de crédito sano te ahorra miles de dólares en intereses a lo largo de tu vida.
                            </p>

                            <div className="space-y-8">
                                {benefits.map((benefit, i) => (
                                    <div key={i} className="flex gap-5">
                                        <div className="w-12 h-12 rounded-full bg-[#E31837]/20 flex items-center justify-center shrink-0">
                                            <benefit.icon className="w-6 h-6 text-[#E31837]" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2">{benefit.title}</h4>
                                            <p className="text-white/60 font-medium leading-relaxed text-sm">{benefit.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#002855] via-[#0a3d6b] to-[#002855]" />
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(white 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#002855] via-[#002855]/60 to-transparent" />

                            {/* Section 5 Overlay: Privacidad */}
                            <div className="absolute bottom-0 left-0 w-full p-8">
                                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                            <Lock className="w-5 h-5 text-[#002855]" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white">Privacidad y Seguridad</h3>
                                    </div>
                                    <p className="text-white/80 text-sm font-medium leading-relaxed mb-4">
                                        "Tus datos están protegidos. La entrega del reporte es **estrictamente personal** y cumple con la Ley de Protección de Datos Personales del Ecuador."
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-[#E31837] uppercase tracking-widest">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Consulta Segura Validada
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Section 5: Momentos que Impulsan tu Futuro ═══ */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl sm:text-6xl font-black text-[#002855] uppercase italic tracking-tighter mb-6 leading-tight">
                            MOMENTOS QUE <br /><span className="text-slate-200">IMPULSAN TU FUTURO</span>
                        </h2>
                        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto italic">
                            Estar al tanto de tu historial crediticio es la llave para las metas más importantes de tu vida.
                        </p>
                    </div>

                    {/* Mobile Slider View */}
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
                                            <h3 className="text-2xl font-black text-[#002855] mb-4 uppercase tracking-tighter leading-tight">{moment.title}</h3>
                                            <p className="text-slate-600 font-medium leading-relaxed text-sm">{moment.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Slider Navigation */}
                        <div className="flex items-center justify-center gap-6 mt-8">
                            <button
                                onClick={() => setMomentIndex(prev => Math.max(0, prev - 1))}
                                disabled={momentIndex === 0}
                                className="w-10 h-10 rounded-full bg-[#002855] text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
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
                                className="w-10 h-10 rounded-full bg-[#002855] text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Desktop Grid View */}
                    <div className="hidden lg:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {futureMoments.map((moment, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                transition={{ delay: i * 0.1 }}
                                className="group p-8 rounded-[3rem] bg-slate-50 border border-transparent hover:border-[#E31837] transition-all hover:shadow-2xl relative overflow-hidden flex flex-col"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#E31837]/5 rounded-full blur-3xl group-hover:bg-[#E31837]/10 transition-colors" />

                                {/* Image Container */}
                                <div className="w-full h-48 rounded-3xl overflow-hidden mb-8 relative group-hover:scale-[1.02] transition-transform duration-500 shadow-lg border border-white/50">
                                    <Image
                                        src={moment.image}
                                        alt={moment.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#002855]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <div className="inline-flex items-center w-fit px-3 py-1 rounded-full bg-white border border-slate-100 text-[9px] font-black uppercase tracking-wider text-[#002855]/40 mb-4 group-hover:bg-[#E31837]/10 group-hover:text-[#E31837] transition-all">{moment.tag}</div>
                                <h3 className="text-2xl font-black text-[#002855] mb-4 uppercase tracking-tighter leading-tight relative z-10">{moment.title}</h3>
                                <p className="text-slate-600 font-medium leading-relaxed relative z-10 text-sm">{moment.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 bg-[#002855] rounded-[3rem] p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E31837_1px,transparent_1px)] [background-size:30px_30px]" />
                        <h4 className="text-white text-2xl font-black mb-6 uppercase italic relative z-10">¿Buscas financiamiento en Loja?</h4>
                        <Link
                            href="https://wa.me/593990227203?text=Hola%20PagoExpress,%20necesito%20mi%20reporte%20Equifax%20para%20un%20crédito."
                            target="_blank"
                            className="inline-flex items-center gap-4 px-12 py-5 bg-[#E31837] text-white font-black uppercase tracking-widest rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-[#E31837]/40 relative z-10"
                        >
                            <ShieldCheck className="w-6 h-6" />
                            Obtener Reporte Oficial
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══ Section 6: FAQ ═══ */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-[#002855]">Preguntas sobre el Score</h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full flex justify-between items-center p-6 text-left transition-colors hover:bg-slate-50"
                                >
                                    <span className="font-bold text-[#002855] pr-8">{faq.q}</span>
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

            {/* ═══ Footer ═══ */}
            <footer className="py-12 bg-[#001E2B] border-t border-white/5">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-6">
                        <Image src="/images/header logo/equifax.webp" alt="Equifax" width={120} height={35} className="opacity-70 hover:opacity-100 transition-opacity" />
                        <div className="w-px h-6 bg-white/20" />
                        <Image src="/logo.jpg" alt="PagoExpress" width={100} height={30} className="opacity-70 hover:opacity-100 transition-opacity rounded" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 text-center md:text-right max-w-sm">
                        Agente Autorizado de Equifax en Loja. <br />Entrega de informes físicos y digitales oficiales.
                    </p>
                </div>
            </footer>
        </main>
    );
}
