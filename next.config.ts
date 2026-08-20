import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  turbopack: {
    root: process.cwd()
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [65, 70, 75],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
}

export default nextConfig
