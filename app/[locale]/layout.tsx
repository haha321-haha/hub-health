import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';

// 移除强制动态渲染配置，允许静态路由生成
// export const dynamic = 'force-dynamic';
// export const revalidate = 0;
// export const fetchCache = 'force-no-store';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { AppProvider } from '../../components/AppProvider';

import '../globals.css';

// 导入支持的语言列表
import { locales, Locale } from '@/i18n';

// Font configuration
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Generate metadata
export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    title: {
      template: '%s | Period Hub',
      default: locale === 'zh' ? 'Period Hub - 专业的女性月经健康管理平台' : 'Period Hub - Professional Women\'s Menstrual Health Platform',
    },
    description: locale === 'zh'
      ? '专业的女性月经健康管理平台，提供科学的健康评估工具、专业的健康教育内容、个性化的健康建议和多语言支持。'
      : 'Professional women\'s menstrual health management platform providing scientific health assessment tools, professional health education content, personalized health advice and multilingual support.',
    keywords: [
      'period pain relief',
      'menstrual cramps',
      'natural remedies',
      'period management',
      'women\'s health',
      'dysmenorrhea treatment',
      'periodhub.health',
      'menstrual health',
      'articles',
      'therapies',
      '月经健康',
      '经期管理',
      '女性健康',
      '痛经',
      '月经周期'
    ],
    authors: [{ name: 'Period Hub Team' }],
    creator: 'Period Hub',
    publisher: 'Period Hub',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://periodhub.health'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en-US': '/en',
        'zh-CN': '/zh',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      url: `/${locale}`,
      title: locale === 'zh' ? 'Period Hub - 专业的女性月经健康管理平台' : 'Period Hub - Professional Women\'s Menstrual Health Platform',
      description: locale === 'zh'
        ? '专业的女性月经健康管理平台，提供科学的健康评估工具、专业的健康教育内容、个性化的健康建议和多语言支持。'
        : 'Professional women\'s menstrual health management platform providing scientific health assessment tools, professional health education content, personalized health advice and multilingual support.',
      siteName: 'Period Hub',
    },
    twitter: {
      card: 'summary_large_image',
      title: locale === 'zh' ? 'Period Hub - 专业的女性月经健康管理平台' : 'Period Hub - Professional Women\'s Menstrual Health Platform',
      description: locale === 'zh'
        ? '专业的女性月经健康管理平台，提供科学的健康评估工具、专业的健康教育内容、个性化的健康建议和多语言支持。'
        : 'Professional women\'s menstrual health management platform providing scientific health assessment tools, professional health education content, personalized health advice and multilingual support.',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// 恢复静态参数生成，允许路由预渲染
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 验证请求的语言是否支持
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // 启用静态渲染
  unstable_setRequestLocale(locale as Locale);

  // 获取该语言的翻译消息
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={`scroll-smooth ${inter.variable}`} suppressHydrationWarning={true}>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Performance optimizations */}
        <link rel="dns-prefetch" href="https://v3.fal.media" />
        <link rel="preconnect" href="https://unpkg.com" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased bg-neutral-50 text-neutral-900 flex flex-col min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </AppProvider>
        </NextIntlClientProvider>

        {/* Medical Disclaimer - For compliance and user safety */}
        <div className="sr-only">
          {locale === 'zh'
            ? '本网站提供的月经健康信息仅供教育目的。内容不能替代专业医疗建议、诊断或治疗。如有任何疑问，请咨询您的医生或其他合格的健康提供者。'
            : 'This website provides information about menstrual health for educational purposes only. The content is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have.'
          }
        </div>
      </body>
    </html>
  );
}
