"use client";

import { useState, useRef, useEffect } from "react";
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
    CreditCard,
    Youtube,
    Wifi,
    Phone
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

    // Nuevos estados para el Flujo Dinámico de Recargas
    const [recargaCat, setRecargaCat] = useState<'celulares' | 'juegos' | 'prime' | 'tarjetas'>('celulares');
    const [recargaStep, setRecargaStep] = useState<1 | 2 | 3 | 4>(1);
    const [selectedProvider, setSelectedProvider] = useState<{name: string, type: string} | null>(null);
    const [selectedPackage, setSelectedPackage] = useState<any>(null);
    const [clientData, setClientData] = useState('');

    const [heroSlideIndex, setHeroSlideIndex] = useState(0);
 
    const brandConfig: Record<string, any> = {
        "Claro": { divider: "bg-red-600", logoText: "Claro-", logoColor: "text-red-600 text-sm", defaultPill: "bg-[#E5E7EB] text-gray-800" },
        "Movistar": { divider: "bg-[#019DF4]", logoText: "Movistar", logoColor: "text-[#019DF4] text-sm", defaultPill: "bg-[#8cc63f] text-white" },
        "CNT": { divider: "bg-[#0ea5e9]", logoText: "Cnt", logoColor: "text-[#0ea5e9] font-[cursive] text-sm", defaultPill: "bg-[#cbd5e1] text-gray-800" },
        "Tuenti": { divider: "bg-[#ff0066]", logoText: "tuenti", logoColor: "text-[#ff0066] font-bold text-sm", defaultPill: "bg-[#E5E7EB] text-gray-800" },
        "Maxiplus": { divider: "bg-[#4a1d96]", logoText: "MAXI\nPLUS", logoColor: "text-[#4a1d96] font-bold whitespace-pre-line text-xs", defaultPill: "bg-[#cbd5e1] text-gray-800" },
        "Akimovil": { divider: "bg-[#c1272d]", logoText: "AKÍ\nMOVIL", logoColor: "text-[#c1272d] font-black whitespace-pre-line text-xs", defaultPill: "bg-[#cbd5e1] text-gray-800" },
        "Netflix": { 
            divider: "bg-red-600", 
            logoText: (
                <div className="flex flex-col items-center justify-center py-1">
                    <span className="text-red-600 font-black text-2xl tracking-tighter drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">NETFLIX</span>
                </div>
            ), 
            logoColor: "text-red-600", 
            defaultPill: "bg-gray-200 text-gray-800" 
        },
        "Plex": { 
            divider: "bg-orange-500", 
            logoText: (
                <div className="flex flex-col items-center justify-center py-1">
                    <span className="text-current font-black italic text-2xl tracking-tighter">plex</span>
                </div>
            ), 
            logoColor: "text-black", 
            defaultPill: "bg-gray-200 text-gray-800" 
        },
        "Apple Gift Card": { 
            divider: "bg-gray-400", 
            logoText: (
                <div className="flex items-center justify-center gap-1.5 py-1">
                    <div className="w-7 h-7 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                            <path d="M17.05 20.28c-.96.95-2.12 2.22-3.48 2.22-1.35 0-1.87-.83-3.44-.83-1.58 0-2.15.81-3.42.83-1.31.02-2.39-1.2-3.35-2.22-1.99-2.11-3.42-5.96-3.42-8.9 0-4.88 2.94-7.46 5.61-7.46 1.41 0 2.65.86 3.49.86.83 0 2.23-.9 3.86-.9 1.7 0 3.25.79 4.22 2.05-3.32 1.76-2.77 6.45.69 8.24-.74 2-1.8 4.09-3.76 6.11zM12.03 5.4c-.16-2.14 1.58-4.14 3.51-4.4.22 2.33-1.89 4.39-3.51 4.4z"/>
                        </svg>
                    </div>
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-current font-black text-xs uppercase tracking-tight">Gift Card</span>
                    </div>
                </div>
            ), 
            logoColor: "text-black", 
            defaultPill: "bg-gray-200 text-gray-800" 
        },
        "Free Fire": { divider: "bg-black", logoText: "FREE FIRE", logoColor: "text-black font-black text-2xl italic", defaultPill: "bg-gray-200 text-gray-800" },
        "Fortnite": { 
            divider: "bg-transparent", 
            logoText: (
                <div className="flex flex-col items-center justify-center py-1 leading-none">
                    <span className="text-[#a855f7] font-black text-lg tracking-tight drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">FORTNITE</span>
                    <span className="text-white/40 font-medium text-[8px]">Gift Card</span>
                </div>
            ), 
            logoColor: "text-[#4B0082]", 
            defaultPill: "bg-[#c4b5e0] text-[#4B0082]" 
        },
        "Roblox": { 
            divider: "bg-transparent", 
            logoText: (
                <div className="flex flex-col items-center justify-center py-1 leading-none">
                    <span className="text-red-600 font-black text-xl tracking-tighter" style={{ WebkitTextStroke: '1px #dc2626', color: 'transparent' }}>RÖBLOX</span>
                    <span className="text-gray-400 font-medium text-[8px]">Gift Card</span>
                </div>
            ), 
            logoColor: "text-red-600", 
            defaultPill: "bg-[#d1d5db] text-[#1e293b]" 
        },
        "Mobile Legends": { 
            divider: "bg-transparent", 
            logoText: (
                <div className="flex flex-col items-center justify-center py-1 leading-none">
                    <div className="flex flex-col items-center">
                        <span className="text-[#f97316] font-black text-xs tracking-tight uppercase italic">MOBILE</span>
                        <span className="text-[#f97316] font-black text-lg tracking-tighter uppercase italic mt-[-2px]">LEGENDS</span>
                        <span className="text-[#f97316] font-bold text-[6px] tracking-[0.2em] uppercase">BANG BANG</span>
                    </div>
                </div>
            ), 
            logoColor: "text-[#f97316]", 
            defaultPill: "bg-[#d1d5db] text-[#1e293b]" 
        },
        "Call of Duty Mobile": { 
            divider: "bg-transparent", 
            logoText: (
                <div className="flex flex-col items-center justify-center py-1">
                    <span className="text-white font-black text-[10px] tracking-tighter uppercase leading-none">CALL OF DUTY</span>
                    <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-white font-bold text-[8px] tracking-[0.2em]">MOBILE</span>
                        <div className="w-3 h-3 bg-[#facc15] flex items-center justify-center rounded-[1px]">
                            <span className="text-black font-black text-[8px]">M</span>
                        </div>
                    </div>
                </div>
            ), 
            logoColor: "text-black", 
            defaultPill: "bg-[#d1d5db] text-[#1e293b]" 
        },
        "PUBG Mobile": { 
            divider: "bg-transparent", 
            logoText: (
                <div className="flex flex-col items-center justify-center py-1 leading-none">
                    <div className="border border-[#E3A008] px-1 py-0.5 leading-none mb-0.5">
                        <span className="text-[#E3A008] font-black text-lg tracking-widest">PUBG</span>
                    </div>
                    <span className="text-[#E3A008] font-bold text-[8px] tracking-[0.2em]">MOBILE</span>
                </div>
            ), 
            logoColor: "text-[#E3A008]", 
            defaultPill: "bg-[#d1d5db] text-[#1e293b]" 
        },
        "Steam": { 
            divider: "bg-transparent", 
            logoText: (
                <div className="flex flex-col items-center justify-center py-1">
                    <div className="flex items-center gap-1">
                        <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center p-0.5">
                            <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.184 17.145l-2.084-2.084c-.381.134-.793.206-1.222.206-1.564 0-2.831-1.268-2.831-2.831 0-.306.049-.599.139-.875l-2.128-2.128v-.001l-.001-.001-3.058-.684.684-3.058 2.051.459 1.127 1.127c.276-.09.569-.139.875-.139 1.564 0 2.831 1.268 2.831 2.831 0 .429-.072.841-.206 1.222l2.084 2.084h.001l3.058.684-.684 3.058-2.051-.459-1.127-1.127zm-3.306-4.714c0 .77-.625 1.395-1.395 1.395-.77 0-1.395-.625-1.395-1.395 0-.77.625-1.395 1.395-1.395.77 0 1.395.625 1.395 1.395z"/>
                            </svg>
                        </div>
                        <span className="text-white font-black text-sm tracking-tight uppercase">Steam™</span>
                    </div>
                </div>
            ), 
            logoColor: "text-[#171a21]", 
            defaultPill: "bg-[#d1d5db] text-[#1e293b]" 
        },
        "BattleNet": { 
            divider: "bg-transparent", 
            logoText: (
                <div className="flex flex-col items-center justify-center py-1">
                    <div className="w-6 h-6 flex items-center justify-center relative mb-0.5">
                        <div className="absolute inset-0 border-[1.5px] border-[#00aeff] rounded-full rotate-45" />
                        <div className="absolute inset-0 border-[1.5px] border-[#00aeff] rounded-full -rotate-45" />
                        <div className="w-1 h-1 bg-[#00aeff] rounded-full" />
                    </div>
                    <span className="text-white font-black text-[9px] tracking-widest uppercase">BattleNet</span>
                </div>
            ), 
            logoColor: "text-black", 
            defaultPill: "bg-[#d1d5db] text-[#1e293b]" 
        },
        "Xbox": { 
            divider: "bg-transparent", 
            logoText: (
                <div className="flex flex-col items-center justify-center py-1 leading-none">
                    <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 bg-[#107c10] rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(16,124,16,0.5)]">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-3 h-3">
                                <path d="M4 4l16 16M4 20L20 4" />
                            </svg>
                        </div>
                        <span className="text-[#22c55e] font-bold text-lg tracking-[0.1em]">XBOX</span>
                    </div>
                    <span className="text-white/40 font-medium text-[8px] mt-1">Gift Card</span>
                </div>
            ), 
            logoColor: "text-[#107c10]", 
            defaultPill: "bg-[#d1d5db] text-[#1e293b]" 
        },
        "PlayStation Store": { 
            divider: "bg-transparent", 
            logoText: (
                <div className="flex items-center justify-center gap-1.5 py-1">
                    <div className="w-7 h-7 bg-[#0070d1] rounded-sm flex items-center justify-center p-1 shadow-sm">
                        <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                            <path d="M12,2L12,2c5.52,0,10,4.48,10,10c0,5.52-4.48,10-10,10c-5.52,0-10-4.48-10-10C2,6.48,6.48,2,12,2 M12,0 C5.37,0,0,5.37,0,12s5.37,12,12,12s12-5.37,12-12S18.63,0,12,0L12,0z M11.1,13.88l-2.03-0.53c-0.19-0.05-0.34-0.2-0.38-0.39 L8.27,10.9c-0.08-0.39,0.22-0.75,0.61-0.75h1.83c0.39,0,0.7,0.31,0.7,0.7v2.43C11.41,13.59,11.31,13.82,11.1,13.88z M15.73,13.35 l-1.83,0.53c-0.21,0.06-0.31,0.29-0.23,0.5l0.42,1.07c0.14,0.37-0.13,0.75-0.52,0.75H11.5c-0.39,0-0.7-0.31-0.7-0.7v-2.43 c0-0.39,0.31-0.7,0.7-0.7h2.07c0.39,0,0.7,0.31,0.7,0.7l0,1C14.27,14.36,15.31,13.85,15.73,13.35z"/>
                        </svg>
                    </div>
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-white font-black text-[10px] uppercase">PlayStation</span>
                        <span className="text-white/40 font-medium text-[8px] uppercase tracking-tighter">Gift Card</span>
                    </div>
                </div>
            ), 
            logoColor: "text-[#0070d1]", 
            defaultPill: "bg-[#d1d5db] text-[#1e293b]" 
        },
        "League of Legends": { 
            divider: "bg-transparent", 
            logoText: (
                <div className="flex flex-col items-center justify-center py-1 leading-none text-center">
                    <span className="text-[#c89b3c] font-black text-[10px] tracking-tighter uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">League of</span>
                    <span className="text-[#c89b3c] font-black text-base tracking-tight uppercase mt-[-2px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Legends</span>
                    <span className="text-gray-400 font-medium text-[8px] mt-0.5">Gift Card</span>
                </div>
            ), 
            logoColor: "text-[#c89b3c]", 
            defaultPill: "bg-[#d1d5db] text-[#1e293b]" 
        },
        "Nintendo eShop": { 
            divider: "bg-transparent", 
            logoText: (
                <div className="flex items-center justify-center gap-1.5 py-1">
                    <div className="w-6 h-6 bg-[#e64e12] rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(230,78,18,0.4)]">
                        <ShoppingBag className="w-3.5 h-3.5 text-white fill-current" />
                    </div>
                    <div className="flex flex-col items-start leading-none">
                        <div className="flex items-center gap-0.5">
                            <span className="text-white font-bold text-[12px]">Nintendo</span>
                            <span className="text-[#e64e12] font-bold text-[12px]">eShop</span>
                        </div>
                        <span className="text-white/40 font-medium text-[8px] uppercase tracking-widest mt-0.5">Gift Card</span>
                    </div>
                </div>
            ), 
            logoColor: "text-[#e64e12]", 
            defaultPill: "bg-[#d1d5db] text-[#1e293b]" 
        }
    };

    const handleSwipe = (setter: React.Dispatch<React.SetStateAction<number>>, max: number) => {
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 50) {
            setter(prev => diff > 0 ? Math.min(prev + 1, max - 1) : Math.max(prev - 1, 0));
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setHeroSlideIndex(prev => (prev + 1) % 4);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    const heroImages = [
        "/images/recargas/claro.webp",
        "/images/recargas/movistar.webp",
        "/images/recargas/tuenti.webp",
        "/images/recargas/cnt.webp",
        "/images/recargas/maxiplus.jpeg", // Assuming these paths based on the earlier list_dir
        "/images/recargas/akimovil.jpeg"
    ];

    const categories = [
        {
            title: "Streaming & TV",
            services: "Netflix, Plex",
            icon: MonitorPlay,
            color: "shadow-[0_0_20px_rgba(229,9,20,0.2)]",
            accent: "bg-[#E50914]"
        },
        {
            title: "Gaming",
            services: "Free Fire, Fortnite, Roblox, Steam, CoD, PUBG...",
            icon: Gamepad2,
            color: "shadow-[0_0_20px_rgba(168,85,247,0.2)]",
            accent: "bg-purple-500"
        },
        {
            title: "Gift Cards",
            services: "Apple Store",
            icon: ShoppingBag,
            color: "shadow-[0_0_20px_rgba(59,130,246,0.2)]",
            accent: "bg-blue-500"
        },
        {
            title: "Telefonía",
            services: "Claro, Movistar, Tuenti, CNT, Maxiplus, Akimovil",
            icon: Smartphone,
            color: "shadow-[0_0_20px_rgba(255,215,0,0.2)]",
            accent: "bg-pe-yellow"
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

    const dynamicProviders = {
        celulares: [
            { name: "Claro", type: "celulares", logo: "/images/recargas/claro.webp", color: "text-red-500" },
            { name: "Movistar", type: "celulares", logo: "/images/recargas/movistar.webp", color: "text-green-500" },
            { name: "Tuenti", type: "celulares", logo: "/images/recargas/tuenti.webp", color: "text-pink-500" },
            { name: "CNT", type: "celulares", logo: "/images/recargas/cnt.webp", color: "text-blue-400" },
            { name: "Maxiplus", type: "celulares", logo: "/images/recargas/maxiplus.jpeg", color: "text-purple-600" },
            { name: "Akimovil", type: "celulares", logo: "/images/recargas/akimovil.jpeg", color: "text-red-700" }
        ],
        juegos: [
            { name: "Free Fire", type: "juegos", icon: Gamepad2, color: "text-orange-500" },
            { name: "Fortnite", type: "juegos", icon: Gamepad2, color: "text-purple-400" },
            { name: "Roblox", type: "juegos", icon: Gamepad2, color: "text-gray-300" },
            { name: "Mobile Legends", type: "juegos", icon: Gamepad2, color: "text-blue-400" },
            { name: "Call of Duty Mobile", type: "juegos", icon: Gamepad2, color: "text-gray-400" },
            { name: "PUBG Mobile", type: "juegos", icon: Gamepad2, color: "text-yellow-600" },
            { name: "Steam", type: "juegos", icon: Gamepad2, color: "text-indigo-500" },
            { name: "BattleNet", type: "juegos", icon: Gamepad2, color: "text-blue-500" },
            { name: "Xbox", type: "juegos", icon: Gamepad2, color: "text-green-500" },
            { name: "PlayStation Store", type: "juegos", icon: Gamepad2, color: "text-blue-600" },
            { name: "League of Legends", type: "juegos", icon: Gamepad2, color: "text-yellow-500" },
            { name: "Nintendo eShop", type: "juegos", icon: Gamepad2, color: "text-red-600" }
        ],
        prime: [
            { name: "Netflix", type: "prime", logo: null, color: "text-red-600" },
            { name: "Plex", type: "prime", logo: null, color: "text-orange-500" }
        ],
        tarjetas: [
            { name: "Apple Gift Card", type: "tarjetas", logo: null, color: "text-gray-100" }
        ]
    };

    const providerPackages: Record<string, any[]> = {
        "Claro": [
            { name: "Combo $ 1,05", price: 1.05, data: "512 MB", wpp: "1 GB", social: null, mins: "Ilimitados a Claro", valid: "1 Día" },
            { name: "Combo $ 2,05", price: 2.05, data: "1 GB", wpp: "1 GB", social: null, mins: "Ilimitados + 20 Min", valid: "2 Días" },
            { name: "Combo $ 2,50", price: 2.50, data: "2 GB", wpp: "1 GB", social: null, mins: "Ilimitados + 20 Min", valid: "3 Días" },
            { name: "Combo $ 3,10", price: 3.10, data: "4 GB", wpp: "2 GB", social: null, mins: "Ilimitados + 30 Min", valid: "3 Días" },
            { name: "Combo $ 3,50", price: 3.50, data: "4 GB", wpp: "2 GB", social: "5 GB", mins: "Ilimitados + 30 Min", valid: "7 Días" },
            { name: "Combo $ 4,10", price: 4.10, data: "3 GB", wpp: "4 GB", social: "5 GB", mins: "Ilimitados + 40 Min", valid: "10 Días" },
            { name: "Combo $ 5,15", price: 5.15, data: "3 GB", wpp: "4 GB", social: "5 GB", mins: "Ilimitados + 50 Min", valid: "15 Días" },
            { name: "Combo $ 5,50", price: 5.50, data: "5 GB", wpp: "4 GB", social: "5 GB", mins: "Ilimitados + 50 Min", valid: "15 Días" },
            { name: "Combo $ 6,00", price: 6.00, data: "4 GB", wpp: "2 GB", social: "2 GB", mins: "Ilimitados + 30 Min", valid: "30 Días" },
            { name: "Combo $ 8,00", price: 8.00, data: "7 GB", wpp: "4 GB", social: "5 GB", mins: "Ilimitados + 60 Min", valid: "25 Días" },
            { name: "Combo $ 10,50", price: 10.50, data: "10 GB", wpp: "5 GB", social: "6 GB", mins: "Ilimitados + 100 Min", valid: "30 Días" },
            { name: "Combo $ 12,50", price: 12.50, data: "13 GB", wpp: "5 GB", social: "6 GB", mins: "Ilimitados + 120 Min", valid: "30 Días" },
            { name: "Combo $ 15,50", price: 15.50, data: "15 GB", wpp: "5 GB", social: "5 GB", mins: "Ilimitados + 150 Min", valid: "30 Días" },
            { name: "Combo $ 20,50", price: 20.50, data: "20 GB", wpp: "5 GB", social: "5 GB", mins: "Ilimitados + 150 Min", valid: "30 Días" },
            { name: "$ 2,05", price: 2.05, isSpecial: true, specialPill: "bg-[#E5E7EB] text-gray-800", specialText: "Horas\nIlimitadas", valid: "4 Horas", specialIcon: "Wifi" }
        ],
        "Movistar": [
            { name: "$ 9,00", price: 9.00, data: "6 GB", wpp: "Whatsapp\nGratis", spot: "Spotify\n10 GB", social: "+ 4 GB", mins: "Minutos\nIlimitados a\nMovistar +\n100 Min Otras\noperadoras\n10 SMS", valid: "30 Días" },
            { name: "$ 5,00", price: 5.00, data: "3 GB", wpp: "Whatsapp\nGratis", spot: "Spotify\n5 GB", social: "+ 3 GB", mins: "Minutos\nIlimitados a\nMovistar +\n70 Min Otras\noperadoras\n10 SMS", valid: "15 Días" },
            { name: "$ 3,00", price: 3.00, data: "3 GB", wpp: "Whatsapp\nGratis", spot: "Spotify\n5 GB", social: "+ 2 GB", mins: "Minutos\nIlimitados a\nMovistar +\n30 Min Otras\noperadoras\n10 SMS", valid: "7 Días" },
            { name: "$ 1,05", price: 1.05, data: "512 MB", wpp: "Whatsapp\nGratis", social: "+ 512 MB", mins: "Minutos\nIlimitados a\nMovistar +\n10 Min Otras\noperadoras\n10 SMS", valid: "1 Día" },
            { name: "$ 15,50", price: 15.50, data: "15 GB", wpp: "Whatsapp\nGratis", spot: "Spotify\n10 GB", social: "+ 4 GB", mins: "Minutos\nIlimitados a\nMovistar +\n150 Min Otras\noperadoras\n20 Min Internacionales", valid: "30 Días" },
            { name: "$ 10,25", price: 10.25, data: "10 GB", wpp: "Whatsapp\nGratis", spot: "Spotify\n10 GB", social: "+ 4 GB", mins: "Minutos\nIlimitados a\nMovistar +\n120 Min Otras\noperadoras\n10 Min Internacionales", valid: "30 Días" },
            { name: "$ 8,00", price: 8.00, data: "4 GB", wpp: "Whatsapp y Spotify\nNavegación Libre", social: "+ 4 GB", mins: "Minutos\nIlimitados a\nMovistar +\n70 Min Otras\noperadoras\n10 SMS", valid: "30 Días" },
            { name: "$ 7,00", price: 7.00, data: "4 GB", wpp: "Whatsapp\nGratis", spot: "Spotify\n5 GB", social: "+ 4 GB", mins: "Minutos\nIlimitados a\nMovistar +\n80 Min Otras\noperadoras\n10 SMS", valid: "20 Días" },
            { name: "$ 2,00", price: 2.00, isSpecial: true, specialPill: "bg-[#FDE047] text-gray-800", specialText: "Bono 1 GB\nNavegación", valid: "4 Días", specialIcon: "Clock" },
            { name: "$ 4,00", price: 4.00, isSpecial: true, specialPill: "bg-[#FDE047] text-gray-800", specialText: "Bono 3 GB\nNavegación", valid: "15 Días", specialIcon: "Clock" },
            { name: "$ 3,00", price: 3.00, isSpecial: true, specialPill: "bg-[#FDE047] text-gray-800", specialText: "Bono Llamadas\nIlimitadas", valid: "2 Días", specialIcon: "Clock" }
        ],
        "CNT": [
            { name: "$ 1,00", price: 1.00, data: "1 GB", wpp: "1 GB", social: "512 MB", socialIcons: ["fb", "x"], mins: "Minutos\nIlimitados\na Cnt +\n15 Min\nOtras\noperadoras", valid: "1 Día" },
            { name: "$ 2,00", price: 2.00, data: "2 GB", wpp: "1 GB", social: "512 MB C/U", socialIcons: ["fb", "x"], mins: "Minutos\nIlimitados\na Cnt +\n25 Min\nOtras\noperadoras", valid: "3 Días" },
            { name: "$ 3,00", price: 3.00, data: "4 GB", wpp: "4 GB", social: "1 GB C/U", socialIcons: ["fb", "x", "ig", "tiktok"], mins: "Minutos\nIlimitados\na Cnt +\n35 Min\nOtras\noperadoras", valid: "7 Días" },
            { name: "$ 5,00", price: 5.00, data: "4 GB", wpp: "4 GB", social: "1 GB C/U", socialIcons: ["fb", "x", "ig", "tiktok"], mins: "Minutos\nIlimitados\na Cnt +\n50 Min\nOtras\noperadoras\n30 Minutos Internacionales", valid: "30 Días" },
            { name: "$ 6,00", price: 6.00, data: "7 GB", wpp: "4 GB", social: "1 GB C/U", socialIcons: ["fb", "x", "ig", "tiktok"], mins: "Minutos\nIlimitados\na Cnt +\n100 Min\nOtras\noperadoras\n30 Minutos Internacionales", valid: "30 Días" },
            { name: "$ 10,00", price: 10.00, data: "15 GB", wpp: "4 GB", social: "1 GB C/U", socialIcons: ["fb", "x", "ig", "tiktok"], mins: "Minutos\nIlimitados\na Cnt +\n200 Min\nOtras\noperadoras\n50 Minutos Internacionales", valid: "30 Días" },
            { name: "$ 15,00", price: 15.00, data: "20 GB", wpp: "4 GB", social: "1 GB C/U", socialIcons: ["fb", "x", "ig", "tiktok"], mins: "Minutos\nIlimitados\na Cnt +\n300 Min\nOtras\noperadoras\n100 Minutos Internacionales", valid: "30 Días" },
            { name: "$ 20,00", price: 20.00, data: "25 GB", wpp: "4 GB", social: "1 GB C/U", socialIcons: ["fb", "x", "ig", "tiktok"], mins: "Minutos\nIlimitados\na Cnt +\nMin Ilimi\nOtras\noperadoras\n150 Minutos Internacionales", valid: "30 Días" },
            { name: "$ 1,00", price: 1.00, isSpecial: true, specialText: "1 GB", specialSubText: "Instagram", valid: "1 Día", specialIcon: "Instagram" },
            { name: "$ 1,00", price: 1.00, isSpecial: true, specialText: "1 GB", specialSubText: "Spotify", valid: "1 Día", specialIcon: "Spotify" },
            { name: "$ 1,00", price: 1.00, isSpecial: true, specialText: "1 GB", specialSubText: "Google Apps + Youtube", valid: "1 Día", specialIcon: "Youtube" },
            { name: "$ 1,00", price: 1.00, isSpecial: true, specialText: "1 GB", specialSubText: "Netflix", valid: "1 Día", specialIcon: "Netflix" }
        ],
        "Tuenti": [
            { name: "Combo $ 1,00", price: 1.00, data: "1 GB", wpp: "Whatsapp y Spotify\nNavegación Libre", social: null, mins: "Minutos\nIlimitados a\nTuenti +\n10 Min Otras\noperadoras\n50 SMS", valid: "1 Día" },
            { name: "Combo $ 3,00", price: 3.00, data: "5 GB", wpp: "Whatsapp y Spotify\nNavegación Libre", social: null, mins: "Minutos\nIlimitados a\nTuenti +\n30 Min Otras\noperadoras\n50 SMS", valid: "7 Días" },
            { name: "Combo $ 5,00", price: 5.00, data: "6 GB", wpp: "Whatsapp y Spotify\nNavegación Libre", social: null, mins: "Minutos\nIlimitados a\nTuenti +\n70 Min Otras\noperadoras\n50 SMS", valid: "15 Días" },
            { name: "Combo $ 8,00", price: 8.00, data: "8 GB", wpp: "Whatsapp y Spotify\nNavegación Libre", social: "+ 2 GB", socialIcons: ["tiktok", "youtube"], mins: "Minutos\nIlimitados a\nTuenti +\n50 Min Otras\noperadoras\n25 Minutos Internacionales", valid: "30 Días" },
            { name: "Combo $ 10,00", price: 10.00, data: "12 GB", wpp: "Whatsapp y Spotify\nNavegación Libre", social: "+ 2 GB", socialIcons: ["tiktok", "youtube"], mins: "Minutos\nIlimitados a\nTuenti +\n100 Min Otras\noperadoras\n25 Minutos Internacionales", valid: "30 Días" },
            { name: "Combo $ 15,00", price: 15.00, data: "17 GB", wpp: "Whatsapp y Spotify\nNavegación Libre", social: "+ 2 GB", socialIcons: ["tiktok", "youtube"], mins: "Minutos\nIlimitados a\nTuenti +\n150 Min Otras\noperadoras\n45 Minutos Internacionales", valid: "30 Días" },
            { name: "Combo $ 25,00", price: 25.00, data: "25 GB", wpp: "Whatsapp y Spotify\nNavegación Libre", social: "+ 2 GB", socialIcons: ["tiktok", "youtube"], mins: "Minutos\nIlimitados a\nTuenti +\nMin Ilimitados\nOtras operadoras\n60 Minutos Internacionales", valid: "30 Días" }
        ],
        "Maxiplus": [
            { name: "$ 1,05", price: 1.05, data: "512 MB", wpp: "Gratis\nGB Libres", social: "+ 512 MB", socialIcons: ["fb", "x", "ig", "tiktok"], mins: "Minutos\nIlimitados a\nMaxiplus +\n10 Min Otras\noperadoras\n10 SMS", valid: "1 Día" },
            { name: "$ 3,00", price: 3.00, data: "3 GB", wpp: "Gratis\n5 GB", social: "+ 2 GB", socialIcons: ["fb", "x", "ig", "tiktok"], mins: "Minutos\nIlimitados a\nMaxiplus +\n30 Min Otras\noperadoras\n10 SMS", valid: "7 Días" },
            { name: "$ 5,00", price: 5.00, data: "3 GB", wpp: "Gratis\n5 GB", social: "+ 3 GB", socialIcons: ["fb", "x", "ig", "tiktok"], mins: "Minutos\nIlimitados a\nMaxiplus +\n70 Min Otras\noperadoras\n10 SMS", valid: "15 Días" },
            { name: "$ 7,00", price: 7.00, data: "4 GB", wpp: "Gratis\nGB Libres", social: "+ 4 GB", socialIcons: ["fb", "x", "ig", "tiktok"], mins: "Minutos\nIlimitados a\nMaxiplus +\n80 Min Otras\noperadoras\n10 SMS", valid: "20 Días" },
            { name: "$ 8,00", price: 8.00, data: "4 GB", wpp: "Gratis\nGB Libres", social: "+ 5 GB", socialIcons: ["fb", "x", "ig", "tiktok"], mins: "Minutos\nIlimitados a\nMaxiplus +\n70 Min Otras\noperadoras\n10 SMS", valid: "30 Días" },
            { name: "$ 9,00", price: 9.00, data: "6 GB", wpp: "Gratis\nGB Libres", social: "+ 4 GB", socialIcons: ["fb", "x", "ig", "tiktok"], mins: "Minutos\nIlimitados a\nMaxiplus +\n100 Min Otras\noperadoras\n10 SMS", valid: "30 Días" },
            { name: "$ 10,25", price: 10.25, data: "10 GB", wpp: "Gratis\nGB Libres", social: "+ 4 GB", socialIcons: ["fb", "x", "ig", "tiktok"], mins: "Minutos\nIlimitados a\nMaxiplus +\n120 Min Otras\noperadoras\n10 Min LDI", valid: "30 Días" },
            { name: "$ 15,50", price: 15.50, data: "15 GB", wpp: "Gratis\nGB Libres", social: "+ 4 GB", socialIcons: ["fb", "x", "ig", "tiktok"], mins: "Minutos\nIlimitados a\nMaxiplus +\n150 Min Otras\noperadoras\n20 Min LDI", valid: "30 Días" },
            { name: "$ 30,81", price: 30.81, data: "25 GB", wpp: "Gratis\nGB Libres", extra: "NETFLIX\n10 GB", social: "+ 6 GB", socialIcons: ["fb", "x", "ig", "tiktok"], mins: "Minutos\nIlimitados a\nMaxiplus +\nMin Ilimitados\nOtras operadoras\n100 Min LDI", valid: "30 Días" }
        ],
        "Akimovil": [
            { name: "$ 1,05", price: 1.05, data: "1 GB", wpp: "Gratis", spot: " ", mins: "Minutos\nIlimitados a\nAkimovil +\n10 Min Otras\noperadoras", valid: "1 Día" },
            { name: "$ 2,99", price: 2.99, data: "5 GB", wpp: "Gratis", spot: " ", mins: "Minutos\nIlimitados a\nAkimovil +\n30 Min Otras\noperadoras", valid: "7 Días" },
            { name: "$ 4,99", price: 4.99, data: "6 GB", wpp: "Gratis", spot: " ", mins: "Minutos\nIlimitados a\nAkimovil +\n70 Min Otras\noperadoras", valid: "15 Días" },
            { name: "$ 6,99", price: 6.99, data: "8 GB", wpp: "Gratis", spot: " ", mins: "Minutos\nIlimitados a\nAkimovil +\n80 Min Otras\noperadoras\n15 Minutos Internacionales", valid: "20 Días" },
            { name: "$ 8,99", price: 8.99, data: "10 GB", wpp: "Gratis", spot: " ", mins: "Minutos\nIlimitados a\nAkimovil +\n100 Min Otras\noperadoras\n10 SMS", valid: "30 Días" },
            { name: "$ 9,99", price: 9.99, data: "14 GB", wpp: "Gratis", spot: " ", mins: "Minutos\nIlimitados a\nAkimovil +\n120 Min Otras\noperadoras\n10 Minutos Internacionales", valid: "30 Días" },
            { name: "$ 15,49", price: 15.49, data: "19 GB", wpp: "Gratis", spot: " ", mins: "Minutos\nIlimitados a\nAkimovil +\n150 Min Otras\noperadoras\n20 Minutos Internacionales", valid: "30 Días" },
            { name: "$ 19,99", price: 19.99, data: "22 GB", wpp: "Gratis", spot: " ", mins: "Minutos\nIlimitados a\nAkimovil +\n200 Min Otras\noperadoras\n20 Minutos Internacionales", valid: "30 Días" }
        ],
        "Netflix": [
            { name: "1 Pantalla", price: 5.13, valid: "1 Mes" },
            { name: "2 Pantallas", price: 9.23, valid: "1 Mes" }
        ],
        "Plex": [
            { name: "1 Pantalla", price: 4.00, valid: "Mensual" },
            { name: "2 Pantallas", price: 5.00, valid: "Mensual" },
            { name: "3 Pantallas", price: 6.50, valid: "Mensual" }
        ],
        "Apple Gift Card": [
            { name: "Gift Card", price: 8.50, extra: "Valor a Acreditar $5" },
            { name: "Gift Card", price: 13.00, extra: "Valor a Acreditar $10" },
            { name: "Gift Card", price: 32.00, extra: "Valor a Acreditar $25" }
        ],
        "Free Fire": [
            { name: "110 Diamantes", price: 1.50, valid: "Inmediato" },
            { name: "341 Diamantes", price: 3.50, valid: "Inmediato" },
            { name: "572 Diamantes", price: 5.50, valid: "Inmediato" },
            { name: "1166 Diamantes", price: 10.50, valid: "Inmediato" },
            { name: "2398 Diamantes", price: 20.50, valid: "Inmediato" },
            { name: "6160 Diamantes", price: 50.50, valid: "Inmediato" },
            { name: "Tarjeta Semanal", price: 2.50, valid: "7 Días" },
            { name: "Tarjeta Mensual", price: 10.50, valid: "30 Días" }
        ],
        "Fortnite": [
            { name: "1000 V Bucks", price: 15.00, extra: "1000 V Bucks" },
            { name: "2800 V Bucks", price: 34.00, extra: "2800 V Bucks" },
            { name: "5000 V Bucks", price: 47.00, extra: "5000 V Bucks" }
        ],
        "Roblox": [
            { name: "800 Robux", price: 14.00, extra: "800 Robux" },
            { name: "2000 Robux", price: 33.00, extra: "2000 Robux" },
            { name: "4500 Robux", price: 60.00, extra: "4500 Robux" }
        ],
        "Mobile Legends": [
            { name: "234 + 23 Diamantes", price: 4.25, extra: "234 + 23 Diamantes" },
            { name: "625 + 81 Diamantes", price: 10.00, extra: "625 + 81 Diamantes" },
            { name: "1860 + 335 Diamantes", price: 30.00, extra: "1860 + 335 Diamantes" }
        ],
        "Call of Duty Mobile": [
            { name: "420 CoD Points", price: 6.00, extra: "420 CoD Points" },
            { name: "880 CoD Points", price: 11.50, extra: "880 CoD Points" },
            { name: "2400 CoD Points", price: 28.50, extra: "2400 CoD Points" }
        ],
        "PUBG Mobile": [
            { name: "325 UC", price: 5.80, extra: "325 UC" },
            { name: "660 UC", price: 10.50, extra: "660 UC" },
            { name: "1800 UC", price: 25.00, extra: "1800 UC" }
        ],
        "Steam": [
            { name: "$5 USD", price: 6.25, extra: "Gift Card 5 usd" },
            { name: "$10 USD", price: 12.50, extra: "Gift Card 10 usd" },
            { name: "$25 USD", price: 31.00, extra: "Gift Card 25 usd" }
        ],
        "BattleNet": [
            { name: "$5 USD", price: 6.25, extra: "Gift Card 5 usd" },
            { name: "$10 USD", price: 12.50, extra: "Gift Card 10 usd" },
            { name: "$25 USD", price: 31.00, extra: "Gift Card 25 usd" }
        ],
        "Xbox": [
            { name: "$10 USD", price: 13.50, extra: "Valor a Acreditar $10" },
            { name: "$25 USD", price: 32.00, extra: "Valor a Acreditar $25" }
        ],
        "PlayStation Store": [
            { name: "$50 USD", price: 63.00, extra: "Valor a Acreditar $50" }
        ],
        "League of Legends": [
            { name: "$5 USD", price: 7.00, extra: "Gift Card 5 usd" },
            { name: "$10 USD", price: 12.00, extra: "Gift Card 10 usd" },
            { name: "$15 USD", price: 18.00, extra: "Gift Card 15 usd" }
        ],
        "Nintendo eShop": [
            { name: "$10 USD", price: 14.00, extra: "Valor a Acreditar $10" },
            { name: "$20 USD", price: 26.00, extra: "Valor a Acreditar $20" },
            { name: "$50 USD", price: 63.00, extra: "Valor a Acreditar $50" }
        ],
        "default": [
            { name: "Paquete Básico", price: 3.00 },
            { name: "Paquete Estándar", price: 5.00 },
            { name: "Paquete Premium", price: 10.00 },
            { name: "Súper Paquete", price: 20.00 }
        ]
    };

    const handleSendWhatsApp = () => {
        if (!selectedProvider || !selectedPackage || !clientData) return;
        const text = `Hola PagoExpress, deseo realizar un pago de *${selectedProvider.name}*.\n📦 *Paquete:* ${selectedPackage.name} ($${selectedPackage.price.toFixed(2)})\n👤 *Datos/Número:* ${clientData}\n\nPor favor envíenme los datos para transferir el dinero.`;
        window.open(`https://wa.me/593990227203?text=${encodeURIComponent(text)}`, '_blank');
    };

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
                                Recargas y Pagos de Servicios <span className="text-pe-yellow">en Ecuador</span>
                            </h1>
                            {/* <p className="text-base sm:text-xl text-white/60 mb-10 leading-relaxed font-medium px-4 lg:px-0">
                                Recarga tus plataformas favoritas y telefonía al instante en PagoExpress Ecuador. Activamos tu diversión sin necesidad de tarjetas internacionales.
                            </p> */}
                            <div className="flex justify-center lg:justify-start px-4 lg:px-0 mt-6">
                                <Link
                                    href="#simulador"
                                    className="w-full sm:w-auto px-12 py-5 lg:py-6 bg-pe-yellow text-black text-xl lg:text-2xl font-black rounded-3xl transition-all hover:scale-105 hover:bg-yellow-400 shadow-[0_0_40px_rgba(255,215,0,0.4)] uppercase tracking-widest text-center"
                                >
                                    Recarga Ahora
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
                                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6 lg:p-8 overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={heroSlideIndex}
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.6 }}
                                            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40"
                                        >
                                            <div className="w-32 h-32 lg:w-48 lg:h-48 relative drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                                <Image 
                                                    src={heroImages[heroSlideIndex]} 
                                                    alt="Servicio de recarga" 
                                                    fill 
                                                    className="object-contain" 
                                                />
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
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
                        <h2 className="text-3xl sm:text-4xl font-black mb-4">Recarga para Celulares, Juegos y Servicios Digitales</h2>
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

            {/* ═══ SECCIÓN 2.5: Simulador / Flujo Dinámico de Compras ═══ */}
            <section id="simulador" className="py-24 bg-black relative border-y border-white/5">
                <div className="absolute inset-0 bg-pe-yellow/5 blur-[120px] pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-black mb-4">Haz tu recarga ahora</h2>
                        <p className="text-white/50 font-medium">Sigue los pasos y recibe tu activación por WhatsApp en minutos.</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-sm shadow-2xl">
                        {/* Tabs */}
                        <div className="flex flex-wrap sm:flex-nowrap bg-black/50 p-2 rounded-2xl mb-8 gap-2">
                            {[
                                { id: 'celulares', label: 'Recargas Celulares' },
                                { id: 'juegos', label: 'Recargas Juegos' },
                                { id: 'prime', label: 'Prime Video' },
                                { id: 'tarjetas', label: 'Tarjetas, Regalo y Suscripciones' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setRecargaCat(tab.id as any);
                                        setRecargaStep(1);
                                        setSelectedProvider(null);
                                        setSelectedPackage(null);
                                        setClientData('');
                                    }}
                                    className={`flex-1 text-sm sm:text-base py-3 rounded-xl font-bold transition-all ${recargaCat === tab.id ? 'bg-pe-yellow text-black' : 'text-white/50 hover:text-white'}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Step 1: Proveedor */}
                        {recargaStep === 1 && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h3 className="text-xl font-bold mb-6">Paso 1: ¿Qué vas a recargar?</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                                    {dynamicProviders[recargaCat].map((prov, i) => {
                                        const ProviderIcon = (prov as any).icon;
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    setSelectedProvider(prov as any);
                                                    setRecargaStep(2);
                                                }}
                                                className="p-6 bg-white/5 border border-white/10 hover:border-pe-yellow/50 hover:bg-white/10 rounded-2xl flex flex-col items-center gap-4 transition-all h-full"
                                            >
                                                <div className="w-16 h-16 flex items-center justify-center">
                                                    {(prov as any).logo ? (
                                                        <div className="relative w-full h-full">
                                                            <Image src={(prov as any).logo} alt={prov.name} fill className="object-contain" />
                                                        </div>
                                                    ) : brandConfig[prov.name] ? (
                                                        <div className="w-full h-16 flex items-center justify-center p-1">
                                                            <div className="max-w-full transition-transform duration-300 group-hover:scale-110">
                                                                {brandConfig[prov.name].logoText}
                                                            </div>
                                                        </div>
                                                    ) : prov.name === "Maxiplus" ? (
                                                        <div className="flex flex-col items-center justify-center bg-white p-1 rounded-lg">
                                                            <span className="text-[10px] font-black text-purple-900 leading-none">MAXI</span>
                                                            <span className="text-[10px] font-black text-purple-700 leading-none">PLUS</span>
                                                        </div>
                                                    ) : prov.name === "Akimovil" ? (
                                                        <div className="flex flex-col items-center justify-center bg-white p-1 rounded-full border-2 border-red-600 w-12 h-12">
                                                            <span className="text-[8px] font-black text-red-600 leading-none">AKÍ</span>
                                                            <span className="text-[7px] font-bold text-gray-800 leading-none">MOVIL</span>
                                                        </div>
                                                    ) : prov.name === "Netflix" ? (
                                                        <div className="flex items-center justify-center h-full">
                                                            <span className="text-red-600 font-black text-xs tracking-tighter">NETFLIX</span>
                                                        </div>
                                                    ) : prov.name === "Plex" ? (
                                                        <div className="flex items-center justify-center h-full gap-0.5">
                                                            <span className="text-black font-black text-xl italic leading-none">plex</span>
                                                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2" />
                                                        </div>
                                                    ) : prov.name === "Apple Gift Card" ? (
                                                        <div className="flex flex-col items-center justify-center h-full">
                                                            <div className="relative w-10 h-10 mb-1">
                                                                <svg viewBox="0 0 384 512" fill="currentColor" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                                                                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-31.4-73.7-114.8-73.7-133.4zm-7.3-159.2c22.5-26.9 23-64.4 23-88.6-21.6 0-51.5 11.2-66 28.5-13.8 16-21 44.5-21 70.8 24.3 0 51.5-10.7 64-28.7z" />
                                                                </svg>
                                                            </div>
                                                            <span className="text-[10px] font-bold text-white/70">Apple Store</span>
                                                        </div>
                                                    ) : ProviderIcon ? (
                                                        <ProviderIcon className={`w-10 h-10 ${prov.color}`} />
                                                    ) : (
                                                        <Smartphone className={`w-10 h-10 ${prov.color}`} />
                                                    )}
                                                </div>
                                                <span className="font-semibold text-sm text-center">{prov.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Monto / Paquete */}
                        {recargaStep === 2 && selectedProvider && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <div className="flex items-center gap-4 mb-6">
                                    <button onClick={() => setRecargaStep(1)} className="p-2 bg-white/5 rounded-full hover:bg-white/10"><ChevronLeft className="w-5 h-5" /></button>
                                    <h3 className="text-xl font-bold">Paso 2: Selecciona el paquete para {selectedProvider.name}</h3>
                                </div>
                                
                                {(() => {
                                    const brand = brandConfig[selectedProvider.name];
                                    if (!brand) return (
                                        <div className="space-y-3">
                                            {(providerPackages[selectedProvider.name] || providerPackages["default"]).map((pkg, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        setSelectedPackage(pkg);
                                                        setRecargaStep(3);
                                                    }}
                                                    className="w-full p-4 bg-white/5 border border-white/10 hover:border-pe-yellow/50 rounded-2xl flex justify-between items-center transition-all group"
                                                >
                                                    <span className="font-medium group-hover:text-pe-yellow">{pkg.name}</span>
                                                    <span className="font-black text-lg">${pkg.price.toFixed(2)}</span>
                                                </button>
                                            ))}
                                        </div>
                                    );

                                    return (
                                        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3 w-full">
                                            {providerPackages[selectedProvider.name].map((pkg, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        setSelectedPackage(pkg);
                                                        setRecargaStep(3);
                                                    }}
                                                    className="bg-white text-black border border-gray-200 rounded-lg p-2 shadow-sm hover:shadow transition-all flex flex-col items-center relative overflow-hidden text-left w-full h-full min-h-[120px]"
                                                >
                                                    <div className={`${brand.logoColor || 'text-black'} font-black mb-1 tracking-tighter w-full text-center uppercase`}>
                                                        {typeof brand.logoText === 'string' ? brand.logoText : selectedProvider.name}
                                                    </div>
                                                    <div className={`w-[95%] h-[2px] ${brand.divider} mb-2`}></div>
                                                    
                                                    {["Netflix", "Plex", "Apple Gift Card", "Free Fire", "Fortnite", "Roblox", "Mobile Legends", "Call of Duty Mobile", "PUBG Mobile", "Steam", "BattleNet", "Xbox", "PlayStation Store", "League of Legends", "Nintendo eShop"].includes(selectedProvider.name) ? (
                                                        <div className="flex flex-col items-center w-full">
                                                            <div className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase mb-1 ${brand.defaultPill}`}>
                                                                {pkg.name}
                                                            </div>
                                                            <div className="text-xl font-black text-gray-900 leading-none">${pkg.price.toFixed(2).replace('.', ',')}</div>
                                                            {pkg.extra && <div className="text-[9px] font-bold text-gray-500 mt-1 uppercase text-center leading-tight px-1">{pkg.extra}</div>}
                                                            {pkg.valid && <div className="text-[8px] font-medium text-gray-400 mt-0.5 uppercase tracking-tighter">{pkg.valid}</div>}
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center w-full">
                                                            <div className="text-xl font-black text-gray-900 mb-1">${pkg.price.toFixed(2).replace('.', ',')}</div>
                                                            <div className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-2 text-center">{pkg.name}</div>
                                                            <div className="flex flex-col gap-1 w-full">
                                                                <div className="flex items-center justify-between text-[10px] border-t border-gray-100 pt-1">
                                                                    <span className="text-gray-400">Datos:</span>
                                                                    <span className="font-bold text-gray-700">{pkg.data}</span>
                                                                </div>
                                                                <div className="flex items-center justify-between text-[10px]">
                                                                    <span className="text-gray-400">Vigencia:</span>
                                                                    <span className="font-bold text-gray-700">{pkg.valid}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    );
                                })()}
                            </motion.div>
                        )}

                        {/* Step 3: Datos del Cliente */}
                        {recargaStep === 3 && selectedPackage && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <div className="flex items-center gap-4 mb-6">
                                    <button onClick={() => setRecargaStep(2)} className="p-2 bg-white/5 rounded-full hover:bg-white/10"><ChevronLeft className="w-5 h-5" /></button>
                                    <h3 className="text-xl font-bold">Paso 3: Ingresa los datos</h3>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm text-white/60 mb-2">
                                            {recargaCat === 'celulares' ? 'Número de Teléfono a recargar' : recargaCat === 'juegos' ? 'UID JUGADOR' : 'Correo electrónico de la cuenta'}
                                        </label>
                                        <input
                                            type="text"
                                            value={clientData}
                                            onChange={(e) => setClientData(e.target.value)}
                                            placeholder={recargaCat === 'celulares' ? '09...' : recargaCat === 'juegos' ? 'Ej: 123456789' : 'ejemplo@correo.com'}
                                            className="w-full bg-black/50 border border-white/20 focus:border-pe-yellow rounded-xl p-4 outline-none transition-colors text-white"
                                        />
                                    </div>
                                    <button
                                        disabled={!clientData.trim()}
                                        onClick={() => setRecargaStep(4)}
                                        className="w-full py-4 bg-pe-yellow text-black font-black rounded-xl hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-widest text-sm"
                                    >
                                        Continuar
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Resumen y Enviar a WhatsApp */}
                        {recargaStep === 4 && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                                <div className="flex items-center gap-4 mb-6">
                                    <button onClick={() => setRecargaStep(3)} className="p-2 bg-white/5 rounded-full hover:bg-white/10"><ChevronLeft className="w-5 h-5" /></button>
                                    <h3 className="text-xl font-bold">Resumen de tu Recarga</h3>
                                </div>
                                <div className="bg-black/50 rounded-2xl p-6 border border-white/10 space-y-4 mb-8">
                                    <div className="flex justify-between border-b border-white/5 pb-4">
                                        <span className="text-white/50">Servicio</span>
                                        <span className="font-bold">{selectedProvider?.name}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-4">
                                        <span className="text-white/50">Paquete</span>
                                        <span className="font-bold">{selectedPackage?.name}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-4">
                                        <span className="text-white/50">Dato/Número</span>
                                        <span className="font-bold text-pe-yellow">{clientData}</span>
                                    </div>
                                    <div className="flex justify-between pt-2">
                                        <span className="text-white/50">Total a Pagar</span>
                                        <span className="font-black text-2xl text-green-400">${selectedPackage?.price.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSendWhatsApp}
                                    className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black rounded-xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                                >
                                    <MessageCircle className="w-6 h-6" />
                                    Pagar vía WhatsApp
                                </button>
                                <p className="text-center text-xs text-white/40 mt-4">Serás redirigido a WhatsApp para enviarnos el comprobante de depósito.</p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* SECCIÓN 7: El Proceso "Cash-to-Digital" */}
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
                            { title: "Disponibilidad 365", icon: Clock, desc: "Recargas disponibles todos los días del año en nuestras sucursales físicas." }
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
                        <h2 className="text-3xl font-black mb-4 tracking-tighter">Puntos de Recarga en Ecuador</h2>
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
