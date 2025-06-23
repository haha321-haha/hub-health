const withNextIntl = require('next-intl/plugin')('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 基础配置
  images: {
    unoptimized: false,
    domains: ['periodhub.health'],
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
