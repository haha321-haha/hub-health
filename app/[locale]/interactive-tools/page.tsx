import Link from 'next/link';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import BreathingExercise from '@/components/BreathingExercise';
import { BarChart3, Calendar, ClipboardCheck, Lightbulb, Search, User } from 'lucide-react'; // Icons for cards
import { Locale, locales } from '@/i18n/request';

// Generate metadata for the page
export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'interactiveToolsPage' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

// Generate static params for all supported locales
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function InteractiveToolsPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'interactiveToolsPage' });
  const commonT = await getTranslations({ locale, namespace: 'common' });
  
  const tools = [
    {
      title: t('symptomAssessment.title'),
      description: t('symptomAssessment.description'),
      href: `/${locale}/interactive-tools/symptom-assessment`,
      icon: <ClipboardCheck className="w-8 h-8 text-primary-600" />,
      cta: t('symptomAssessment.startButton'),
    },
    {
      title: t('periodPainAssessment.title'),
      description: t('periodPainAssessment.description'),
      href: `/${locale}/interactive-tools/period-pain-assessment`,
      icon: <Search className="w-8 h-8 text-pink-600" />,
      cta: t('periodPainAssessment.cta'),
    },
    {
      title: t('cycleTracker.title'),
      description: t('cycleTracker.description'),
      href: `/${locale}/interactive-tools/cycle-tracker`,
      icon: <Calendar className="w-8 h-8 text-purple-600" />,
      cta: t('cycleTracker.cta'),
    },
    {
      title: t('painTracker.title'),
      description: t('painTracker.description'),
      href: `/${locale}/interactive-tools/pain-tracker`,
      icon: <BarChart3 className="w-8 h-8 text-secondary-600" />,
      cta: t('painTracker.startButton'),
    },
    {
      title: t('constitutionTest.title'),
      description: t('constitutionTest.description'),
      href: `/${locale}/interactive-tools/constitution-test`,
      icon: <User className="w-8 h-8 text-green-600" />,
      cta: t('constitutionTest.cta'),
    },
    {
      title: t('personalizedInsights.title'),
      description: t('personalizedInsights.description'),
      href: "#", // No link yet
      icon: <Lightbulb className="w-8 h-8 text-accent-600" />,
      cta: commonT('comingSoon'),
    }
  ];

  return (
    <div className="space-y-8 sm:space-y-12 mobile-safe-area">
      {/* Page Header - 移动端优化 */}
      <header className="text-center px-4 sm:px-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-700 mb-3 sm:mb-4 leading-tight">
          {t('title')}
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
          {t('description')}
        </p>
      </header>

      {/* Tools Introduction Section - 移动端优化 */}
      <section className="bg-gradient-to-br from-primary-50 to-neutral-50 p-4 sm:p-6 md:p-8 rounded-xl mx-4 sm:mx-0">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                {t('toolsIntroduction')}
              </p>
            </div>
            <div className="flex justify-center order-first md:order-last">
              <ImagePlaceholder
                filename="assessment-illustration.jpg"
                alt="Woman using digital health assessment tool on tablet in comfortable home setting"
                width={300}
                height={225}
                description="Woman using digital health assessment tool, modern tablet interface, comfortable home setting, soft lighting"
                className="w-full max-w-sm sm:max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid - 移动端优化 */}
      <section className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {tools.map((tool) => (
            <div key={tool.title} className="card flex flex-col items-center text-center h-full p-4 sm:p-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-neutral-100 mb-4 sm:mb-6">
                {tool.icon}
              </div>
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-neutral-800 mb-2 sm:mb-3 leading-tight">
                {tool.title}
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 mb-4 sm:mb-6 flex-grow leading-relaxed">
                {tool.description}
              </p>
              {tool.href === "#" ? (
                 <span className="btn-disabled w-full mobile-touch-target text-sm sm:text-base px-4 py-3">{tool.cta}</span>
              ) : (
                <Link href={tool.href} className={`w-full mobile-touch-target text-sm sm:text-base px-4 py-3 text-center ${tool.title.includes("Symptom") || tool.title.includes("症状") ? 'btn-primary' : 'btn-secondary'}`}>
                  {tool.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Breathing Exercise Section - 移动端优化 */}
      <section id="breathing-exercise" className="container-custom">
        <div className="space-y-4 sm:space-y-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 lg:p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full mb-4 sm:mb-6">
            <span className="text-2xl sm:text-3xl">🫁</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 mb-3 sm:mb-4 leading-tight">
            {t('breathingExercise.title')}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            {t('breathingExercise.description')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <BreathingExercise locale={locale} />
        </div>

        <div className="bg-blue-50 rounded-lg p-6 max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            {t('breathingExercise.usageTips.title')}
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h4 className="font-medium mb-2">
                {t('breathingExercise.usageTips.bestTiming.title')}
              </h4>
              <ul className="space-y-1">
                {t.raw('breathingExercise.usageTips.bestTiming.items').map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">
                {t('breathingExercise.usageTips.precautions.title')}
              </h4>
              <ul className="space-y-1">
                {t.raw('breathingExercise.usageTips.precautions.items').map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Call to action / Note */}
      <section className="text-center py-8">
        <p className="text-neutral-700">
          {t('developmentNote')}
        </p>
      </section>

      {/* Medical Disclaimer */}
      <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 my-8 rounded-r-lg" role="alert">
        <p className="font-bold">{commonT('importantNote')}</p>
        <p className="text-sm">
          {commonT('medicalDisclaimer')}
        </p>
      </div>
    </div>
  );
}
