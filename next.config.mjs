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
};

export default nextConfig;