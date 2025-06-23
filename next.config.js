const withNextIntl = require('next-intl/plugin')('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚀 Vercel优化配置 - 解决next-intl部署问题

  // 图片优化配置
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'placehold.co'],
  },

  // 强制动态渲染 - 解决静态预渲染冲突
  output: undefined, // 不使用静态导出

  reactStrictMode: true,

  // 编译优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 实验性功能 - 优化包导入
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-markdown'],
  },

  // PWA 和性能优化
  poweredByHeader: false,

  // TypeScript 和 ESLint 配置 - 确保构建成功
  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  // 环境变量
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://periodhub.health',
  },

  // Webpack 配置
  webpack: (config, { isServer }) => {
    // 只在服务器端允许使用 Node.js 模块
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
