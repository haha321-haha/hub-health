'use client';

import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Activity } from 'lucide-react';

// 数据点类型
export interface DataPoint {
  label: string;
  value: number;
  color?: string;
  date?: string;
}

// 图表配置
export interface ChartConfig {
  width?: number;
  height?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  showLegend?: boolean;
  colors?: string[];
  animate?: boolean;
}

// 线性图表组件
interface LineChartProps {
  data: DataPoint[];
  config?: ChartConfig;
  className?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  config = {},
  className = '',
}) => {
  const {
    width = 400,
    height = 200,
    showGrid = true,
    showLabels = true,
    colors = ['#3b82f6'],
  } = config;

  const { points, maxValue, minValue } = useMemo(() => {
    if (data.length === 0) return { points: '', maxValue: 0, minValue: 0 };

    const values = data.map(d => d.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;

    const pointsStr = data
      .map((point, index) => {
        const x = (index / (data.length - 1)) * (width - 40) + 20;
        const y = height - 20 - ((point.value - min) / range) * (height - 40);
        return `${x},${y}`;
      })
      .join(' ');

    return { points: pointsStr, maxValue: max, minValue: min };
  }, [data, width, height]);

  return (
    <div className={`bg-white rounded-lg border p-4 ${className}`}>
      <svg width={width} height={height} className="w-full h-auto">
        {/* 网格线 */}
        {showGrid && (
          <g className="opacity-20">
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
              <line
                key={ratio}
                x1={20}
                y1={20 + ratio * (height - 40)}
                x2={width - 20}
                y2={20 + ratio * (height - 40)}
                stroke="currentColor"
                strokeWidth="1"
              />
            ))}
          </g>
        )}

        {/* 数据线 */}
        <polyline
          points={points}
          fill="none"
          stroke={colors[0]}
          strokeWidth="2"
          className="transition-all duration-300"
        />

        {/* 数据点 */}
        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * (width - 40) + 20;
          const y = height - 20 - ((point.value - minValue) / (maxValue - minValue || 1)) * (height - 40);
          
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill={colors[0]}
              className="hover:r-6 transition-all duration-200 cursor-pointer"
            >
              <title>{`${point.label}: ${point.value}`}</title>
            </circle>
          );
        })}

        {/* 标签 */}
        {showLabels && (
          <g className="text-xs fill-current text-gray-600">
            <text x={20} y={15} textAnchor="start">{maxValue}</text>
            <text x={20} y={height - 5} textAnchor="start">{minValue}</text>
          </g>
        )}
      </svg>
    </div>
  );
};

// 柱状图组件
interface BarChartProps {
  data: DataPoint[];
  config?: ChartConfig;
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  config = {},
  className = '',
}) => {
  const {
    width = 400,
    height = 200,
    showLabels = true,
    colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'],
  } = config;

  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = (width - 40) / data.length * 0.8;
  const barSpacing = (width - 40) / data.length * 0.2;

  return (
    <div className={`bg-white rounded-lg border p-4 ${className}`}>
      <svg width={width} height={height} className="w-full h-auto">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * (height - 40);
          const x = 20 + index * (barWidth + barSpacing);
          const y = height - 20 - barHeight;
          const color = item.color || colors[index % colors.length];

          return (
            <g key={index}>
              {/* 柱子 */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
              >
                <title>{`${item.label}: ${item.value}`}</title>
              </rect>

              {/* 标签 */}
              {showLabels && (
                <text
                  x={x + barWidth / 2}
                  y={height - 5}
                  textAnchor="middle"
                  className="text-xs fill-current text-gray-600"
                >
                  {item.label}
                </text>
              )}

              {/* 数值 */}
              <text
                x={x + barWidth / 2}
                y={y - 5}
                textAnchor="middle"
                className="text-xs fill-current text-gray-800 font-medium"
              >
                {item.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// 饼图组件
interface PieChartProps {
  data: DataPoint[];
  config?: ChartConfig;
  className?: string;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  config = {},
  className = '',
}) => {
  const {
    width = 300,
    height = 300,
    showLabels = true,
    showLegend = true,
    colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'],
  } = config;

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 20;

  let currentAngle = 0;

  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
    const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
    const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
    const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    const color = item.color || colors[index % colors.length];
    
    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');

    currentAngle += angle;

    return {
      ...item,
      pathData,
      color,
      percentage: percentage.toFixed(1),
      startAngle,
      endAngle,
    };
  });

  return (
    <div className={`bg-white rounded-lg border p-4 ${className}`}>
      <div className="flex items-center space-x-4">
        <svg width={width} height={height}>
          {slices.map((slice, index) => (
            <path
              key={index}
              d={slice.pathData}
              fill={slice.color}
              className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
            >
              <title>{`${slice.label}: ${slice.value} (${slice.percentage}%)`}</title>
            </path>
          ))}
        </svg>

        {/* 图例 */}
        {showLegend && (
          <div className="space-y-2">
            {slices.map((slice, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="text-gray-700">
                  {slice.label} ({slice.percentage}%)
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// 统计卡片组件
interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  color = 'blue',
  className = '',
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
  };

  const getTrendIcon = () => {
    if (change === undefined) return null;
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Activity className="w-4 h-4 text-gray-500" />;
  };

  const getTrendText = () => {
    if (change === undefined) return null;
    const absChange = Math.abs(change);
    const sign = change > 0 ? '+' : change < 0 ? '-' : '';
    return `${sign}${absChange}%`;
  };

  return (
    <div className={`${colorClasses[color]} border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          
          {change !== undefined && (
            <div className="flex items-center space-x-1 mt-2">
              {getTrendIcon()}
              <span className="text-sm font-medium">{getTrendText()}</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="opacity-80">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
