import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertCircle, Info } from 'lucide-react';

type Locale = 'en' | 'zh';

interface Props {
  params: { locale: Locale };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'interactiveTools' });
  
  return {
    title: `${locale === 'zh' ? '症状评估工具' : 'Symptom Assessment Tool'} - ${t('title')}`,
    description: locale === 'zh' 
      ? '专业的经期症状评估工具，帮助您了解症状严重程度并获得个性化建议。'
      : 'Professional menstrual symptom assessment tool to help you understand symptom severity and get personalized recommendations.',
  };
}

export default async function SymptomAssessmentPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  
  const t = await getTranslations('interactiveTools');

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" data-page="symptom-assessment">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-neutral-600">
        <Link href={`/${locale}/interactive-tools`} className="hover:text-primary-600 transition-colors">
          {locale === 'zh' ? '互动工具' : 'Interactive Tools'}
        </Link>
        <span>/</span>
        <span className="text-neutral-800">
          {locale === 'zh' ? '症状评估' : 'Symptom Assessment'}
        </span>
      </nav>

      {/* Page Header */}
      <header className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-700 mb-4">
          {locale === 'zh' ? '经期症状评估工具' : 'Menstrual Symptom Assessment Tool'}
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          {locale === 'zh' 
            ? '通过专业的症状评估，了解您的经期健康状况，获得个性化的缓解建议。'
            : 'Through professional symptom assessment, understand your menstrual health status and get personalized relief recommendations.'
          }
        </p>
      </header>

      {/* Coming Soon Notice */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Info className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-semibold text-neutral-800 mb-4">
            {locale === 'zh' ? '功能开发中' : 'Feature in Development'}
          </h2>
          <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
            {locale === 'zh'
              ? '我们正在开发一个全面的症状评估工具，将包括疼痛程度评估、症状模式分析、个性化建议生成等功能。敬请期待！'
              : 'We are developing a comprehensive symptom assessment tool that will include pain level evaluation, symptom pattern analysis, personalized recommendation generation, and more. Stay tuned!'
            }
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-800 mb-2">
                {locale === 'zh' ? '疼痛评估' : 'Pain Assessment'}
              </h3>
              <p className="text-sm text-neutral-600">
                {locale === 'zh' ? '多维度疼痛强度和类型评估' : 'Multi-dimensional pain intensity and type assessment'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-800 mb-2">
                {locale === 'zh' ? '症状追踪' : 'Symptom Tracking'}
              </h3>
              <p className="text-sm text-neutral-600">
                {locale === 'zh' ? '周期性症状模式识别和分析' : 'Cyclical symptom pattern recognition and analysis'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-800 mb-2">
                {locale === 'zh' ? '个性化建议' : 'Personalized Recommendations'}
              </h3>
              <p className="text-sm text-neutral-600">
                {locale === 'zh' ? '基于评估结果的定制化缓解方案' : 'Customized relief solutions based on assessment results'}
              </p>
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
              href={`/${locale}/immediate-relief`}
              className="inline-flex items-center justify-center border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              {locale === 'zh' ? '即时缓解方案' : 'Immediate Relief Solutions'}
            </Link>
          </div>
        </div>
      </section>

      {/* Alternative Resources */}
      <section className="bg-neutral-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-neutral-800 mb-4">
          {locale === 'zh' ? '现有资源推荐' : 'Available Resources'}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href={`/${locale}/scenario-solutions`}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-neutral-800 mb-2">
              {locale === 'zh' ? '场景化解决方案' : 'Scenario-based Solutions'}
            </h4>
            <p className="text-sm text-neutral-600">
              {locale === 'zh' ? '针对不同场景的专业缓解方案' : 'Professional relief solutions for different scenarios'}
            </p>
          </Link>
          
          <Link
            href={`/${locale}/natural-therapies`}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-neutral-800 mb-2">
              {locale === 'zh' ? '自然疗法指南' : 'Natural Therapy Guide'}
            </h4>
            <p className="text-sm text-neutral-600">
              {locale === 'zh' ? '天然安全的经期调理方法' : 'Natural and safe menstrual care methods'}
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}