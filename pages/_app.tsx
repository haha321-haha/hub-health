import type { AppProps } from 'next/app';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { webVitalsTracker } from '@/lib/analytics/web-vitals';

// 导入全局样式
import '@/app/globals.css';

// 导入Web Vitals报告类型
import type { NextWebVitalsMetric } from 'next/app';

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // 在客户端记录Web Vitals指标
  if (typeof window !== 'undefined') {
    webVitalsTracker.reportMetric(metric);
  }
  
  // 发送到分析服务（如Google Analytics）
  if (process.env.NODE_ENV === 'production') {
    // 这里可以集成Google Analytics 4或其他分析服务
    console.log('Web Vital:', metric);
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // 清理过期Web Vitals数据
    webVitalsTracker.cleanupOldData(30);
  }, []);

  return (
    <NextIntlClientProvider
      messages={pageProps.messages}
      locale={router.locale}
      timeZone="Asia/Shanghai"
    >
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}