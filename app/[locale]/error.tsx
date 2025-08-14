'use client';
import { unstable_setRequestLocale as setRequestLocale } from 'next-intl/server';

export default function LocaleError({ error, reset, params: { locale } }: { error: Error & { digest?: string }; reset: () => void; params: { locale: string } }) {
  setRequestLocale(locale);
  const isZh = locale === 'zh';
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">{isZh ? '抱歉，发生了错误' : 'Something went wrong'}</h1>
      <p className="text-neutral-600">{isZh ? '请重试或返回首页。' : 'Please try again or go back to home.'}</p>
      <div className="flex gap-3">
        <button onClick={reset} className="px-4 py-2 rounded-lg text-white" style={{ background: '#111827' }}>
          {isZh ? '重试' : 'Retry'}
        </button>
        <a href={`/${locale}`} className="px-4 py-2 rounded-lg text-white" style={{ background: '#7c3aed' }}>
          {isZh ? '返回首页' : 'Back to Home'}
        </a>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';