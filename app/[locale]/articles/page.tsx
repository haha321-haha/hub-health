import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, locales } from '@/i18n/request';

// Generate metadata for the page
export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'articlesPage' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

// Generate static params for all supported locales
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ArticlesPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'articlesPage' });
  const commonT = await getTranslations({ locale, namespace: 'common' });

  // Real article data from project content
  const articleCategories = [
    {
      id: 'immediate-relief',
      title: t('categories.immediateRelief.title'),
      description: t('categories.immediateRelief.description'),
      icon: '⚡',
      color: 'from-red-500 to-pink-500',
      articles: [
        {
          title: t('categories.immediateRelief.articles.fiveMinuteRelief'),
          description: t('categories.immediateRelief.articles.fiveMinuteReliefDesc'),
          slug: '5-minute-period-pain-relief',
          readTime: '6 min'
        },
        {
          title: t('categories.immediateRelief.articles.heatTherapy'),
          description: t('categories.immediateRelief.articles.heatTherapyDesc'),
          slug: 'heat-therapy-complete-guide',
          readTime: '12 min'
        },
        {
          title: t('categories.immediateRelief.articles.nsaidGuide'),
          description: t('categories.immediateRelief.articles.nsaidGuideDesc'),
          slug: 'nsaid-menstrual-pain-professional-guide',
          readTime: '15 min'
        },
        {
          title: t('categories.immediateRelief.articles.specificManagement'),
          description: t('categories.immediateRelief.articles.specificManagementDesc'),
          slug: 'specific-menstrual-pain-management-guide',
          readTime: '18 min'
        }
      ]
    },
    {
      id: 'nutrition-health',
      title: t('categories.nutritionHealth.title'),
      description: t('categories.nutritionHealth.description'),
      icon: '🥗',
      color: 'from-green-500 to-emerald-500',
      articles: [
        {
          title: t('categories.nutritionHealth.articles.antiInflammatory'),
          description: t('categories.nutritionHealth.articles.antiInflammatoryDesc'),
          slug: 'anti-inflammatory-diet-period-pain',
          readTime: '14 min'
        },
        {
          title: t('categories.nutritionHealth.articles.magnesiumGuide'),
          description: t('categories.nutritionHealth.articles.magnesiumGuideDesc'),
          slug: 'magnesium-gut-health-comprehensive-guide',
          readTime: '20 min'
        },
        {
          title: t('categories.nutritionHealth.articles.periodRecipes'),
          description: t('categories.nutritionHealth.articles.periodRecipesDesc'),
          slug: 'period-friendly-recipes',
          readTime: '10 min'
        }
      ]
    },
    {
      id: 'natural-therapies',
      title: t('categories.naturalTherapies.title'),
      description: t('categories.naturalTherapies.description'),
      icon: '🌿',
      color: 'from-purple-500 to-indigo-500',
      articles: [
        {
          title: t('categories.naturalTherapies.articles.physicalTherapy'),
          description: t('categories.naturalTherapies.articles.physicalTherapyDesc'),
          slug: 'natural-physical-therapy-comprehensive-guide',
          readTime: '16 min'
        },
        {
          title: t('categories.naturalTherapies.articles.essentialOils'),
          description: t('categories.naturalTherapies.articles.essentialOilsDesc'),
          slug: 'essential-oils-aromatherapy-menstrual-pain-guide',
          readTime: '12 min'
        },
        {
          title: t('categories.naturalTherapies.articles.traditionalMethods'),
          description: t('categories.naturalTherapies.articles.traditionalMethodsDesc'),
          slug: 'global-traditional-menstrual-pain-relief',
          readTime: '14 min'
        },
        {
          title: t('categories.naturalTherapies.articles.zhanZhuang'),
          description: t('categories.naturalTherapies.articles.zhanZhuangDesc'),
          slug: 'zhan-zhuang-baduanjin-for-menstrual-pain-relief',
          readTime: '18 min'
        }
      ]
    },
    {
      id: 'medical-guidance',
      title: t('categories.medicalGuidance.title'),
      description: t('categories.medicalGuidance.description'),
      icon: '🏥',
      color: 'from-blue-500 to-cyan-500',
      articles: [
        {
          title: t('categories.medicalGuidance.articles.comprehensiveMedical'),
          description: t('categories.medicalGuidance.articles.comprehensiveMedicalDesc'),
          slug: 'comprehensive-medical-guide-to-dysmenorrhea',
          readTime: '25 min'
        },
        {
          title: t('categories.medicalGuidance.articles.whenToSeeDoctor'),
          description: t('categories.medicalGuidance.articles.whenToSeeDoctorDesc'),
          slug: 'when-to-see-doctor-period-pain',
          readTime: '8 min'
        },
        {
          title: t('categories.medicalGuidance.articles.medicalCare'),
          description: t('categories.medicalGuidance.articles.medicalCareDesc'),
          slug: 'when-to-seek-medical-care-comprehensive-guide',
          readTime: '12 min'
        },
        {
          title: t('categories.medicalGuidance.articles.complications'),
          description: t('categories.medicalGuidance.articles.complicationsDesc'),
          slug: 'menstrual-pain-complications-management',
          readTime: '16 min'
        }
      ]
    },
    {
      id: 'understanding-education',
      title: t('categories.understandingEducation.title'),
      description: t('categories.understandingEducation.description'),
      icon: '📚',
      color: 'from-indigo-500 to-purple-500',
      articles: [
        {
          title: t('categories.understandingEducation.articles.understandingCycle'),
          description: t('categories.understandingEducation.articles.understandingCycleDesc'),
          slug: 'understanding-your-cycle',
          readTime: '15 min'
        },
        {
          title: t('categories.understandingEducation.articles.hiddenCulprits'),
          description: t('categories.understandingEducation.articles.hiddenCulpritsDesc'),
          slug: 'hidden-culprits-of-menstrual-pain',
          readTime: '13 min'
        },
        {
          title: t('categories.understandingEducation.articles.painDifferential'),
          description: t('categories.understandingEducation.articles.painDifferentialDesc'),
          slug: 'menstrual-pain-vs-other-abdominal-pain-guide',
          readTime: '11 min'
        },
        {
          title: t('categories.understandingEducation.articles.faqExpert'),
          description: t('categories.understandingEducation.articles.faqExpertDesc'),
          slug: 'menstrual-pain-faq-expert-answers',
          readTime: '10 min'
        }
      ]
    },
    {
      id: 'specialized-guides',
      title: t('categories.specializedGuides.title'),
      description: t('categories.specializedGuides.description'),
      icon: '🎯',
      color: 'from-pink-500 to-rose-500',
      articles: [
        {
          title: t('categories.specializedGuides.articles.iudGuide'),
          description: t('categories.specializedGuides.articles.iudGuideDesc'),
          slug: 'comprehensive-iud-guide',
          readTime: '22 min'
        },
        {
          title: t('categories.specializedGuides.articles.medicalGuide'),
          description: t('categories.specializedGuides.articles.medicalGuideDesc'),
          slug: 'menstrual-pain-medical-guide',
          readTime: '17 min'
        },
        {
          title: t('categories.specializedGuides.articles.readingList'),
          description: t('categories.specializedGuides.articles.readingListDesc'),
          slug: 'recommended-reading-list',
          readTime: '5 min'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Search Box */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none bg-white/80 backdrop-blur-sm"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {articleCategories.map((category) => (
            <div key={category.id} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Category Header */}
              <div className="flex items-center mb-8">
                <div className={`text-5xl mr-6 p-4 rounded-2xl bg-gradient-to-r ${category.color} text-white shadow-lg`}>
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">{category.title}</h2>
                  <p className="text-lg text-gray-600">{category.description}</p>
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {category.articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/${locale}/articles/${article.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:border-purple-200 h-full">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-sm text-purple-600 font-medium bg-purple-50 px-3 py-1 rounded-full">
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-purple-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {article.description}
                      </p>
                      <div className="flex items-center text-purple-600 font-medium text-sm group-hover:text-purple-700">
                        {commonT('readMore')} 
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* PDF Download Center */}
        <div className="mt-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-12 shadow-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('pdfCenter.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('pdfCenter.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pain Tracking Form */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                {t('pdfCenter.downloads.painTracking.title')}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {t('pdfCenter.downloads.painTracking.description')}
              </p>
              <div className="flex gap-2">
                <a
                  href="/downloads/pain-tracking-form.pdf"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? '中文版' : 'English'}
                </a>
                <a
                  href={`/downloads/pain-tracking-form-${locale === 'zh' ? 'en' : 'zh'}.pdf`}
                  className="flex-1 border border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? 'English' : '中文版'}
                </a>
              </div>
            </div>

            {/* Nutrition Plan */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="text-4xl mb-4">🥗</div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                {t('pdfCenter.downloads.nutritionPlan.title')}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {t('pdfCenter.downloads.nutritionPlan.description')}
              </p>
              <div className="flex gap-2">
                <a
                  href="/downloads/menstrual-cycle-nutrition-plan.pdf"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? '中文版' : 'English'}
                </a>
                <a
                  href={`/downloads/menstrual-cycle-nutrition-plan-${locale === 'zh' ? 'en' : 'zh'}.pdf`}
                  className="flex-1 border border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? 'English' : '中文版'}
                </a>
              </div>
            </div>

            {/* Campus Emergency Checklist */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="text-4xl mb-4">🏫</div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                {t('pdfCenter.downloads.campusEmergency.title')}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {t('pdfCenter.downloads.campusEmergency.description')}
              </p>
              <div className="flex gap-2">
                <a
                  href="/downloads/campus-emergency-checklist.pdf"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? '中文版' : 'English'}
                </a>
                <a
                  href={`/downloads/campus-emergency-checklist-${locale === 'zh' ? 'en' : 'zh'}.pdf`}
                  className="flex-1 border border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? 'English' : '中文版'}
                </a>
              </div>
            </div>

            {/* Magnesium Guide */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="text-4xl mb-4">💊</div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                {t('pdfCenter.downloads.magnesiumGuide.title')}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {t('pdfCenter.downloads.magnesiumGuide.description')}
              </p>
              <div className="flex gap-2">
                <a
                  href="/downloads/magnesium-gut-health-menstrual-pain-guide.pdf"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? '中文版' : 'English'}
                </a>
                <a
                  href={`/downloads/magnesium-gut-health-menstrual-pain-guide-${locale === 'zh' ? 'en' : 'zh'}.pdf`}
                  className="flex-1 border border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? 'English' : '中文版'}
                </a>
              </div>
            </div>

            {/* Natural Therapy Assessment */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                {t('pdfCenter.downloads.naturalTherapy.title')}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {t('pdfCenter.downloads.naturalTherapy.description')}
              </p>
              <div className="flex gap-2">
                <a
                  href="/downloads/natural-therapy-assessment.pdf"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? '中文版' : 'English'}
                </a>
                <a
                  href={`/downloads/natural-therapy-assessment-${locale === 'zh' ? 'en' : 'zh'}.pdf`}
                  className="flex-1 border border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? 'English' : '中文版'}
                </a>
              </div>
            </div>

            {/* Healthy Habits Checklist */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                {t('pdfCenter.downloads.healthyHabits.title')}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {t('pdfCenter.downloads.healthyHabits.description')}
              </p>
              <div className="flex gap-2">
                <a
                  href="/downloads/healthy-habits-checklist.pdf"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? '中文版' : 'English'}
                </a>
                <a
                  href={`/downloads/healthy-habits-checklist-${locale === 'zh' ? 'en' : 'zh'}.pdf`}
                  className="flex-1 border border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? 'English' : '中文版'}
                </a>
              </div>
            </div>

            {/* Complications Management */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                {t('pdfCenter.downloads.complicationsManagement.title')}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {t('pdfCenter.downloads.complicationsManagement.description')}
              </p>
              <div className="flex gap-2">
                <a
                  href="/downloads/menstrual-pain-complications-management.pdf"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? '中文版' : 'English'}
                </a>
                <a
                  href={`/downloads/menstrual-pain-complications-management-${locale === 'zh' ? 'en' : 'zh'}.pdf`}
                  className="flex-1 border border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? 'English' : '中文版'}
                </a>
              </div>
            </div>

            {/* Parent Communication Guide */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="text-4xl mb-4">👨‍👩‍👧</div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                {t('pdfCenter.downloads.parentCommunication.title')}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {t('pdfCenter.downloads.parentCommunication.description')}
              </p>
              <div className="flex gap-2">
                <a
                  href="/downloads/parent-communication-guide.pdf"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? '中文版' : 'English'}
                </a>
                <a
                  href={`/downloads/parent-communication-guide-${locale === 'zh' ? 'en' : 'zh'}.pdf`}
                  className="flex-1 border border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? 'English' : '中文版'}
                </a>
              </div>
            </div>

            {/* Teacher Collaboration Handbook */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="text-4xl mb-4">👩‍🏫</div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                {t('pdfCenter.downloads.teacherCollaboration.title')}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {t('pdfCenter.downloads.teacherCollaboration.description')}
              </p>
              <div className="flex gap-2">
                <a
                  href="/downloads/teacher-collaboration-handbook.pdf"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? '中文版' : 'English'}
                </a>
                <a
                  href={`/downloads/teacher-collaboration-handbook-${locale === 'zh' ? 'en' : 'zh'}.pdf`}
                  className="flex-1 border border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? 'English' : '中文版'}
                </a>
              </div>
            </div>

            {/* Teacher Health Manual */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                {t('pdfCenter.downloads.teacherHealthManual.title')}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {t('pdfCenter.downloads.teacherHealthManual.description')}
              </p>
              <div className="flex gap-2">
                <a
                  href="/downloads/teacher-health-manual.pdf"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? '中文版' : 'English'}
                </a>
                <a
                  href={`/downloads/teacher-health-manual-${locale === 'zh' ? 'en' : 'zh'}.pdf`}
                  className="flex-1 border border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? 'English' : '中文版'}
                </a>
              </div>
            </div>

            {/* Zhan Zhuang Guide */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="text-4xl mb-4">🧘‍♀️</div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                {t('pdfCenter.downloads.zhanZhuangGuide.title')}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {t('pdfCenter.downloads.zhanZhuangGuide.description')}
              </p>
              <div className="flex gap-2">
                <a
                  href="/downloads/zhan-zhuang-baduanjin-illustrated-guide.pdf"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? '中文版' : 'English'}
                </a>
                <a
                  href={`/downloads/zhan-zhuang-baduanjin-illustrated-guide-${locale === 'zh' ? 'en' : 'zh'}.pdf`}
                  className="flex-1 border border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? 'English' : '中文版'}
                </a>
              </div>
            </div>

            {/* Specific Management Guide */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                {t('pdfCenter.downloads.specificManagement.title')}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {t('pdfCenter.downloads.specificManagement.description')}
              </p>
              <div className="flex gap-2">
                <a
                  href="/downloads/specific-menstrual-pain-management-guide.pdf"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? '中文版' : 'English'}
                </a>
                <a
                  href={`/downloads/specific-menstrual-pain-management-guide-${locale === 'zh' ? 'en' : 'zh'}.pdf`}
                  className="flex-1 border border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-all duration-300 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'zh' ? 'English' : '中文版'}
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">{t('pdfCenter.additionalNote')}</p>
            <Link
              href={`/${locale}/downloads`}
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              {t('pdfCenter.viewAllDownloads')}
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">{t('cta.subtitle')}</p>
          <Link
            href={`/${locale}/interactive-tools`}
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            {t('cta.button')}
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8">
            <div className="text-4xl font-bold text-purple-600 mb-2">24+</div>
            <div className="text-gray-600">{t('stats.articles')}</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8">
            <div className="text-4xl font-bold text-pink-600 mb-2">4</div>
            <div className="text-gray-600">{t('stats.categories')}</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8">
            <div className="text-4xl font-bold text-indigo-600 mb-2">100%</div>
            <div className="text-gray-600">{t('stats.evidenceBased')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
