import Link from "next/link";
import Image from "next/image";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Instagram,
    Facebook,
    ArrowUpRight,
    Shield,
    Lock,
} from "lucide-react";

const serviceLinks = [
    { label: "Ecuabet", href: "/ecuabet" },
    { label: "Recargas Celulares", href: "/recargas" },
    { label: "Security Data", href: "/security-data" },
    { label: "Equifax", href: "/equifax" },
    { label: "SUPA", href: "/supa" },
    { label: "Western Union", href: "/western-union" },
    { label: "Servicios Básicos", href: "/servicios-basicos" },
    { label: "Bancos y Cooperativas", href: "/bancos" },
];

const partners = [
    "Western Union",
    "MoneyGram",
    "Banco Pichincha",
    "Banco del Pacífico",
    "Banco Bolivariano",
    "CoopMego",
    "Jardín Azuayo",
    "Servientrega",
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-pe-black text-white" role="contentinfo">
            {/* ═══ Partners Strip ═══ */}
            <div className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                    <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-pe-yellow mb-6">
                        Aliados que nos respaldan
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-6 lg:gap-x-8 gap-y-4 px-4">
                        {partners.map((p) => (
                            <span
                                key={p}
                                className="text-xs sm:text-sm text-pe-gray-400 hover:text-white transition-colors font-medium text-center"
                            >
                                {p}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══ Main Footer Grid ═══ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    {/* Col 1: Brand Info */}
                    <div className="lg:col-span-1 text-center lg:text-left">
                        <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                            <Image
                                src="/logo.jpg"
                                alt="PagoExpress Logo"
                                width={110}
                                height={36}
                                className="h-8 w-auto object-contain brightness-110"
                            />
                        </div>
                        <p className="text-sm text-pe-gray-400 leading-relaxed mb-5">
                            Con más de <span className="text-white font-semibold">15 años</span> de
                            experiencia en Loja, somos tu aliado financiero de confianza. Toda la banca
                            y remesas mundiales en un solo lugar.
                        </p>
                        <div className="flex items-center gap-3 justify-center lg:justify-start">
                            <a
                                href="https://www.instagram.com/pagoexpressloja/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center
                           hover:bg-pe-yellow hover:text-pe-black transition-all duration-200"
                                aria-label="Instagram de PagoExpress"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a
                                href="https://www.facebook.com/pagoexpressloja1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center
                           hover:bg-pe-yellow hover:text-pe-black transition-all duration-200"
                                aria-label="Facebook de PagoExpress"
                            >
                                <Facebook className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Col 2: Services */}
                    <div className="text-center lg:text-left">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-pe-yellow mb-5">
                            Servicios
                        </h3>
                        <ul className="space-y-3">
                            {serviceLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-pe-gray-400 hover:text-white hover:translate-x-1
                               inline-flex items-center gap-1 transition-all duration-200"
                                    >
                                        {link.label}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Locations */}
                    <div className="text-center lg:text-left">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-pe-yellow mb-5">
                            Ubicaciones
                        </h3>
                        {/* Matriz */}
                        <div className="mb-5">
                            <p className="text-sm font-semibold text-white mb-1.5 flex items-center gap-1.5 justify-center lg:justify-start">
                                <MapPin className="w-3.5 h-3.5 text-pe-yellow" />
                                Matriz
                            </p>
                            <p className="text-sm text-pe-gray-400">Miguel Riofrío 1203 y Olmedo</p>
                            <p className="text-sm text-pe-gray-400">Loja, Ecuador</p>
                        </div>
                        {/* Sucursal */}
                        <div className="mb-5">
                            <p className="text-sm font-semibold text-white mb-1.5 flex items-center gap-1.5 justify-center lg:justify-start">
                                <MapPin className="w-3.5 h-3.5 text-pe-yellow" />
                                Sucursal Castellana
                            </p>
                            <p className="text-sm text-pe-gray-400">Colón y Av. Manuel Agustín Aguirre</p>
                            <p className="text-sm text-pe-gray-400">Sector La Castellana, Loja</p>
                        </div>
                        {/* Hours */}
                        <div className="flex items-start gap-1.5 justify-center lg:justify-start">
                            <Clock className="w-3.5 h-3.5 text-pe-yellow mt-0.5" />
                            <div>
                                <p className="text-sm text-pe-gray-400">L-V: 8:00 - 18:00</p>
                                <p className="text-sm text-pe-gray-400">Sáb: 8:00 - 14:00</p>
                            </div>
                        </div>
                    </div>

                    {/* Col 4: Contact + Trust */}
                    <div className="text-center lg:text-left">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-pe-yellow mb-5">
                            Contacto
                        </h3>
                        <ul className="space-y-3 mb-6">
                            <li>
                                <a
                                    href="tel:+593000000000"
                                    className="flex items-center gap-2 text-sm text-pe-gray-400 hover:text-white transition-colors justify-center lg:justify-start"
                                >
                                    <Phone className="w-4 h-4 text-pe-yellow" />
                                    <span>(07) 000-0000</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:info@pagoexpressec.com"
                                    className="flex items-center gap-2 text-sm text-pe-gray-400 hover:text-white transition-colors justify-center lg:justify-start"
                                >
                                    <Mail className="w-4 h-4 text-pe-yellow" />
                                    <span>info@pagoexpressec.com</span>
                                </a>
                            </li>
                        </ul>

                        {/* Trust Badges */}
                        <div className="space-y-2.5">
                            <p className="text-xs font-bold uppercase tracking-wider text-pe-gray-500 mb-3">
                                Seguridad
                            </p>
                            <div className="flex items-center gap-2 text-xs text-pe-gray-400 justify-center lg:justify-start">
                                <Shield className="w-4 h-4 text-green-400" />
                                <span>Regulado por la Superintendencia</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-pe-gray-400 justify-center lg:justify-start">
                                <Lock className="w-4 h-4 text-green-400" />
                                <span>Transacciones 100% seguras — SSL</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ Bottom Bar ═══ */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-pe-gray-500 text-center sm:text-left">
                        Diseñado por <a href="https://cesarreyesjaramillo.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pe-yellow transition-colors font-bold">Cesar Reyes</a> | PagoExpress {currentYear}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-pe-gray-500">
                        <Link href="/politica-de-privacidad" className="hover:text-white transition-colors">
                            Política de Privacidad
                        </Link>
                        <Link href="/terminos-de-servicio" className="hover:text-white transition-colors">
                            Términos de Servicio
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
