"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
    { src: "/images/home/hero-slide-1.webp", alt: "PagoExpress - Oficina principal" },
    { src: "/images/home/hero-slide-2.webp", alt: "PagoExpress - Sucursal" },
    { src: "/images/home/hero-slide-3.webp", alt: "PagoExpress - Servicio al cliente" },
    { src: "/images/home/hero-slide-4.webp", alt: "PagoExpress - Pagos digitales" },
    { src: "/images/home/hero-slide-5.webp", alt: "PagoExpress - Equipo de trabajo" },
    { src: "/images/home/hero-slide-6.webp", alt: "PagoExpress - Servicios básicos" },
    { src: "/images/home/hero-slide-7.webp", alt: "PagoExpress - Recargas" },
    { src: "/images/home/hero-slide-8.webp", alt: "PagoExpress - Remesas" },
];

const trustLogos = [
    "Western Union",
    "MoneyGram",
    "Banco Pichincha",
    "Servientrega",
    "Banco del Pacífico",
    "CoopMego",
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    }, []);

    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Minimum swipe distance (in pixels)
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) {
            nextSlide();
        } else if (isRightSwipe) {
            prevSlide();
        }
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 4000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section
            className="relative h-screen w-full flex flex-col overflow-hidden bg-pe-black shrink-0"
            aria-label="Sección principal"
        >
            {/* ═══ Main Background Image ═══ */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src="/pagoexpress_hero_main_background_1772635866721.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-30"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-pe-black via-pe-black/95 to-pe-dark-accent/90" />
            </div>

            {/* ── Header Spacer ── */}
            <div className="h-[85px] lg:h-[105px] w-full shrink-0" aria-hidden="true" />

            {/* ═══ Main Content Wrapper ═══ */}
            <div className="relative z-10 flex-1 w-full flex flex-col justify-between sm:justify-between lg:justify-between overflow-hidden">

                {/* 1. TOP: Image Slider */}
                <div className="w-full flex justify-center items-center px-4 animate-fade-in-up shrink-0 overflow-hidden mt-2 lg:mt-0">
                    <div className="relative group w-full max-w-[1240px]">
                        {/* Glow effect */}
                        <div className="absolute -inset-4 bg-pe-yellow/10 rounded-3xl blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

                        {/* Slider Container — Centered Rectangular 16:7 */}
                        <div
                            className="relative w-full sm:w-auto sm:h-[42vh] lg:h-[48vh] aspect-[16/7] mx-auto bg-pe-dark-accent/5 rounded-2xl lg:rounded-2xl overflow-hidden border border-white/10 shadow-2xl touch-pan-y"
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                        >
                            <div
                                className="flex h-full transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {heroSlides.map((slide, index) => (
                                    <div key={index} className="w-full h-full flex-shrink-0 relative">
                                        <Image
                                            src={slide.src}
                                            alt={slide.alt}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 800px, 1200px"
                                            priority={index === 0}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Dot Indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                                {heroSlides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        aria-label={`Slide ${index + 1}`}
                                        className={`rounded-full transition-all duration-300 ${currentSlide === index ? "w-6 h-1.5 bg-pe-yellow" : "w-1.5 h-1.5 bg-white/30"}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute -left-2 lg:left-0 top-1/2 -translate-y-1/2 lg:-translate-x-1/2 w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-black/80 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center hover:bg-pe-yellow hover:text-pe-black transition-all z-20 shadow-xl"
                            aria-label="Anterior slide"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute -right-2 lg:right-0 top-1/2 -translate-y-1/2 lg:translate-x-1/2 w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-black/80 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center hover:bg-pe-yellow hover:text-pe-black transition-all z-20 shadow-xl"
                            aria-label="Siguiente slide"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* 2. CENTER: Text Content */}
                <div className="flex-1 flex flex-col justify-center items-center text-center px-6 py-4 lg:py-2 animate-fade-in-up delay-200 min-h-0">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pe-yellow/10 border border-pe-yellow/20 mb-3 lg:mb-2">
                        <CheckCircle2 className="w-4 h-4 text-pe-yellow" />
                        <span className="text-[11px] font-black text-pe-yellow tracking-widest uppercase">Confianza de 19+ años</span>
                    </div>

                    <h1 className="text-3xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-black text-white leading-[1.1] mb-3 lg:mb-2 max-w-4xl">
                        Pagos, remesas y recargas para <span className="text-pe-yellow">Ecuador</span>
                    </h1>

                    <p className="text-sm lg:text-lg text-white/50 leading-relaxed max-w-xl mx-auto mb-6 lg:mb-5">
                        Simplificamos tus trámites financieros en todo el país con seguridad.
                    </p>

                    <a href="#nosotros" className="inline-flex items-center gap-3 px-10 py-4 lg:py-3.5 bg-pe-yellow text-pe-black font-black rounded-2xl text-sm hover:scale-105 transition-all shadow-xl shadow-pe-yellow/10">
                        Conoce más
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>

                {/* 3. BOTTOM: Trust Strip */}
                <div className="w-full border-t border-white/5 py-4 lg:py-4 bg-black/40 backdrop-blur-sm shrink-0">
                    <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-3 lg:mb-3">Aliados Financieros</p>
                    <div className="flex flex-wrap items-center justify-center gap-x-8 lg:gap-x-12 gap-y-3 opacity-40 grayscale">
                        {trustLogos.map((name) => (
                            <span key={name} className="text-[10px] lg:text-[11px] font-black text-white tracking-widest uppercase">{name}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
