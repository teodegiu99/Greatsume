/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  allowedDevOrigins: ['greatsume.com', 'www.greatsume.com'],
  // La chiave turbopack è di primo livello in Next.js 15+
  turbopack: {
    root: '.', 
  },
  images: {
    qualities: [100, 75],
  },
  async rewrites() {
    return [
      {
        // Quando il browser chiama /api/pdf-proxy ...
        source: '/api/pdf-proxy',
        // ... Next.js inoltra segretamente la richiesta al server Express interno
        destination: 'http://127.0.0.1:4000/generate-pdf',
      },
    ];
  },
};

export default nextConfig;