import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, TrendingUp, Info, BarChart3 } from 'lucide-react';

type Locale = 'en' | 'zh';

interface Props {
  params: { locale: Locale };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'interactiveTools' });
  
  return {
    title: `${locale === 'zh' ? '疼痛追踪工具' : 'Pain Tracker Tool'} - ${t('title')}`,
    description: locale === 'zh' 
      ? '智能疼痛追踪工具，记录和分析您的经期疼痛模式，提供数据驱动的健康洞察。'
      : 'Smart pain tracking tool to record and analyze your menstrual pain patterns, providing data-driven health insights.',
  };
}

export default async function PainTrackerPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  
  const t = await getTranslations('interactiveTools');

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" data-page="pain-tracker">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-neutral-600">
        <Link href={`/${locale}/interactive-tools`} className="hover:text-primary-600 transition-colors">
          {locale === 'zh' ? '互动工具' : 'Interactive Tools'}
        </Link>
        <span>/</span>
        <span className="text-neutral-800">
          {locale === 'zh' ? '疼痛追踪' : 'Pain Tracker'}
        </span>
      </nav>

      {/* Page Header */}
      <header className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-700 mb-4">
          {locale === 'zh' ? '智能疼痛追踪工具' : 'Smart Pain Tracker Tool'}
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          {locale === 'zh' 
            ? '记录和分析您的经期疼痛模式，通过数据洞察找到最适合的缓解方案。'
            : 'Record and analyze your menstrual pain patterns, find the most suitable relief solutions through data insights.'
          }
        </p>
      </header>

      {/* Coming Soon Notice */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-semibold text-neutral-800 mb-4">
            {locale === 'zh' ? '智能追踪系统开发中' : 'Smart Tracking System in Development'}
          </h2>
          <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
            {locale === 'zh'
              ? '我们正在开发一个先进的疼痛追踪系统，将提供实时记录、模式分析、趋势预测和个性化建议等功能。'
              : 'We are developing an advanced pain tracking system that will provide real-time recording, pattern analysis, trend prediction, and personalized recommendations.'
            }
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-800 mb-2">
                {locale === 'zh' ? '日历记录' : 'Calendar Recording'}
              </h3>
              <p className="text-sm text-neutral-600">
                {locale === 'zh' ? '直观的日历界面记录每日症状' : 'Intuitive calendar interface for daily symptom recording'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-800 mb-2">
                {locale === 'zh' ? '趋势分析' : 'Trend Analysis'}
              </h3>
              <p className="text-sm text-neutral-600">
                {locale === 'zh' ? '智能识别疼痛模式和周期规律' : 'Smart identification of pain patterns and cyclical patterns'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <BarChart3 className="w-8 h-8 text-purple-500 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-800 mb-2">
                {locale === 'zh' ? '数据可视化' : 'Data Visualization'}
              </h3>
              <p className="text-sm text-neutral-600">
                {locale === 'zh' ? '图表展示疼痛强度和频率变化' : 'Charts showing pain intensity and frequency changes'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Info className="w-8 h-8 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-800 mb-2">
                {locale === 'zh' ? '智能提醒' : 'Smart Reminders'}
              </h3>
              <p className="text-sm text-neutral-600">
                {locale === 'zh' ? '基于历史数据的预测性提醒' : 'Predictive reminders based on historical data'}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">
              {locale === 'zh' ? '即将推出的功能' : 'Upcoming Features'}
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-neutral-700">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  {locale === 'zh' ? '疼痛强度评分（1-10级）' : 'Pain intensity scoring (1-10 scale)'}
                </li>
                <li className="flex items-center text-sm text-neutral-700">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  {locale === 'zh' ? '症状类型分类记录' : 'Symptom type classification recording'}
                </li>
                <li className="flex items-center text-sm text-neutral-700">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  {locale === 'zh' ? '缓解方法效果追踪' : 'Relief method effectiveness tracking'}
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-neutral-700">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  {locale === 'zh' ? '月度/年度报告生成' : 'Monthly/annual report generation'}
                </li>
                <li className="flex items-center text-sm text-neutral-700">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  {locale === 'zh' ? '医生分享功能' : 'Doctor sharing functionality'}
                </li>
                <li className="flex items-center text-sm text-neutral-700">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  {locale === 'zh' ? '数据导出和备份' : 'Data export and backup'}
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/interactive-tools`}
              className="inline-flex items-center justify-center bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {locale === 'zh' ? '返回工具列表' : 'Back to Tools'}
            </Link>
            <Link
              href={`/${locale}/downloads`}
              className="inline-flex items-center justify-center border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              {locale === 'zh' ? '下载追踪表格' : 'Download Tracking Forms'}
            </Link>
          </div>
        </div>
      </section>

      {/* Temporary Alternative */}
      <section className="bg-neutral-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-neutral-800 mb-4">
          {locale === 'zh' ? '临时替代方案' : 'Temporary Alternatives'}
        </h3>
        <p className="text-neutral-600 mb-4">
          {locale === 'zh'
            ? '在智能追踪工具完成开发之前，您可以使用以下资源：'
            : 'While the smart tracking tool is being developed, you can use the following resources:'
          }
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href={`/${locale}/downloads`}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-neutral-800 mb-2">
              {locale === 'zh' ? 'PDF 追踪表格' : 'PDF Tracking Forms'}
            </h4>
            <p className="text-sm text-neutral-600">
              {locale === 'zh' ? '下载可打印的疼痛追踪表格' : 'Download printable pain tracking forms'}
            </p>
          </Link>
          
          <Link
            href={`/${locale}/scenario-solutions`}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-neutral-800 mb-2">
              {locale === 'zh' ? '场景化缓解方案' : 'Scenario-based Relief Solutions'}
            </h4>
            <p className="text-sm text-neutral-600">
              {locale === 'zh' ? '根据不同情况选择合适的缓解方法' : 'Choose appropriate relief methods for different situations'}
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}