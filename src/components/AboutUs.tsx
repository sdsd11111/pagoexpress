"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { ShieldCheck, Eye, Smartphone, Users, Globe, Building2, Calendar, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

// --- Animated Counter Component ---
function Counter({ from = 0, to, duration = 2, text = "" }: { from?: number, to: number, duration?: number, text?: string }) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(nodeRef, { once: true, margin: "-50px" });

    useEffect(() => {
        if (inView) {
            const node = nodeRef.current;
            if (node) {
                const controls = animate(from, to, {
                    duration,
                    ease: "easeOut",
                    onUpdate(value) {
                        node.textContent = Math.round(value).toString() + text;
                    },
                });
                return () => controls.stop();
            }
        }
    }, [from, to, duration, inView, text]);

    return <span ref={nodeRef}>{from}{text}</span>;
}

import { Variants } from "framer-motion";

// --- Animation Variants ---
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

export default function AboutUs() {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [showFullText, setShowFullText] = useState(false);
    const [missionSlide, setMissionSlide] = useState(0);
    const [trustSlide, setTrustSlide] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleSwipe = (setter: React.Dispatch<React.SetStateAction<number>>, max: number) => {
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 50) {
            setter(prev => diff > 0 ? Math.min(prev + 1, max - 1) : Math.max(prev - 1, 0));
        }
    };

    const values = [
        {
            title: "Confianza Institucional",
            description: "Somos la red con más aliados comerciales y sistemas financieros del país. Operamos bajo el estricto cumplimiento de los lineamientos del sistema financiero nacional.",
            icon: ShieldCheck,
            color: "text-pe-success",
            bg: "bg-pe-success/10",
        },
        {
            title: "Transparencia Total",
            description: "Cotizadores exactos y tarifas claras a la vista. Cero costos ocultos en tus envíos o pagos.",
            icon: Eye,
            color: "text-pe-black",
            bg: "bg-pe-black/5",
        },
        {
            title: "Gestión 100% Digital",
            description: "Todo lo hacemos vía digital. El cliente puede resolver todo su trámite de principio a fin desde su celular, con total comodidad y rapidez.",
            icon: Smartphone,
            color: "text-pe-yellow-dark",
            bg: "bg-pe-yellow/20",
        },
    ];

    const missionVision = [
        {
            badge: "Nuestra Misión",
            title: "Puente hacia la economía digital",
            text: "Ser el ecosistema digital seguro que actúe como puente entre la economía de efectivo tradicional y los pagos inmediatos del 2026, simplificando la vida de nuestros clientes en todo el país en cada iteración.",
            dark: true,
        },
        {
            badge: "Nuestra Visión",
            title: "Tu Punto de Pagos en Ecuador",
            text: 'Convertirnos en la red de servicios líder del Ecuador. Nacidos en Loja, ofrecemos el ecosistema financiero más completo y ágil, devolviendo el tiempo a los ciudadanos a través de la eficiencia.',
            dark: false,
        },
    ];

    return (
        <section id="nosotros" className="py-24 bg-pe-gray-50 overflow-hidden relative" ref={sectionRef}>
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pe-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pe-black/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

                {/* ─── Z-Pattern Intro ─── */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
                    <motion.div
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={staggerContainer}
                        className="order-2 lg:order-1"
                    >
                        {/* Badge */}
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pe-black/5 border border-pe-black/10 mb-6">
                            <span className="text-xs font-bold text-pe-black uppercase tracking-widest">
                                Experiencia PagoExpress
                            </span>
                        </motion.div>

                        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-pe-black leading-[1.1] mb-6">
                            Más que transacciones, construimos <span className="text-pe-black relative inline-block">
                                conexiones en todo el Ecuador
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.0003 5.49887C49.9079 1.15423 125.867 -1.68822 198.001 5.49887" stroke="#F7EF4D" strokeWidth="4" strokeLinecap="round" /></svg>
                            </span>
                        </motion.h2>

                        {/* First paragraph - always visible */}
                        <motion.p variants={fadeUp} className="text-base lg:text-lg text-pe-gray-600 leading-relaxed mb-4 lg:mb-6">
                            Desde 2007, PagoExpress nació con una vocación clara: simplificar la vida financiera de nuestros clientes en todo el Ecuador. Desde nuestros inicios, hemos entendido que detrás de cada depósito, giro o pago de luz, hay una familia, un sueño y un esfuerzo.
                        </motion.p>

                        {/* Second paragraph - desktop always, mobile toggle */}
                        <motion.div variants={fadeUp}>
                            <p className={`text-base lg:text-lg text-pe-gray-600 leading-relaxed mb-4 lg:mb-8 transition-all duration-300 ${showFullText ? "block" : "hidden lg:block"}`}>
                                Hoy, desde nuestras <strong>3 agencias físicas</strong> y nuestro <strong>Canal Digital</strong>, hemos evolucionado a una <strong>Red de Servicios Financieros en todo el Ecuador</strong>, respaldados por la confianza de todo un país.
                            </p>
                            <button
                                onClick={() => setShowFullText(!showFullText)}
                                className="lg:hidden inline-flex items-center gap-2 text-sm font-bold text-pe-yellow-dark mb-6"
                            >
                                {showFullText ? "Ocultar" : "Seguir leyendo"}
                                <ChevronDown className={`w-4 h-4 transition-transform ${showFullText ? "rotate-180" : ""}`} />
                            </button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="order-1 lg:order-2 relative"
                    >
                        {/* Visual Card */}
                        <div className="relative rounded-[2rem] bg-gradient-to-tr from-pe-gray-200 to-white shadow-2xl aspect-video overflow-hidden border border-white group">
                            <img
                                src="/images/home/about-matriz-evolucion.webp"
                                alt="Evolución PagoExpress Ecuador"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-pe-black/40 to-transparent pointer-events-none" />
                            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white shadow-sm flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-pe-success animate-pulse" />
                                <span className="text-xs font-bold text-pe-black">Operando en Ecuador</span>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-6 w-48 h-48 rounded-3xl overflow-hidden border-4 border-white shadow-2xl z-20 hidden lg:block transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img
                                src="/images/home/about-customer-experience.webp"
                                alt="Atención al Cliente"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* ─── Metrics (Stats Row) ─── */}
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={staggerContainer}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-24"
                >
                    <motion.div variants={fadeUp} className="glass bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pe-gray-100/50 text-center group hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-12 mx-auto bg-pe-yellow/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-pe-yellow/20 transition-colors">
                            <Calendar className="w-6 h-6 text-pe-yellow-dark" />
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-black text-pe-black mb-2">
                            <Counter to={19} text="+" />
                        </h3>
                        <p className="text-sm font-semibold text-pe-gray-500">Años de Experiencia</p>
                    </motion.div>

                    <motion.div variants={fadeUp} className="glass bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pe-gray-100/50 text-center group hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-12 mx-auto bg-pe-yellow/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-pe-yellow/20 transition-colors">
                            <Building2 className="w-6 h-6 text-pe-yellow-dark" />
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-black text-pe-black mb-2">
                            <Counter to={4} />
                        </h3>
                        <p className="text-sm font-semibold text-pe-gray-500">Puntos de Atención</p>
                    </motion.div>

                    <motion.div variants={fadeUp} className="glass bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pe-gray-100/50 text-center group hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-12 mx-auto bg-pe-yellow/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-pe-yellow/20 transition-colors">
                            <Globe className="w-6 h-6 text-pe-yellow-dark" />
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-black text-pe-black mb-2">
                            <Counter to={200} text="+" />
                        </h3>
                        <p className="text-sm font-semibold text-pe-gray-500">Alianzas Globales</p>
                    </motion.div>

                    <motion.div variants={fadeUp} className="glass bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pe-gray-100/50 text-center group hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-12 mx-auto bg-pe-yellow/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-pe-yellow/20 transition-colors">
                            <Users className="w-6 h-6 text-pe-yellow-dark" />
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-black text-pe-black mb-2">
                            <Counter to={150} text="k+" duration={2.5} />
                        </h3>
                        <p className="text-sm font-semibold text-pe-gray-500">Clientes Satisfechos</p>
                    </motion.div>
                </motion.div>

                {/* ─── Mission & Vision ─── */}
                {/* Desktop: Side by side */}
                <div className="hidden md:grid md:grid-cols-2 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="p-10 rounded-[2rem] bg-pe-black text-white shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-pe-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-pe-yellow/20 transition-colors duration-500" />
                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                                <span className="text-xs font-bold tracking-widest uppercase">Nuestra Misión</span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-black mb-4 leading-tight">Puente hacia la economía digital</h3>
                            <p className="text-white/70 text-lg leading-relaxed">
                                Ser el ecosistema digital seguro que actúe como puente entre la economía de efectivo tradicional y los pagos inmediatos del 2026, simplificando la vida de nuestros clientes en todo el país en cada iteración.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="p-10 rounded-[2rem] bg-white text-pe-black shadow-xl border border-pe-gray-200 relative overflow-hidden group"
                    >
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pe-yellow/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:bg-pe-yellow/20 transition-colors duration-500" />
                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-pe-gray-100 border border-pe-gray-200 mb-6">
                                <span className="text-xs font-bold tracking-widest uppercase text-pe-gray-600">Nuestra Visión</span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-black mb-4 leading-tight">Tu Punto de Pagos en Ecuador</h3>
                            <p className="text-pe-gray-600 text-lg leading-relaxed">
                                Convertirnos en la <strong className="text-pe-yellow-dark">red de servicios líder</strong> del país. Ofrecemos el ecosistema financiero más completo y ágil de Ecuador, devolviendo el tiempo a los ciudadanos a través de la eficiencia.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Mobile: Mission/Vision Slider */}
                <div className="md:hidden mb-20 relative">
                    <div
                        className="overflow-hidden rounded-[2rem]"
                        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                        onTouchMove={(e) => { touchEndX.current = e.touches[0].clientX; }}
                        onTouchEnd={() => handleSwipe(setMissionSlide, missionVision.length)}
                    >
                        <div
                            className="flex transition-transform duration-300 ease-out"
                            style={{ transform: `translateX(-${missionSlide * 100}%)` }}
                        >
                            {missionVision.map((item, i) => (
                                <div key={i} className="w-full flex-shrink-0 px-1">
                                    <div className={`p-8 rounded-[2rem] ${item.dark ? "bg-pe-black text-white" : "bg-white text-pe-black border border-pe-gray-200"} shadow-xl relative overflow-hidden`}>
                                        <div className="relative z-10">
                                            <div className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full mb-5 ${item.dark ? "bg-white/10 border border-white/20" : "bg-pe-gray-100 border border-pe-gray-200"}`}>
                                                <span className={`text-[10px] font-bold tracking-widest uppercase ${item.dark ? "text-white" : "text-pe-gray-600"}`}>{item.badge}</span>
                                            </div>
                                            <h3 className="text-2xl font-black mb-3 leading-tight">{item.title}</h3>
                                            <p className={`text-base leading-relaxed ${item.dark ? "text-white/70" : "text-pe-gray-600"}`}>
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Slide dots */}
                    <div className="flex justify-center gap-3 mt-4">
                        {missionVision.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setMissionSlide(i)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${i === missionSlide ? "w-8 bg-pe-yellow" : "w-2.5 bg-pe-gray-300"}`}
                            />
                        ))}
                    </div>
                </div>

                {/* ─── Valores Diferenciadores ─── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="text-center mb-12"
                >
                    <motion.h3 variants={fadeUp} className="text-2xl sm:text-3xl font-black text-pe-black mb-12">Por qué confiar en nosotros</motion.h3>

                    {/* Desktop: Grid */}
                    <div className="hidden md:grid md:grid-cols-3 gap-8">
                        {values.map((v) => {
                            const Icon = v.icon;
                            return (
                                <motion.div key={v.title} variants={fadeUp} className="flex flex-col items-center p-8 rounded-3xl bg-white border border-pe-gray-100/50 shadow-sm hover:shadow-lg transition-shadow">
                                    <div className={`w-16 h-16 rounded-2xl ${v.bg} flex items-center justify-center mb-6`}>
                                        <Icon className={`w-8 h-8 ${v.color}`} />
                                    </div>
                                    <h4 className="text-xl font-bold text-pe-black mb-4">{v.title}</h4>
                                    <p className="text-pe-gray-500 text-base leading-relaxed">{v.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Mobile: Slider */}
                    <div className="md:hidden relative">
                        <div
                            className="overflow-hidden rounded-3xl"
                            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                            onTouchMove={(e) => { touchEndX.current = e.touches[0].clientX; }}
                            onTouchEnd={() => handleSwipe(setTrustSlide, values.length)}
                        >
                            <div
                                className="flex transition-transform duration-300 ease-out"
                                style={{ transform: `translateX(-${trustSlide * 100}%)` }}
                            >
                                {values.map((v) => {
                                    const Icon = v.icon;
                                    return (
                                        <div key={v.title} className="w-full flex-shrink-0 px-1">
                                            <div className="flex flex-col items-center p-8 rounded-3xl bg-white border border-pe-gray-100/50 shadow-sm">
                                                <div className={`w-16 h-16 rounded-2xl ${v.bg} flex items-center justify-center mb-6`}>
                                                    <Icon className={`w-8 h-8 ${v.color}`} />
                                                </div>
                                                <h4 className="text-xl font-bold text-pe-black mb-4">{v.title}</h4>
                                                <p className="text-pe-gray-500 text-base leading-relaxed">{v.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* Slide dots */}
                        <div className="flex justify-center gap-3 mt-4">
                            {values.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setTrustSlide(i)}
                                    className={`h-2.5 rounded-full transition-all duration-300 ${i === trustSlide ? "w-8 bg-pe-yellow" : "w-2.5 bg-pe-gray-300"}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
