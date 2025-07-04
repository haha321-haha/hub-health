import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { Locale, locales } from '@/i18n';
import SimplePDFCenter from '@/components/SimplePDFCenter';

// Generate metadata for the page
export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'downloadsPage' });

  return {
    title: locale === 'zh'
      ? `文章PDF下载中心 - Period Hub 经期健康专业资源`
      : `Articles PDF Download Center - Period Hub Professional Menstrual Health Resources`,
    description: locale === 'zh'
      ? `Period Hub文章PDF下载中心，49个精选经期健康资源，基于紧急程度智能分类，支持中英双语下载`
      : `Period Hub Articles PDF Download Center, 49 curated menstrual health resources, intelligently categorized by urgency, bilingual download support`,
    keywords: locale === 'zh'
      ? '经期健康,PDF下载,痛经缓解,文章资源,Period Hub'
      : 'menstrual health,PDF download,period pain relief,article resources,Period Hub',
  };
}

// Generate static params for all supported locales
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function DownloadsPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  setRequestLocale(locale);

  const bannerText = locale === 'zh'
    ? '🎉 全新PDF下载中心 - 49个精选资源，移动端优化体验，基于紧急程度智能分类'
    : '🎉 New PDF Download Center - 49 curated resources, mobile-optimized experience, urgency-based smart categorization';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      {/* 🎉 新版本标识横幅 */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 text-center text-sm font-medium">
        {bannerText}
      </div>

      <div className="container mx-auto px-4 py-8">


        {/* 页面标题区域 */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-lg">
            <Download className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {locale === 'zh' ? '📚 文章PDF下载中心' : '📚 Articles PDF Download Center'}
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            {locale === 'zh'
              ? '49个精选资源，基于紧急程度智能分类。从立即缓解到长期管理，为您的经期健康提供全方位支持。'
              : '49 curated resources, intelligently categorized by urgency. From immediate relief to long-term management, providing comprehensive support for your menstrual health.'
            }
          </p>
          
          {/* 快速统计 */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">36</div>
              <div className="text-sm text-gray-500">{locale === 'zh' ? '专业文章' : 'Expert Articles'}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">13</div>
              <div className="text-sm text-gray-500">{locale === 'zh' ? '实用PDF' : 'Practical PDFs'}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">2</div>
              <div className="text-sm text-gray-500">{locale === 'zh' ? '语言版本' : 'Languages'}</div>
            </div>
          </div>
        </header>

        {/* 🚀 简化版PDF中心组件 - 修复空白页面问题 */}
        <SimplePDFCenter locale={locale} />

        {/* 💡 用户反馈组件 */}
        <div className="fixed bottom-4 right-4 z-50 max-w-xs">
          <div className="bg-blue-600 text-white p-4 rounded-xl shadow-lg border border-blue-500">
            <div className="text-sm font-bold mb-2">
              {locale === 'zh' ? '💡 体验新版下载中心' : '💡 Try New Download Center'}
            </div>
            <div className="text-xs mb-3 opacity-90">
              {locale === 'zh'
                ? '移动端优化 • 智能搜索 • 紧急模式 • 49个精选资源'
                : 'Mobile Optimized • Smart Search • Emergency Mode • 49 Curated Resources'
              }
            </div>
            <button className="bg-white text-blue-600 px-3 py-2 rounded-lg text-xs w-full font-medium hover:bg-gray-50 transition-colors">
              {locale === 'zh' ? '反馈体验效果' : 'Share Feedback'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
