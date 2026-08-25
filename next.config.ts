import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,
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
  },
  async redirects () {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.pilatesvillacrespo.com' }],
        destination: 'https://pilatesvillacrespo.com/:path*',
        permanent: true
      }
    ]
  },
  async headers () {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ]
      },
      {
        source: '/sitemap.xml',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }]
      }
    ]
  }
}

export default nextConfig
