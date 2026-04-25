/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    turbopack: {
      root: '.', // o il percorso specifico della cartella del progetto
    }, },
  // Sposta allowedDevOrigins fuori da experimental
  allowedDevOrigins: ['greatsume.com', 'www.greatsume.com'],
  
  images: {
    qualities: [100, 75],
  },
};

export default nextConfig;