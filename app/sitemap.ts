import { MetadataRoute } from 'next'
import { locales } from '@/i18n/request'

// 文章数据 - 从实际文章文件中获取
const articles = [
  'quick-menstrual-pain-relief-guide',
  'anti-inflammatory-diet-menstrual-pain',
  'heat-therapy-complete-guide',
  'natural-physical-therapy-menstrual-pain',
  'menstrual-pain-medical-guide',
  'when-to-see-doctor-menstrual-pain',
  'specific-situations-menstrual-pain-management',
  'menstrual-pain-content-evaluation-report',
  'comprehensive-menstrual-pain-research-summary',
  'global-traditional-menstrual-pain-relief',
  'nsaid-menstrual-pain-professional-guide'
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://period-hub.com'
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
