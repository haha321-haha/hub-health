/**
 * PDF ID映射配置
 * 解决SimplePDFCenter组件中的PDF ID与pdfResources配置不匹配问题
 */

// SimplePDFCenter -> pdfResources 映射表
export const PDF_ID_MAPPING: Record<string, string> = {
  // 即时缓解类PDF映射
  'immediate-pdf-1': 'pain-tracking-form',
  'immediate-pdf-2': 'campus-emergency-checklist', 
  'immediate-pdf-3': 'specific-menstrual-pain-management-guide',
  
  // 计划准备类PDF映射
  'preparation-pdf-1': 'healthy-habits-checklist',
  'preparation-pdf-2': 'menstrual-cycle-nutrition-plan',
  'preparation-pdf-3': 'magnesium-gut-health-menstrual-pain-guide',
  'preparation-pdf-4': 'zhan-zhuang-baduanjin-illustrated-guide',
  
  // 学习理解类PDF映射
  'learning-pdf-1': 'natural-therapy-assessment',
  'learning-pdf-2': 'menstrual-pain-complications-management',
  'learning-pdf-3': 'teacher-health-manual',
  'learning-pdf-4': 'teacher-collaboration-handbook',
  'learning-pdf-5': 'parent-communication-guide',
  'learning-pdf-6': 'us-insurance-quick-reference-card',
  
  // 长期管理类PDF映射（预留）
  'management-pdf-1': 'pain-tracking-form', // 复用
  'management-pdf-2': 'natural-therapy-assessment', // 复用
  'management-pdf-3': 'healthy-habits-checklist', // 复用
};

/**
 * 将SimplePDFCenter的PDF ID转换为真实的资源ID
 */
export function mapPDFId(simplePDFId: string): string {
  return PDF_ID_MAPPING[simplePDFId] || simplePDFId;
}

/**
 * 检查PDF ID是否存在映射
 */
export function hasPDFMapping(simplePDFId: string): boolean {
  return simplePDFId in PDF_ID_MAPPING;
}

/**
 * 获取所有映射的PDF ID
 */
export function getAllMappedIds(): string[] {
  return Object.keys(PDF_ID_MAPPING);
}

/**
 * 反向映射：从真实ID找到SimplePDF ID
 */
export function getSimplePDFId(realId: string): string | undefined {
  for (const [simpleId, realId_] of Object.entries(PDF_ID_MAPPING)) {
    if (realId_ === realId) {
      return simpleId;
    }
  }
  return undefined;
} 