const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 基础配置 - 优化图片质量
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'], // 支持现代格式
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // 支持更多设备尺寸
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750, 828], // 支持更多图片尺寸
    minimumCacheTTL: 60, // 缓存时间
    dangerouslyAllowSVG: true, // 允许SVG
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // SVG安全策略
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'periodhub.health',
        port: '',
        pathname: '/**',
      },
    ],
  },

  reactStrictMode: true,
  poweredByHeader: false,

  // 构建配置 - 确保部署成功
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
};

module.exports = withNextIntl(nextConfig);
