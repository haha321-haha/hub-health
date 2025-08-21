import {getRequestConfig} from 'next-intl/server';

// Locale configuration for next-intl (v3)
export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = 'zh';
// 改为 never，让 next-intl 自动处理根路径重定向
export const localePrefix = 'never' as const;

export default getRequestConfig(async ({locale}) => {
  const safeLocale = locales.includes(locale as any) ? locale : defaultLocale;
  const messages = (await import(`./messages/${safeLocale}.json`)).default;
  return {locale: safeLocale, messages};
});
