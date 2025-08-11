'use client'

interface StructuredDataProps {
  type: 'website' | 'article' | 'medicalWebPage' | 'healthTopicPage'
  data: {
    title: string
    description: string
    url: string
    image?: string
    author?: string
    datePublished?: string
    dateModified?: string
    locale?: string
    keywords?: string[]
  }
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://periodhub.health'
  
  const getStructuredData = () => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': type === 'website' ? 'WebSite' : 
               type === 'article' ? 'MedicalWebPage' :
               type === 'medicalWebPage' ? 'MedicalWebPage' :
               'HealthTopicPage',
      name: data.title,
      description: data.description,
      url: data.url,
      inLanguage: data.locale || 'zh-CN',
      sameAs: [
        'https://periodhub.health',
        'https://github.com/periodhub',
        'https://twitter.com/periodhub'
      ],
      publisher: {
        '@type': 'Organization',
        name: 'Period Hub',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`,
          width: 200,
          height: 60,
          caption: 'Period Hub Logo'
        },
        description: '专业的女性月经健康管理平台，提供基于循证医学的痛经解决方案',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          availableLanguage: ['zh-CN', 'en-US'],
          contactOption: 'TollFree',
          areaServed: ['CN', 'US']
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'CN',
          addressRegion: 'Global',
          addressLocality: 'Online'
        }
      }
    }

    if (type === 'website') {
      return {
        ...baseSchema,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/search?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      }
    }

    if (type === 'article' || type === 'medicalWebPage') {
      return {
        ...baseSchema,
        '@type': 'MedicalWebPage',
        mainEntity: {
          '@type': 'MedicalCondition',
          name: '痛经',
          alternateName: ['月经疼痛', '经期疼痛', 'Menstrual Pain', 'Dysmenorrhea', '经期不适'],
          description: '月经期间或前后出现的下腹部疼痛症状，是女性常见的妇科问题',
          medicalSpecialty: {
            '@type': 'MedicalSpecialty',
            name: '妇科学',
            alternateName: ['妇科', '妇产科']
          },
          symptom: [
            '下腹部疼痛',
            '腰痛',
            '恶心',
            '头痛',
            '疲劳'
          ],
          treatment: [
            '热敷治疗',
            '药物治疗',
            '运动疗法',
            '中医调理',
            '生活方式调整'
          ]
        },
        author: {
          '@type': 'Organization',
          name: data.author || 'Period Hub Medical Team',
          url: baseUrl,
          '@id': `${baseUrl}/#organization`
        },
        datePublished: data.datePublished,
        dateModified: data.dateModified || data.datePublished,
        image: data.image ? {
          '@type': 'ImageObject',
          url: data.image,
          width: 1200,
          height: 630,
          caption: data.title,
          contentUrl: data.image
        } : undefined,
        keywords: data.keywords?.join(', '),
        medicalAudience: {
          '@type': 'MedicalAudience',
          audienceType: ['Patient', 'MedicalStudent', 'HealthcareProfessional']
        },
        about: {
          '@type': 'MedicalCondition',
          name: '痛经管理',
          description: '痛经的预防、治疗和管理方法，包括西医和中医的综合治疗方案'
        },
        lastReviewed: data.dateModified || data.datePublished,
        reviewedBy: {
          '@type': 'Organization',
          name: 'Period Hub Medical Review Board',
          url: baseUrl
        }
      }
    }

    if (type === 'healthTopicPage') {
      return {
        ...baseSchema,
        '@type': 'HealthTopicPage',
        mainEntity: {
          '@type': 'MedicalCondition',
          name: '女性健康',
          description: '女性生殖健康和月经健康相关话题'
        },
        specialty: {
          '@type': 'MedicalSpecialty',
          name: '妇科学'
        }
      }
    }

    return baseSchema
  }

  const structuredData = getStructuredData()

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}
