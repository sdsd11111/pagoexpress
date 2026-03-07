"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Link from "next/link";
import {
    Landmark,
    Gamepad2,
    Send,
    ShieldCheck,
    BarChart3,
    Baby,
    Smartphone,
    Zap,
    ArrowRight,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [direction, setDirection] = useState(1);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 50) {
            if (diff > 0) handleNext();
            else handlePrev();
        }
    };

    const services = [
        {
            id: "ecuabet",
            title: "Recargas y Retiros Ecuabet",
            subtitle: "Agente Autorizado Ecuabet",
            description: "Tu punto de confianza en Loja para realizar recargas inmediatas a tu cuenta Ecuabet o retirar tus ganancias en efectivo sin complicaciones, todo en un solo lugar seguro.",
            icon: Gamepad2,
            colorHex: "#003087",
            bgGradient: "from-[#003087] to-blue-900",
            features: ["Recargas al instante en efectivo", "Retiro de ganancias sin demoras", "Atención rápida y personalizada", "Seguridad en tus transacciones"],
            image: "/images/home/service-ecuabet.webp",
            href: "/ecuabet"
        },
        {
            id: "western-union",
            title: "Western Union (Red Activa)",
            subtitle: "Cobro y Envío de Dinero",
            description: "Conectando familias en todo el mundo. Cobra tus remesas del exterior en minutos y envía dinero internacionalmente y a nivel nacional con la garantía y respaldo de Western Union.",
            icon: Send,
            colorHex: "#FFDD00",
            bgGradient: "from-[#1A1A1A] to-[#333333]",
            features: ["Cobro de giros del exterior", "Envío de dinero a +200 países", "Transacciones nacionales e internacionales", "App Red Activa disponible"],
            image: "/images/home/service-western-union.webp",
            href: "/western-union"
        },
        {
            id: "security-data",
            title: "Security Data Especialistas",
            subtitle: "Firmas y Facturación Electrónica",
            description: "Agilizamos tus trámites legales y tributarios. Obtén tu firma electrónica oficial o integra nuestro sistema de facturación avalado por el SRI para tu negocio o servicios profesionales.",
            icon: ShieldCheck,
            colorHex: "#E63946",
            bgGradient: "from-[#E63946] to-red-900",
            features: ["Emisión de firma electrónica rápida", "Renovación de certificados digitales", "Sistema de facturación directa del SRI", "Asesoría del proceso de facturación"],
            image: "/images/home/service-security-data.webp",
            href: "/security-data"
        },
        {
            id: "equifax",
            title: "Consulta Avanzada Equifax",
            subtitle: "Tu Historial Crediticio",
            description: "Toma decisiones financieras cien porciento informadas. Consulta y revisa tu reporte de buró de crédito Equifax con nosotros, de forma presencial, rápida y con total confidencialidad.",
            icon: BarChart3,
            colorHex: "#C8102E",
            bgGradient: "from-[#C8102E] to-red-950",
            features: ["Conoce tu puntaje (score)", "Reporte completamente detallado", "Detecta inconsistencias", "Información confidencial"],
            image: "/images/home/service-equifax.webp",
            href: "/equifax"
        },
        {
            id: "supa",
            title: "Pagos SUPA Ecuador",
            subtitle: "Pensiones Alimenticias",
            description: "Cumple con tu obligación de pago de manera ágil, segura y en efectivo. Somos punto de recaudo autorizado para el Sistema Único de Pensiones Alimenticias (SUPA) en toda la ciudad.",
            icon: Baby,
            colorHex: "#2D6A4F",
            bgGradient: "from-[#2D6A4F] to-green-900",
            features: ["Pago directo con efectivo asegurado", "Acreditación garantizada", "Comprobante oficial válido e inmediato", "Sin necesidad de una cuenta bancaria"],
            image: "/images/home/service-supa.webp",
            href: "/supa"
        },
        {
            id: "recargas",
            title: "Recargas Digitales Inmediatas",
            subtitle: "Servicios Celulares y Streaming",
            description: "Nunca te quedes incomunicado. Ofrecemos recargas de saldo y paquetes para todas las operadoras, y pago de suscripciones de entretenimiento (como la suscripcion de Netflix u otras plataformas).",
            icon: Smartphone,
            colorHex: "#6A0DAD",
            bgGradient: "from-[#6A0DAD] to-purple-900",
            features: ["Claro, Movistar, Tuenti, CNT y demas", "Pines de Netflix y Spotify", "Tarjetas prepagada para videojuegos", "Siempre activas en todo momento"],
            image: "/images/home/service-recargas.webp",
            href: "/recargas"
        },
        {
            id: "servicios-basicos",
            title: "Pago de Servicios y Predios",
            subtitle: "Pago de Luz, Agua y Predios",
            description: "Devolvemos el tiempo perdido. Cancela tus facturas de luz con EERSSA, agua potable, teléfono y predios municipales sin tener que cruzar de lado o hacer filas agobiantes.",
            icon: Zap,
            colorHex: "#F4A261",
            bgGradient: "from-[#F4A261] to-orange-800",
            features: ["Convenio exclusivo con EERSSA", "Pago unificado del Municipio", "Planes de internet locales de la ciudad", "Adelanto de multas vehiculares"],
            image: "/images/home/service-basicos.webp",
            href: "/servicios-basicos"
        },
        {
            id: "bancos",
            title: "Red de Corresponsales",
            subtitle: "Tu banco del barrio aqui",
            description: "Sáltate las filas en ventanillas bancarias convencionales. Aqui podrás realizar tu depósito, transferencia, retiro de remesas pagadas desde exterior a cuentas especificas a nivel del todo el país.",
            icon: Landmark,
            colorHex: "#1A1A1A",
            bgGradient: "from-pe-black to-pe-dark-accent",
            features: ["Banco Pichincha afiliado (Mi Vecino)", "Servicios de Banco de Loja", "Miembro exclusivo de la CoopMego", "+20 convenios financieras"],
            image: "/images/home/service-bancos.webp",
            href: "/bancos"
        },
    ];

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % services.length);
        }, 6000);

        return () => clearInterval(timer);
    }, [isHovered, services.length]);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % services.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    };

    const currentService = services[currentIndex];
    const Icon = currentService.icon;

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    };

    return (
        <section
            ref={sectionRef}
            id="servicios"
            className="py-24 bg-pe-gray-50 overflow-hidden relative"
        >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-pe-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={fadeUp}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-pe-black mb-6 flex flex-col items-center gap-4">
                        <div className="w-20 h-1 bg-pe-yellow rounded-full" />
                        <span>Soluciones <span className="text-pe-yellow-dark">Integrales</span></span>
                    </h2>
                    <p className="text-lg text-pe-gray-600">
                        Descubre nuestro catálogo de servicios. Desliza para conocer a nuestros aliados estratégicos y servicios directos.
                    </p>
                </motion.div>

                {/* Infinite Slider Container */}
                <div
                    className="relative max-w-6xl mx-auto"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="h-[850px] sm:h-[800px] lg:h-[650px] xl:h-[600px] relative">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="absolute inset-0 w-full rounded-3xl bg-white shadow-xl overflow-hidden border border-pe-gray-100 flex flex-col lg:flex-row"
                            >

                                {/* Image Side (Left) */}
                                <div className="w-full lg:w-1/2 h-64 lg:h-full relative overflow-hidden group border-r border-pe-gray-100/50">
                                    <div className={`absolute inset-0 bg-gradient-to-tr ${currentService.bgGradient} opacity-[0.15] z-10 pointer-events-none`} />
                                    <img
                                        src={currentService.image}
                                        alt={currentService.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute bottom-6 left-6 right-6 lg:right-auto z-20 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-white/50">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                                style={{ backgroundColor: `${currentService.colorHex}15` }}
                                            >
                                                <Icon className="w-5 h-5" style={{ color: currentService.colorHex === "#1A1A1A" || currentService.colorHex === "#000000" ? "#F2A900" : currentService.colorHex }} />
                                            </div>
                                            <span className="font-bold text-pe-black text-sm lg:text-base leading-tight drop-shadow-sm">{currentService.title}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Side (Right) */}
                                <div className="w-full lg:w-1/2 flex flex-col p-8 sm:p-12 h-full justify-between bg-white">
                                    <div>
                                        <span
                                            className="inline-block px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-5 border"
                                            style={{
                                                backgroundColor: currentService.colorHex === "#1A1A1A" ? "#F7EF4D30" : `${currentService.colorHex}10`,
                                                color: currentService.colorHex === "#1A1A1A" ? "#F2A900" : currentService.colorHex,
                                                borderColor: currentService.colorHex === "#1A1A1A" ? "#F7EF4D50" : `${currentService.colorHex}20`
                                            }}
                                        >
                                            {currentService.subtitle}
                                        </span>
                                        <h3 className="text-3xl sm:text-4xl font-black text-pe-black mb-5">
                                            {currentService.title}
                                        </h3>
                                        <p className="text-pe-gray-600 text-base md:text-lg leading-relaxed mb-8">
                                            {currentService.description}
                                        </p>

                                        <ul className="grid sm:grid-cols-2 gap-x-2 gap-y-4 mb-8">
                                            {currentService.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm font-semibold text-pe-gray-700">
                                                    <ArrowRight
                                                        className="w-5 h-5 flex-shrink-0"
                                                        style={{ color: currentService.colorHex === "#1A1A1A" ? "#F2A900" : currentService.colorHex }}
                                                    />
                                                    <span className="leading-tight">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-pe-gray-50">
                                        <Link
                                            href={currentService.href}
                                            className="inline-flex items-center gap-2 font-bold text-pe-black hover:text-pe-yellow-dark transition-colors group/btn"
                                        >
                                            Ir a la página del servicio
                                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>

                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Slider Controls */}
                    <div className="absolute top-1/2 left-1 sm:-left-6 lg:-left-8 -translate-y-1/2 z-20">
                        <button
                            onClick={handlePrev}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-pe-black hover:text-pe-yellow-dark hover:scale-110 transition-all border border-pe-gray-100"
                            aria-label="Servicio anterior"
                        >
                            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 ml-[-2px]" />
                        </button>
                    </div>
                    <div className="absolute top-1/2 right-1 sm:-right-6 lg:-right-8 -translate-y-1/2 z-20">
                        <button
                            onClick={handleNext}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-pe-black hover:text-pe-yellow-dark hover:scale-110 transition-all border border-pe-gray-100"
                            aria-label="Siguiente servicio"
                        >
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 mr-[-2px]" />
                        </button>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-10 gap-3 flex-wrap max-w-sm mx-auto">
                        {services.map((s, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > currentIndex ? 1 : -1);
                                    setCurrentIndex(idx);
                                }}
                                className={`transition-all duration-300 rounded-full h-2.5 outline-none ${idx === currentIndex
                                    ? "w-10"
                                    : "w-2.5 bg-pe-gray-300 hover:bg-pe-gray-400"
                                    }`}
                                style={idx === currentIndex ? { backgroundColor: s.colorHex === "#1A1A1A" ? "#F2A900" : s.colorHex } : {}}
                                aria-label={`Ir al servicio ${idx + 1}`}
                            />
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}
