'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle, Upload, X } from 'lucide-react';

// 表单字段类型
export type FieldType = 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'date' | 'range';

// 验证规则
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

// 字段配置
export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string | number }[];
  validation?: ValidationRule;
  disabled?: boolean;
  className?: string;
  description?: string;
}

// 表单状态
export interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// 表单Hook
export const useForm = (initialValues: Record<string, any> = {}) => {
  const [state, setState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true,
  });

  const validateField = useCallback((name: string, value: any, rules?: ValidationRule): string | null => {
    if (!rules) return null;

    if (rules.required && (!value || value.toString().trim() === '')) {
      return '此字段为必填项';
    }

    if (rules.minLength && value && value.toString().length < rules.minLength) {
      return `最少需要 ${rules.minLength} 个字符`;
    }

    if (rules.maxLength && value && value.toString().length > rules.maxLength) {
      return `最多允许 ${rules.maxLength} 个字符`;
    }

    if (rules.min && typeof value === 'number' && value < rules.min) {
      return `最小值为 ${rules.min}`;
    }

    if (rules.max && typeof value === 'number' && value > rules.max) {
      return `最大值为 ${rules.max}`;
    }

    if (rules.pattern && value && !rules.pattern.test(value.toString())) {
      return '格式不正确';
    }

    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  }, []);

  const setValue = useCallback((name: string, value: any, rules?: ValidationRule) => {
    setState(prev => {
      const error = validateField(name, value, rules);
      const newErrors = { ...prev.errors };
      
      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name];
      }

      return {
        ...prev,
        values: { ...prev.values, [name]: value },
        errors: newErrors,
        isValid: Object.keys(newErrors).length === 0,
      };
    });
  }, [validateField]);

  const setTouched = useCallback((name: string, touched: boolean = true) => {
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: touched },
    }));
  }, []);

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setState(prev => ({ ...prev, isSubmitting }));
  }, []);

  const reset = useCallback((newValues: Record<string, any> = {}) => {
    setState({
      values: newValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: true,
    });
  }, []);

  const validateAll = useCallback((fields: FieldConfig[]) => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      const error = validateField(field.name, state.values[field.name], field.validation);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    setState(prev => ({
      ...prev,
      errors: newErrors,
      isValid: Object.keys(newErrors).length === 0,
    }));

    return Object.keys(newErrors).length === 0;
  }, [state.values, validateField]);

  return {
    ...state,
    setValue,
    setTouched,
    setSubmitting,
    reset,
    validateAll,
  };
};

// 输入字段组件
interface InputFieldProps {
  config: FieldConfig;
  value: any;
  error?: string;
  touched?: boolean;
  onChange: (value: any) => void;
  onBlur: () => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  config,
  value,
  error,
  touched,
  onChange,
  onBlur,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasError = touched && error;
  const isValid = touched && !error && value;

  const baseInputClasses = `
    w-full px-3 py-2 border rounded-md transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${hasError ? 'border-red-500 bg-red-50' : ''}
    ${isValid ? 'border-green-500 bg-green-50' : ''}
    ${!hasError && !isValid ? 'border-gray-300' : ''}
    ${config.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
  `;

  const renderInput = () => {
    switch (config.type) {
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={config.placeholder}
            disabled={config.disabled}
            className={`${baseInputClasses} min-h-[100px] resize-vertical`}
            rows={4}
          />
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            disabled={config.disabled}
            className={baseInputClasses}
          >
            <option value="">{config.placeholder || '请选择...'}</option>
            {config.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
              onBlur={onBlur}
              disabled={config.disabled}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{config.label}</span>
          </label>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {config.options?.map((option) => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={config.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  disabled={config.disabled}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'file':
        return (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={(e) => onChange(e.target.files?.[0] || null)}
              onBlur={onBlur}
              disabled={config.disabled}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={config.disabled}
              className={`${baseInputClasses} flex items-center justify-center space-x-2 cursor-pointer hover:bg-gray-50`}
            >
              <Upload className="w-4 h-4" />
              <span>{value ? value.name : config.placeholder || '选择文件'}</span>
            </button>
          </div>
        );

      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={config.validation?.min || 0}
              max={config.validation?.max || 100}
              value={value || 0}
              onChange={(e) => onChange(Number(e.target.value))}
              onBlur={onBlur}
              disabled={config.disabled}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{config.validation?.min || 0}</span>
              <span className="font-medium">{value || 0}</span>
              <span>{config.validation?.max || 100}</span>
            </div>
          </div>
        );

      case 'password':
        return (
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              placeholder={config.placeholder}
              disabled={config.disabled}
              className={`${baseInputClasses} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        );

      default:
        return (
          <input
            type={config.type}
            value={value || ''}
            onChange={(e) => onChange(config.type === 'number' ? Number(e.target.value) : e.target.value)}
            onBlur={onBlur}
            placeholder={config.placeholder}
            disabled={config.disabled}
            className={baseInputClasses}
          />
        );
    }
  };

  if (config.type === 'checkbox') {
    return (
      <div className={config.className}>
        {renderInput()}
        {hasError && (
          <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
        {config.description && (
          <p className="mt-1 text-xs text-gray-500">{config.description}</p>
        )}
      </div>
    );
  }

  return (
    <div className={config.className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {config.label}
        {config.validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {renderInput()}
        
        {/* 状态图标 */}
        {!['checkbox', 'radio', 'file', 'range'].includes(config.type) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {hasError && <AlertCircle className="w-4 h-4 text-red-500" />}
            {isValid && <CheckCircle className="w-4 h-4 text-green-500" />}
          </div>
        )}
      </div>

      {/* 错误信息 */}
      {hasError && (
        <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* 描述信息 */}
      {config.description && (
        <p className="mt-1 text-xs text-gray-500">{config.description}</p>
      )}
    </div>
  );
};
