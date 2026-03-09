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
                            Con más de <span className="text-white font-semibold">19 años</span> de
                            experiencia en Ecuador, somos tu aliado financiero de confianza. Toda la banca
                            y remesas mundiales en un solo lugar.
                        </p>
                        <div className="flex items-center gap-3 justify-center lg:justify-start">
                            <a
                                href="https://www.instagram.com/pagoexpressec/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center
                           hover:bg-pe-yellow hover:text-pe-black transition-all duration-200"
                                aria-label="Instagram de PagoExpress"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a
                                href="https://www.facebook.com/pagoexpressec"
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
                            Puntos de Atención
                        </h3>
                        {/* Matriz */}
                        <div className="mb-5">
                            <p className="text-sm font-semibold text-white mb-1.5 flex items-center gap-1.5 justify-center lg:justify-start">
                                <MapPin className="w-3.5 h-3.5 text-pe-yellow" />
                                Agencia Matriz
                            </p>
                            <p className="text-sm text-pe-gray-400">Miguel Riofrío 160-62 y Olmedo</p>
                            <p className="text-sm text-pe-gray-400">Ecuador</p>
                        </div>
                        {/* Sucursal Parque Bolívar */}
                        <div className="mb-5">
                            <p className="text-sm font-semibold text-white mb-1.5 flex items-center gap-1.5 justify-center lg:justify-start">
                                <MapPin className="w-3.5 h-3.5 text-pe-yellow" />
                                Agencia Parque Bolívar
                            </p>
                            <p className="text-sm text-pe-gray-400">Colón 6838 y Av. Manuel Agustín Aguirre</p>
                            <p className="text-sm text-pe-gray-400">Ecuador</p>
                        </div>
                        {/* Hours */}
                        <div className="flex items-start gap-1.5 justify-center lg:justify-start">
                            <Clock className="w-3.5 h-3.5 text-pe-yellow mt-0.5" />
                            <div className="text-sm text-pe-gray-400">
                                <p>L-V: 06:30 - 19:30</p>
                                <p>Sáb: 08:00 - 16:00</p>
                            </div>
                        </div>
                    </div>

                    {/* Col 4: Contact + Trust */}
                    <div className="text-center lg:text-left">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-pe-yellow mb-5">
                            Contacto Directo
                        </h3>
                        <ul className="space-y-3 mb-6">
                            <li>
                                <div className="flex items-center gap-2 text-sm text-pe-gray-400 justify-center lg:justify-start">
                                    <Phone className="w-4 h-4 text-pe-yellow" />
                                    <span>07 258 3120</span>
                                </div>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/593990227203"
                                    target="_blank"
                                    className="flex items-center gap-2 text-sm text-pe-gray-400 hover:text-white transition-colors justify-center lg:justify-start"
                                >
                                    <div className="w-4 h-4 text-pe-yellow flex items-center justify-center">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.049a11.823 11.823 0 001.592 5.918L0 24l6.135-1.61a11.825 11.825 0 005.91 1.586h.005c6.637 0 12.048-5.412 12.052-12.05a11.829 11.829 0 00-3.41-8.515z" /></svg>
                                    </div>
                                    <span>099 022 7203</span>
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
