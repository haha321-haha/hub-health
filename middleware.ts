import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale, localePrefix} from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix
});

// Ensure we don't run middleware for static assets, Next internals or common files
export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'
  ]
};


