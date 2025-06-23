'use client';

import React, { useEffect, ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { ToastContainer } from './ToastSystem';
import { ModalManager } from './ModalSystem';
import { useAppStore } from '../../lib/stores/appStore';
import { performanceMonitor } from '../../lib/performance/monitor';

interface AppProviderProps {
  children: ReactNode;
}

// 应用级别的Provider组件
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const preferences = useAppStore(state => state.preferences);
  const recordPageLoadTime = useAppStore(state => state.recordPageLoadTime);

  // 初始化应用
  useEffect(() => {
    // 记录页面加载时间
    const loadTime = performance.now();
    recordPageLoadTime(loadTime);

    // 应用主题
    applyTheme(preferences.theme);

    // 应用字体大小
    applyFontSize(preferences.fontSize);

    // 应用可访问性设置
    applyAccessibilitySettings(preferences.accessibility);

    // 启用性能监控
    if (preferences.privacy.analytics) {
      performanceMonitor.setEnabled(true);
    }

    // 清理函数
    return () => {
      performanceMonitor.cleanup();
    };
  }, []);

  // 监听偏好设置变化
  useEffect(() => {
    applyTheme(preferences.theme);
  }, [preferences.theme]);

  useEffect(() => {
    applyFontSize(preferences.fontSize);
  }, [preferences.fontSize]);

  useEffect(() => {
    applyAccessibilitySettings(preferences.accessibility);
  }, [preferences.accessibility]);

  useEffect(() => {
    performanceMonitor.setEnabled(preferences.privacy.analytics);
  }, [preferences.privacy.analytics]);

  return (
    <ErrorBoundary level="critical">
      <div className="app-container">
        {children}
        <ToastContainer />
        <ModalManager />
      </div>
    </ErrorBoundary>
  );
};

// 应用主题
function applyTheme(theme: 'light' | 'dark' | 'system') {
  const root = document.documentElement;
  
  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefersDark ? 'dark' : 'light';
  }

  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  
  // 更新meta标签
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', theme === 'dark' ? '#1f2937' : '#ffffff');
  }
}

// 应用字体大小
function applyFontSize(fontSize: 'small' | 'medium' | 'large') {
  const root = document.documentElement;
  
  root.classList.remove('text-sm', 'text-base', 'text-lg');
  
  switch (fontSize) {
    case 'small':
      root.classList.add('text-sm');
      break;
    case 'large':
      root.classList.add('text-lg');
      break;
    default:
      root.classList.add('text-base');
  }
}

// 应用可访问性设置
function applyAccessibilitySettings(accessibility: {
  highContrast: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
}) {
  const root = document.documentElement;
  
  // 高对比度
  if (accessibility.highContrast) {
    root.classList.add('high-contrast');
  } else {
    root.classList.remove('high-contrast');
  }
  
  // 减少动画
  if (accessibility.reducedMotion) {
    root.classList.add('reduce-motion');
  } else {
    root.classList.remove('reduce-motion');
  }
  
  // 屏幕阅读器优化
  if (accessibility.screenReader) {
    root.classList.add('screen-reader-optimized');
  } else {
    root.classList.remove('screen-reader-optimized');
  }
}

// 页面级别的Provider
interface PageProviderProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string[];
}

export const PageProvider: React.FC<PageProviderProps> = ({
  children,
  title,
  description,
  keywords = [],
}) => {
  useEffect(() => {
    // 更新页面标题
    if (title) {
      document.title = `${title} - Period Hub Health`;
    }

    // 更新meta描述
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }

    // 更新meta关键词
    if (keywords.length > 0) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords.join(', '));
      }
    }
  }, [title, description, keywords]);

  return (
    <ErrorBoundary level="page">
      {children}
    </ErrorBoundary>
  );
};

// 组件级别的Provider
interface ComponentProviderProps {
  children: ReactNode;
  name?: string;
  fallback?: ReactNode;
}

export const ComponentProvider: React.FC<ComponentProviderProps> = ({
  children,
  name,
  fallback,
}) => {
  return (
    <ErrorBoundary 
      level="component" 
      fallback={fallback}
      onError={(error, errorInfo) => {
        console.error(`Component error in ${name}:`, error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

// 性能监控Hook
export const usePagePerformance = (pageName: string) => {
  useEffect(() => {
    const startTime = performance.now();
    
    // 记录页面访问
    performanceMonitor.recordCustomInteraction('navigation', pageName);
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // 记录页面停留时间
      performanceMonitor.recordCustomInteraction('navigation', `${pageName}_duration`, duration);
    };
  }, [pageName]);
};

// 用户行为追踪Hook
export const useUserTracking = () => {
  const recordInteraction = (type: string, element: string, data?: any) => {
    performanceMonitor.recordCustomInteraction(type as any, element);
    
    // 可以在这里添加更多的用户行为分析
    console.log('User interaction:', { type, element, data, timestamp: Date.now() });
  };

  return { recordInteraction };
};
