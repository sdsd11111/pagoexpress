"use client";

import { motion, Variants } from "framer-motion";
import { Globe, Plane, ShieldCheck, MapPin, MessageCircle, ArrowRight, Wallet, Landmark } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const fadeUp: Variants = { 
  hidden: { opacity: 0, y: 30 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } 
};

export default function RemesasClient() {
    return (
        <main className="min-h-screen bg-white selection:bg-pe-yellow/30">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center bg-pe-black overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <Image src="/bank_card_bg.png" alt="Background" fill className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-pe-black via-pe-black/80 to-transparent" />
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pe-yellow/10 border border-pe-yellow/20 mb-6 backdrop-blur-sm">
                            <Globe className="w-4 h-4 text-pe-yellow" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pe-yellow">Conexión Global</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic leading-[1.1]">
                            Remesas y <span className="text-pe-yellow">Giros Internacionales</span>
                        </h1>
                        <p className="text-xl text-white/60 mb-10 leading-relaxed font-medium max-w-2xl">
                            Envía y recibe dinero desde cualquier parte del mundo con el respaldo de las redes más grandes del planeta.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="https://wa.me/593990227203" className="px-10 py-5 bg-pe-yellow text-pe-black font-black rounded-2xl hover:scale-105 transition-all uppercase tracking-widest text-xs">Consultar Requisitos</Link>
                            <Link href="#aliados" className="px-10 py-5 border border-white/20 text-white font-black rounded-2xl hover:bg-white/5 transition-all uppercase tracking-widest text-xs">Nuestros Aliados</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section id="aliados" className="py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pe-yellow-dark mb-4 block">Seguridad y Respaldo</span>
                            <h2 className="text-3xl md:text-4xl font-black mb-8 leading-tight">El mundo está más <span className="text-pe-yellow-dark">cerca de ti</span></h2>
                            <p className="text-pe-gray-500 text-lg mb-12 font-medium leading-relaxed">
                                En PagoExpress Loja, facilitamos el cobro de tus remesas familiares y el envío de dinero al exterior. Trabajamos con los operadores líderes para garantizar que cada centavo llegue seguro.
                            </p>
                            
                            <div className="space-y-6 mb-12">
                                {[
                                    { title: "Cobro de Remesas", desc: "Recibe tu dinero del exterior en minutos presentando solo tu cédula y código de giro." },
                                    { title: "Giros Nacionales", desc: "Envía dinero a cualquier provincia del Ecuador de forma inmediata." },
                                    { title: "Courier & Documentos", desc: "Próximamente: Servicio de envío de paquetes y documentos a nivel nacional." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-6 rounded-3xl bg-pe-gray-50 border border-pe-gray-100 group hover:border-pe-yellow transition-all">
                                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                            <ShieldCheck className="w-6 h-6 text-pe-yellow-dark" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-pe-black mb-1">{item.title}</h4>
                                            <p className="text-sm text-pe-gray-400 font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { name: "Western Union", logo: "/images/brands/wu.png", color: "bg-[#FFDD00]" },
                                { name: "MoneyGram", logo: "/images/brands/mg.png", color: "bg-[#E63946]" },
                                { name: "Ria Money Transfer", logo: "/images/brands/ria.png", color: "bg-[#FF7000]" },
                                { name: "Vigo", logo: "/images/brands/vigo.png", color: "bg-[#0054A6]" }
                            ].map((brand, i) => (
                                <div key={i} className="aspect-square rounded-[3rem] bg-pe-gray-50 border border-pe-gray-200 flex flex-col items-center justify-center p-8 group hover:shadow-2xl transition-all cursor-default">
                                    <div className="w-16 h-16 rounded-full bg-white shadow-lg mb-6 flex items-center justify-center overflow-hidden">
                                        <Landmark className="w-8 h-8 text-pe-black/20" />
                                    </div>
                                    <h3 className="text-lg font-black text-pe-black text-center mb-2">{brand.name}</h3>
                                    <span className="text-[9px] font-bold text-pe-gray-400 uppercase tracking-widest">Aliado Oficial</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 bg-pe-black relative overflow-hidden">
                <div className="absolute inset-0 bg-pe-yellow/5" />
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-4xl font-black text-white mb-8">¿Necesitas cobrar un giro?</h2>
                    <p className="text-white/60 text-lg mb-12 font-medium">
                        Escríbenos para verificar si tu código está disponible para cobro en nuestras agencias de Loja.
                    </p>
                    <Link href="https://wa.me/593990227203" className="inline-flex items-center gap-3 px-12 py-6 bg-pe-yellow text-pe-black font-black rounded-[2rem] hover:scale-105 transition-all uppercase tracking-[0.2em] text-xs shadow-2xl">
                        <MessageCircle className="w-5 h-5" /> Verificar Giro por WhatsApp
                    </Link>
                </div>
            </section>
        </main>
    );
}
