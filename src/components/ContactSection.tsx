"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from "lucide-react";

const locations = [
    {
        name: "Agencia Matriz",
        address: "Miguel Riofrío 160-62 y Olmedo",
        city: "Loja, Ecuador",
        phone: "07-2583120",
        hours: "L-V: 06:30 - 19:30 | Sáb: 08:00 - 16:00",
        mapsUrl: "https://maps.app.goo.gl/zeNg6ZCSPHosJvZw6"
    },
    {
        name: "Agencia Parque Bolívar",
        address: "Colón 6838 y Av. Manuel Agustín Aguirre",
        city: "Loja, Ecuador",
        phone: "07-2583120",
        hours: "L-V: 09:00 - 19:00 | Sáb: 09:00 - 14:00",
        mapsUrl: "https://maps.app.goo.gl/zeNg6ZCSPHosJvZw6"
    },
    {
        name: "Agencia Época",
        address: "Jamaica 390B-196 y Brasil",
        city: "Loja, Ecuador",
        phone: "07-2583120",
        hours: "L-V: 15:00 - 19:00 | Sáb: 09:00 - 13:00",
        mapsUrl: "https://maps.app.goo.gl/zeNg6ZCSPHosJvZw6"
    },
    {
        name: "WhatsApp Digital",
        address: "Atención Móvil y Nacional",
        city: "Todo el País",
        phone: "099 022 7203",
        hours: "L-V: 08:00 - 19:00 | Sáb: 08:00 - 16:00",
        mapsUrl: "https://wa.me/593990227203"
    }
];

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("submitting");
        // Simulate API call
        setTimeout(() => setFormStatus("success"), 1500);
    };

    return (
        <section
            ref={sectionRef}
            id="contacto"
            className="pt-24 bg-pe-gray-50 relative overflow-hidden"
        >
            {/* Background patterns */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-pe-yellow/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-pe-black/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-pe-black font-black text-sm uppercase tracking-widest bg-pe-black/5 px-4 py-1.5 rounded-full border border-pe-black/10">
                        Contacto Directo
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-black text-pe-black mt-6 mb-4 leading-tight">
                        ¿Cómo podemos <span className="text-pe-yellow-dark">ayudarte hoy?</span>
                    </h2>
                    <p className="text-pe-gray-500 max-w-2xl mx-auto text-lg">
                        Estamos listos para atender tus requerimientos financieros con la rapidez que nos caracteriza en Loja.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 items-stretch">

                    {/* Left Side: Branch Cards (Matches Form Height) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col gap-6"
                    >
                        {locations.map((loc, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.01, x: 5 }}
                                className={`flex-1 p-8 rounded-[2rem] shadow-xl border transition-all duration-300 flex flex-col justify-center group ${idx === 0
                                    ? "bg-pe-black border-pe-black text-white shadow-pe-black/20"
                                    : "bg-white border-pe-gray-100 text-pe-black"
                                    }`}
                            >
                                <div className="flex items-start gap-6">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${idx === 0
                                        ? "bg-white/10 text-pe-yellow shadow-inner"
                                        : "bg-pe-black/5 text-pe-black group-hover:bg-pe-black group-hover:text-white"
                                        }`}>
                                        <MapPin size={28} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className={`font-black text-2xl ${idx === 0 ? "text-white" : "text-pe-black"}`}>{loc.name}</h4>
                                            {idx === 0 && (
                                                <span className="bg-pe-yellow text-pe-black text-[10px] font-black px-2 py-0.5 rounded-md uppercase animate-pulse">
                                                    Principal
                                                </span>
                                            )}
                                        </div>
                                        <p className={`text-lg mb-6 ${idx === 0 ? "text-white/80" : "text-pe-gray-500"}`}>
                                            {loc.address} <br /> {loc.city}
                                        </p>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className={`p-4 rounded-xl flex items-center gap-3 ${idx === 0 ? "bg-white/5" : "bg-pe-gray-50"}`}>
                                                <Phone size={18} className={idx === 0 ? "text-pe-yellow" : "text-pe-yellow-dark"} />
                                                <span className="font-bold">{loc.phone}</span>
                                            </div>
                                            <div className={`p-4 rounded-xl flex items-center gap-3 ${idx === 0 ? "bg-white/5" : "bg-pe-gray-50"}`}>
                                                <Clock size={18} className={idx === 0 ? "text-pe-yellow/70" : "text-pe-gray-400"} />
                                                <span className="text-sm font-medium leading-tight">{loc.hours}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right Side: Contact Form (Standard Height) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="h-full"
                    >
                        <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-12 rounded-[2rem] shadow-2xl border border-white h-full relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-pe-yellow/10 rounded-bl-[4rem] -mr-8 -mt-8" />

                            <div className="relative z-10 mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2.5 rounded-lg bg-pe-yellow/20 text-pe-yellow-dark">
                                        <MessageSquare size={20} />
                                    </div>
                                    <h3 className="text-2xl font-black text-pe-black uppercase tracking-tight">Escríbenos</h3>
                                </div>
                                <p className="text-pe-gray-500 font-medium text-lg lg:max-w-md">
                                    ¿Tienes una consulta urgente o comercial? Nuestro equipo de atención te responderá en minutos.
                                </p>
                            </div>

                            {formStatus === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex-1 flex flex-col items-center justify-center text-center"
                                >
                                    <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6">
                                        <CheckCircle2 size={48} />
                                    </div>
                                    <h4 className="text-3xl font-black text-pe-black mb-2">¡Recibido!</h4>
                                    <p className="text-pe-gray-600 mb-8 text-lg">
                                        Un asesor se contactará contigo por WhatsApp en breve.
                                    </p>
                                    <button
                                        onClick={() => setFormStatus("idle")}
                                        className="text-pe-black font-black underline hover:text-pe-black-pure py-2"
                                    >
                                        Enviar otro mensaje
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-pe-black uppercase tracking-widest ml-1 opacity-70">Tu Nombre</label>
                                            <input required type="text" placeholder="Ej. Juan Pérez" className="w-full h-14 bg-pe-gray-50 border border-pe-gray-100 rounded-2xl px-5 focus:ring-4 focus:ring-pe-yellow/5 focus:border-pe-yellow transition-all outline-none font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-pe-black uppercase tracking-widest ml-1 opacity-70">Tu Celular</label>
                                            <input required type="tel" placeholder="099 999 9999" className="w-full h-14 bg-pe-gray-50 border border-pe-gray-100 rounded-2xl px-5 focus:ring-4 focus:ring-pe-yellow/5 focus:border-pe-yellow transition-all outline-none font-bold" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-pe-black uppercase tracking-widest ml-1 opacity-70">Servicio de Interés</label>
                                        <select className="w-full h-14 bg-pe-gray-50 border border-pe-gray-100 rounded-2xl px-5 focus:ring-4 focus:ring-pe-yellow/5 focus:border-pe-yellow outline-none font-bold cursor-pointer">
                                            <option>Giros y Remesas (Western Union)</option>
                                            <option>Recargas y Retiros Ecuabet</option>
                                            <option>Pensiones Alimenticias (SUPA)</option>
                                            <option>Consulta Equifax (Buró de Crédito)</option>
                                            <option>Firma Electrónica (Security Data)</option>
                                            <option>Pagos de Servicios (EERSSA, Agua, SRI)</option>
                                            <option>Depósitos y Retiros Bancarios</option>
                                            <option>Consultas Generales</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2 flex-1">
                                        <label className="text-xs font-black text-pe-black uppercase tracking-widest ml-1 opacity-70">Tu Mensaje</label>
                                        <textarea required placeholder="Cuéntanos cómo podemos ayudarte..." className="w-full h-full min-h-[120px] bg-pe-gray-50 border border-pe-gray-100 rounded-2xl p-5 focus:ring-4 focus:ring-pe-yellow/5 focus:border-pe-yellow outline-none font-bold resize-none"></textarea>
                                    </div>

                                    <button
                                        disabled={formStatus === "submitting"}
                                        className="w-full h-16 bg-pe-black hover:bg-pe-black-pure text-white font-black text-lg rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 group shadow-xl hover:shadow-pe-black/20"
                                    >
                                        {formStatus === "submitting" ? (
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <span>ENVIAR CONSULTA PROFESIONAL</span>
                                                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Full-Width Map Container at the bottom */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.6 }}
                className="relative w-full h-[500px] border-t-8 border-pe-black/10 group overflow-hidden"
            >
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.103773883154!2d-79.1999948!3d-3.999083700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cb397d349953f7%3A0xdea692caf196a0e7!2sPago%20Express%20Servicios%20Financieros!5e0!3m2!1ses-419!2sec!4v1772581023091!5m2!1ses-419!2sec"
                    className="w-full h-full border-0 grayscale active:grayscale-0 hover:grayscale-0 transition-all duration-1000"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
                    <a
                        href="https://maps.app.goo.gl/zeNg6ZCSPHosJvZw6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-pe-black text-white font-black rounded-2xl shadow-2xl hover:bg-pe-black-pure hover:scale-105 transition-all animate-bounce"
                    >
                        <MapPin size={22} className="text-pe-yellow" />
                        OBTENER DIRECCIÓN EXACTA EN GOOGLE MAPS
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
