/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    // Aggiungi questo per permettere a Next.js di accettare connessioni dal tuo dominio
    allowedDevOrigins: ['greatsume.com', 'www.greatsume.com'],
  },
  images: {
    // Per risolvere il warning sulla qualità delle immagini
    qualities: [100, 75],
  },
};

export default nextConfig;