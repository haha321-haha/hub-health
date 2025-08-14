import { NextWebVitalsMetric } from 'next/app';

export interface WebVitalsReport {
  LCP?: number;
  FID?: number;
  CLS?: number;
  FCP?: number;
  TTFB?: number;
  timestamp: string;
  pathname: string;
  device: {
    isMobile: boolean;
    isDesktop: boolean;
  };
}

class WebVitalsTracker {
  private metrics: WebVitalsReport[] = [];
  private readonly STORAGE_KEY = 'periodhub-web-vitals';
  private readonly MAX_ENTRIES = 100;

  /**
   * 记录Web Vitals指标
   */
  reportMetric(metric: NextWebVitalsMetric): void {
    const report: Partial<WebVitalsReport> = {
      timestamp: new Date().toISOString(),
      pathname: window.location.pathname,
      device: {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isDesktop: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      }
    };

    switch (metric.name) {
      case 'LCP':
        report.LCP = metric.value;
        break;
      case 'FID':
        report.FID = metric.value;
        break;
      case 'CLS':
        report.CLS = metric.value;
        break;
      case 'FCP':
        report.FCP = metric.value;
        break;
      case 'TTFB':
        report.TTFB = metric.value;
        break;
    }

    this.metrics.push(report as WebVitalsReport);
    this.saveMetrics();
    this.checkPerformanceThresholds(report as WebVitalsReport);
  }

  /**
   * 检查性能阈值并发送告警
   */
  private checkPerformanceThresholds(report: WebVitalsReport): void {
    const thresholds = {
      LCP: 2500, // 良好: <2.5s, 需要改进: 2.5-4s, 差: >4s
      FID: 100,  // 良好: <100ms, 需要改进: 100-300ms, 差: >300ms
      CLS: 0.1,  // 良好: <0.1, 需要改进: 0.1-0.25, 差: >0.25
      FCP: 1800, // 良好: <1.8s, 需要改进: 1.8-3s, 差: >3s
      TTFB: 800  // 良好: <800ms, 需要改进: 800-1800ms, 差: >1800ms
    };

    const alerts: string[] = [];

    Object.entries(thresholds).forEach(([metric, threshold]) => {
      const value = report[metric as keyof WebVitalsReport] as number;
      if (value && value > threshold) {
        alerts.push(`${metric}: ${value}ms (超过阈值 ${threshold}ms)`);
      }
    });

    if (alerts.length > 0) {
      console.warn('[Web Vitals Alert]', alerts.join(', '));
    }
  }

  /**
   * 获取性能评级
   */
  getPerformanceRating(metrics: WebVitalsReport): {
    score: number;
    grade: '优秀' | '良好' | '需要改进' | '差';
    issues: string[];
  } {
    const thresholds = {
      LCP: { good: 2500, needsImprovement: 4000 },
      FID: { good: 100, needsImprovement: 300 },
      CLS: { good: 0.1, needsImprovement: 0.25 },
      FCP: { good: 1800, needsImprovement: 3000 },
      TTFB: { good: 800, needsImprovement: 1800 }
    };

    let score = 100;
    const issues: string[] = [];

    Object.entries(thresholds).forEach(([metric, { good, needsImprovement }]) => {
      const value = metrics[metric as keyof WebVitalsReport] as number;
      if (!value) return;

      if (value > needsImprovement) {
        score -= 25;
        issues.push(`${metric} 需要优化 (${value}ms)`);
      } else if (value > good) {
        score -= 10;
        issues.push(`${metric} 可以进一步优化 (${value}ms)`);
      }
    });

    score = Math.max(0, score);
    
    let grade: '优秀' | '良好' | '需要改进' | '差';
    if (score >= 90) grade = '优秀';
    else if (score >= 75) grade = '良好';
    else if (score >= 50) grade = '需要改进';
    else grade = '差';

    return { score, grade, issues };
  }

  /**
   * 获取历史性能数据
   */
  getHistoricalData(): WebVitalsReport[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /**
   * 获取平均性能指标
   */
  getAverageMetrics(): Partial<WebVitalsReport> {
    const data = this.getHistoricalData();
    if (data.length === 0) return {};

    const metrics: Partial<WebVitalsReport> = {};
    const metricNames: (keyof WebVitalsReport)[] = ['LCP', 'FID', 'CLS', 'FCP', 'TTFB'];

    metricNames.forEach(metric => {
      const values = data
        .filter(item => item[metric] !== undefined)
        .map(item => item[metric] as number);
      
      if (values.length > 0) {
        (metrics as any)[metric] = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
      }
    });

    return metrics;
  }

  /**
   * 保存性能数据
   */
  private saveMetrics(): void {
    if (typeof window === 'undefined') return;
    
    // 限制存储条目数量
    if (this.metrics.length > this.MAX_ENTRIES) {
      this.metrics = this.metrics.slice(-this.MAX_ENTRIES);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.metrics));
  }

  /**
   * 清理过期数据
   */
  cleanupOldData(daysToKeep: number = 30): void {
    if (typeof window === 'undefined') return;
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    this.metrics = this.metrics.filter(item => 
      new Date(item.timestamp) > cutoffDate
    );

    this.saveMetrics();
  }

  /**
   * 导出性能报告
   */
  exportReport(): {
    summary: {
      totalEntries: number;
      averageMetrics: Partial<WebVitalsReport>;
      overallRating: string;
    };
    details: WebVitalsReport[];
  } {
    const historicalData = this.getHistoricalData();
    const averageMetrics = this.getAverageMetrics();
    
    // 使用最新数据计算总体评级
    const latestMetrics = historicalData[historicalData.length - 1] || {};
    const rating = this.getPerformanceRating(latestMetrics);

    return {
      summary: {
        totalEntries: historicalData.length,
        averageMetrics,
        overallRating: rating.grade
      },
      details: historicalData
    };
  }
}

export const webVitalsTracker = new WebVitalsTracker();