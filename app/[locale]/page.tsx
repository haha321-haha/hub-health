import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, locales } from '@/i18n';
import Hero from '@/components/layout/Hero';
import { getAllArticles } from '@/lib/articles';
import StructuredData from '@/components/StructuredData';

// Generate metadata for the page
export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'site' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

// Generate static params for all supported locales
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'homepage' });
  const commonT = await getTranslations({ locale, namespace: 'common' });

  // Get article count
  const allArticles = getAllArticles(locale);
  const articleCount = allArticles.length;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://periodhub.health';
  const articleUrl = `${baseUrl}/${locale}`;

  return (
    <div className="min-h-screen">
      {/* SEO结构化数据 */}
      <StructuredData
        type="website"
        data={{
          title: locale === 'zh' ? 'Period Hub - 专业的女性月经健康管理平台' : 'Period Hub - Professional Women\'s Menstrual Health Platform',
          description: locale === 'zh' 
            ? '专业的女性月经健康管理平台，提供科学的健康评估工具、专业的健康教育内容、个性化的健康建议和多语言支持。'
            : 'Professional women\'s menstrual health management platform providing scientific health assessment tools, professional health education content, personalized health advice and multilingual support.',
          url: articleUrl,
          locale: locale === 'zh' ? 'zh-CN' : 'en-US',
          keywords: [
            'period pain relief',
            'menstrual cramps',
            'natural remedies',
            'period management',
            'women\'s health',
            'dysmenorrhea treatment',
            '月经健康',
            '经期管理',
            '女性健康',
            '痛经'
          ]
        }}
      />
      
      <Hero articleCount={articleCount} />

      {/* Statistics Infographic Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('statistics.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('statistics.description')}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-4xl w-full">
              <Image
                src="/images/infographics/stats-infographic.svg"
                alt={t('statistics.altText')}
                width={800}
                height={400}
                className="w-full h-auto rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Articles */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {commonT('articles')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('features.articlesDesc')}
              </p>
              <Link 
                href={`/${locale}/articles`}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 inline-block"
              >
                {commonT('readMore')}
              </Link>
            </div>

            {/* Interactive Tools */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {commonT('interactiveTools')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('features.toolsDesc')}
              </p>
              <Link 
                href={`/${locale}/interactive-tools`}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 inline-block"
              >
                {t('features.experience')}
              </Link>
            </div>

            {/* Teen Health */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">👩‍🎓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {commonT('teenHealth')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('features.teenDesc')}
              </p>
              <Link 
                href={`/${locale}/teen-health`}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 inline-block"
              >
                {t('features.learnMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('quickAccess.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              href={`/${locale}/health-guide`}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group"
            >
              <div className="text-3xl mb-3">📖</div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600">
                {commonT('healthGuide')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('quickAccess.healthGuideDesc')}
              </p>
            </Link>

            <Link 
              href={`/${locale}/scenario-solutions`}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group"
            >
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600">
                {t('quickAccess.emergencyRelief')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('quickAccess.emergencyReliefDesc')}
              </p>
            </Link>

            <Link 
              href={`/${locale}/natural-therapies`}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group"
            >
              <div className="text-3xl mb-3">🌿</div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600">
                {commonT('naturalTherapies')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('quickAccess.naturalTherapiesDesc')}
              </p>
            </Link>

            <Link 
              href={`/${locale}/pain-tracker`}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group"
            >
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600">
                {t('quickAccess.painTracker')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('quickAccess.painTrackerDesc')}
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
