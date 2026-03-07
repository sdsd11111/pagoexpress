"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Star, Quote, MapPin } from "lucide-react";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    text: string;
    rating: number;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "María Fernanda L.",
        role: "Cliente de Remesas",
        text: "Cobrar mi giro de Western Union nunca fue tan rápido. La transparencia en el cambio me da mucha tranquilidad. Siempre elijo PagoExpress.",
        rating: 5,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    },
    {
        id: 2,
        name: "José Antonio C.",
        role: "Pagos de Servicios",
        text: "Pago mi luz y agua en un solo lugar, sin filas interminables. Realmente te devuelven tu tiempo. La atención es excelente.",
        rating: 5,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jose",
    },
    {
        id: 3,
        name: "Carmen Elena R.",
        role: "Corresponsal Bancaria",
        text: "Como corresponsal de varios bancos, me queda cerca de casa en La Castellana. Excelente atención y siempre dispuestos a ayudar.",
        rating: 5,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carmen",
    },
];

// Duplicate for infinite marquee effect
const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const widgetItem: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 200, damping: 15 }
    }
};

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-pe-gray-50 relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-pe-yellow/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-pe-black/10 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center mb-16">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                    <motion.div
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={staggerContainer}
                        className="text-center md:text-left max-w-xl"
                    >
                        <motion.h2
                            variants={fadeUp}
                            className="text-3xl sm:text-4xl md:text-5xl font-black text-pe-black mb-6 leading-tight"
                        >
                            Lo que dicen nuestros <br />
                            <span className="text-pe-yellow-dark">vecinos en Loja</span>
                        </motion.h2>
                        <motion.p
                            variants={fadeUp}
                            className="text-lg text-pe-gray-600"
                        >
                            Más de 15 años brindando seguridad y rapidez. La confianza de nuestra ciudad es nuestro mayor respaldo diario.
                        </motion.p>
                    </motion.div>

                    {/* Staggered Google Widget */}
                    <motion.div
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={staggerContainer}
                        className="bg-white p-8 rounded-3xl shadow-2xl border border-pe-gray-100 flex flex-col items-center gap-4 min-w-[240px]"
                    >
                        <motion.div variants={widgetItem}>
                            <img
                                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                                alt="Google"
                                className="h-8 object-contain"
                            />
                        </motion.div>

                        <motion.div variants={widgetItem} className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={22} className="fill-[#FBBC05] text-[#FBBC05]" />
                            ))}
                        </motion.div>

                        <motion.div variants={widgetItem} className="text-center">
                            <p className="text-pe-black font-black text-2xl mb-1">Excelente 5.0</p>
                            <p className="text-pe-gray-500 text-xs font-bold uppercase tracking-[0.2em]">
                                Opiniones en Directo
                            </p>
                        </motion.div>
                    </motion.div>

                </div>
            </div>

            {/* Marquee Container (Always in motion) */}
            <div className="relative w-full overflow-hidden py-10">
                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{ x: [0, -1920] }} // Adjust based on content width
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ width: "fit-content" }}
                >
                    {marqueeItems.map((testimonial, idx) => (
                        <div
                            key={`${testimonial.id}-${idx}`}
                            className="inline-block w-[350px] sm:w-[450px] whitespace-normal bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-pe-gray-100 relative group flex-shrink-0"
                        >
                            <div className="absolute top-6 right-8 opacity-10 text-pe-black">
                                <Quote size={40} />
                            </div>

                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={18} className="fill-pe-yellow text-pe-yellow" />
                                ))}
                            </div>

                            <p className="text-pe-gray-700 text-lg mb-8 italic font-medium leading-relaxed">
                                "{testimonial.text}"
                            </p>

                            <div className="flex items-center gap-4 border-t border-pe-gray-100 pt-6">
                                <div className="w-14 h-14 rounded-full overflow-hidden bg-pe-gray-50 border-2 border-pe-yellow/20">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-pe-black text-base">{testimonial.name}</h4>
                                    <div className="flex items-center gap-2 text-pe-black font-bold text-xs">
                                        <span className="w-1.5 h-1.5 rounded-full bg-pe-black" />
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Subtle masks for smooth edges */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-pe-gray-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-pe-gray-50 to-transparent z-10 pointer-events-none" />
            </div>

            <div className="mt-16 text-center px-4 relative z-10">
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={fadeUp}
                >
                    <a
                        href="https://www.google.com/search?sca_esv=a81f581b65e3d0a0&rlz=1C1CHBF_esEC1095EC1095&sxsrf=ANbL-n6KeeRpCRLus1jnzpA1k3T1N8tOHg:1772580006179&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOXSQ9ucMM3BxWaAw9chM6XZPWV3Y47hp5qjTZI7OgC8UmDqEqKLlOCcXlFUV9OZCBPBcyiUpGVtZCt75mgC8iZzMuBHk0VeKKNFnuTyHXCs5btylaVy6skCCJy4MPYCYwk4La6Y%3D&q=Pago+Express+Servicios+Financieros+Opiniones&sa=X&ved=2ahUKEwi7vuqM74STAxXuRjABHXA2DxIQ0bkNegQIJRAH&cshid=1772580010502921&biw=1344&bih=732&dpr=1.25"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-pe-black hover:bg-pe-black-pure text-white font-bold rounded-2xl transition-all hover:scale-105 shadow-2xl hover:shadow-pe-black/30"
                    >
                        <MapPin size={22} className="text-pe-yellow" />
                        Dejar una reseña en Google Maps
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
