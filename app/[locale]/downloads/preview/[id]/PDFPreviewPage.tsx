'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, Share2, FileText, Printer } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Locale } from '@/i18n';
import { getPDFResourceById } from '@/config/pdfResources';

interface PDFPreviewPageProps {
  locale: Locale;
  resourceId: string;
}

export default function PDFPreviewPage({ locale, resourceId }: PDFPreviewPageProps) {
  const router = useRouter();
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const resource = getPDFResourceById(resourceId);
  const t = useTranslations('downloadsPage.resources');

  useEffect(() => {
    console.log('=== PDFPreviewPage useEffect 开始 ===');
    console.log('resourceId:', resourceId);
    console.log('locale:', locale);
    console.log('resource:', resource);
    
    if (!resource) {
      console.log('❌ 资源未找到');
      setError('Resource not found');
      setLoading(false);
      return;
    }

    // 构建HTML文件路径
    let htmlFilename = resource.filename.replace('.pdf', '.html');
    console.log('初始 htmlFilename:', htmlFilename);
    
    if (locale === 'en' && !htmlFilename.includes('-en')) {
      htmlFilename = htmlFilename.replace('.html', '-en.html');
      console.log('英文版 htmlFilename:', htmlFilename);
    }
    
    console.log('最终 htmlFilename:', htmlFilename);
    const fetchUrl = `/pdf-files/${htmlFilename}`;
    console.log('fetch URL:', fetchUrl);

    // 加载HTML内容
    console.log('🚀 开始 fetch 请求...');
    fetch(fetchUrl)
      .then(response => {
        console.log('✅ fetch 响应收到');
        console.log('response.ok:', response.ok);
        console.log('response.status:', response.status);
        console.log('response.statusText:', response.statusText);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText} - File not found: ${htmlFilename}`);
        }
        return response.text();
      })
      .then(html => {
        console.log('✅ HTML 内容加载成功');
        console.log('HTML 长度:', html.length);
        console.log('HTML 开头:', html.substring(0, 100));
        
        setHtmlContent(html);
        setLoading(false);
        console.log('✅ 状态更新完成，loading = false');
      })
      .catch(err => {
        console.error('❌ fetch 失败:', err);
        console.error('错误详情:', {
          message: err.message,
          stack: err.stack,
          fetchUrl: fetchUrl,
          htmlFilename: htmlFilename,
          resourceId: resourceId,
          locale: locale
        });
        setError(`Failed to load preview content: ${err.message}`);
        setLoading(false);
      });
  }, [resource, locale]);

  const handleDownload = () => {
    if (!resource) return;

    // 确定正确的HTML文件名（与预览页面使用相同的逻辑）
    let htmlFilename = resource.filename.replace('.pdf', '.html');
    if (locale === 'en' && !htmlFilename.includes('-en')) {
      htmlFilename = htmlFilename.replace('.html', '-en.html');
    }

    // 创建下载链接
    const url = `/pdf-files/${htmlFilename}`;

    // 创建临时链接进行下载
    const link = document.createElement('a');
    link.href = url;
    link.download = htmlFilename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log(`下载HTML格式PDF: ${htmlFilename}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const resourceTitle = resource ? t(resource.titleKey) : '';
    const shareData = {
      title: `Period Hub - ${resourceTitle}`,
      text: locale === 'zh' ? '推荐这个有用的经期健康资源' : 'Recommended period health resource',
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert(locale === 'zh' ? '链接已复制到剪贴板！' : 'Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const handleBack = () => {
    router.push(`/${locale}/downloads`);
  };

  if (!resource) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'zh' ? '资源未找到' : 'Resource Not Found'}
          </h1>
          <p className="text-gray-600 mb-6">
            {locale === 'zh'
              ? '抱歉，您请求的资源不存在。'
              : 'Sorry, the requested resource does not exist.'}
          </p>
          <button
            onClick={handleBack}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {locale === 'zh' ? '返回下载中心' : 'Back to Downloads'}
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">
            {locale === 'zh' ? '正在加载预览内容...' : 'Loading preview content...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'zh' ? '预览不可用' : 'Preview Unavailable'}
          </h1>
          <p className="text-gray-600 mb-6">
            {locale === 'zh'
              ? '抱歉，此资源暂不支持在线预览，请直接下载PDF文件。'
              : 'Sorry, online preview is not available for this resource. Please download the PDF directly.'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleBack}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {locale === 'zh' ? '返回列表' : 'Back to List'}
            </button>
            <button
              onClick={handleDownload}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              {locale === 'zh' ? '下载PDF' : 'Download PDF'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 固定顶部工具栏 */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">
                {locale === 'zh' ? '返回列表' : 'Back to List'}
              </span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-purple-600 transition-colors"
                title={locale === 'zh' ? '打印或保存为PDF' : 'Print or Save as PDF'}
              >
                <Printer className="w-5 h-5 mr-1" />
                <span className="text-sm hidden sm:inline">
                  {locale === 'zh' ? '打印' : 'Print'}
                </span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-purple-600 transition-colors"
                title={locale === 'zh' ? '分享' : 'Share'}
              >
                <Share2 className="w-5 h-5 mr-1" />
                <span className="text-sm hidden sm:inline">
                  {locale === 'zh' ? '分享' : 'Share'}
                </span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">
                  {locale === 'zh' ? '下载PDF' : 'Download PDF'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HTML内容展示区域 */}
      <div className="pt-16">
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          className="preview-content"
        />
      </div>

      {/* 打印样式 */}
      <style jsx global>{`
        @media print {
          .fixed {
            display: none !important;
          }
          .preview-content {
            padding-top: 0 !important;
          }
          body {
            background: white !important;
          }
        }

        .preview-content {
          max-width: none;
        }

        .preview-content body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
