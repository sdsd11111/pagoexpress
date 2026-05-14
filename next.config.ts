import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/recargas-ecuabet-desde-1usd',
        destination: '/ecuabet',
        permanent: true,
      },
      {
        source: '/informe-de-credito-360',
        destination: '/equifax',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/nosotros',
        permanent: true,
      },
      {
        source: '/facturero-movil',
        destination: '/',
        permanent: true,
      },
      {
        source: '/contacts',
        destination: '/',
        permanent: true,
      },
      {
        source: '/page',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
