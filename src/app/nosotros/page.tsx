"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
    ArrowRight,
    Award,
    Users,
    ShieldCheck,
    Zap,
    TrendingUp,
    History,
    Globe,
    Building2,
    Calendar,
    Clock,
    MapPin,
    Heart,
    CheckCircle2
} from "lucide-react";

// --- Animation Variants ---
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

const timelineEvents = [
    {
        year: "2007",
        title: "El Inicio",
        description: "Inicio de operaciones con nuestra primera matriz simplificando trámites financieros en el país.",
        icon: Building2
    },
    {
        year: "2015",
        title: "Expansión Estratégica",
        description: "Alianza estratégica con Red Activa Western Union, convirtiéndonos en líderes en remesas internacionales.",
        icon: Globe
    },
    {
        year: "2020",
        title: "Diversificación Digital",
        description: "Apertura de la sucursal La Castellana y expansión a servicios digitales y corresponsalía bancaria.",
        icon: Zap
    },
    {
        year: "Hoy",
        title: "Liderazgo y Respaldo",
        description: "Líderes en trámites especializados (Equifax, Security Data, Ecuabet) con el respaldo de las mejores marcas.",
        icon: Award
    }
];

// Alliances from Header for consistency
const alliancesBase = [
    { name: "Ecuabet", logo: "/images/header logo/ecuabet.webp" },
    { name: "Recargas", logo: "/images/header logo/recargas.webp" },
    { name: "Security Data", logo: "/images/header logo/security-data.webp" },
    { name: "Equifax", logo: "/images/header logo/equifax.webp" },
    { name: "SUPA", logo: "/images/header logo/supa.webp" },
    { name: "Western Union", logo: "/images/header logo/western-union.webp" },
    { name: "Servicios Básicos", logo: "/images/header logo/planillas.webp" },
    { name: "Bancos", logo: "/images/header logo/bancos.webp" },
];

// Create a triplicated list for a smoother infinite effect
const infiniteAlliances = [...alliancesBase, ...alliancesBase, ...alliancesBase];

const differentiators = [
    {
        title: "Atención Humana",
        description: "No eres un número, te asesoramos personalmente en cada uno de tus trámites y necesidades.",
        icon: Users,
    },
    {
        title: "Seguridad Garantizada",
        description: "Contamos con sistemas de monitoreo, cámaras y total respaldo legal en cada transacción.",
        icon: ShieldCheck,
    },
    {
        title: "Ubicación Premium",
        description: "Estamos ubicados en puntos estratégicos de la ciudad para tu máxima comodidad y facilidad.",
        icon: MapPin,
    },
    {
        title: "Horarios Flexibles",
        description: "Entendemos tu ritmo de vida. Ofrecemos horarios extendidos que se adaptan a tus pagos diarios.",
        icon: Clock,
    },
];

export default function NosotrosPage() {
    return (
        <main className="bg-white overflow-x-hidden">
            {/* ═══ SECCIÓN 1: Hero de Identidad (Propósito) ═══ */}
            <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-pe-black text-white">
                {/* Background Image from Home with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/pagoexpress_hero_main_background_1772635866721.png"
                        alt="PagoExpress Ecuador - Trayectoria"
                        fill
                        className="object-cover opacity-50 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-pe-black/90 via-pe-black/40 to-pe-black" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <div>
                        {/* H1 */}
                        <h1
                            className="text-3xl sm:text-5xl md:text-6xl lg:text-[5rem] font-black mb-6 leading-[1.2] lg:leading-[1.1] px-2"
                        >
                            19 años uniendo a <span className="text-pe-yellow">Ecuador</span> con el mundo
                        </h1>

                        {/* Subtitle */}
                        <p
                            className="text-base sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 lg:mb-12 leading-relaxed font-medium px-4"
                        >
                            Más que un punto de pago, somos tu aliado estratégico en cada trámite, remesa y decisión financiera. Evolucionamos para que tú llegues más lejos.
                        </p>

                        {/* CTA */}
                        <div className="px-4">
                            <Link
                                href="/#contacto"
                                className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 lg:px-10 py-4 lg:py-4.5 bg-pe-yellow text-pe-black font-black text-[10px] lg:text-xs uppercase tracking-widest rounded-full hover:bg-pe-yellow-light hover:shadow-[0_0_30px_rgba(247,239,77,0.3)] hover:-translate-y-1 transition-all duration-300"
                            >
                                Conoce nuestras Sucursales
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative Bottom */}
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent" />
            </section>

            {/* ═══ SECCIÓN 2: Nuestra Historia (Trayectoria) ═══ */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
                        <div className="flex flex-col text-center lg:text-left">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-pe-black mb-6">
                                Nuestra Trayectoria
                            </h2>
                            <p className="text-base lg:text-lg text-pe-gray-500 mb-10 lg:mb-8 leading-relaxed px-2 lg:px-0">
                                Desde 2007, hemos crecido junto a nuestros clientes, evolucionando de un local de recaudación al multiservicios más completo del país. Nuestra historia es de compromiso, innovación y cercanía con cada ciudadano.
                            </p>

                            <div className="space-y-10 border-l-2 border-pe-yellow pl-8 py-4">
                                {timelineEvents.map((event) => (
                                    <div key={event.year} className="relative">
                                        <div className="absolute -left-[41px] top-0 w-[18px] h-[18px] rounded-full bg-pe-yellow border-4 border-white shadow-sm" />
                                        <span className="text-pe-yellow font-black text-xl mb-1 block">{event.year}</span>
                                        <h4 className="text-lg font-black text-pe-black mb-2">{event.title}</h4>
                                        <p className="text-pe-gray-500 text-sm leading-relaxed">{event.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-pe-yellow bg-pe-gray-50 max-w-md mx-auto lg:ml-auto lg:mr-0 z-20"
                        >
                            <Image
                                src="/images/home/about-customer-experience.webp"
                                alt="Experiencia PagoExpress"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 400px"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 3: Misión, Visión y Valores (DNA) ═══ */}
            <section className="py-24 bg-pe-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Bento Item: Misión */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="lg:col-span-2 p-10 rounded-[2.5rem] bg-pe-black text-white relative overflow-hidden group shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-pe-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-pe-yellow/20 transition-all duration-700" />
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-8">
                                    <TrendingUp className="w-4 h-4 text-pe-yellow" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-pe-yellow">Nuestra Misión</span>
                                </div>
                                <h3 className="text-3xl sm:text-4xl font-black mb-6 leading-tight">Soluciones financieras ágiles y seguras</h3>
                                <p className="text-lg text-white/70 leading-relaxed">
                                    Brindar soluciones financieras y digitales ágiles, seguras y cercanas, facilitando la vida de los ciudadanos a través de tecnología y calidez humana.
                                </p>
                            </div>
                        </motion.div>

                        {/* Bento Item: Visión */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-10 rounded-[2.5rem] bg-white border border-pe-gray-200 text-pe-black relative overflow-hidden group shadow-sm"
                        >
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-pe-yellow/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pe-black/5 border border-pe-black/5 mb-8">
                                    <Globe className="w-4 h-4 text-pe-black" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Nuestra Visión</span>
                                </div>
                                <h3 className="text-2xl font-black mb-6 leading-tight">El ecosistema más confiable del sur</h3>
                                <p className="text-pe-gray-500 leading-relaxed">
                                    Ser el ecosistema de servicios más confiable de la región sur del Ecuador, reconocidos por nuestra integridad y excelencia operativa.
                                </p>
                            </div>
                        </motion.div>

                        {/* Bento Item: Valores */}
                        <div
                            className="lg:col-span-3 p-8 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] bg-white border border-pe-gray-200 text-pe-black shadow-sm"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                                {[
                                    { name: "Confianza", desc: "Seguridad en cada transacción." },
                                    { name: "Agilidad", desc: "Procesos rápidos y sin esperas." },
                                    { name: "Transparencia", desc: "Comunicación clara y honesta." },
                                    { name: "Compromiso Nacional", desc: "Orgullosamente 100% ecuatorianos." }
                                ].map((val) => (
                                    <div key={val.name} className="text-center sm:text-left">
                                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-3 lg:mb-4">
                                            <div className="w-2 h-2 rounded-full bg-pe-yellow" />
                                            <h4 className="text-lg font-black">{val.name}</h4>
                                        </div>
                                        <p className="text-sm lg:text-base text-pe-gray-500">{val.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 4: El Poder de nuestras Alianzas ═══ */}
            <section className="py-24 bg-white border-y border-pe-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-pe-black mb-4">El Poder de nuestras Alianzas</h2>
                        <p className="text-pe-gray-500 max-w-2xl mx-auto">
                            Contamos con el respaldo de las instituciones más grandes del país y el mundo.
                        </p>
                    </div>

                    <div className="relative flex overflow-hidden group">
                        <div className="flex gap-12 lg:gap-24 items-center animate-infinite-scroll py-8">
                            {infiniteAlliances.map((alliance, idx) => (
                                <div
                                    key={`${alliance.name}-${idx}`}
                                    className="flex-shrink-0 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                                >
                                    <Image
                                        src={alliance.logo}
                                        alt={alliance.name}
                                        width={160}
                                        height={80}
                                        className="h-10 lg:h-12 w-auto object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-20 text-center">
                        <div className="inline-flex items-center gap-4 bg-pe-gray-50 px-8 py-4 rounded-2xl border border-pe-gray-100">
                            <ShieldCheck className="w-6 h-6 text-pe-yellow" />
                            <p className="text-sm font-medium text-pe-black">
                                <span className="font-black">Agente Autorizado:</span> Operamos bajo los estándares internacionales de seguridad.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 5: ¿Por qué elegir PagoExpress? ═══ */}
            <section className="py-24 bg-pe-black text-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">¿Por qué elegir PagoExpress?</h2>
                        <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
                            Más que servicios, entregamos tranquilidad y tiempo a los ciudadanos.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {differentiators.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-pe-yellow/30 transition-all group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-pe-yellow/10 flex items-center justify-center mb-6 group-hover:bg-pe-yellow group-hover:text-pe-black transition-all">
                                        <Icon className="w-6 h-6 text-pe-yellow group-hover:text-pe-black" />
                                    </div>
                                    <h4 className="text-xl font-black mb-4">{item.title}</h4>
                                    <p className="text-white/50 text-base leading-relaxed">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══ SECCIÓN 6: Compromiso con Loja ═══ */}
            <section className="py-32 bg-pe-yellow text-pe-black">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <Heart className="w-16 h-16 mx-auto mb-8 text-pe-black" />
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8">Compromiso con Nuestra Gente</h2>
                        <p className="text-xl sm:text-2xl font-medium leading-relaxed mb-10">
                            "Somos una empresa <span className="font-black">100% ecuatoriana</span>. Creemos en nuestra gente y en el desarrollo económico del país. Cada transacción que realizas con nosotros apoya al crecimiento de nuestra comunidad."
                        </p>
                        <div className="w-20 h-1 bg-pe-black mx-auto mb-10" />
                        <p className="text-sm font-black uppercase tracking-[0.3em]">PagoExpress Ecuador · Fundada en 2007</p>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
