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
        {/* Google Search Console 验证 */}
        <meta name="google-site-verification" content="google11a490ed640e7fc6" />
        
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
