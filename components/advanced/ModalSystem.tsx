'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useAppStore } from '../../lib/stores/appStore';

// 模态框类型
export type ModalType = 'default' | 'confirm' | 'alert' | 'custom';

// 模态框配置
export interface ModalConfig {
  type?: ModalType;
  title?: string;
  content?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  maskClosable?: boolean;
  showFooter?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
  zIndex?: number;
}

// 确认对话框配置
export interface ConfirmConfig {
  title?: string;
  content: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

// 模态框组件
interface ModalProps extends ModalConfig {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  type = 'default',
  title,
  content,
  children,
  size = 'md',
  closable = true,
  maskClosable = true,
  showFooter = false,
  confirmText = '确认',
  cancelText = '取消',
  onConfirm,
  onCancel,
  className = '',
  zIndex = 1000,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
      }, 200);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleMaskClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget && maskClosable) {
      onClose();
    }
  }, [maskClosable, onClose]);

  const handleConfirm = useCallback(async () => {
    if (onConfirm) {
      try {
        await onConfirm();
        onClose();
      } catch (error) {
        console.error('Modal confirm error:', error);
      }
    } else {
      onClose();
    }
  }, [onConfirm, onClose]);

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  }, [onCancel, onClose]);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-sm';
      case 'md':
        return 'max-w-md';
      case 'lg':
        return 'max-w-lg';
      case 'xl':
        return 'max-w-xl';
      case 'full':
        return 'max-w-full mx-4';
      default:
        return 'max-w-md';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'confirm':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'alert':
        return <Info className="w-6 h-6 text-blue-500" />;
      default:
        return null;
    }
  };

  if (!isVisible) return null;

  const modalContent = (
    <div
      className={`fixed inset-0 flex items-center justify-center p-4`}
      style={{ zIndex }}
      onClick={handleMaskClick}
    >
      {/* 背景遮罩 */}
      <div
        className={`
          absolute inset-0 bg-black transition-opacity duration-200
          ${isAnimating ? 'opacity-50' : 'opacity-0'}
        `}
      />

      {/* 模态框内容 */}
      <div
        className={`
          relative bg-white rounded-lg shadow-xl w-full ${getSizeClasses()}
          transform transition-all duration-200
          ${isAnimating 
            ? 'scale-100 opacity-100' 
            : 'scale-95 opacity-0'
          }
          ${className}
        `}
      >
        {/* 头部 */}
        {(title || closable) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              {getTypeIcon()}
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">
                  {title}
                </h3>
              )}
            </div>
            {closable && (
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* 内容 */}
        <div className="p-6">
          {content || children}
        </div>

        {/* 底部 */}
        {showFooter && (
          <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

// 模态框管理器
export const ModalManager: React.FC = () => {
  const modal = useAppStore(state => state.ui.modal);
  const closeModal = useAppStore(state => state.closeModal);

  return (
    <Modal
      isOpen={modal.isOpen}
      onClose={closeModal}
      {...(modal.data as ModalConfig)}
    />
  );
};

// 模态框Hook
export const useModal = () => {
  const openModal = useAppStore(state => state.openModal);
  const closeModal = useAppStore(state => state.closeModal);

  const modal = {
    open: (config: ModalConfig) => {
      openModal('custom', config);
    },

    close: () => {
      closeModal();
    },

    confirm: (config: ConfirmConfig): Promise<boolean> => {
      return new Promise((resolve) => {
        const modalConfig: ModalConfig = {
          type: 'confirm',
          title: config.title || '确认操作',
          content: config.content,
          showFooter: true,
          confirmText: config.confirmText || '确认',
          cancelText: config.cancelText || '取消',
          onConfirm: async () => {
            if (config.onConfirm) {
              await config.onConfirm();
            }
            resolve(true);
          },
          onCancel: () => {
            if (config.onCancel) {
              config.onCancel();
            }
            resolve(false);
          },
        };

        openModal('confirm', modalConfig);
      });
    },

    alert: (content: React.ReactNode, title?: string): Promise<void> => {
      return new Promise((resolve) => {
        const modalConfig: ModalConfig = {
          type: 'alert',
          title: title || '提示',
          content,
          showFooter: true,
          confirmText: '确定',
          onConfirm: () => {
            resolve();
          },
        };

        openModal('alert', modalConfig);
      });
    },

    // 便捷方法
    success: (content: React.ReactNode, title?: string) => {
      return modal.alert(
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <div>{content}</div>
        </div>,
        title || '成功'
      );
    },

    error: (content: React.ReactNode, title?: string) => {
      return modal.alert(
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          <div>{content}</div>
        </div>,
        title || '错误'
      );
    },

    warning: (content: React.ReactNode, title?: string) => {
      return modal.confirm({
        title: title || '警告',
        content: (
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            <div>{content}</div>
          </div>
        ),
        type: 'warning',
      });
    },
  };

  return modal;
};
