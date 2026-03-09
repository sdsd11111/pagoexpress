"use client";

import { motion, Variants } from "framer-motion";
import { MapPin, RefreshCcw } from "lucide-react";

interface Location {
    name: string;
    address: string;
    city: string;
    phone: string;
    hours: string;
    mapsUrl: string;
}

const locations: Location[] = [
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

const sweepRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function MapSection() {
    return (
        <section className="py-24 bg-white overflow-hidden border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Maps Side */}
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sweepRight}
                        className="order-2 lg:order-1 relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-slate-50 h-[400px] lg:h-[600px]"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.103773883154!2d-79.1999948!3d-3.999083700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cb397d349953f7%3A0xdea692caf196a0e7!2sPago%20Express%20Servicios%20Financieros!5e0!3m2!1ses-419!2sec!4v1772581023091!5m2!1ses-419!2sec"
                            className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                        />
                    </motion.div>

                    {/* Info Side */}
                    <div className="order-1 lg:order-2 space-y-8">
                        <div>
                            <h3 className="text-slate-400 font-black text-xs uppercase tracking-[0.3em] mb-4">Puntos de Atención Físicos</h3>
                            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-tight">
                                VISÍTANOS EN <br /> <span className="text-slate-300">NUESTRAS AGENCIAS</span>
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {locations.map((loc, idx) => (
                                <motion.div
                                    key={idx} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }}
                                    className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group"
                                >
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-pe-yellow flex items-center justify-center shrink-0">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-xl text-slate-900 mb-1 uppercase tracking-tight">{loc.name}</h4>
                                            <p className="text-slate-500 font-medium mb-4 text-sm">{loc.address}</p>
                                            <div className="flex flex-wrap gap-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                                <span className="flex items-center gap-1.5"><RefreshCcw size={12} className="text-pe-yellow" /> {loc.hours}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <a
                            href="https://maps.app.goo.gl/zeNg6ZCSPHosJvZw6" target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-black hover:scale-[1.02] transition-all w-full justify-center group uppercase tracking-widest text-sm"
                        >
                            <MapPin size={20} className="text-pe-yellow group-hover:animate-bounce" />
                            Abrir en Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
