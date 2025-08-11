const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚀 Core Web Vitals 优化配置
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'], // 现代图片格式，压缩率更高
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750, 828],
    minimumCacheTTL: 31536000, // 1年缓存，提升性能
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'periodhub.health',
        port: '',
        pathname: '/**',
      },
    ]
  },

  // 性能优化
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true, // 启用 gzip 压缩
  
  // 实验性功能 - 提升性能
  experimental: {
    optimizeCss: true, // CSS 优化
    optimizePackageImports: ['lucide-react', 'date-fns'], // 包导入优化
    serverComponentsExternalPackages: ['sharp'], // 优化图片处理
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // 构建优化
  swcMinify: true, // 使用 SWC 压缩，比 Terser 更快
  
  // 构建配置
  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    ignoreDuringBuilds: false,
  },

  // 环境变量
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://periodhub.health',
  },

  // 头部优化 - 提升安全性和性能
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // 安全头部
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          // 性能头部
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Link',
            value: '<https://fonts.googleapis.com>; rel=preconnect; crossorigin=anonymous',
          },
          {
            key: 'Link',
            value: '<https://fonts.gstatic.com>; rel=preconnect; crossorigin=anonymous',
          },
        ],
      },
      // 静态资源缓存优化
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Link',
            value: '</images/:path*>; rel=preload; as=image; crossorigin=anonymous',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // 字体缓存优化
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Link',
            value: '</fonts/:path*>; rel=preload; as=font; crossorigin=anonymous',
          },
        ],
      },
    ];
  },

  // 重定向优化
  async redirects() {
    return [
      // 根路径重定向到中文版本
      {
        source: '/',
        destination: '/zh',
        permanent: false,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
