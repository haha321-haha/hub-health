'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { useAppStore } from '../../lib/stores/appStore';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
  level?: 'page' | 'component' | 'critical';
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  private retryCount = 0;
  private maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      errorInfo,
    });

    // 记录错误到应用状态
    useAppStore.getState().incrementErrorCount();

    // 调用自定义错误处理
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // 发送错误报告（在生产环境中）
    if (process.env.NODE_ENV === 'production') {
      this.reportError(error, errorInfo);
    }

    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private reportError = async (error: Error, errorInfo: ErrorInfo) => {
    try {
      // 这里可以发送到错误监控服务
      const errorReport = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        errorId: this.state.errorId,
        level: this.props.level || 'component',
      };

      // 发送到监控服务（示例）
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorReport),
      // });

      console.log('Error reported:', errorReport);
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  };

  private handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        errorId: null,
      });
    } else {
      // 达到最大重试次数，刷新页面
      window.location.reload();
    }
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleReportBug = () => {
    const { error, errorInfo, errorId } = this.state;
    const bugReport = {
      errorId,
      message: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };

    // 打开邮件客户端或错误报告页面
    const subject = encodeURIComponent(`Bug Report: ${error?.message || 'Unknown Error'}`);
    const body = encodeURIComponent(`
Error ID: ${errorId}
URL: ${window.location.href}
Time: ${new Date().toISOString()}

Error Details:
${error?.message}

Stack Trace:
${error?.stack}

Component Stack:
${errorInfo?.componentStack}

Please describe what you were doing when this error occurred:
[Your description here]
    `);

    window.open(`mailto:support@periodhub.health?subject=${subject}&body=${body}`);
  };

  render() {
    if (this.state.hasError) {
      // 如果提供了自定义fallback，使用它
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorInfo, errorId } = this.state;
      const { level = 'component', showDetails = false } = this.props;

      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg border border-red-200">
            <div className="p-6">
              {/* 错误图标和标题 */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {level === 'critical' ? '严重错误' : '出现错误'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {level === 'critical' 
                      ? '应用遇到了严重问题' 
                      : '这个组件遇到了问题'}
                  </p>
                </div>
              </div>

              {/* 错误信息 */}
              <div className="mb-6">
                <p className="text-sm text-gray-700 mb-2">
                  我们很抱歉给您带来不便。错误已被记录，我们会尽快修复。
                </p>
                
                {errorId && (
                  <p className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                    错误ID: {errorId}
                  </p>
                )}

                {/* 详细错误信息（开发模式或显式启用） */}
                {(showDetails || process.env.NODE_ENV === 'development') && error && (
                  <details className="mt-3">
                    <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                      查看技术详情
                    </summary>
                    <div className="mt-2 p-3 bg-gray-50 rounded text-xs font-mono">
                      <div className="mb-2">
                        <strong>错误信息:</strong>
                        <div className="text-red-600">{error.message}</div>
                      </div>
                      
                      {error.stack && (
                        <div className="mb-2">
                          <strong>堆栈跟踪:</strong>
                          <pre className="whitespace-pre-wrap text-gray-600 max-h-32 overflow-y-auto">
                            {error.stack}
                          </pre>
                        </div>
                      )}
                      
                      {errorInfo?.componentStack && (
                        <div>
                          <strong>组件堆栈:</strong>
                          <pre className="whitespace-pre-wrap text-gray-600 max-h-32 overflow-y-auto">
                            {errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </details>
                )}
              </div>

              {/* 操作按钮 */}
              <div className="flex flex-col space-y-2">
                {this.retryCount < this.maxRetries ? (
                  <button
                    onClick={this.handleRetry}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>重试 ({this.maxRetries - this.retryCount} 次剩余)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>刷新页面</span>
                  </button>
                )}

                <div className="flex space-x-2">
                  <button
                    onClick={this.handleGoHome}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    <span>返回首页</span>
                  </button>

                  <button
                    onClick={this.handleReportBug}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                  >
                    <Bug className="w-4 h-4" />
                    <span>报告问题</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// 高阶组件包装器
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

// Hook版本
export function useErrorHandler() {
  const incrementErrorCount = useAppStore(state => state.incrementErrorCount);

  return (error: Error, errorInfo?: ErrorInfo) => {
    incrementErrorCount();
    console.error('Error caught by useErrorHandler:', error, errorInfo);
    
    // 可以在这里添加更多错误处理逻辑
    if (process.env.NODE_ENV === 'production') {
      // 发送错误报告
    }
  };
}
