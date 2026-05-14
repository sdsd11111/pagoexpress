"use client";

import { motion, Variants } from "framer-motion";
import { 
    Search, 
    FileText, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    Clock, 
    Building2,
    Zap,
    Droplets,
    Smartphone,
    CreditCard,
    Landmark,
    MessageCircle
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const fadeUp: Variants = { 
  hidden: { opacity: 0, y: 30 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } 
};

export default function ServiciosClient() {
    return (
        <main className="min-h-screen bg-[#FDFDFD] selection:bg-pe-yellow/30">
            {/* Header / Hero */}
            <section className="relative pt-32 pb-24 bg-pe-black overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-pe-yellow/5 skew-x-[-20deg] translate-x-1/4" />
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-4xl mx-auto">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pe-yellow mb-6 block">Ecosistema Financiero</span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase italic leading-tight">
                            Más de <span className="text-pe-yellow">300 Convenios</span> <br /> de Pago a tu Alcance
                        </h1>
                        <p className="text-xl text-white/50 mb-12 font-medium leading-relaxed">
                            Desde servicios públicos hasta pensiones educativas y catálogos. PagoExpress es tu ventanilla única en Loja.
                        </p>
                        
                        <div className="relative max-w-2xl mx-auto group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-hover:text-pe-yellow transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Buscar convenio (Ej: Netlife, IESS, Municipio...)" 
                                className="w-full pl-16 pr-8 py-6 bg-white/5 border border-white/10 rounded-[2rem] text-white font-bold placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-pe-yellow/50 transition-all"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Grid of Categories */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { 
                                title: "Servicios Públicos", 
                                icon: Zap, 
                                items: ["Luz (EERSSA, CNEL)", "Agua (UMAPAL)", "Teléfono (CNT)"],
                                link: "/servicios-basicos"
                            },
                            { 
                                title: "Bancos y Cooperativas", 
                                icon: Landmark, 
                                items: ["Depósitos", "Pagos de Crédito", "Tarjetas"],
                                link: "/bancos"
                            },
                            { 
                                title: "Educación", 
                                icon: Building2, 
                                items: ["Pensiones Escolares", "Matrículas UTPL", "UNL"],
                                link: "https://wa.me/593990227203"
                            },
                            { 
                                title: "Impuestos", 
                                icon: FileText, 
                                items: ["Predios Municipales", "SRI", "Matrícula ANT"],
                                link: "/servicios-basicos"
                            },
                            { 
                                title: "Telecomunicaciones", 
                                icon: Smartphone, 
                                items: ["Netlife", "Xtrim", "Claro/Movistar"],
                                link: "/servicios-basicos"
                            },
                            { 
                                title: "Seguridad Social", 
                                icon: ShieldCheck, 
                                items: ["Aportes IESS", "Préstamos Quirografarios"],
                                link: "https://wa.me/593990227203"
                            }
                        ].map((cat, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 rounded-[3rem] bg-white border border-pe-gray-100 hover:border-pe-yellow/30 transition-all group hover:shadow-2xl"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-pe-gray-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-pe-yellow transition-all">
                                    <cat.icon className="w-7 h-7 text-pe-black/40 group-hover:text-pe-black transition-colors" />
                                </div>
                                <h3 className="text-2xl font-black text-pe-black mb-6 uppercase italic">{cat.title}</h3>
                                <ul className="space-y-4 mb-8">
                                    {cat.items.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-sm text-pe-gray-400 font-bold">
                                            <CheckCircle2 className="w-4 h-4 text-pe-yellow-dark" /> {item}
                                        </li>
                                    ))}
                                </ul>
                                <Link href={cat.link} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-pe-black hover:text-pe-yellow-dark transition-colors">
                                    Gestionar Pago <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-24 bg-pe-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-pe-black rounded-[4rem] p-12 lg:p-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
                            <Image src="/bank_card_bg.png" alt="Pattern" fill className="object-cover" />
                        </div>
                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-black text-white mb-8 leading-tight">¿No encuentras <br /> tu servicio?</h2>
                                <p className="text-white/50 text-lg mb-10 font-medium leading-relaxed">
                                    Nuestro catálogo se actualiza semanalmente. Si no visualizas tu convenio, contáctanos directamente para verificar disponibilidad.
                                </p>
                                <Link href="https://wa.me/593990227203" className="inline-flex items-center gap-3 px-10 py-5 bg-pe-yellow text-pe-black font-black rounded-2xl hover:scale-105 transition-all uppercase tracking-widest text-xs">
                                    <MessageCircle className="w-5 h-5" /> Consultar por WhatsApp
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Acreditación", value: "Inmediata", icon: Clock },
                                    { label: "Seguridad", value: "Encriptada", icon: ShieldCheck },
                                    { label: "Convenios", value: "+300", icon: FileText },
                                    { label: "Soporte", value: "Humano", icon: MessageCircle }
                                ].map((stat, i) => (
                                    <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center">
                                        <stat.icon className="w-6 h-6 text-pe-yellow mx-auto mb-3" />
                                        <p className="text-2xl font-black text-white leading-none mb-1">{stat.value}</p>
                                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
