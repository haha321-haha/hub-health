import '../globals.css';
import NextDynamic from 'next/dynamic';
import {NextIntlClientProvider} from 'next-intl';
import {unstable_setRequestLocale as setRequestLocale} from 'next-intl/server';

// 动态导入组件以避免hydration问题
const Header = NextDynamic(() => import('@/components/Header'), { 
  ssr: false,
  loading: () => <div className="h-16 bg-white border-b"></div>
});
const Footer = NextDynamic(() => import('@/components/Footer'), { 
  ssr: false,
  loading: () => <div className="h-32 bg-gray-50"></div>
});

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 确保在服务端设置当前请求的语言环境
  setRequestLocale(locale);

  let messages;
  try {
    // 加载对应语言的消息字典
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    // 回退到默认语言
    messages = (await import(`../../messages/zh.json`)).default;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}