"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, Variants, AnimatePresence } from "framer-motion";
import { Play, Clock, ShieldCheck, MapPin, X } from "lucide-react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

export default function VideoSpotlight() {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isModalOpen]);

    const features = [
        {
            icon: Clock,
            text: "Atención en menos de 1 minuto",
        },
        {
            icon: ShieldCheck,
            text: "Seguridad garantizada por 15 años",
        },
        {
            icon: MapPin,
            text: "En el corazón de Loja: Miguel Riofrío 160-62 y Olmedo",
        },
    ];

    return (
        <section
            ref={sectionRef}
            id="experiencia"
            className="py-24 bg-white overflow-hidden relative"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* ─── Left: Persuasive Text ─── */}
                    <motion.div
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={staggerContainer}
                        className="order-2 lg:order-2 lg:col-span-5"
                    >
                        {/* Badge */}
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pe-black/5 border border-pe-black/10 mb-6">
                            <span className="text-xs font-bold text-pe-black uppercase tracking-widest">
                                Experiencia PagoExpress
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-pe-black leading-[1.15] mb-6">
                            La mejor experiencia multiservicio de <span className="text-pe-yellow">Ecuador</span>
                        </motion.h2>

                        {/* Description */}
                        <motion.p variants={fadeUp} className="text-lg text-pe-gray-500 leading-relaxed mb-10">
                            Observa cómo miles de lojanos simplifican su día. Desde recibir un giro internacional por Western Union hasta pagar su planilla de EERSSA en cuestión de segundos, sin filas largas ni trámites burocráticos.
                        </motion.p>

                        {/* Quick Features List */}
                        <motion.ul variants={staggerContainer} className="space-y-5">
                            {features.map((feature, idx) => {
                                const Icon = feature.icon;
                                return (
                                    <motion.li key={idx} variants={fadeUp} className="flex items-center gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pe-gray-50 border border-pe-gray-100 flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-pe-yellow-dark" />
                                        </div>
                                        <span className="text-base font-semibold text-pe-gray-700">
                                            {feature.text}
                                        </span>
                                    </motion.li>
                                );
                            })}
                        </motion.ul>
                    </motion.div>

                    {/* ─── Right: Video Container ─── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="order-1 lg:order-1 lg:col-span-7 relative group"
                    >
                        {/* Decorative back glow */}
                        <div className="absolute -inset-4 bg-pe-yellow/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative rounded-3xl bg-pe-dark aspect-square sm:aspect-video lg:aspect-square xl:aspect-video shadow-2xl overflow-hidden border-4 border-white transform transition-transform duration-500 group-hover:scale-[1.02]">

                            {/* Background Preview Video (Silenced/Loop) */}
                            <video
                                className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
                                autoPlay
                                muted
                                loop
                                playsInline
                                poster="/images/home/video-poster.webp"
                            >
                                <source src="/images/video/video.mp4" type="video/mp4" />
                            </video>

                            {/* Dark Gradient Overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-pe-black/80 via-pe-black/20 to-transparent pointer-events-none" />

                            {/* Play Button - Center */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-pe-yellow/90 backdrop-blur text-pe-black flex items-center justify-center 
                                shadow-xl shadow-pe-yellow/30 hover:bg-pe-yellow hover:scale-110 transition-all duration-300 z-20 group/btn"
                                aria-label="Reproducir video de la experiencia PagoExpress"
                            >
                                {/* Pulsing rings behind button */}
                                <div className="absolute inset-0 rounded-full border-2 border-pe-yellow animate-ping opacity-75 duration-[2000ms]" />
                                <div className="absolute inset-0 rounded-full border border-pe-yellow animate-ping opacity-50 duration-[2500ms] delay-300" />

                                <Play className="w-8 h-8 ml-1 fill-pe-black group-hover/btn:scale-110 transition-transform" />
                            </button>

                            {/* Glassmorphism Overlays (Floating messages) */}
                            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 z-10">
                                {/* Tag 1 */}
                                <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg animate-fade-in-up">
                                    <p className="text-xs sm:text-sm font-bold opacity-90">🚀 Remesas en <span className="text-pe-yellow">20 segundos</span></p>
                                </div>

                                {/* Tag 2 */}
                                <div className="px-5 py-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-white shadow-lg animate-fade-in-up delay-200">
                                    <p className="text-xs sm:text-sm font-semibold opacity-90 mb-1">Toda la banca en un</p>
                                    <p className="text-sm sm:text-base font-black text-pe-yellow">solo lugar 🏛️</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ─── Video Modal (Full Screen) ─── */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-[95vw] md:max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-3xl border border-white/10 bg-pe-dark flex items-center justify-center p-2"
                        >
                            {/* Close Button - Responsive and Always Visible */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 z-[110] w-10 h-10 rounded-full bg-pe-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-pe-black transition-all hover:scale-110 shadow-lg"
                                aria-label="Cerrar video"
                            >
                                <X size={20} />
                            </button>

                            {/* Adaptive Video Player */}
                            <video
                                className="max-w-full max-h-[85vh] rounded-2xl shadow-inner shadow-white/5"
                                controls
                                autoPlay
                                playsInline
                            >
                                <source src="/images/video/video.mp4" type="video/mp4" />
                                Tu navegador no soporta el formato de video.
                            </video>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
