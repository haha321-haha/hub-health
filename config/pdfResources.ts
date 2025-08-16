// PDF资源配置
export interface PDFResource {
  id: string;
  title: string;
  description: string;
  filename: string;
  category: string;
  size: string;
  downloadUrl: string;
}

export const pdfResources: PDFResource[] = [
  {
    id: 'pain-tracker-guide',
    title: '疼痛追踪指南',
    description: '详细的疼痛追踪方法和记录技巧',
    filename: 'pain-tracker-guide.pdf',
    category: 'guide',
    size: '2.5MB',
    downloadUrl: '/downloads/pain-tracker-guide.pdf'
  },
  {
    id: 'constitution-guide',
    title: '中医体质养生指南',
    description: '基于中医体质理论的个性化养生建议',
    filename: 'constitution-guide.pdf',
    category: 'guide',
    size: '3.2MB',
    downloadUrl: '/downloads/constitution-guide.pdf'
  },
  {
    id: 'menstrual-health-handbook',
    title: '月经健康手册',
    description: '全面的月经健康知识和护理指南',
    filename: 'menstrual-health-handbook.pdf',
    category: 'handbook',
    size: '4.1MB',
    downloadUrl: '/downloads/menstrual-health-handbook.pdf'
  }
];

// 导出兼容名称
export const PDF_RESOURCES = pdfResources;

export const getPDFResource = (id: string): PDFResource | undefined => {
  return pdfResources.find(resource => resource.id === id);
};

export const getPDFResourcesByCategory = (category: string): PDFResource[] => {
  return pdfResources.filter(resource => resource.category === category);
};

export const getPDFResourceById = getPDFResource;

export default pdfResources;
