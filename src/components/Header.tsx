"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  Gamepad2,
  Send,
  ShieldCheck,
  BarChart3,
  Baby,
  Smartphone,
  Zap,
  Landmark,
  Menu,
  X
} from "lucide-react";

/* ─── All 8 Service Pages ─── */
const services = [
  { key: "ecuabet", label: "Ecuabet", href: "/ecuabet", logo: "/images/header logo/ecuabet.webp", mobileLogo: "/images/header logo/ecuabet-sq.webp", accent: "#F3CF1D" },
  { key: "recargas", label: "Recargas", href: "/recargas", logo: "/images/header logo/recargas.webp", mobileLogo: "/images/header logo/recargas-sq.webp", accent: "#6A0DAD" },
  { key: "security-data", label: "Security Data", href: "/security-data", logo: "/images/header logo/security-data.webp", mobileLogo: "/images/header logo/security-data-sq.webp", accent: "#E63946" },
  { key: "equifax", label: "Equifax", href: "/equifax", logo: "/images/header logo/equifax.webp", mobileLogo: "/images/header logo/equifax-sq.webp", accent: "#C8102E" },
  { key: "supa", label: "SUPA", href: "/supa", logo: "/images/header logo/supa.webp", mobileLogo: "/images/header logo/supa-sq.webp", accent: "#2D6A4F", scale: 1.35 },
  { key: "western-union", label: "Western Union", href: "/western-union", logo: "/images/header logo/western-union.webp", mobileLogo: "/images/header logo/western-union-sq.webp", accent: "#FFDD00" },
  { key: "servicios-basicos", label: "Servicios Básicos", href: "/servicios-basicos", logo: "/images/header logo/planillas.webp", mobileLogo: "/images/header logo/planillas-sq.webp", accent: "#002D54", scale: 1.35 },
  { key: "bancos", label: "Bancos", href: "/bancos", logo: "/images/header logo/bancos.webp", mobileLogo: "/images/header logo/bancos-sq.webp", accent: "#F7EF4D" },
];

/* ─── Branch Hours Logic ─── */
function isBranchOpen(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const currentMinutes = hour * 60 + minutes;
  if (day >= 1 && day <= 5) return currentMinutes >= 390 && currentMinutes < 1170;
  if (day === 6) return currentMinutes >= 480 && currentMinutes < 960;
  return false;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showSubBar, setShowSubBar] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [branchOpen, setBranchOpen] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setDesktopMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setBranchOpen(isBranchOpen());
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > 20;
      setScrolled(isScrolled);
      setShowSubBar(!isScrolled);
      lastScrollY.current = currentScrollY;
    };

    handleScroll(); // Check immediately on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 transform ${scrolled ? "bg-pe-black/95 backdrop-blur-xl shadow-2xl" : "bg-pe-black"} border-b border-white/5`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col">

            {/* ═══ Main Top Nav (Thinner layout) ═══ */}
            <div className="flex items-center justify-between h-16 lg:h-20 relative">
              {/* Logo Image - always visible */}
              <Link href="/" className="flex items-center gap-2 shrink-0 group z-10">
                <Image
                  src="/logo.jpg"
                  alt="PagoExpress Ecuador Logo"
                  width={130}
                  height={42}
                  className="h-7 lg:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 brightness-110"
                  priority
                />
              </Link>

              {/* Mobile: Centered "PagoExpress" text */}
              <div className="absolute inset-0 lg:hidden flex items-center justify-center pointer-events-none">
                <span className="text-white font-black text-base tracking-tight">
                  PagoExpress
                </span>
              </div>

              {/* Desktop Global Navigation Info */}
              <div className="hidden lg:flex items-center gap-6 ml-8">
                <div className="flex items-center gap-2.5 text-[11px]">
                  <MapPin className="w-4 h-4 text-pe-yellow" />
                  <div className="flex flex-col -space-y-0.5">
                    <span className="font-light text-white/50 uppercase tracking-widest text-[9px]">Miguel Riofrío y Olmedo</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${branchOpen ? "bg-pe-success animate-pulse-dot shadow-[0_0_8px_#10B981]" : "bg-pe-error"}`} />
                      <span className={`font-black uppercase tracking-[0.1em] text-[8px] ${branchOpen ? "text-pe-success" : "text-pe-error"}`}>
                        {branchOpen ? "Abierto Ahora" : "Cerrado"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/50 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-pe-yellow" />
                  <span className="font-light">L-V 06:30-19:30 · S 08:00-16:00</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-white/50 text-[11px]">
                  <Phone className="w-3.5 h-3.5 text-pe-yellow" />
                  <span className="font-light">07 258 3120</span>
                </div>
              </div>

              <div className="flex-1 hidden lg:block" />

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center gap-2 mr-6">
                <Link
                  href="/"
                  className={`px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition-all rounded-full ${pathname === "/" ? "text-pe-yellow font-black bg-white/5" : "text-white/70 font-medium hover:text-white hover:bg-white/5"}`}
                >
                  Inicio
                </Link>
                <Link
                  href="/nosotros"
                  className={`px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition-all rounded-full ${pathname === "/nosotros" ? "text-pe-yellow font-black bg-white/5" : "text-white/70 font-medium hover:text-white hover:bg-white/5"}`}
                >
                  Nosotros
                </Link>
              </nav>

              {/* Desktop CTA */}
              <div className="hidden lg:flex items-center">
                <Link
                  href="https://wa.me/593990227203"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-pe-yellow to-[#F2A900] text-pe-black font-black text-[11px] uppercase tracking-widest rounded-full hover:shadow-[0_0_20px_rgba(247,239,77,0.4)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Contáctanos
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {/* Desktop Menu Toggle - ONLY visible when scrolled */}
                {scrolled && (
                  <button
                    onClick={() => setDesktopMenuOpen(true)}
                    className="ml-4 p-2.5 rounded-full bg-white/5 text-pe-yellow hover:bg-white/10 transition-all group border border-white/5 animate-fade-in"
                    aria-label="Menú de servicios"
                  >
                    <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                )}
              </div>

              {/* Mobile Toggle */}
              <div className="flex items-center gap-2 lg:hidden absolute right-4">
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="p-2.5 rounded-full bg-white/5 text-pe-yellow hover:bg-white/10 transition-colors"
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div
              className={`items-center justify-between border-t border-white/5 overflow-hidden transition-all duration-500 ease-in-out origin-top ${showSubBar ? "h-[52px] opacity-100 py-3 lg:flex hidden" : "h-0 opacity-0 py-0 border-transparent pointer-events-none lg:hidden hidden"}`}
            >
              <div className="flex items-center justify-center gap-2.5 overflow-x-auto hide-scrollbar w-full">
                {services.map((s) => {
                  const isActive = pathname === s.href;
                  return (
                    <Link
                      key={s.key}
                      href={s.href}
                      className={`group relative flex items-center justify-center px-2 py-1.5 rounded-lg overflow-hidden transition-all duration-300 shrink-0 bg-white hover:shadow-lg hover:-translate-y-0.5 ${isActive ? "ring-2 shadow-md" : "hover:ring-1 ring-black/5"}`}
                      style={isActive ? { outlineColor: s.accent, boxShadow: `0 2px 12px ${s.accent}30` } : undefined}
                      title={s.label}
                    >
                      {/* Colored bottom accent line on hover */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                        style={{ backgroundColor: s.accent }}
                      />

                      <div className="relative z-10 w-[115px] h-[45px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        <Image
                          src={s.logo}
                          alt={s.label}
                          width={115}
                          height={45}
                          className="object-contain transition-all duration-300"
                          style={s.scale ? { transform: `scale(${s.scale})` } : undefined}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* ═══ Desktop Side Drawer (Premium) ═══ */}
      {desktopMenuOpen && (
        <div className="fixed inset-0 z-[100] hidden lg:block">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-pe-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setDesktopMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="absolute top-0 right-0 h-full w-[450px] bg-pe-black border-l border-white/10 shadow-2xl animate-slide-in-right flex flex-col">
            <div className="flex items-center justify-between p-8 border-b border-white/5">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-pe-yellow uppercase tracking-[0.3em] mb-1">Explorar</span>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Servicios <span className="text-pe-yellow">Ecuador</span></h3>
              </div>
              <button
                onClick={() => setDesktopMenuOpen(false)}
                className="p-3 rounded-full bg-white/5 text-white hover:bg-pe-yellow hover:text-pe-black transition-all group"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-1 gap-4">
                {services.map((s) => (
                  <Link
                    key={s.key}
                    href={s.href}
                    className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white hover:border-white transition-all duration-300"
                  >
                    <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm border border-black/5 group-hover:shadow-lg transition-all">
                      <Image
                        src={s.mobileLogo || s.logo}
                        alt={s.label}
                        width={64}
                        height={64}
                        className="object-contain transition-all duration-300 group-hover:scale-110"
                        style={s.mobileLogo ? { transform: 'scale(1.2)' } : { transform: `scale(${(s.scale || 1) * 1.2})` }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-black text-white group-hover:text-pe-black transition-colors uppercase tracking-tight">{s.label}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-bold text-pe-yellow uppercase tracking-widest bg-pe-yellow/10 group-hover:bg-pe-black/5 group-hover:text-pe-black-pure px-2 py-0.5 rounded">Digital + Presencial</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-pe-black group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>

              {/* Quick Info at bottom of drawer */}
              <div className="mt-12 p-6 rounded-[2rem] bg-gradient-to-br from-pe-yellow/20 to-transparent border border-pe-yellow/10">
                <p className="text-xs font-bold text-white mb-2 uppercase tracking-widest">Atención Matriz</p>
                <p className="text-xs text-white/50 leading-relaxed">
                  Lunes a Viernes: 06:30 - 19:30<br />
                  Sábados: 08:00 - 16:00
                </p>
                <Link
                  href="https://wa.me/593990227203"
                  target="_blank"
                  className="mt-4 flex items-center gap-2 text-pe-yellow font-black text-xs uppercase tracking-widest hover:translate-x-1 transition-transform"
                >
                  WhatsApp Directo <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="p-8 border-t border-white/5 bg-white/5">
              <p className="text-[10px] text-white/20 font-medium text-center uppercase tracking-widest">PagoExpress Ecuador · Trayectoria desde 2007</p>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from jumping up behind the fixed header */}
      <div className="h-16 lg:h-[132px] shrink-0" />

      {/* ═══ Mobile Navigation (Dark Minimal) ═══ */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-pe-black lg:hidden flex flex-col animate-fade-in overflow-y-auto">
          <div className="flex items-center justify-between p-5 border-b border-white/5 sticky top-0 bg-pe-black/95 backdrop-blur-md z-20">
            <Image src="/logo.jpg" alt="Logo" width={110} height={36} className="h-8 w-auto brightness-110 relative z-10" />

            {/* Centered PagoExpress Text for Mobile Drawer */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-white font-black text-sm tracking-tight">
                PagoExpress
              </span>
            </div>

            <button onClick={() => setMobileOpen(false)} className="p-2.5 rounded-full bg-white/5 text-white relative z-10">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-6 space-y-10">
            {/* Main Links */}
            <div className="flex flex-col gap-1">
              <Link href="/" className="text-2xl font-light text-white tracking-widest uppercase py-2">
                Inicio
              </Link>
              <Link href="/nosotros" className="text-2xl font-light text-white tracking-widest uppercase py-2">
                Nosotros
              </Link>
            </div>

            {/* Services List */}
            <div>
              <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-6">Agentes Autorizados</h3>
              <div className="flex flex-col gap-1">
                {services.map((s) => {
                  return (
                    <Link
                      key={s.key}
                      href={s.href}
                      className="flex items-center gap-5 py-2.5 group"
                    >
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white group-hover:bg-white/90 transition-all overflow-hidden p-1 shadow-sm border border-white/10">
                        <div className="relative w-full h-full flex items-center justify-center">
                          <Image
                            src={s.mobileLogo || s.logo}
                            alt={s.label}
                            width={60}
                            height={60}
                            className="object-contain transition-all group-hover:scale-110"
                            style={s.mobileLogo ? { transform: 'scale(1.35)' } : { transform: `scale(${(s.scale || 1) * 1.35})` }}
                          />
                        </div>
                      </div>
                      <span className="text-xl font-bold text-white/90 group-hover:text-white transition-colors tracking-tight">{s.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-col gap-3 text-sm text-white/50 font-light">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-pe-yellow" /> Miguel Riofrío y Olmedo
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-pe-yellow" /> L-V 06:30 - 19:30 | S 08:00 - 16:00
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-pe-yellow" /> 07 258 3120
              </div>
            </div>
          </div>

          <div className="p-6 sticky bottom-0 bg-pe-black/95 backdrop-blur-md border-t border-white/5">
            <Link
              href="https://wa.me/593990227203"
              target="_blank"
              className="flex items-center justify-center gap-3 w-full py-4 bg-pe-yellow text-pe-black font-black uppercase tracking-[0.2em] text-sm rounded-full shadow-[0_0_20px_rgba(247,239,77,0.3)]"
            >
              Contáctanos <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
