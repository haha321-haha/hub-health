/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚀 GitHub Pages 静态导出配置
  output: 'export',
  
  // 禁用图片优化（静态导出要求）
  images: {
    unoptimized: true,
  },
  
  // 配置尾部斜杠
  trailingSlash: true,
  
  reactStrictMode: false,

  // 跳过构建时的静态优化错误
  typescript: {
    ignoreBuildErrors: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },

  // PWA 和性能优化
  poweredByHeader: false,
  
  // 注意：静态导出不支持 headers() 和 redirects()
  // 这些功能将通过 Cloudflare 配置实现
};

module.exports = nextConfig;
