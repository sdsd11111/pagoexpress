"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    Smartphone,
    Gamepad2,
    PlayCircle,
    Music,
    ArrowRight,
    CheckCircle2,
    MapPin,
    Zap,
    MonitorPlay,
    Wallet,
    ShieldCheck,
    Clock,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    MessageCircle,
    ShoppingBag,
    Tv,
    CreditCard
} from "lucide-react";
import MapSection from "@/components/MapSection";

// Animations
const fadeUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function RecargasPage() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [gamingSlide, setGamingSlide] = useState(0);
    const [carrierSlide, setCarrierSlide] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleSwipe = (setter: React.Dispatch<React.SetStateAction<number>>, max: number) => {
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 50) {
            setter(prev => diff > 0 ? Math.min(prev + 1, max - 1) : Math.max(prev - 1, 0));
        }
    };

    const categories = [
        {
            title: "Streaming & TV",
            services: "Netflix, Disney+, Prime, Max",
            icon: MonitorPlay,
            color: "shadow-[0_0_20px_rgba(229,9,20,0.2)]",
            accent: "bg-[#E50914]"
        },
        {
            title: "Música & Audio",
            services: "Spotify, YouTube Music, Deezer",
            icon: Music,
            color: "shadow-[0_0_20px_rgba(29,185,84,0.2)]",
            accent: "bg-[#1DB954]"
        },
        {
            title: "Gaming",
            services: "Free Fire, PSN, Xbox, Steam, Roblox",
            icon: Gamepad2,
            color: "shadow-[0_0_20px_rgba(168,85,247,0.2)]",
            accent: "bg-purple-500"
        },
        {
            title: "Apps & Store",
            services: "Google Play, Apple App Store",
            icon: ShoppingBag,
            color: "shadow-[0_0_20px_rgba(59,130,246,0.2)]",
            accent: "bg-blue-500"
        }
    ];

    const carriers = [
        { name: "Claro", logo: "/images/recargas/claro.webp", desc: "Saldo y Paquetes" },
        { name: "Movistar", logo: "/images/recargas/movistar.webp", desc: "Recargas Prepago" },
        { name: "CNT", logo: "/images/recargas/cnt.webp", desc: "Planes y Saldo" },
        { name: "Tuenti", logo: "/images/recargas/tuenti.webp", desc: "Combos Gigantes" }
    ];

    const faqs = [
        { q: "¿En cuánto tiempo se activa mi suscripción?", a: "La activación es inmediata. Una vez realizado el pago en ventanilla, el sistema procesa la recarga o genera el código en segundos." },
        { q: "¿Qué pasa si el código no funciona?", a: "Contamos con soporte directo en cada local. Si tienes algún inconveniente, nuestro personal verificará la transacción al instante para garantizar tu servicio." },
        { q: "¿Puedo recargar diamantes de Free Fire con mi ID?", a: "Sí, realizamos recargas directas a tu ID de jugador. Solo necesitas dictarnos tu ID y los diamantes llegarán a tu cuenta sin necesidad de contraseñas." }
    ];

    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-pe-yellow selection:text-black" style={{ fontFamily: 'var(--font-poppins, "Poppins", sans-serif)' }}>

            {/* ═══ SECCIÓN 1: Hero Visual "All-in-One" ═══ */}
            <section className="relative min-h-[calc(100vh-80px)] lg:h-[70vh] lg:min-h-[550px] flex items-center overflow-hidden pt-28 pb-16 lg:pt-0">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black" />
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-pe-yellow/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl text-center lg:text-left">
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.2] lg:leading-[1.05] tracking-tight mb-6 px-2 lg:px-0">
                                Recargas y Pagos de Servicios <span className="text-pe-yellow">en Loja</span>
                            </h1>
                            <p className="text-base sm:text-xl text-white/60 mb-10 leading-relaxed font-medium px-4 lg:px-0">
                                Recarga tus plataformas favoritas y telefonía al instante en PagoExpress Loja. Activamos tu diversión sin necesidad de tarjetas internacionales.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start px-4 lg:px-0">
                                <Link
                                    href="#servicios"
                                    className="px-8 lg:px-10 py-4 bg-gradient-to-r from-pe-yellow to-yellow-500 text-black font-black rounded-2xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,215,0,0.3)] uppercase tracking-widest text-[10px] lg:text-sm text-center"
                                >
                                    Ver Servicios Disponibles
                                </Link>
                                <Link
                                    href="#mapa"
                                    className="px-8 lg:px-10 py-4 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/5 transition-all uppercase tracking-widest text-[10px] lg:text-sm text-center"
                                >
                                    Ubicar Punto de Recarga
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="flex justify-center relative mt-8 lg:mt-0"
                        >
                            <div className="relative w-[300px] h-[260px] lg:w-[450px] lg:h-[400px]">
                                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6 lg:p-8 animate-float">
                                    <div className="w-16 h-16 lg:w-24 lg:h-24 bg-white rounded-full flex items-center justify-center mb-4 lg:mb-6 shadow-glow overflow-hidden border-4 border-white/20">
                                        <Image src="/logo.jpg" alt="PagoExpress Logo" width={80} height={80} className="object-contain" />
                                    </div>
                                    <p className="text-xl lg:text-2xl font-black tracking-tighter">PAGOEXPRESS</p>
                                    <p className="text-white/40 text-[10px] tracking-[0.5em] uppercase font-bold mt-2">Digital Delivery</p>
                                </div>
                                <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl flex items-center justify-center animate-bounce-slow shadow-[0_0_30px_rgba(229,9,20,0.3)]">
                                    <Tv className="w-10 h-10 text-[#E50914]" />
                                </div>
                                <div className="absolute -bottom-6 -left-10 w-20 h-20 bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl flex items-center justify-center animate-bounce-slow delay-700 shadow-[0_0_30px_rgba(29,185,84,0.3)]">
                                    <Music className="w-8 h-8 text-[#1DB954]" />
                                </div>
                                <div className="absolute top-1/2 -right-16 w-16 h-16 bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(30,64,175,0.3)]">
                                    <Gamepad2 className="w-8 h-8 text-blue-500" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 2: Categorías (Bento Grid) ═══ */}
            <section id="servicios" className="py-24 bg-[#0A0A0A]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black mb-4">Todo lo que necesitas en un solo lugar</h2>
                        <p className="text-white/50 font-medium">Categorías de consumo masivo con activación inmediata.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                className={`group p-8 rounded-3xl bg-white/5 border border-white/10 transition-all hover:scale-105 ${cat.color} hover:border-white/20 cursor-default`}
                            >
                                <div className={`w-14 h-14 ${cat.accent} rounded-2xl flex items-center justify-center mb-6`}>
                                    <cat.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                                <p className="text-sm text-white/50 leading-relaxed">{cat.services}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 3: Inmersive Netflix ═══ */}
            <section id="netflix-immersive" className="relative py-32 bg-black overflow-hidden border-y border-white/5">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E50914]/10 to-transparent" />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:w-1/2">
                        <div className="w-16 h-1 bg-[#E50914] mb-6" />
                        <h2 className="text-4xl sm:text-5xl font-black mb-6 flex items-center gap-4">
                            Netflix <Tv className="text-[#E50914] w-8 h-8" />
                        </h2>
                        <p className="text-xl text-white/70 mb-8 leading-relaxed">
                            Disfruta de tus series y películas favoritas sin interrupciones. Recargamos tu cuenta o generamos pines oficiales de forma inmediata.
                        </p>
                        <ul className="space-y-4 mb-10">
                            {["Cuentas Completas", "Pines de Regalo", "Activación al Instante"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-white/90 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-[#E50914]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:w-1/2 relative">
                        <div className="aspect-video bg-gradient-to-br from-[#E50914]/20 to-black rounded-3xl border border-white/10 shadow-3xl flex items-center justify-center p-12 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700" />
                            <div className="relative z-10 text-center">
                                <h3 className="text-6xl font-black text-[#E50914] drop-shadow-2xl">NETFLIX</h3>
                                <p className="text-white font-bold tracking-[0.3em] mt-2">LOJA • PAGOEXPRESS</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ SECCIÓN 4: Inmersive Spotify ═══ */}
            <section id="spotify-immersive" className="relative py-32 bg-[#0A0A0A] overflow-hidden">
                <div className="absolute bottom-0 left-0 w-1/3 h-full bg-[#1DB954]/5 blur-[120px]" />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col lg:flex-row-reverse items-center gap-16">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:w-1/2">
                        <div className="w-16 h-1 bg-[#1DB954] mb-6" />
                        <h2 className="text-4xl sm:text-5xl font-black mb-6 flex items-center gap-4">
                            Spotify <Music className="text-[#1DB954] w-8 h-8" />
                        </h2>
                        <p className="text-xl text-white/70 mb-8 leading-relaxed">
                            Música ilimitada con Spotify Premium. Sin anuncios y con la mejor calidad de audio. Paga tu suscripción mensual en nuestras ventanillas.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                <p className="text-[#1DB954] font-black">Plan Individual</p>
                                <p className="text-sm text-white/50">1 Cuenta</p>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                <p className="text-[#1DB954] font-black">Plan Familiar</p>
                                <p className="text-sm text-white/50">Hasta 6 Cuentas</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:w-1/2">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-[#1DB954] rounded-[40px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative bg-[#191414] p-12 rounded-[32px] border border-white/10 flex flex-col items-center text-center">
                                <div className="w-24 h-24 bg-[#1DB954] rounded-full flex items-center justify-center mb-6 shadow-glow">
                                    <Music className="w-12 h-12 text-black" />
                                </div>
                                <p className="text-2xl font-black text-white">Tu música, en efectivo</p>
                                <p className="text-white/40 text-sm mt-2 font-medium tracking-widest uppercase">Spotify x PagoExpress</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ SECCIÓN 5: Inmersive Gaming & Diamonds ═══ */}
            <section id="gaming-immersive" className="relative py-32 bg-black overflow-hidden border-y border-white/5">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-black mb-6">
                        Gaming & <span className="text-[#00AEEF]">Diamantes</span>
                    </h2>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto">
                        Recarga tus juegos favoritos al instante. Somos tu punto oficial para Free Fire, PlayStation y más en Loja.
                    </p>
                </div>

                {/* Desktop: Grid */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    <div className="group p-8 bg-white/5 rounded-[40px] border border-white/10 hover:bg-[#00AEEF]/10 transition-all hover:-translate-y-2">
                        <div className="w-16 h-16 bg-[#00AEEF]/20 rounded-2xl flex items-center justify-center mb-8 border border-[#00AEEF]/30">
                            <Zap className="w-8 h-8 text-[#00AEEF]" />
                        </div>
                        <h3 className="text-2xl font-black mb-4 tracking-tighter">Free Fire (Diamantes)</h3>
                        <p className="text-white/60 mb-6 font-medium">Recargas directas a ID. Diamantes al instante para tus skins favoritos.</p>
                        <div className="flex items-center gap-2 text-[#00AEEF] font-bold text-sm tracking-widest uppercase">
                            Recarga con ID <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="group p-8 bg-white/5 rounded-[40px] border border-white/10 hover:bg-[#0070CC]/10 transition-all hover:-translate-y-2">
                        <div className="w-16 h-16 bg-[#0070CC]/20 rounded-2xl flex items-center justify-center mb-8 border border-[#0070CC]/30">
                            <Gamepad2 className="w-8 h-8 text-[#0070CC]" />
                        </div>
                        <h3 className="text-2xl font-black mb-4 tracking-tighter">PSN Gift Cards</h3>
                        <p className="text-white/60 mb-6 font-medium">Tarjetas de regalo para la PlayStation Store. Compra juegos y DLCs.</p>
                        <div className="flex items-center gap-2 text-[#0070CC] font-bold text-sm tracking-widest uppercase">
                            Varios Montos <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="group p-8 bg-white/5 rounded-[40px] border border-white/10 hover:bg-[#F47521]/10 transition-all hover:-translate-y-2">
                        <div className="w-16 h-16 bg-[#F47521]/20 rounded-2xl flex items-center justify-center mb-8 border border-[#F47521]/30">
                            <MonitorPlay className="w-8 h-8 text-[#F47521]" />
                        </div>
                        <h3 className="text-2xl font-black mb-4 tracking-tighter">Anime & Tiendas</h3>
                        <p className="text-white/60 mb-6 font-medium">Crunchyroll, Google Play, Apple. Tu tienda digital sin tarjeta.</p>
                        <div className="flex items-center gap-2 text-[#F47521] font-bold text-sm tracking-widest uppercase">
                            Activación Instantánea <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Mobile: Slider */}
                <div className="md:hidden max-w-6xl mx-auto px-4 relative z-10">
                    <div className="relative">
                        <div
                            className="overflow-hidden rounded-[40px]"
                            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                            onTouchMove={(e) => { touchEndX.current = e.touches[0].clientX; }}
                            onTouchEnd={() => handleSwipe(setGamingSlide, 3)}
                        >
                            <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${gamingSlide * 100}%)` }}>
                                {[
                                    { title: "Free Fire (Diamantes)", desc: "Recargas directas a ID. Diamantes al instante para tus skins favoritos.", icon: Zap, color: "#00AEEF", cta: "Recarga con ID" },
                                    { title: "PSN Gift Cards", desc: "Tarjetas de regalo para la PlayStation Store. Compra juegos y DLCs.", icon: Gamepad2, color: "#0070CC", cta: "Varios Montos" },
                                    { title: "Anime & Tiendas", desc: "Crunchyroll, Google Play, Apple. Tu tienda digital sin tarjeta.", icon: MonitorPlay, color: "#F47521", cta: "Activación Instantánea" },
                                ].map((item, i) => (
                                    <div key={i} className="w-full flex-shrink-0 px-1">
                                        <div className="p-8 bg-white/5 rounded-[40px] border border-white/10">
                                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border" style={{ backgroundColor: `${item.color}20`, borderColor: `${item.color}30` }}>
                                                <item.icon className="w-8 h-8" style={{ color: item.color }} />
                                            </div>
                                            <h3 className="text-2xl font-black mb-4 tracking-tighter">{item.title}</h3>
                                            <p className="text-white/60 mb-6 font-medium">{item.desc}</p>
                                            <div className="flex items-center gap-2 font-bold text-sm tracking-widest uppercase" style={{ color: item.color }}>
                                                {item.cta} <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Arrows */}
                        <button onClick={() => setGamingSlide(prev => Math.max(prev - 1, 0))} className="absolute top-1/2 left-1 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20"><ChevronLeft className="w-5 h-5" /></button>
                        <button onClick={() => setGamingSlide(prev => Math.min(prev + 1, 2))} className="absolute top-1/2 right-1 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                    {/* Dots */}
                    <div className="flex justify-center gap-3 mt-5">
                        {[0, 1, 2].map(i => (
                            <button key={i} onClick={() => setGamingSlide(i)} className={`h-2.5 rounded-full transition-all duration-300 ${i === gamingSlide ? "w-8 bg-[#00AEEF]" : "w-2.5 bg-white/20"}`} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 6: Conectividad Total (Telefonía) ═══ */}
            <section id="telefonia" className="py-24 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5 blur-[120px] pointer-events-none" />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                        <div className="max-w-xl">
                            <h2 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">Conectividad Total</h2>
                            <p className="text-white/60 text-lg">Sección enfocada en todas las operadoras del Ecuador con saldo inmediato.</p>
                        </div>
                        <div className="px-6 py-3 bg-pe-yellow/10 border border-pe-yellow/20 rounded-full">
                            <span className="text-pe-yellow font-black text-sm">Recargas desde $0.50 sin cargos adicionales</span>
                        </div>
                    </div>

                    {/* Desktop: Grid */}
                    <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {carriers.map((car, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                className="group p-8 backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all text-center"
                            >
                                <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg bg-white/10 overflow-hidden relative border border-white/20">
                                    <Image
                                        src={car.logo}
                                        alt={car.name}
                                        fill
                                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="text-lg font-black mb-1">{car.name}</h3>
                                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">{car.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile: Slider */}
                    <div className="md:hidden relative">
                        <div
                            className="overflow-hidden rounded-3xl"
                            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                            onTouchMove={(e) => { touchEndX.current = e.touches[0].clientX; }}
                            onTouchEnd={() => handleSwipe(setCarrierSlide, carriers.length)}
                        >
                            <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${carrierSlide * 100}%)` }}>
                                {carriers.map((car, i) => (
                                    <div key={i} className="w-full flex-shrink-0 px-1">
                                        <div className="p-8 backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl text-center">
                                            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg bg-white/10 overflow-hidden relative border border-white/20">
                                                <Image
                                                    src={car.logo}
                                                    alt={car.name}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            </div>
                                            <h3 className="text-lg font-black mb-1">{car.name}</h3>
                                            <p className="text-xs text-white/40 font-bold uppercase tracking-widest">{car.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Arrows */}
                        <button onClick={() => setCarrierSlide(prev => Math.max(prev - 1, 0))} className="absolute top-1/2 left-1 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20"><ChevronLeft className="w-5 h-5" /></button>
                        <button onClick={() => setCarrierSlide(prev => Math.min(prev + 1, carriers.length - 1))} className="absolute top-1/2 right-1 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20"><ChevronRight className="w-5 h-5" /></button>
                        {/* Dots */}
                        <div className="flex justify-center gap-3 mt-5">
                            {carriers.map((_, i) => (
                                <button key={i} onClick={() => setCarrierSlide(i)} className={`h-2.5 rounded-full transition-all duration-300 ${i === carrierSlide ? "w-8 bg-pe-yellow" : "w-2.5 bg-white/20"}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 7: El Proceso "Cash-to-Digital" ═══ */}
            <section className="py-24 bg-[#0A0A0A] relative border-y border-white/5">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl font-black mb-16">Tu efectivo a digital en <span className="text-pe-yellow font-normal italic">3 pasos rápidos</span></h2>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {[
                            { step: "Paso 1", title: "Elige tu servicio", icon: ShoppingBag, color: "text-blue-500", shadow: "shadow-[0_0_20px_rgba(59,130,246,0.2)]", t: "Elegir streaming, juego o telefonía." },
                            { step: "Paso 2", title: "Indica tus datos", icon: Smartphone, color: "text-pe-yellow", shadow: "shadow-[0_0_20px_rgba(255,215,0,0.2)]", t: "Número de celular o correo asociado." },
                            { step: "Paso 3", title: "Paga y Activa", icon: CheckCircle2, color: "text-[#1DB954]", shadow: "shadow-[0_0_20px_rgba(29,185,84,0.2)]", t: "Paga en efectivo y recibe tu código." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                className="relative p-10 bg-white/5 border border-white/10 rounded-[40px] group transition-all"
                            >
                                <div className={`w-20 h-20 bg-black/50 border border-white/10 rounded-3xl mx-auto mb-8 flex items-center justify-center transition-all ${item.shadow}`}>
                                    <item.icon className={`w-10 h-10 ${item.color}`} />
                                </div>
                                <div className="text-pe-yellow font-bold uppercase tracking-widest text-xs mb-2">{item.step}</div>
                                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                <p className="text-sm text-white/40 leading-relaxed px-4">{item.t}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 8: Ventajas ═══ */}
            <section className="py-24 bg-black">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black">Ventajas de Recargar con Nosotros</h2>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {[
                            { title: "Sin Tarjetas", icon: CreditCard, desc: "Ideal para quienes no desean vincular sus datos bancarios a internet." },
                            { title: "Control de Gasto", icon: Wallet, desc: "Pagas solo lo que consumes, sin renovaciones automáticas sorpresa." },
                            { title: "Disponibilidad 365", icon: Clock, desc: "Recargas disponibles todos los días del año en nuestras sucursales de Loja." }
                        ].map((van, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                className="p-10 border border-white/5 bg-white/[0.02] rounded-3xl hover:bg-white/[0.05] transition-all"
                            >
                                <van.icon className="w-10 h-10 text-pe-yellow mb-6" />
                                <h3 className="text-2xl font-bold mb-4">{van.title}</h3>
                                <p className="text-white/50 font-medium leading-relaxed">{van.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 9: FAQ ═══ */}
            <section className="py-32 bg-[#0A0A0A] border-t border-white/5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black">FAQ - Dudas Frecuentes</h2>
                        <p className="text-white/40 mt-4">Todo lo que necesitas saber sobre tus recargas digitales.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden transition-all hover:bg-white/10">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full flex justify-between items-center p-6 text-left"
                                >
                                    <span className="text-lg font-bold pr-6">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 shrink-0 text-pe-yellow transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`} />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-6 text-white/60 font-medium leading-relaxed"
                                        >
                                            <div className="pt-4 border-t border-white/10">
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
            <div id="mapa" className="bg-black py-24 relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black mb-4 tracking-tighter">Puntos de Recarga en Loja</h2>
                        <p className="text-white/40">Visítanos y activa tu diversión hoy mismo.</p>
                    </div>
                    <div className="border border-white/10 p-2 bg-white/5 rounded-[40px] shadow-3xl overflow-hidden">
                        <MapSection />
                    </div>
                </div>
            </div>

            {/* Final Legal Footer */}
            <footer className="py-12 bg-black border-t border-white/5">
                <div className="max-w-6xl mx-auto px-4 text-center opacity-30">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed max-w-2xl mx-auto">
                        AGENTE AUTORIZADO PAGOEXPRESS. LOS LOGOS DE MARCAS TERCERAS SON PROPIEDAD DE SUS TITULARES. PAGOEXPRESS ES UNA RED DE RECAUDACIÓN SEGURA EN ECUADOR.
                    </p>
                </div>
            </footer>
        </main>
    );
}

if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-bounce-slow { animation: bounce-custom 4s infinite; }
    @keyframes bounce-custom {
      0%, 100% { transform: translateY(-5px); }
      50% { transform: translateY(15px); }
    }
    .shadow-glow { box-shadow: 0 0 30px rgba(255, 215, 0, 0.4); }
    .shadow-3xl { box-shadow: 0 32px 64px -12px rgba(0, 0, 0, 0.8); }
    `;
    document.head.appendChild(style);
}
