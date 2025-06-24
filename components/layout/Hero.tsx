'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function Hero() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600"></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href={`/${locale}/interactive-tools`}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block text-center"
            >
              {t('hero.cta')}
            </Link>

            <Link
              href={`/${locale}/articles`}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 inline-block text-center"
            >
              {t('hero.learnMore')}
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-semibold text-lg mb-2">{t('hero.features.articles')}</h3>
              <p className="text-white/80">{t('hero.features.articlesDesc')}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-3">🔧</div>
              <h3 className="font-semibold text-lg mb-2">{t('hero.features.tools')}</h3>
              <p className="text-white/80">{t('hero.features.toolsDesc')}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-semibold text-lg mb-2">{t('hero.features.support')}</h3>
              <p className="text-white/80">{t('hero.features.supportDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-300/20 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-300/20 rounded-full blur-xl"></div>
    </section>
  );
}
