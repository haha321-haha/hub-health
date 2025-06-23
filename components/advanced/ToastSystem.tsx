'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useAppStore, useToasts } from '../../lib/stores/appStore';

// Toast类型
export type ToastType = 'success' | 'error' | 'warning' | 'info';

// Toast配置
export interface ToastConfig {
  type: ToastType;
  message: string;
  title?: string;
  duration?: number; // 0 表示不自动关闭
  action?: {
    label: string;
    onClick: () => void;
  };
  closable?: boolean;
}

// 单个Toast组件
interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  duration?: number;
  action?: ToastConfig['action'];
  closable?: boolean;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  message,
  title,
  duration = 5000,
  action,
  closable = true,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // 入场动画
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // 自动关闭
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(id);
    }, 300); // 等待退场动画完成
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      case 'info':
        return 'text-blue-800';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div
      className={`
        transform transition-all duration-300 ease-in-out
        ${isVisible && !isLeaving 
          ? 'translate-x-0 opacity-100' 
          : 'translate-x-full opacity-0'
        }
        max-w-sm w-full ${getBackgroundColor()} border rounded-lg shadow-lg p-4 mb-3
      `}
    >
      <div className="flex items-start space-x-3">
        {/* 图标 */}
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>

        {/* 内容 */}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`text-sm font-semibold ${getTextColor()} mb-1`}>
              {title}
            </h4>
          )}
          <p className={`text-sm ${getTextColor()}`}>
            {message}
          </p>

          {/* 操作按钮 */}
          {action && (
            <button
              onClick={action.onClick}
              className={`
                mt-2 text-xs font-medium underline hover:no-underline
                ${type === 'success' ? 'text-green-700 hover:text-green-800' : ''}
                ${type === 'error' ? 'text-red-700 hover:text-red-800' : ''}
                ${type === 'warning' ? 'text-yellow-700 hover:text-yellow-800' : ''}
                ${type === 'info' ? 'text-blue-700 hover:text-blue-800' : ''}
              `}
            >
              {action.label}
            </button>
          )}
        </div>

        {/* 关闭按钮 */}
        {closable && (
          <button
            onClick={handleClose}
            className={`
              flex-shrink-0 p-1 rounded-md hover:bg-white/50 transition-colors
              ${getTextColor()}
            `}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 进度条（如果有持续时间） */}
      {duration > 0 && (
        <div className="mt-3 w-full bg-white/30 rounded-full h-1">
          <div
            className={`
              h-1 rounded-full transition-all ease-linear
              ${type === 'success' ? 'bg-green-500' : ''}
              ${type === 'error' ? 'bg-red-500' : ''}
              ${type === 'warning' ? 'bg-yellow-500' : ''}
              ${type === 'info' ? 'bg-blue-500' : ''}
            `}
            style={{
              width: '100%',
              animation: `shrink ${duration}ms linear`,
            }}
          />
        </div>
      )}
    </div>
  );
};

// Toast容器组件
export const ToastContainer: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const toasts = useToasts();
  const removeToast = useAppStore(state => state.removeToast);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const container = (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={removeToast}
        />
      ))}
    </div>
  );

  return createPortal(container, document.body);
};

// Toast Hook
export const useToast = () => {
  const addToast = useAppStore(state => state.addToast);
  const removeToast = useAppStore(state => state.removeToast);
  const clearToasts = useAppStore(state => state.clearToasts);

  const toast = {
    success: (message: string, options?: Partial<ToastConfig>) => {
      return addToast({
        type: 'success',
        message,
        ...options,
      });
    },

    error: (message: string, options?: Partial<ToastConfig>) => {
      return addToast({
        type: 'error',
        message,
        duration: 0, // 错误消息默认不自动关闭
        ...options,
      });
    },

    warning: (message: string, options?: Partial<ToastConfig>) => {
      return addToast({
        type: 'warning',
        message,
        ...options,
      });
    },

    info: (message: string, options?: Partial<ToastConfig>) => {
      return addToast({
        type: 'info',
        message,
        ...options,
      });
    },

    custom: (config: ToastConfig) => {
      return addToast(config);
    },

    dismiss: (id: string) => {
      removeToast(id);
    },

    dismissAll: () => {
      clearToasts();
    },
  };

  return toast;
};

// 添加CSS动画
const toastStyles = `
  @keyframes shrink {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;

// 注入样式
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = toastStyles;
  document.head.appendChild(styleElement);
}
