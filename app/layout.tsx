import './globals.css';

// 根级别layout - 必须包含html和body标签
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        {/* Google Search Console 验证 - HTML标记方法 */}
        <meta name="google-site-verification" content="1cZ9WUBHeRB2lMoPes66cXWCTkycozosPw4_PnNMoGk" />
        
        {/* Google AdSense */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5773162579508714"
          crossOrigin="anonymous"
        />
        
        {/* Google Analytics 4 - 待添加测量ID后启用 */}
        {/* 
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_GA_ID"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YOUR_GA_ID');
            `,
          }}
        />
        */}
        
        {/* Microsoft Clarity */}
        <script
          type="text/javascript"
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
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
