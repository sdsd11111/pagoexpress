"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Send,
    Landmark,
    Shield,
    Clock,
    CheckCircle2,
    TrendingUp,
} from "lucide-react";

const stats = [
    { value: "15+", label: "Años de experiencia", icon: Clock },
    { value: "200+", label: "Convenios y servicios", icon: Landmark },
    { value: "100%", label: "Transacciones seguras", icon: Shield },
    { value: "2", label: "Sucursales en Loja", icon: TrendingUp },
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
    return (
        <section
            className="relative min-h-0 lg:h-[calc(100vh-132px)] flex flex-col justify-between overflow-hidden bg-pe-black pb-8 lg:pb-0"
            aria-label="Sección principal"
        >
            {/* ═══ Main Background Image ═══ */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/home/hero-main-bg.webp"
                    alt="PagoExpress Loja - Agencia Matriz"
                    fill
                    className="object-cover opacity-50 scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-pe-black/85 via-pe-dark-accent/80 to-pe-black/75 lg:from-pe-black/90 lg:via-pe-dark-accent/95 lg:to-pe-black/80" />
            </div>
            {/* ═══ Decorative Background ═══ */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {/* Gradient orb - yellow */}
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-pe-yellow/8 blur-3xl" />
                {/* Gradient orb - dark */}
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-pe-dark-accent/5 blur-3xl" />
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full h-full flex flex-col justify-between">
                {/* ═══ Main Hero Row ═══ */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center pt-8 lg:pt-12 pb-4">
                    {/* ── Left: Copy ── */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pe-yellow/15 border border-pe-yellow/25 mb-6 animate-fade-in-up">
                            <CheckCircle2 className="w-4 h-4 text-pe-yellow" />
                            <span className="text-xs font-semibold text-pe-yellow tracking-wide uppercase">
                                Más de 15 años de confianza
                            </span>
                        </div>

                        {/* H1 */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-white leading-[1.2] lg:leading-[1.1] mb-5 animate-fade-in-up delay-100 px-2 lg:px-0">
                            Pagos, remesas y recargas en{" "}
                            <span className="text-pe-yellow">PagoExpress</span>{" "}
                            Loja
                        </h1>

                        {/* Subtitle - Mobile: Short only */}
                        <p className="text-sm lg:hidden text-white/70 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8 animate-fade-in-up delay-200 px-4">
                            Más de 15 años simplificando tus trámites financieros en un solo lugar.
                        </p>
                        {/* Subtitle - Desktop: Full */}
                        <p className="hidden lg:block text-lg text-white/70 leading-relaxed max-w-lg mb-8 animate-fade-in-up delay-200">
                            Más de 15 años simplificando tus trámites financieros en un solo lugar. Depósitos bancarios, remesas internacionales, recargas y servicios básicos con atención personalizada.
                        </p>

                        {/* Mobile: Seguir leyendo */}
                        <div className="lg:hidden flex justify-center animate-fade-in-up delay-300 px-4">
                            <a
                                href="#nosotros"
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-pe-yellow text-pe-black font-bold rounded-2xl text-sm w-full justify-center"
                            >
                                Seguir leyendo
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>

                    </div>

                    {/* ── Right: Stats Visual ── */}
                    <div className="animate-fade-in-up delay-400">
                        <div className="relative group">
                            {/* Glow behind card */}
                            <div className="absolute -inset-4 bg-pe-yellow/20 rounded-[2.5rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />

                            {/* Main Visual Card */}
                            <div className="relative aspect-[5/4] sm:aspect-square lg:aspect-[4/5] xl:aspect-square w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src="/images/home/hero-stats-visual.webp"
                                        alt="Experiencia PagoExpress"
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    {/* Dark Gradient Overlays */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-pe-black via-pe-black/80 to-pe-black/40" />
                                    <div className="absolute inset-0 bg-pe-black/20" />

                                    {/* Grid Pattern Overlay from Screenshot */}
                                    <div
                                        className="absolute inset-0 opacity-20"
                                        style={{
                                            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                                            backgroundSize: "24px 24px",
                                        }}
                                    />
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-8 sm:p-10 flex flex-col">
                                    <div className="flex items-center gap-2 mb-8">
                                        <span className="w-2.5 h-2.5 rounded-full bg-pe-yellow animate-pulse" />
                                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white/90">
                                            PagoExpress en números
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-2 gap-x-4 gap-y-6 flex-1">
                                        {stats.map((stat) => {
                                            const Icon = stat.icon;
                                            return (
                                                <div key={stat.label} className="relative">
                                                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-3 border border-white/10 group-hover:bg-pe-yellow group-hover:text-pe-black transition-all duration-500">
                                                        <Icon className="w-4 h-4 text-pe-yellow group-hover:text-pe-black transition-colors" />
                                                    </div>
                                                    <p className="text-2xl sm:text-3xl font-black text-white mb-0.5 tracking-tight">
                                                        {stat.value}
                                                    </p>
                                                    <p className="text-[10px] sm:text-xs text-white/60 font-medium leading-tight uppercase tracking-wider">
                                                        {stat.label}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Quick link inside card */}
                                    <div className="mt-auto pt-6 border-t border-white/10">
                                        <Link
                                            href="/nosotros"
                                            className="flex items-center justify-between text-sm font-bold text-white/70 hover:text-pe-yellow transition-all group/link"
                                        >
                                            <span>Conoce más sobre nosotros</span>
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-pe-yellow group-hover/link:text-pe-black transition-all">
                                                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Floating decorative elements */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pe-yellow/20 blur-3xl rounded-full" />
                        </div>
                    </div>
                </div>

                {/* ═══ Trust Strip / Social Proof ═══ */}
                <div className="border-t border-white/10 py-6 mb-4 animate-fade-in delay-500">
                    <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray-500 mb-4">
                        Principales aliados financieros
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                        {trustLogos.map((name) => (
                            <div
                                key={name}
                                className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] font-medium text-pe-gray-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                            >
                                {name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
