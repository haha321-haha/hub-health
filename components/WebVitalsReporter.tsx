'use client';

import { useReportWebVitals } from 'next/web-vitals';

export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    // 发送到Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.value),
        event_label: metric.id,
        non_interaction: true,
      });
    }
    
    // 发送到自定义分析服务
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/analytics/web-vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric),
      }).catch(console.error);
    }
    
    // 开发环境下打印到控制台
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Web Vital:', metric);
    }
  });

  return null;
}