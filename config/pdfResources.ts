/**
 * PDF资源统一配置
 * Period Hub PDF Resources Configuration
 */

import { PDFResource, PDFCategoryInfo, PDFStats } from '@/types/pdf';
import { calculatePDFStats } from '@/utils/pdfHelpers';

/**
 * PDF分类信息配置
 */
export const PDF_CATEGORIES: PDFCategoryInfo[] = [
  {
    id: 'management-tools',
    titleKey: 'categories.managementTools.title',
    descriptionKey: 'categories.managementTools.description',
    icon: '📊',
    order: 1
  },
  {
    id: 'health-management',
    titleKey: 'categories.healthManagement.title',
    descriptionKey: 'categories.healthManagement.description',
    icon: '🏥',
    order: 2
  },
  {
    id: 'communication-guidance',
    titleKey: 'categories.communicationGuidance.title',
    descriptionKey: 'categories.communicationGuidance.description',
    icon: '🎓',
    order: 3
  },
  {
    id: 'educational-resources',
    titleKey: 'categories.educationalResources.title',
    descriptionKey: 'categories.educationalResources.description',
    icon: '📚',
    order: 4
  }
];

/**
 * PDF资源配置
 */
export const PDF_RESOURCES: PDFResource[] = [
  // 管理工具类 (4个)
  {
    id: 'pain-tracking-form',
    icon: '📊',
    filename: 'pain-tracking-form.pdf',
    titleKey: 'painTrackingForm.title',
    descriptionKey: 'painTrackingForm.description',
    category: 'management-tools',
    featured: true,
    fileSize: 764,
    createdAt: '2024-12-19',
    updatedAt: '2024-12-19'
  },
  {
    id: 'natural-therapy-assessment',
    icon: '🌿',
    filename: 'natural-therapy-assessment.pdf',
    titleKey: 'naturalTherapyAssessment.title',
    descriptionKey: 'naturalTherapyAssessment.description',
    category: 'management-tools',
    featured: false,
    fileSize: 1200,
    createdAt: '2024-12-19',
    updatedAt: '2024-12-19'
  },
  {
    id: 'healthy-habits-checklist',
    icon: '✅',
    filename: 'healthy-habits-checklist.pdf',
    titleKey: 'healthyHabitsChecklist.title',
    descriptionKey: 'healthyHabitsChecklist.description',
    category: 'management-tools',
    featured: false,
    fileSize: 702,
    createdAt: '2024-12-19',
    updatedAt: '2024-12-19'
  },
  {
    id: 'specific-menstrual-pain-management-guide',
    icon: '📋',
    filename: 'specific-menstrual-pain-management-guide.pdf',
    titleKey: 'specificMenstrualPainManagementGuide.title',
    descriptionKey: 'specificMenstrualPainManagementGuide.description',
    category: 'management-tools',
    featured: false,
    fileSize: 820,
    createdAt: '2024-12-19',
    updatedAt: '2024-12-19'
  },

  // 健康管理类 (4个)
  {
    id: 'menstrual-cycle-nutrition-plan',
    icon: '🥗',
    filename: 'menstrual-cycle-nutrition-plan.pdf',
    titleKey: 'menstrualCycleNutritionPlan.title',
    descriptionKey: 'menstrualCycleNutritionPlan.description',
    category: 'health-management',
    featured: true,
    fileSize: 1400,
    createdAt: '2024-12-19',
    updatedAt: '2024-12-19'
  },
  {
    id: 'magnesium-gut-health-guide',
    icon: '💊',
    filename: 'magnesium-gut-health-menstrual-pain-guide.pdf',
    titleKey: 'magnesiumGutHealthGuide.title',
    descriptionKey: 'magnesiumGutHealthGuide.description',
    category: 'health-management',
    featured: false,
    fileSize: 1000,
    createdAt: '2024-12-19',
    updatedAt: '2024-12-19'
  },
  {
    id: 'menstrual-pain-complications-management',
    icon: '⚠️',
    filename: 'menstrual-pain-complications-management.pdf',
    titleKey: 'menstrualPainComplicationsManagement.title',
    descriptionKey: 'menstrualPainComplicationsManagement.description',
    category: 'health-management',
    featured: false,
    fileSize: 888,
    createdAt: '2024-12-19',
    updatedAt: '2024-12-19'
  },
  {
    id: 'zhan-zhuang-baduanjin-illustrated-guide',
    icon: '🧘‍♀️',
    filename: 'zhan-zhuang-baduanjin-illustrated-guide.pdf',
    titleKey: 'zhanZhuangBaduanjinIllustratedGuide.title',
    descriptionKey: 'zhanZhuangBaduanjinIllustratedGuide.description',
    category: 'health-management',
    featured: false,
    fileSize: 867,
    createdAt: '2024-12-19',
    updatedAt: '2024-12-19'
  },

  // 沟通指导类 (4个)
  {
    id: 'campus-emergency-checklist',
    icon: '🏫',
    filename: 'campus-emergency-checklist.pdf',
    titleKey: 'campusEmergencyChecklist.title',
    descriptionKey: 'campusEmergencyChecklist.description',
    category: 'communication-guidance',
    featured: true,
    fileSize: 548,
    createdAt: '2024-12-19',
    updatedAt: '2024-12-19'
  },
  {
    id: 'parent-communication-guide',
    icon: '👨‍👩‍👧‍👦',
    filename: 'parent-communication-guide.pdf',
    titleKey: 'parentCommunicationGuide.title',
    descriptionKey: 'parentCommunicationGuide.description',
    category: 'communication-guidance',
    featured: false,
    fileSize: 642,
    createdAt: '2024-12-19',
    updatedAt: '2024-12-19'
  },
  {
    id: 'teacher-collaboration-handbook',
    icon: '👨‍🏫',
    filename: 'teacher-collaboration-handbook.pdf',
    titleKey: 'teacherCollaborationHandbook.title',
    descriptionKey: 'teacherCollaborationHandbook.description',
    category: 'communication-guidance',
    featured: false,
    fileSize: 679,
    createdAt: '2024-12-19',
    updatedAt: '2024-12-19'
  },
  {
    id: 'teacher-health-manual',
    icon: '👩‍⚕️',
    filename: 'teacher-health-manual.pdf',
    titleKey: 'teacherHealthManual.title',
    descriptionKey: 'teacherHealthManual.description',
    category: 'communication-guidance',
    featured: false,
    fileSize: 711,
    createdAt: '2024-12-19',
    updatedAt: '2024-12-19'
  },
  {
    id: 'us-insurance-quick-reference-card',
    icon: '💳',
    filename: 'us-insurance-quick-reference-card.html',
    titleKey: 'usInsuranceQuickReference.title',
    descriptionKey: 'usInsuranceQuickReference.description',
    category: 'communication-guidance',
    featured: true,
    fileSize: 450,
    createdAt: '2024-12-19',
    updatedAt: '2024-12-19'
  },

  // 教育资源类 (暂无资源)
];

/**
 * 获取所有PDF资源
 */
export function getAllPDFResources(): PDFResource[] {
  return PDF_RESOURCES;
}

/**
 * 根据分类获取PDF资源
 */
export function getPDFResourcesByCategory(category: string): PDFResource[] {
  return PDF_RESOURCES.filter(resource => resource.category === category);
}

/**
 * 根据ID获取PDF资源
 */
export function getPDFResourceById(id: string): PDFResource | undefined {
  return PDF_RESOURCES.find(resource => resource.id === id);
}

/**
 * 获取特色PDF资源
 */
export function getFeaturedPDFResources(): PDFResource[] {
  return PDF_RESOURCES.filter(resource => resource.featured);
}

/**
 * 获取PDF统计信息
 */
export function getResourceStats(): PDFStats {
  return calculatePDFStats(PDF_RESOURCES);
}

/**
 * 获取分类信息
 */
export function getCategoryInfo(categoryId: string): PDFCategoryInfo | undefined {
  return PDF_CATEGORIES.find(category => category.id === categoryId);
}

/**
 * 获取所有分类信息
 */
export function getAllCategories(): PDFCategoryInfo[] {
  return PDF_CATEGORIES.sort((a, b) => a.order - b.order);
}
