import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.pagoexpressec.com'
  
  const routes = [
    '',
    '/bancos',
    '/ecuabet',
    '/equifax',
    '/nosotros',
    '/politica-de-privacidad',
    '/recargas',
    '/remesas',
    '/security-data',
    '/servicios',
    '/servicios-basicos',
    '/supa',
    '/terminos-de-servicio',
    '/western-union',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
