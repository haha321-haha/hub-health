
import { Metadata } from 'next';

interface StructuredDataProps {
  type: 'Article' | 'WebPage' | 'Organization' | 'Person' | 'Product' | 'medicalWebPage' | 'healthTopicPage';
  title: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
}

export default function StructuredData(props: StructuredDataProps) {
  const data = generateStructuredData(props);
  return <StructuredDataScript data={data} />;
}

export function generateStructuredData(props: StructuredDataProps) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': props.type,
    name: props.title,
    description: props.description,
    url: props.url,
    image: props.image,
  };

  // 根据类型添加特定字段
  switch (props.type) {
    case 'Article':
      return {
        ...baseData,
        author: {
          '@type': 'Person',
          name: props.author || 'PeriodHub Team'
        },
        publisher: {
          '@type': 'Organization',
          name: 'PeriodHub',
          logo: {
            '@type': 'ImageObject',
            url: '/logo.png'
          }
        },
        datePublished: props.datePublished,
        dateModified: props.dateModified || props.datePublished,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': props.url
        }
      };
      
    case 'Organization':
      return {
        ...baseData,
        '@type': 'Organization',
        logo: '/logo.png',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-555-0123',
          contactType: 'customer service'
        },
        sameAs: [
          'https://twitter.com/periodhub',
          'https://facebook.com/periodhub'
        ]
      };
      
    case 'medicalWebPage':
      return {
        ...baseData,
        '@type': 'MedicalWebPage',
        medicalAudience: 'Patient',
        about: {
          '@type': 'MedicalCondition',
          name: props.title
        }
      };
    
    case 'healthTopicPage':
      return {
        ...baseData,
        '@type': 'MedicalWebPage',
        medicalAudience: 'Patient',
        about: {
          '@type': 'MedicalTopic',
          name: props.title,
          description: props.description
        }
      };
      
    default:
      return baseData;
  }
}

export function StructuredDataScript({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2)
      }}
    />
  );
}
