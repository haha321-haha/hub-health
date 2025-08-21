import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 完全移除手动重定向，让 next-intl 自己处理
  // 这样可以避免重定向循环
  return intlMiddleware(request);
}

// 避免在静态资源与内部路径上运行中间件
export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)']
};


