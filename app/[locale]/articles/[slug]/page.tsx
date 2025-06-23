import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import NSAIDInteractive from '@/components/NSAIDInteractive';
import NSAIDContentSimple from '@/components/NSAIDContentSimple';
import StructuredData from '@/components/StructuredData';
import ArticleInteractions from '@/components/ArticleInteractions';
import ReadingProgress from '@/components/ReadingProgress';
import TableOfContents from '@/components/TableOfContents';

// Types
type Locale = 'en' | 'zh';

// Article interface
interface Article {
  slug: string;
  title: string;
  title_zh?: string;
  date: string;
  summary: string;
  summary_zh?: string;
  tags: string[];
  tags_zh?: string[];
  category: string;
  category_zh?: string;
  author: string;
  featured_image: string;
  reading_time: string;
  reading_time_zh?: string;
  content: string;
  seo_title?: string;
  seo_title_zh?: string;
  seo_description?: string;
  seo_description_zh?: string;
  canonical_url?: string;
  schema_type?: string;
}

// 获取文章函数
function getArticleBySlug(slug: string, locale: string = 'en'): Article | null {
  try {
    const articlesDirectory = path.join(process.cwd(), 'content/articles');
    const articlesPath = locale === 'zh'
      ? path.join(articlesDirectory, 'zh')
      : path.join(articlesDirectory, 'en');

    const fullPath = path.join(articlesPath, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      title_zh: data.title_zh,
      date: data.date || '',
      summary: data.summary || '',
      summary_zh: data.summary_zh,
      tags: data.tags || [],
      tags_zh: data.tags_zh,
      category: data.category || '',
      category_zh: data.category_zh,
      author: data.author || '',
      featured_image: data.featured_image || '',
      reading_time: data.reading_time || '',
      reading_time_zh: data.reading_time_zh,
      content,
      seo_title: data.seo_title,
      seo_title_zh: data.seo_title_zh,
      seo_description: data.seo_description,
      seo_description_zh: data.seo_description_zh,
      canonical_url: data.canonical_url,
      schema_type: data.schema_type,
    };
  } catch (error) {
    console.error('Error reading article:', error);
    return null;
  }
}

// 获取相关文章函数
function getRelatedArticles(currentSlug: string, locale: string = 'en', limit: number = 3): Article[] {
  // 暂时返回空数组，避免复杂的文件系统操作
  return [];
}

// Generate static params for all articles
export async function generateStaticParams() {
  const locales: Locale[] = ['en', 'zh'];
  const articleSlugs = [
    '5-minute-period-pain-relief',
    'anti-inflammatory-diet-period-pain',
    'comprehensive-iud-guide',
    'comprehensive-medical-guide-to-dysmenorrhea',
    'essential-oils-aromatherapy-menstrual-pain-guide',
    'global-traditional-menstrual-pain-relief',
    'heat-therapy-complete-guide',
    'hidden-culprits-of-menstrual-pain',
    'magnesium-gut-health-comprehensive-guide',
    'menstrual-pain-complications-management',
    'menstrual-pain-faq-expert-answers',
    'menstrual-pain-medical-guide',
    'menstrual-pain-vs-other-abdominal-pain-guide',
    'natural-physical-therapy-comprehensive-guide',
    'nsaid-menstrual-pain-professional-guide',
    'period-friendly-recipes',
    'recommended-reading-list',
    'specific-menstrual-pain-management-guide',
    'understanding-your-cycle',
    'when-to-see-doctor-period-pain',
    'when-to-seek-medical-care-comprehensive-guide',
    'zhan-zhuang-baduanjin-for-menstrual-pain-relief'
  ];

  const params = [];
  for (const locale of locales) {
    for (const slug of articleSlugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

// Generate metadata for the article
export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: Locale; slug: string }
}): Promise<Metadata> {
  const article = getArticleBySlug(slug, locale);
  
  if (!article) {
    return {
      title: 'Article Not Found | periodhub.health',
      description: 'The requested article could not be found.',
    };
  }

  const title = locale === 'zh' ? article.title_zh || article.title : article.title;
  const description = locale === 'zh' ? article.seo_description_zh || article.seo_description : article.seo_description;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://period-hub.com'
  const articleUrl = `${baseUrl}/${locale}/articles/${slug}`

  return {
    title: `${title} | Period Hub`,
    description: description,
    keywords: (locale === 'zh' ? article.tags_zh : article.tags)?.join(', '),
    authors: [{ name: article.author }],
    openGraph: {
      title: title,
      description: description,
      url: articleUrl,
      siteName: 'Period Hub',
      images: [
        {
          url: article.featured_image || `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.date,
      locale: locale,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [article.featured_image || `${baseUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: articleUrl,
      languages: {
        'zh-CN': `${baseUrl}/zh/articles/${slug}`,
        'en-US': `${baseUrl}/en/articles/${slug}`,
      },
    },
  };
}

export default async function ArticlePage({
  params: { locale, slug }
}: {
  params: { locale: Locale; slug: string }
}) {
  setRequestLocale(locale);

  const article = getArticleBySlug(slug, locale);
  const relatedArticles = getRelatedArticles(slug, locale, 3);

  if (!article) {
    notFound();
  }

  const title = locale === 'zh' ? article.title_zh || article.title : article.title;
  const summary = locale === 'zh' ? article.summary_zh || article.summary : article.summary;
  const category = locale === 'zh' ? article.category_zh || article.category : article.category;
  const readingTime = locale === 'zh' ? article.reading_time_zh || article.reading_time : article.reading_time;

  // Check if this is the NSAID article that needs interactive components
  const isNSAIDArticle = slug === 'nsaid-menstrual-pain-professional-guide';

  console.log('🔍 Article page debug:', {
    slug,
    isNSAIDArticle,
    locale,
    articleTitle: article?.title
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://period-hub.com'
  const articleUrl = `${baseUrl}/${locale}/articles/${slug}`

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* SEO结构化数据 */}
      <StructuredData
        type="medicalWebPage"
        data={{
          title,
          description: summary || '',
          url: articleUrl,
          image: article.featured_image,
          author: article.author,
          datePublished: article.date,
          dateModified: article.date,
          locale: locale,
          keywords: (locale === 'zh' ? article.tags_zh : article.tags),
        }}
      />

      {/* 阅读进度条和返回顶部 */}
      <ReadingProgress locale={locale} />

      {/* Load NSAID interactive components if needed */}
      {isNSAIDArticle && <NSAIDInteractive locale={locale} />}

      <div className="space-y-6 sm:space-y-8">
        {/* Back to Articles */}
        <div className="container-custom">
          <Link
            href={`/${locale}/articles`}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mobile-touch-target"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {locale === 'zh' ? '返回文章列表' : 'Back to Articles'}
          </Link>
        </div>

      {/* Article Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="container-custom py-6 sm:py-8">
          <div className="max-w-4xl mx-auto">
            {/* Category and Meta Info */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-neutral-600 mb-4">
              <span className="bg-primary-100 text-primary-700 px-2 sm:px-3 py-1 rounded-full font-medium">
                {category}
              </span>
              <time dateTime={article.date} className="flex items-center gap-1">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(article.date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US')}
              </time>
              {readingTime && (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {readingTime}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-800 mb-3 sm:mb-4 leading-tight">
              {title}
            </h1>

            {/* Summary */}
            {summary && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 sm:p-6 mb-6 rounded-r-lg">
                <h2 className="text-sm sm:text-base font-semibold text-blue-800 mb-2">
                  {locale === 'zh' ? '文章摘要' : 'Article Summary'}
                </h2>
                <p className="text-sm sm:text-base text-blue-700 leading-relaxed">
                  {summary}
                </p>
              </div>
            )}

            {/* Author and Article Stats */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-sm sm:text-base">
                    {article.author?.charAt(0) || 'P'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base text-neutral-800">
                    {article.author || 'Period Health Team'}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    {locale === 'zh' ? '健康专家' : 'Health Expert'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content with Sidebar */}
      <main className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Table of Contents - Mobile */}
              <div className="lg:hidden mb-6">
                <TableOfContents locale={locale} />
              </div>

              {/* Article Body */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 mb-6">
                <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-primary prose-headings:text-neutral-800 prose-p:text-neutral-700 prose-li:text-neutral-700">
                  {isNSAIDArticle ? (
                    // For NSAID article, use custom client component
                    <NSAIDContentSimple content={article.content} />
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                      table: ({ children }) => (
                        <div className="overflow-x-auto my-6">
                          <table className="min-w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-sm">
                            {children}
                          </table>
                        </div>
                      ),
                      thead: ({ children }) => (
                        <thead className="bg-primary-50">
                          {children}
                        </thead>
                      ),
                      th: ({ children }) => (
                        <th className="border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 bg-primary-100 font-semibold text-left text-primary-800 text-sm sm:text-base">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-neutral-700 text-sm sm:text-base">
                          {children}
                        </td>
                      ),
                      tr: ({ children }) => (
                        <tr className="even:bg-gray-50 hover:bg-primary-25">
                          {children}
                        </tr>
                      ),
                    }}
                  >
                    {article.content}
                  </ReactMarkdown>
                  )}
                </div>
              </div>

              {/* Article Interactions */}
              <ArticleInteractions
                articleId={slug}
                articleTitle={title}
                locale={locale}
                className="mb-6"
              />
            </div>

            {/* Sidebar - Desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                {/* Table of Contents - Desktop */}
                <TableOfContents locale={locale} />

                {/* Quick Actions */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm">
                    {locale === 'zh' ? '快速操作' : 'Quick Actions'}
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href={`/${locale}/articles`}
                      className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {locale === 'zh' ? '更多文章' : 'More Articles'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Medical Disclaimer */}
      <section className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-red-800 mb-2 text-sm sm:text-base">
                  {locale === 'zh' ? '⚠️ 医疗免责声明' : '⚠️ Medical Disclaimer'}
                </h4>
                <p className="text-xs sm:text-sm text-red-700 leading-relaxed">
                  {locale === 'zh'
                    ? '本文内容仅供教育和信息目的，不能替代专业医疗建议、诊断或治疗。如有任何健康问题或疑虑，请咨询合格的医疗专业人员。在做出任何健康相关决定之前，请务必寻求医生的建议。'
                    : 'This content is for educational and informational purposes only and should not replace professional medical advice, diagnosis, or treatment. If you have any health concerns or questions, please consult with a qualified healthcare professional. Always seek medical advice before making any health-related decisions.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-2">
                {locale === 'zh' ? '📚 相关文章推荐' : '📚 Related Articles'}
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                {locale === 'zh'
                  ? '继续探索更多专业健康内容'
                  : 'Continue exploring more professional health content'
                }
              </p>
            </div>

            {relatedArticles.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((relatedArticle) => {
                  const relatedTitle = locale === 'zh' ? relatedArticle.title_zh || relatedArticle.title : relatedArticle.title;
                  const relatedSummary = locale === 'zh' ? relatedArticle.summary_zh || relatedArticle.summary : relatedArticle.summary;
                  const relatedCategory = locale === 'zh' ? relatedArticle.category_zh || relatedArticle.category : relatedArticle.category;

                  return (
                    <Link
                      key={relatedArticle.slug}
                      href={`/${locale}/articles/${relatedArticle.slug}`}
                      className="group block bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-primary-200"
                    >
                      <div className="flex items-center mb-3">
                        <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                          {relatedCategory}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {relatedTitle}
                      </h3>
                      <p className="text-neutral-600 text-sm line-clamp-3 leading-relaxed mb-3">
                        {relatedSummary}
                      </p>
                      <div className="flex items-center text-primary-600 text-sm font-medium">
                        <span>{locale === 'zh' ? '阅读全文' : 'Read More'}</span>
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary-600 mb-2">
                  {locale === 'zh' ? '更多文章即将发布' : 'More Articles Coming Soon'}
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base">
                  {locale === 'zh'
                    ? '我们正在准备更多高质量的健康内容，敬请期待。'
                    : 'We are preparing more high-quality health content. Stay tuned.'
                  }
                </p>
                <Link
                  href={`/${locale}/articles`}
                  className="inline-flex items-center mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  {locale === 'zh' ? '浏览所有文章' : 'Browse All Articles'}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
