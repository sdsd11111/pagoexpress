"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Clock,
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
  { key: "ecuabet", label: "Ecuabet", href: "/ecuabet", logo: "/images/header logo/ecuabet.webp", accent: "#F3CF1D" },
  { key: "recargas", label: "Recargas", href: "/recargas", logo: "/images/header logo/recargas.webp", accent: "#6A0DAD" },
  { key: "security-data", label: "Security Data", href: "/security-data", logo: "/images/header logo/security-data.webp", accent: "#E63946" },
  { key: "equifax", label: "Equifax", href: "/equifax", logo: "/images/header logo/equifax.webp", accent: "#C8102E" },
  { key: "supa", label: "SUPA", href: "/supa", logo: "/images/header logo/supa.webp", accent: "#2D6A4F" },
  { key: "western-union", label: "Western Union", href: "/western-union", logo: "/images/header logo/western-union.webp", accent: "#FFDD00" },
  { key: "servicios-basicos", label: "Servicios Básicos", href: "/servicios-basicos", logo: "/images/header logo/planillas.webp", accent: "#002D54" },
  { key: "bancos", label: "Bancos", href: "/bancos", logo: "/images/header logo/bancos.webp", accent: "#F7EF4D" },
];

/* ─── Branch Hours Logic ─── */
function isBranchOpen(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const currentMinutes = hour * 60 + minutes;
  if (day >= 1 && day <= 5) return currentMinutes >= 480 && currentMinutes < 1080;
  if (day === 6) return currentMinutes >= 480 && currentMinutes < 840;
  return false;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showSubBar, setShowSubBar] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [branchOpen, setBranchOpen] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    setBranchOpen(isBranchOpen());
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if we've scrolled past the very top
      setScrolled(currentScrollY > 20);

      // Scroll direction logic for the sub-bar
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // Scrolling DOWN -> Hide the sub-bar
        setShowSubBar(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling UP -> Show the sub-bar
        setShowSubBar(true);
      }

      // Always show when at the very top
      if (currentScrollY <= 20) {
        setShowSubBar(true);
      }

      lastScrollY.current = currentScrollY;
    };

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
                  alt="PagoExpress Logo"
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
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-white/50 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-pe-yellow" />
                  <span className="font-light">L-V 8h-18h · S 8h-14h</span>
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

            {/* ═══ Services Sub-bar (Elegant Pills) ═══ */}
            <div
              className={`hidden lg:flex items-center justify-between py-3 border-t border-white/5 overflow-hidden transition-all duration-300 origin-top ${showSubBar ? "h-[52px] opacity-100 scale-y-100" : "h-0 py-0 opacity-0 scale-y-0 border-transparent overflow-hidden"}`}
            >
              <div className="flex items-center gap-2.5 overflow-x-auto hide-scrollbar w-full">
                {services.map((s) => {
                  const isActive = pathname === s.href;
                  return (
                    <Link
                      key={s.key}
                      href={s.href}
                      className={`group relative flex items-center gap-2.5 px-4 py-1.5 rounded-full overflow-hidden transition-all duration-300 shrink-0 border ${isActive ? "bg-white/10 border-white/20" : "bg-[#1A1A1A] border-white/5 hover:border-white/20 hover:bg-[#222]"}`}
                    >
                      {/* Hover glow effect behind pill */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: s.accent }} />

                      <div className="relative z-10 w-6 h-6 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <Image
                          src={s.logo}
                          alt={s.label}
                          width={24}
                          height={24}
                          className="object-contain brightness-105"
                        />
                      </div>
                      <span className={`text-[11px] font-bold tracking-wide relative z-10 transition-colors whitespace-nowrap ${isActive ? "text-white" : "text-white/70 group-hover:text-white"}`}>
                        {s.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Spacer to prevent content from jumping up behind the fixed header */}
      <div className="h-16 lg:h-[132px] shrink-0" />

      {/* ═══ Mobile Navigation (Dark Minimal) ═══ */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-pe-black lg:hidden flex flex-col animate-fade-in overflow-y-auto">
          <div className="flex items-center justify-between p-5 border-b border-white/5 sticky top-0 bg-pe-black/95 backdrop-blur-md">
            <Image src="/logo.jpg" alt="Logo" width={110} height={36} className="h-8 w-auto brightness-110" />
            <button onClick={() => setMobileOpen(false)} className="p-2.5 rounded-full bg-white/5 text-white">
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
                      className="flex items-center gap-5 py-3 group"
                    >
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-all overflow-hidden p-2.5">
                        <Image
                          src={s.logo}
                          alt={s.label}
                          width={40}
                          height={40}
                          className="object-contain transition-all group-hover:scale-110"
                        />
                      </div>
                      <span className="text-lg font-bold text-white/90 group-hover:text-white transition-colors">{s.label}</span>
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
                <Clock className="w-4 h-4 text-pe-yellow" /> L-V 8h - 18h | S 8h - 14h
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
