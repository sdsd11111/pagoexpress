"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Gamepad2,
    ArrowRight,
    CheckCircle2,
    DollarSign,
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
        address: "Miguel Riofrío y Olmedo (Esquina)",
        city: "Loja, Ecuador",
        phone: "07-2571234",
        hours: "Lun - Sáb: 08h00 - 19h00 | Dom: 09h00 - 14h00",
        mapsUrl: "https://maps.app.goo.gl/zeNg6ZCSPHosJvZw6"
    },
    {
        name: "Sucursal La Castellana",
        address: "Av. Salvador Bustamante Celi",
        city: "Loja, Ecuador",
        phone: "07-2581234",
        hours: "Lun - Vie: 08h30 - 18h30 | Sáb: 09h00 - 16h00",
        mapsUrl: "https://maps.app.goo.gl/zeNg6ZCSPHosJvZw6"
    }
];

const fadeUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const sweepRight: Variants = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } };

export default function EcuabetPage() {
    const [userId, setUserId] = useState("");
    const [amount, setAmount] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleWhatsAppSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const message = `Hola PagoExpress, deseo realizar una recarga de Ecuabet.\n\n🆔 *ID de Usuario:* ${userId}\n💰 *Monto:* $${amount}\n\nQuedo a la espera de sus instrucciones.`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/593990227203?text=${encodedMessage}`, "_blank");
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-pe-yellow selection:text-black font-sans">
            {/* ═══ Section 1: Hero ═══ */}
            <section className="relative overflow-hidden min-h-[calc(100vh-80px)] lg:h-[70vh] lg:min-h-[550px] flex items-center bg-black border-b border-white/5 pt-28 pb-16 lg:pt-28 lg:pb-0">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[600px] rounded-full blur-[140px] opacity-20 pointer-events-none" style={{ background: ECUABET_GOLD }} />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-5 pointer-events-none" style={{ background: ECUABET_GOLD }} />
                </div>

                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle, white 0.5px, transparent 0.5px)`, backgroundSize: "32px 32px" }} />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center">
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border mb-8 bg-white/5 border-white/10">
                            <div className="flex items-center gap-2 border-r border-white/20 pr-3">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ECUABET_GOLD }} />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Punto Autorizado</span>
                            </div>
                            <Image src="/logo.jpg" alt="PagoExpress" width={70} height={20} className="h-3.5 w-auto brightness-0 invert opacity-60" />
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-[4.5rem] font-black leading-[1.2] lg:leading-[1.1] tracking-tighter mb-6 lg:mb-6 uppercase italic px-2">
                            Recargas de{" "}
                            <span style={{ color: ECUABET_GOLD }}>Ecuabet</span>
                            <br />en Loja
                        </h1>

                        <p className="text-sm sm:text-lg lg:text-xl text-white/50 max-w-2xl mx-auto mb-10 lg:mb-10 leading-relaxed font-light px-4">
                            Olvídate de las tarjetas de crédito. Ven a nuestras agencias en Loja, paga en efectivo y recibe tu saldo de <span className="text-white font-bold">Ecuabet</span> de forma inmediata y 100% segura.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 lg:gap-5 justify-center px-4">
                            <Link
                                href="#accion"
                                className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 text-black font-black uppercase tracking-widest rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-pe-yellow/20"
                                style={{ backgroundColor: ECUABET_GOLD }}
                            >
                                <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Recargar Ahora
                            </Link>
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
                </div>
            </section>

            {/* ═══ Section 2: Servicios Autorizados (Bento Grid) ═══ */}
            <section id="accion" className="py-24 bg-[#0a0a0a] border-b border-white/5 overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tighter">
                            SERVICIOS <span style={{ color: ECUABET_GOLD }}>AUTORIZADOS</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Tarjeta Izquierda: Recargas */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={sweepRight}
                            className="group relative bg-black p-10 rounded-[2.5rem] border border-white/5 hover:border-pe-yellow/30 transition-all overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-pe-yellow/5 rounded-full blur-[100px] group-hover:bg-pe-yellow/10 transition-all" />

                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-pe-yellow/10">
                                <Zap className="w-8 h-8" style={{ color: ECUABET_GOLD }} />
                            </div>

                            <h3 className="text-4xl font-black text-white mb-6 uppercase italic tracking-tight">Recargas al <br /><span style={{ color: ECUABET_GOLD }}>Instante</span></h3>

                            <div className="space-y-6">
                                <p className="text-white/60 text-lg leading-relaxed">
                                    Acredita saldo a tu cuenta con pago en efectivo. Sin necesidad de tarjetas ni bancos. Dicta tu ID de usuario en ventanilla y empieza a jugar al instante.
                                </p>
                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <Smartphone className="w-6 h-6 text-white/40" />
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Política vigente</div>
                                        <div className="text-sm font-bold text-white/80">Monto mínimo: $1.00</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Tarjeta Derecha: Retiros */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={sweepRight}
                            className="group relative bg-[#0D131A] p-10 rounded-[2.5rem] border border-white/5 hover:border-pe-yellow/30 transition-all overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-pe-yellow/5 rounded-full blur-[100px] group-hover:bg-pe-yellow/10 transition-all" />

                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-pe-yellow/10">
                                <Banknote className="w-8 h-8" style={{ color: ECUABET_GOLD }} />
                            </div>

                            <h3 className="text-4xl font-black text-white mb-6 uppercase italic tracking-tight">Retiro de <br /><span style={{ color: ECUABET_GOLD }}>Premios</span></h3>

                            <div className="space-y-6">
                                <p className="text-white/60 text-lg leading-relaxed">
                                    Haz efectivo tus aciertos. Proceso seguro con verificación de identidad en ventanilla.
                                </p>
                                <div className="flex items-center gap-3 p-4 bg-pe-yellow/10 rounded-2xl border border-pe-yellow/20">
                                    <ShieldAlert className="w-6 h-6" style={{ color: ECUABET_GOLD }} />
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-pe-yellow/50">Requisito clave</div>
                                        <div className="text-sm font-bold text-white/80">Cédula + Código de retiro</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══ Feature: Formulario Dinámico WhatsApp ═══ */}
            <section className="py-24 bg-black relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-xl"
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black text-white mb-4 uppercase italic">Solicitud de <span style={{ color: ECUABET_GOLD }}>Recarga</span></h2>
                            <p className="text-white/40">Ingresa tus datos para generar el ticket de WhatsApp</p>
                        </div>

                        <form onSubmit={handleWhatsAppSubmit} className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-white/40 px-2">ID Usuario Ecuabet</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ej: 859302"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-pe-yellow/50 transition-all font-bold placeholder:text-white/10"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-white/40 px-2">Monto a Recargar ($)</label>
                                <input
                                    type="number"
                                    required
                                    placeholder="Ej: 20"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-pe-yellow/50 transition-all font-bold placeholder:text-white/10"
                                />
                            </div>
                            <button
                                type="submit"
                                className="md:col-span-2 mt-4 bg-white text-black font-black uppercase tracking-widest py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-pe-yellow hover:scale-[1.02] transition-all active:scale-95"
                            >
                                <Send className="w-5 h-5" />
                                Generar Mensaje de WhatsApp
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* ═══ Section 3: Ventajas Ganadoras (Bento Grid) ═══ */}
            <section className="py-24 bg-black relative overflow-hidden border-b border-white/5">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tighter">
                            VENTAJAS <span style={{ color: ECUABET_GOLD }}>GANADORAS</span>
                        </h2>
                        <p className="text-white/40 mt-4 text-lg font-medium">¿Por qué gestionar tu cuenta Ecuabet con PagoExpress?</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                t: "Liquidez Inmediata",
                                d: "Cobra tus premios al instante en efectivo. Sin esperas bancarias ni procesos complejos.",
                                i: Banknote
                            },
                            {
                                t: "Privacidad Total",
                                d: "Gestionamos tus datos con absoluta discreción y el respaldo de un corresponsal autorizado.",
                                i: ShieldCheck
                            },
                            {
                                t: "Soporte en Persona",
                                d: "Resuelve dudas cara a cara en nuestras agencias. Sin tickets de espera ni bots.",
                                i: MessageCircle
                            }
                        ].map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                transition={{ delay: i * 0.1 }}
                                className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-pe-yellow/50 transition-all relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-pe-yellow/5 rounded-full blur-[60px] group-hover:bg-pe-yellow/10 transition-all" />
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform">
                                    <benefit.i className="w-7 h-7" style={{ color: ECUABET_GOLD }} />
                                </div>
                                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{benefit.t}</h3>
                                <p className="text-white/50 text-sm leading-relaxed font-medium">
                                    {benefit.d}
                                </p>
                            </motion.div>
                        ))}
                    </div>
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
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: ECUABET_GOLD }}>Watch Experience</span>
                            </div>
                            <h2 className="text-4xl sm:text-6xl font-black text-white leading-none mb-6 uppercase italic tracking-tighter">
                                VIVE LA <br /> EXPERIENCIA <span style={{ color: ECUABET_GOLD }}>ECUABET</span>
                            </h2>
                            <p className="text-white/50 text-lg mb-8 leading-relaxed font-medium">
                                Mira cómo es de fácil y seguro gestionar tus pronósticos deportivos en nuestras agencias físicas. Sin complicaciones, con atención humana y pagos inmediatos.
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

            {/* ═══ Section 5: Guía Paso a Paso (Infografía) ═══ */}
            <section className="py-24 bg-pe-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-5xl font-black text-pe-black uppercase italic tracking-tighter">
                            CÓMO OPERAR EN <span className="text-pe-yellow-dark">LOJA</span>
                        </h2>
                        <p className="text-pe-gray-500 mt-4 text-lg font-medium">Sigue estos tres sencillos pasos en nuestros puntos autorizados.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-pe-gray-200 z-0" />

                        {[
                            { step: "01", text: "Acércate a nuestra Matriz o sucursal La Castellana.", icon: MapPin },
                            { step: "02", text: "Indica tu ID de usuario de Ecuabet y el monto.", icon: CreditCard },
                            { step: "03", text: "¡Listo! Saldo acreditado o dinero en mano al instante.", icon: CheckCircle2 },
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
                                <p className="text-pe-black font-black text-lg max-w-[250px] leading-tight uppercase tracking-tight">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Section 5: Sucursales y Mapa (Rediseño 3 Columnas) ═══ */}
            <section id="sucursales" className="py-24 bg-white overflow-hidden">
                <div className="max-w-[1600px] mx-auto px-4">
                    <div className="bg-white rounded-[4rem] overflow-hidden shadow-3xl flex flex-col lg:flex-row border border-pe-gray-100 min-h-[750px]">

                        {/* COUMNA 1: Valor (Black) */}
                        <div className="lg:w-1/3 bg-pe-black p-10 lg:p-16 flex flex-col justify-center text-white border-r border-white/5">
                            <div className="inline-flex items-center gap-2 text-pe-yellow mb-8">
                                <Zap className="w-5 h-5" />
                                <span className="font-black uppercase tracking-[0.2em] text-[10px]" style={{ color: ECUABET_GOLD }}>Punto Autorizado Loja</span>
                            </div>
                            <h3 className="text-4xl lg:text-5xl font-black mb-10 leading-[1.1] uppercase italic" style={{ color: ECUABET_GOLD }}>
                                Gestiona tus <br /><span className="text-white">Pronósticos</span>
                            </h3>
                            <div className="space-y-4">
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <p className="font-black text-[9px] uppercase tracking-widest mb-2" style={{ color: ECUABET_GOLD }}>Punto Matriz</p>
                                    <p className="text-sm font-medium text-white/90 leading-relaxed italic pr-4">Miguel Riofrío y Olmedo. Atención hasta las 19:00.</p>
                                </div>
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <p className="font-black text-[9px] uppercase tracking-widest mb-2" style={{ color: ECUABET_GOLD }}>Punto La Castellana</p>
                                    <p className="text-sm font-medium text-white/90 leading-relaxed italic pr-4">Av. Salvador Bustamante Celi. Abierto Fines de Semana.</p>
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
                            <h3 className="text-3xl font-black mb-10 text-pe-black uppercase leading-none italic" style={{ color: ECUABET_GOLD }}>
                                <span className="text-pe-black">Visítanos</span> <br /> en <span className="text-pe-black/30">nuestras agencias</span>
                            </h3>

                            <div className="space-y-4 mb-8">
                                {[
                                    { name: "Agencia Matriz", dir: "Miguel Riofrío y Olmedo", h1: "Lun - Sáb: 08:00 - 19:00", h2: "Dom: 09:00 - 14:00" },
                                    { name: "Sucursal La Castellana", dir: "Av. Salvador Bustamante Celi", h1: "Lun - Vie: 08:30 - 18:30", h2: "Sáb: 09:00 - 16:00" }
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
                                PagoExpress es un socio comercial estratégico **oficialmente autorizado** por Ecuabet. Todas las operaciones de recarga y retiro realizadas en nuestras ventanillas cuentan con el respaldo directo de la plataforma.
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
