import { MetadataRoute } from 'next'
import { locales } from '@/i18n'

// 文章数据 - 完整的42篇文章列表
const articles = [
  '5-minute-period-pain-relief',
  'anti-inflammatory-diet-period-pain',
  'comprehensive-iud-guide',
  'comprehensive-medical-guide-to-dysmenorrhea',
  'comprehensive-menstrual-sleep-quality-guide',
  'comprehensive-report-non-medical-factors-menstrual-pain',
  'effective-herbal-tea-menstrual-pain',
  'essential-oils-aromatherapy-menstrual-pain-guide',
  'ginger-menstrual-pain-relief-guide',
  'global-traditional-menstrual-pain-relief',
  'heat-therapy-complete-guide',
  'herbal-tea-menstrual-pain-relief',
  'hidden-culprits-of-menstrual-pain',
  'home-natural-menstrual-pain-relief',
  'magnesium-gut-health-comprehensive-guide',
  'medication-vs-natural-remedies-menstrual-pain',
  'menstrual-back-pain-comprehensive-care-guide',
  'menstrual-nausea-relief-guide',
  'menstrual-pain-accompanying-symptoms-guide',
  'menstrual-pain-back-pain-connection',
  'menstrual-pain-complications-management',
  'menstrual-pain-emergency-medication-guide',
  'menstrual-pain-faq-expert-answers',
  'menstrual-pain-medical-guide',
  'menstrual-pain-research-progress-2024',
  'menstrual-pain-vs-other-abdominal-pain-guide',
  'menstrual-preventive-care-complete-plan',
  'menstrual-sleep-quality-improvement-guide',
  'menstrual-stress-management-complete-guide',
  'natural-physical-therapy-comprehensive-guide',
  'nsaid-menstrual-pain-professional-guide',
  'period-friendly-recipes',
  'period-pain-simulator-accuracy-analysis',
  'personal-menstrual-health-profile',
  'recommended-reading-list',
  'specific-menstrual-pain-management-guide',
  'understanding-your-cycle',
  'us-menstrual-pain-insurance-coverage-guide',
  'when-to-see-doctor-period-pain',
  'when-to-seek-medical-care-comprehensive-guide',
  'womens-lifecycle-menstrual-pain-analysis',
  'zhan-zhuang-baduanjin-for-menstrual-pain-relief'
];

// 交互工具页面
const interactiveTools = [
  'symptom-assessment',
  'period-pain-assessment',
  'pain-tracker',
  'constitution-test'
];

// 主要页面
const mainPages = [
  '',
  'articles',
  'interactive-tools',
  'teen-health',
  'about',
  'contact'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://periodhub.health'
  const currentDate = new Date()
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Generate entries for each locale
  locales.forEach((locale) => {
    // Main pages
    mainPages.forEach((page) => {
      const url = page === '' ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}/${page}`
      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: page === '' ? 'daily' : page === 'articles' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page === 'articles' ? 0.9 : 0.8,
      })
    })

    // Article pages
    articles.forEach((article) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/articles/${article}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    })

    // Interactive tool pages
    interactiveTools.forEach((tool) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/interactive-tools/${tool}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    })
  })

  return sitemapEntries
}
