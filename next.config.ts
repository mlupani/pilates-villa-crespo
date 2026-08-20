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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**'
      }
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
}

export default nextConfig
