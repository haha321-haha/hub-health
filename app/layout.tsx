import './globals.css';
import { Metadata } from 'next';

// 🚀 Core Web Vitals 优化的根布局
export const metadata: Metadata = {
  metadataBase: new URL('https://periodhub.health'),
  title: {
    default: 'PeriodHub - 专业女性健康管理平台',
    template: '%s | PeriodHub'
  },
  description: '专业的女性月经健康管理平台，提供中西医结合的痛经解决方案、健康追踪工具和个性化建议。',
  keywords: ['女性健康', '月经管理', '痛经缓解', '健康追踪', '中医调理'],
  authors: [{ name: 'PeriodHub Team' }],
  creator: 'PeriodHub',
  publisher: 'PeriodHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://periodhub.health',
    siteName: 'PeriodHub',
    title: 'PeriodHub - 专业女性健康管理平台',
    description: '专业的女性月经健康管理平台，提供中西医结合的痛经解决方案。',
  },
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'PeriodHub - 专业女性健康管理平台',
    description: '专业的女性月经健康管理平台，提供中西医结合的痛经解决方案。',
  },
  // 移动端优化
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  // 性能优化
  other: {
    'theme-color': '#9333ea',
    'color-scheme': 'light',
  },
};

// 根级别layout - 必须包含html和body标签
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 🚀 性能优化 - DNS 预解析 */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="//www.clarity.ms" />
        
        {/* 🚀 性能优化 - 预连接关键资源 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 📱 移动端优化 - 防止缩放闪烁 */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* 🔍 搜索引擎优化 */}
        <meta name="google-site-verification" content="1cZ9WUBHeRB2lMoPes66cXWCTkycozosPw4_PnNMoGk" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* 🎨 主题和图标 */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* 📊 Google Analytics 4 - 异步加载优化 */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_GA_ID"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-YOUR_GA_ID', {
                    page_title: document.title,
                    page_location: window.location.href,
                    anonymize_ip: true,
                    allow_google_signals: false,
                    allow_ad_personalization_signals: false
                  });
                `,
              }}
            />
          </>
        )}
        
        {/* 📊 Microsoft Clarity - 延迟加载 */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "ssdsoc827u");
              `,
            }}
          />
        )}
        
        {/* 💰 Google AdSense - 延迟加载 */}
        {process.env.NODE_ENV === 'production' && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5773162579508714"
            crossOrigin="anonymous"
          />
        )}
        
        {/* 🚀 性能优化 - 关键CSS内联 */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* 关键CSS - 防止布局偏移 */
            html { scroll-behavior: smooth; }
            body { 
              margin: 0; 
              font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
              line-height: 1.6;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              text-rendering: optimizeLegibility;
            }
            * { box-sizing: border-box; }
            img, video { max-width: 100%; height: auto; }
            /* 防止闪烁 */
            .loading { opacity: 0; }
            .loaded { opacity: 1; transition: opacity 0.3s ease; }
          `
        }} />
      </head>
      <body className="loading">
        {children}
        
        {/* 🚀 性能优化 - 页面加载完成后移除loading类 */}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('load', function() {
              document.body.classList.remove('loading');
              document.body.classList.add('loaded');
            });
            
            // 如果页面已经加载完成
            if (document.readyState === 'complete') {
              document.body.classList.remove('loading');
              document.body.classList.add('loaded');
            }
          `
        }} />
      </body>
    </html>
  );
}
