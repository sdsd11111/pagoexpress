"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import {
    Send,
    ArrowRight,
    MessageCircle,
    Globe,
    Smartphone,
    CreditCard,
    Clock,
    ShieldCheck,
    MapPin,
    RefreshCcw,
    Zap,
    Scale,
    HelpCircle,
    CheckCircle2,
    ChevronDown,
    Calculator,
    Info
} from "lucide-react";
import Image from "next/image";

// Western Union Official Colors
const WU_YELLOW = "#FFDD00";
const WU_BLACK = "#000000";

const locations = [
    {
        name: "Agencia Matriz",
        address: "Miguel Riofrío y Olmedo (Esquina)",
        city: "Loja, Ecuador",
        phone: "07-2571234",
        hours: "Lun - Sáb: 08h00 - 19h00 | Dom: 09h00 - 14h00",
        mapsUrl: "https://maps.app.goo.gl/zeNg6ZCSPHosJvZw6"
    },
    {
        name: "Sucursal La Castellana",
        address: "Av. Salvador Bustamante Celi",
        city: "Loja, Ecuador",
        phone: "07-2581234",
        hours: "Lun - Vie: 08h30 - 18h30 | Sáb: 09h00 - 16h00",
        mapsUrl: "https://maps.app.goo.gl/zeNg6ZCSPHosJvZw6"
    }
];

const faqs = [
    {
        q: "¿Cuánto tiempo tengo para cobrar una transferencia?",
        a: "Las transferencias de Western Union suelen estar disponibles por hasta 90 días. Sin embargo, recomendamos cobrarlas lo antes posible para evitar inconvenientes con la fecha de expiración del código MTCN proporcionado por el remitente."
    },
    {
        q: "¿Puedo recibir dinero si mi cédula está caducada?",
        a: "No. Por normativas de seguridad bancaria y de Western Union, es estrictamente obligatorio presentar la Cédula de Identidad original y vigente. En caso de pérdida, puedes presentar el pasaporte original o la licencia de conducir ecuatoriana vigente como identificación alternativa."
    },
    {
        q: "¿Qué es el código MTCN?",
        a: "El MTCN (Money Transfer Control Number) es un número de control de transferencia de 10 dígitos único para cada transferencia. Es indispensable presentarlo en ventanilla junto con tu identificación para procesar el cobro."
    }
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const sweepRight: Variants = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-black/5 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <span className="text-lg font-black uppercase tracking-tight text-black group-hover:text-black/60 transition-colors">{question}</span>
                <ChevronDown className={`w - 5 h - 5 transition - transform duration - 300 ${isOpen ? "rotate-180" : ""} `} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 text-pe-gray-500 font-medium leading-relaxed">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function WesternUnionPage() {
    const [sendAmount, setSendAmount] = useState("100");
    const [destination, setDestination] = useState("internacional");
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    // Dynamic Calculation Logic
    const amount = Number(sendAmount) || 0;
    const isInternational = destination !== "nacional";

    // Estimación de comisión (Banda simple)
    const commission = amount > 0 ? Math.max(5, amount * (isInternational ? 0.05 : 0.02)) : 0;
    const isdTax = isInternational ? (amount * 0.05) : 0;
    const total = amount + commission + isdTax;

    return (
        <main className="min-h-screen bg-white text-black selection:bg-black selection:text-[#FFDD00] font-sans">



            {/* ═══ Section 1: Hero (Official WU Style) ═══ */}
            <section className="relative overflow-hidden min-h-[calc(100vh-80px)] lg:min-h-[70vh] flex items-center bg-[#FFDD00] pt-28 pb-16 lg:pt-20 lg:pb-0">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle, black 0.5px, transparent 0.5px)`, backgroundSize: "24px 24px" }} />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center">
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-black/10 mb-8 bg-black/5">
                            <div className="flex items-center gap-2 border-r border-black/20 pr-3">
                                <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/70">Agente Oficial</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image src="/images/header logo/western-union.webp" alt="Western Union" width={80} height={20} className="h-4 w-auto object-contain" />
                                <div className="w-px h-3 bg-black/20" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-black/50">Red Activa</span>
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.2] lg:leading-[1.05] tracking-tighter mb-8 uppercase text-black italic px-2">
                            Western Union Loja:<br />
                            <span className="opacity-70 text-3xl sm:text-5xl lg:text-5xl block mt-2">Envíos y Recepción de Dinero</span>
                        </h1>

                        <p className="text-base sm:text-xl text-black/60 max-w-2xl mx-auto mb-10 lg:mb-12 leading-relaxed font-medium px-4">
                            Más de 15 años siendo el punto oficial <span className="text-black font-black underline decoration-2 underline-offset-4">Red Activa Western Union</span> en Ecuador. <span className="hidden lg:inline">Seguridad, rapidez y soporte personalizado para tus remesas.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center px-4">
                            <Link
                                href="https://wa.me/593990227203"
                                target="_blank"
                                className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 bg-black text-[#FFDD00] font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20"
                            >
                                <Zap className="w-5 h-5 group-hover:scale-110 transition-transform fill-[#FFDD00]" />
                                Consultar Transferencia
                            </Link>
                            <Link
                                href="#sucursales"
                                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-black text-black font-black rounded-full hover:bg-black/5 transition-all uppercase tracking-widest text-sm"
                            >
                                Puntos de Atención en Ecuador
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ Section 2: Servicios Específicos (Bento Grid) ═══ */}
            <section className="py-24 bg-white border-b border-black/5 overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl sm:text-5xl font-black text-black uppercase italic tracking-tighter">
                            SERVICIOS <span className="opacity-30">ESPECIALIZADOS</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-12 gap-6">
                        {/* Tarjeta: Cobros (Grande) */}
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="md:col-span-12 lg:col-span-7 group relative p-10 rounded-[3rem] bg-pe-gray-50 border border-pe-gray-100 hover:border-[#FFDD00] transition-all overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFDD00]/5 rounded-full blur-[120px]" />
                            <div className="relative z-10">
                                <Globe className="w-12 h-12 text-black mb-8" />
                                <h3 className="text-3xl font-black text-black mb-6 uppercase tracking-tight leading-tight">Cobro de Transferencias <br /><span className="text-black/30">Internacionales</span></h3>
                                <p className="text-pe-gray-500 font-medium text-lg max-w-md leading-relaxed">
                                    Recibe remesas de EE.UU., España, Italia y cualquier parte del mundo directamente en efectivo en nuestras ventanillas a nivel nacional.
                                </p>
                            </div>
                        </motion.div>

                        {/* Tarjeta: Envíos */}
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="md:col-span-6 lg:col-span-5 group relative p-10 rounded-[3rem] bg-black text-white hover:shadow-2xl transition-all"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[#FFDD00] flex items-center justify-center mb-8">
                                <Send className="w-8 h-8 text-black" />
                            </div>
                            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Envío de Dinero Nacional e Internacional</h3>
                            <p className="text-white/60 font-medium leading-relaxed">
                                Envía fondos con las mejores tasas competitivas del mercado y acreditación inmediata.
                            </p>
                        </motion.div>

                        {/* Tarjeta: Red Activa */}
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="md:col-span-6 lg:col-span-12 group relative p-10 rounded-[3rem] bg-white border-2 border-pe-gray-100 transition-all flex flex-col md:flex-row items-center gap-10"
                        >
                            <div className="w-24 h-24 rounded-3xl bg-black flex items-center justify-center shrink-0">
                                <Smartphone className="w-12 h-12 text-[#FFDD00]" />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-black text-black mb-2 uppercase tracking-tight">Depósitos a Bancos y Billeteras</h3>
                                <p className="text-pe-gray-500 font-medium leading-relaxed max-w-2xl">
                                    Aprovecha nuestra infraestructura <span className="text-black font-black">Red Activa</span> para enviar dinero directamente a cuentas bancarias o billeteras digitales en todo el país.
                                </p>
                            </div>
                            <div className="px-6 py-3 rounded-full bg-pe-gray-50 border border-pe-gray-100 text-[10px] font-black uppercase tracking-widest text-black/40">Infraestructura Oficial</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══ Section 3: Proceso de Cobro (Animated Steps) ═══ */}
            <section className="py-24 bg-pe-gray-50 overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-5xl font-black text-black uppercase italic tracking-tighter">
                            TU DINERO EN <span className="text-black/30">3 PASOS</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Decorative Line */}
                        <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-black/10 z-0" />

                        {[
                            { step: "01", icon: CreditCard, title: "Identificación", desc: "Ten a la mano tu Cédula de Identidad original y vigente." },
                            { step: "02", icon: Zap, title: "Código MTCN", desc: "Presenta el código de 10 dígitos proporcionado por quien envía." },
                            { step: "03", icon: Banknote, title: "Retira Efectivo", desc: "¡Listo! Recibe tu dinero rápido, seguro y con comprobante oficial." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.8 },
                                    visible: { opacity: 1, scale: 1, transition: { delay: i * 0.2, duration: 0.5 } }
                                }}
                                className="relative z-10 flex flex-col items-center text-center group"
                            >
                                <div className="w-24 h-24 rounded-full bg-white border-8 border-pe-gray-100 flex items-center justify-center mb-8 shadow-xl group-hover:border-[#FFDD00]/20 transition-all">
                                    <item.icon className="w-10 h-10 text-black" />
                                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-black text-[#FFDD00] font-black flex items-center justify-center text-xs shadow-lg">{item.step}</div>
                                </div>
                                <h4 className="text-xl font-black text-black uppercase tracking-tight mb-3">{item.title}</h4>
                                <p className="text-pe-gray-500 font-medium leading-snug max-w-[200px]">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Section 4: Diferenciadores Locales ═══ */}
            <section className="py-24 bg-black text-white relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase italic tracking-tighter leading-tight">
                                ¿POR QUÉ <span style={{ color: WU_YELLOW }}>PAGOEXPRESS</span> <br />EN LUGAR DEL BANCO?
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { title: "Sin Filas Bancarias", desc: "Atención ágil pensada en tu tiempo, sin esperas innecesarias.", icon: Clock },
                                    { title: "Horarios Extendidos", desc: "Atendemos cuando otros cierran, incluyendo fines de semana.", icon: RefreshCcw },
                                    { title: "Ubicaciones Estratégicas", desc: "En puntos estratégicos de la ciudad, cerca de donde te encuentras.", icon: MapPin }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-5 p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-[#FFDD00] flex items-center justify-center shrink-0">
                                            <item.icon className="w-6 h-6 text-black" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black mb-1 uppercase tracking-tight">{item.title}</h4>
                                            <p className="text-white/40 font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 group">
                            <Image src="/images/header logo/western-union.webp" alt="Western Union Official Agent" fill className="object-contain p-20 grayscale group-hover:grayscale-0 transition-all duration-700 opacity-20" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            <div className="absolute bottom-12 left-12 right-12 text-center">
                                <div className="text-5xl font-black text-[#FFDD00] mb-2 uppercase italic tracking-tighter">19+ Años</div>
                                <div className="text-xs font-black uppercase tracking-[0.3em] text-white/50">Sirviendo a la comunidad ecuatoriana</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Section 5: Calculadora/Cotizador Interactiva ═══ */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                        className="bg-pe-gray-50 border border-pe-gray-100 rounded-[3rem] p-10 md:p-16 relative overflow-hidden"
                    >
                        <div className="relative z-10 text-center mb-12">
                            <h2 className="text-3xc font-black text-black mb-4 uppercase italic">COTIZADOR <span className="text-black/30">INTERACTIVO</span></h2>
                            <p className="text-pe-gray-500 font-medium leading-relaxed">Obtén un estimado de tu envío incluyendo comisiones e impuestos.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10 items-start relative z-10">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 px-4">Monto a Enviar ($)</label>
                                        <div className="relative">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-2xl">$</div>
                                            <input
                                                type="number"
                                                value={sendAmount}
                                                onChange={(e) => setSendAmount(e.target.value)}
                                                className="w-full bg-white border border-pe-gray-100 rounded-3xl py-6 pl-12 pr-6 text-2xl font-black focus:outline-none focus:border-[#FFDD00] transition-all"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 px-4">Destino de la Transferencia</label>
                                        <select
                                            value={destination}
                                            onChange={(e) => setDestination(e.target.value)}
                                            className="w-full bg-white border border-pe-gray-100 rounded-2xl py-4 px-6 font-bold text-sm focus:outline-none focus:border-[#FFDD00] appearance-none cursor-pointer"
                                        >
                                            <option value="nacional">Ecuador (Nacional)</option>
                                            <option value="internacional">Estados Unidos / América</option>
                                            <option value="europa">Europa / España</option>
                                            <option value="otros">Resto del Mundo</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="p-6 rounded-3xl bg-black text-white space-y-4 shadow-2xl">
                                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-white/50">
                                        <span>Desglose Estimado</span>
                                        <Info className="w-4 h-4" />
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/60">Comisión Base:</span>
                                            <span className="font-black">$ {commission.toFixed(2)} *</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/60">Impuesto ISD ({isInternational ? "5%" : "0%"}):</span>
                                            <span className="font-black">$ {isdTax.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-[#FFDD00]">Total Estimado</div>
                                            <div className="text-3xl font-black">$ {total.toFixed(2)}</div>
                                        </div>
                                        <div className="text-right text-[9px] font-medium text-white/30 max-w-[100px] leading-tight italic">
                                            * Tasas variables de Western Union
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white border border-pe-gray-100 p-8 rounded-[2rem] space-y-6 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#FFDD00]/10 flex items-center justify-center shrink-0">
                                            <Scale className="w-5 h-5 text-black" />
                                        </div>
                                        <h4 className="text-sm font-black uppercase tracking-tight">Transparencia ISD</h4>
                                    </div>
                                    <p className="text-xs text-pe-gray-500 leading-relaxed">
                                        En cumplimiento con el SRI, los envíos al exterior aplican el <span className="text-black font-black italic">5% de Impuesto a la Salida de Divisas</span>. En PagoExpress te garantizamos el <span className="text-black font-black">valor oficial</span> sin recargos ocultos.
                                    </p>
                                    <div className="pt-4 border-t border-pe-gray-100 flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#FFDD00]" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Acreditación Garantizada</span>
                                    </div>
                                </div>

                                <Link
                                    href={`https://wa.me/593990227203?text=Hola%20PagoExpress,%20necesito%20una%20cotización%20oficial%20para%20enviar%20$%20${amount}%20a%20${destination === "nacional" ? "Ecuador" : destination.toUpperCase()}.`}
                                    target="_blank"
                                    className="w-full py-6 bg-[#FFDD00] text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-black hover:text-[#FFDD00] transition-all shadow-xl group border-2 border-transparent hover:border-[#FFDD00]"
                                >
                                    <MessageCircle className="w-5 h-5 fill-current" />
                                    SOLICITAR TASA DEL DÍA
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <p className="text-[10px] text-center text-pe-gray-400 font-bold uppercase tracking-widest">Recibe el valor exacto en segundos</p>
                            </div>
                        </div>

                        {/* Decorative Calculator Icon */}
                        <Calculator className="absolute -bottom-10 -left-10 w-48 h-48 opacity-[0.03] -rotate-12" />
                    </motion.div>
                </div>
            </section>

            {/* ═══ Section 6: FAQ Específica de Remesas ═══ */}
            <section className="py-24 bg-pe-gray-50 overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <HelpCircle className="w-12 h-12 text-black mx-auto mb-6 opacity-20" />
                        <h2 className="text-3xl sm:text-5xl font-black text-black uppercase italic tracking-tighter">
                            PREGUNTAS <span className="text-black/30">FRECUENTES</span>
                        </h2>
                    </div>

                    <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-pe-gray-100 shadow-xl shadow-pe-gray-200/50">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} question={faq.q} answer={faq.a} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Section: Sucursales y Mapa (Standard) ═══ */}
            <section id="sucursales" className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 lg:mb-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Maps Side */}
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sweepRight}
                            className="order-2 lg:order-1 relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-pe-gray-100 h-[400px] lg:h-[600px]"
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
                                <h3 className="text-black font-black text-xs uppercase tracking-[0.3em] mb-4 bg-[#FFDD00]/20 inline-block px-3 py-1 rounded-md">Atención en Ecuador</h3>
                                <h2 className="text-4xl sm:text-5xl font-black text-black uppercase italic tracking-tighter leading-tight">
                                    PUNTO OFICIAL <br /> <span className="opacity-30">RED ACTIVA</span>
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {locations.map((loc, idx) => (
                                    <motion.div
                                        key={idx} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }}
                                        className="p-6 rounded-3xl bg-pe-gray-50 border border-pe-gray-100 hover:shadow-xl transition-all group"
                                    >
                                        <div className="flex gap-5">
                                            <div className="w-12 h-12 rounded-2xl bg-black text-[#FFDD00] flex items-center justify-center shrink-0">
                                                <MapPin size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-xl text-black mb-1 uppercase tracking-tight">{loc.name}</h4>
                                                <p className="text-pe-gray-500 font-medium mb-4 text-sm">{loc.address}</p>
                                                <div className="flex flex-wrap gap-4 text-[11px] font-bold uppercase tracking-wider text-black/40">
                                                    <span className="flex items-center gap-1.5"><RefreshCcw size={12} className="text-[#FFDD00]" /> {loc.hours}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <a
                                href="https://maps.app.goo.gl/zeNg6ZCSPHosJvZw6" target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-5 bg-black text-[#FFDD00] font-black rounded-2xl shadow-xl hover:bg-black-pure hover:scale-[1.02] transition-all w-full justify-center group uppercase tracking-widest text-sm"
                            >
                                <MapPin size={20} className="text-[#FFDD00] group-hover:animate-bounce" />
                                Obtener Ruta en Google Maps
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Footer Legal ═══ */}
            <section className="py-24 bg-black text-white relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <div className="flex flex-col items-center gap-10">
                        <div className="relative group w-32 h-32 rounded-3xl bg-black border border-white/10 flex flex-col items-center justify-center gap-2 shadow-2xl transition-transform hover:scale-105">
                            <ShieldCheck className="w-12 h-12 text-[#FFDD00]" />
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40">Autorizado</span>
                        </div>
                        <div className="max-w-2xl space-y-6">
                            <h3 className="text-white/20 font-black uppercase tracking-[0.5em] text-xs">Cumplimiento y Seguridad</h3>
                            <p className="text-white/40 text-sm leading-relaxed font-medium">
                                PagoExpress opera como agente oficial de la red <span className="text-white font-bold">Red Activa Western Union</span>. Todas las transacciones están sujetas a procesos de verificación de identidad internacional y cumplen con las normativas vigentes en Ecuador.
                            </p>
                            <p className="text-[#FFDD00]/30 text-[10px] font-black uppercase tracking-widest pt-4">
                                Servicio disponible en horario de oficina. Consulte disponibilidad de fondos para montos elevados.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

// Subcomponente de icono de billete que faltaba
const Banknote = (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect width="20" height="12" x="2" y="6" rx="2" />
        <circle cx="12" cy="12" r="2" />
        <path d="M6 12h.01M18 12h.01" />
    </svg>
)
