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

  // 根路径直接重定向到中文首页，使用临时重定向避免循环
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/zh';
    return NextResponse.redirect(url, 302); // 改为302临时重定向
  }

  // 其他路径交给 next-intl 处理
  return intlMiddleware(request);
}

// 避免在静态资源与内部路径上运行中间件
export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)']
};


