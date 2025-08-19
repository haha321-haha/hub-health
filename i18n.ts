import {getRequestConfig} from 'next-intl/server';

// Locale configuration for next-intl (v3)
export const locales = ['zh', 'en'] as const;
export const defaultLocale = 'zh';
// Keep URLs clean when possible
export const localePrefix = 'as-needed' as const;

export default getRequestConfig(async ({locale}) => {
  const safeLocale = locales.includes(locale as any) ? locale : defaultLocale;
  const messages = (await import(`./messages/${safeLocale}.json`)).default;
  return {locale: safeLocale, messages};
});
