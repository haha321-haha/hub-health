import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale, locales } from '@/i18n';
import { getPDFResourceById } from '@/config/pdfResources';
import { getPreviewContentById } from '@/config/previewContent';
import { mapPDFId, hasPDFMapping, getAllMappedIds } from '@/components/pdf-id-mapping';
import PDFPreviewPage from './PDFPreviewPage';

interface PreviewPageProps {
  params: { 
    locale: Locale;
    id: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({
  params: { locale, id }
}: PreviewPageProps): Promise<Metadata> {
  // 🚀 快速修复：映射SimplePDFCenter的ID到真实资源ID
  const realId = mapPDFId(id);
  const resource = getPDFResourceById(realId);
  const previewContent = getPreviewContentById(realId);
  
  if (!resource || !previewContent) {
    return {
      title: 'Resource Not Found - Period Hub',
      description: 'The requested PDF resource could not be found.'
    };
  }

  const title = locale === 'zh' ? previewContent.title.zh : previewContent.title.en;
  const description = locale === 'zh' 
    ? `预览 ${title} - Period Hub 经期健康专业资源`
    : `Preview ${title} - Period Hub Professional Health Resources`;

  return {
    title: `${title} 预览 - Period Hub`,
    description,
    keywords: locale === 'zh' 
      ? `${title},PDF预览,经期健康,Period Hub`
      : `${title},PDF preview,menstrual health,Period Hub`,
  };
}

// Generate static params for all supported locales and preview-enabled resources
export async function generateStaticParams() {
  // 🚀 快速修复：包含原有的真实ID和SimplePDFCenter映射的ID
  const realIds = [
    'pain-tracking-form',
    'campus-emergency-checklist',
    'menstrual-cycle-nutrition-plan',
    'healthy-habits-checklist',
    'natural-therapy-assessment',
    'parent-communication-guide',
    'teacher-health-manual',
    'teacher-collaboration-handbook',
    'specific-menstrual-pain-management-guide',
    'menstrual-pain-complications-management',
    'magnesium-gut-health-guide',
    'zhan-zhuang-baduanjin-illustrated-guide'
  ];
  
  // 添加SimplePDFCenter中使用的映射ID
  const mappedIds = getAllMappedIds();
  const allPreviewableIds = [...realIds, ...mappedIds];

  const params = [];
  for (const locale of locales) {
    for (const id of allPreviewableIds) {
      params.push({ locale, id });
    }
  }

  return params;
}

export default async function PreviewPage({
  params: { locale, id }
}: PreviewPageProps) {
  setRequestLocale(locale);

  // 🚀 快速修复：映射SimplePDFCenter的ID到真实资源ID
  const realId = mapPDFId(id);
  
  // Validate resource exists using the real ID
  const resource = getPDFResourceById(realId);
  const previewContent = getPreviewContentById(realId);
  
  if (!resource || !previewContent) {
    notFound();
  }

  // 使用真实ID进行预览
  return <PDFPreviewPage locale={locale} resourceId={realId} />;
}
