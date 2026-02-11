/** @type {import('next').NextConfig} */
const nextConfig = {
  // Увеличиваем лимит размера для Server Actions
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
      },
      {
        protocol: 'https',
        hostname: 'www.brabus.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'pic.rutube.ru',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'dybmmygpbyaawmiweidu.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
