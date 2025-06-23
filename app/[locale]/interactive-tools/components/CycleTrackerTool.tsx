'use client';

import React, { useState, useEffect } from 'react';

interface CycleTrackerToolProps {
  locale: string;
}

interface HistoryRecord {
  id: string;
  date: string;
  lastPeriodDate: string;
  cycleLength: number;
  prediction: {
    nextPeriod: string;
    ovulation: string;
    fertilityWindow: { start: string; end: string };
  };
}

export default function CycleTrackerTool({ locale }: CycleTrackerToolProps) {
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [prediction, setPrediction] = useState<{
    nextPeriod: string;
    ovulation: string;
    fertilityWindow: { start: string; end: string };
  } | null>(null);
  const [historyRecords, setHistoryRecords] = useState<HistoryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [showHistory, setShowHistory] = useState(false);

  // 翻译文本
  const texts = {
    zh: {
      title: '月经周期追踪器',
      subtitle: '记录您的月经周期，预测下次月经和排卵期。',
      lastPeriodLabel: '上次月经开始日期',
      cycleLengthLabel: '平均周期长度（天）',
      calculateButton: '计算预测',
      resetButton: '重新计算',
      predictionTitle: '预测结果',
      nextPeriodLabel: '下次月经预计日期',
      ovulationLabel: '排卵期预计日期',
      fertilityWindowLabel: '易孕期',
      disclaimer: '此工具仅供参考，不能替代专业医疗建议。每个人的周期可能有所不同。',
      dateValidationError: '上次月经开始日期不能是未来日期',
      cycleLengthRange: '周期长度通常在21-35天之间',
      to: '至',
      loading: '正在加载保存的数据...',
      saveSuccess: '数据已保存',
      historyTitle: '历史记录',
      showHistory: '查看历史记录',
      hideHistory: '隐藏历史记录',
      noHistory: '暂无历史记录',
      deleteRecord: '删除',
      clearAllHistory: '清空所有记录',
      exportData: '导出数据',
      confirmClearAll: '确定要清空所有历史记录吗？',
      recordedOn: '记录于',
      cycleLength: '周期长度',
      days: '天'
    },
    en: {
      title: 'Menstrual Cycle Tracker',
      subtitle: 'Track your menstrual cycle and predict your next period and ovulation.',
      lastPeriodLabel: 'Last Period Start Date',
      cycleLengthLabel: 'Average Cycle Length (days)',
      calculateButton: 'Calculate Prediction',
      resetButton: 'Reset',
      predictionTitle: 'Prediction Results',
      nextPeriodLabel: 'Next Period Expected',
      ovulationLabel: 'Ovulation Expected',
      fertilityWindowLabel: 'Fertility Window',
      disclaimer: 'This tool is for reference only and cannot replace professional medical advice. Each person\'s cycle may vary.',
      dateValidationError: 'Last period start date cannot be in the future',
      cycleLengthRange: 'Cycle length is typically between 21-35 days',
      to: 'to',
      loading: 'Loading saved data...',
      saveSuccess: 'Data saved',
      historyTitle: 'History Records',
      showHistory: 'Show History',
      hideHistory: 'Hide History',
      noHistory: 'No history records',
      deleteRecord: 'Delete',
      clearAllHistory: 'Clear All Records',
      exportData: 'Export Data',
      confirmClearAll: 'Are you sure you want to clear all history records?',
      recordedOn: 'Recorded on',
      cycleLength: 'Cycle Length',
      days: 'days'
    }
  };

  const t = texts[locale as keyof typeof texts] || texts.zh;

  // 本地存储键名
  const STORAGE_KEYS = {
    CURRENT_DATA: 'cycle-tracker-current',
    HISTORY: 'cycle-tracker-history'
  };

  // 页面加载时恢复数据
  useEffect(() => {
    const loadSavedData = () => {
      try {
        // 加载当前数据
        const savedCurrentData = localStorage.getItem(STORAGE_KEYS.CURRENT_DATA);
        if (savedCurrentData) {
          const currentData = JSON.parse(savedCurrentData);
          if (currentData.lastPeriodDate) {
            setLastPeriodDate(currentData.lastPeriodDate);
          }
          if (currentData.cycleLength) {
            setCycleLength(currentData.cycleLength);
          }
          if (currentData.prediction) {
            setPrediction(currentData.prediction);
          }
        }

        // 加载历史记录
        const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
        if (savedHistory) {
          const history = JSON.parse(savedHistory);
          if (Array.isArray(history)) {
            setHistoryRecords(history.slice(0, 10)); // 最多保留10条记录
          }
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
        // 数据损坏时清除
        localStorage.removeItem(STORAGE_KEYS.CURRENT_DATA);
        localStorage.removeItem(STORAGE_KEYS.HISTORY);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedData();
  }, []);

  // 保存当前数据到本地存储
  const saveCurrentData = (data: { lastPeriodDate: string; cycleLength: number; prediction?: any }) => {
    try {
      setSaveStatus('saving');
      localStorage.setItem(STORAGE_KEYS.CURRENT_DATA, JSON.stringify(data));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error saving data:', error);
      setSaveStatus('idle');
    }
  };

  // 保存历史记录
  const saveToHistory = (record: HistoryRecord) => {
    try {
      const updatedHistory = [record, ...historyRecords.slice(0, 9)]; // 保留最新10条
      setHistoryRecords(updatedHistory);
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  // 删除历史记录
  const deleteHistoryRecord = (id: string) => {
    const updatedHistory = historyRecords.filter(record => record.id !== id);
    setHistoryRecords(updatedHistory);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));
  };

  // 清空所有历史记录
  const clearAllHistory = () => {
    if (confirm(t.confirmClearAll)) {
      setHistoryRecords([]);
      localStorage.removeItem(STORAGE_KEYS.HISTORY);
    }
  };

  // 导出数据
  const exportData = () => {
    const exportData = {
      currentData: { lastPeriodDate, cycleLength, prediction },
      history: historyRecords,
      exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `cycle-tracker-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 获取今天日期
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 计算预测
  const calculatePrediction = () => {
    if (!lastPeriodDate) return;

    const lastPeriod = new Date(lastPeriodDate);

    // 计算下次月经日期
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

    // 计算排卵日期（通常在下次月经前14天）
    const ovulation = new Date(nextPeriod);
    ovulation.setDate(ovulation.getDate() - 14);

    // 计算易孕期（排卵前5天到排卵后1天）
    const fertilityStart = new Date(ovulation);
    fertilityStart.setDate(fertilityStart.getDate() - 5);
    const fertilityEnd = new Date(ovulation);
    fertilityEnd.setDate(fertilityEnd.getDate() + 1);

    const newPrediction = {
      nextPeriod: nextPeriod.toISOString().split('T')[0],
      ovulation: ovulation.toISOString().split('T')[0],
      fertilityWindow: {
        start: fertilityStart.toISOString().split('T')[0],
        end: fertilityEnd.toISOString().split('T')[0]
      }
    };

    setPrediction(newPrediction);

    // 保存当前数据
    const currentData = { lastPeriodDate, cycleLength, prediction: newPrediction };
    saveCurrentData(currentData);

    // 保存到历史记录
    const historyRecord: HistoryRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      lastPeriodDate,
      cycleLength,
      prediction: newPrediction
    };
    saveToHistory(historyRecord);
  };

  // 重置
  const resetCalculation = () => {
    setLastPeriodDate('');
    setCycleLength(28);
    setPrediction(null);

    // 清除保存的当前数据
    localStorage.removeItem(STORAGE_KEYS.CURRENT_DATA);
  };

  // 处理日期输入
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    const today = getTodayDate();

    if (selectedDate > today) {
      alert(t.dateValidationError);
      return;
    }

    setLastPeriodDate(selectedDate);

    // 自动保存当前数据
    const currentData = { lastPeriodDate: selectedDate, cycleLength, prediction };
    saveCurrentData(currentData);
  };

  // 处理周期长度变化
  const handleCycleLengthChange = (newLength: number) => {
    setCycleLength(newLength);

    // 自动保存当前数据
    const currentData = { lastPeriodDate, cycleLength: newLength, prediction };
    saveCurrentData(currentData);
  };

  // 加载状态
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{t.title}</h1>
        <p className="text-lg text-gray-600">{t.subtitle}</p>

        {/* 保存状态提示 */}
        {saveStatus === 'saved' && (
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {t.saveSuccess}
          </div>
        )}
      </div>

      {/* 历史记录切换按钮 */}
      <div className="mb-6 text-center">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="inline-flex items-center px-4 py-2 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {showHistory ? t.hideHistory : t.showHistory}
          {historyRecords.length > 0 && (
            <span className="ml-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
              {historyRecords.length}
            </span>
          )}
        </button>
      </div>

      {/* 历史记录部分 */}
      {showHistory && (
        <div className="mb-8 bg-purple-50 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{t.historyTitle}</h3>
            <div className="flex space-x-2">
              {historyRecords.length > 0 && (
                <>
                  <button
                    onClick={exportData}
                    className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
                  >
                    {t.exportData}
                  </button>
                  <button
                    onClick={clearAllHistory}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                  >
                    {t.clearAllHistory}
                  </button>
                </>
              )}
            </div>
          </div>

          {historyRecords.length === 0 ? (
            <p className="text-gray-500 text-center py-4">{t.noHistory}</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {historyRecords.map((record) => (
                <div key={record.id} className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-gray-500">
                        {t.recordedOn} {formatDate(record.date.split('T')[0])}
                      </p>
                      <p className="font-medium text-gray-800">
                        {t.cycleLength}: {record.cycleLength} {t.days}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteHistoryRecord(record.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      {t.deleteRecord}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="bg-pink-100 text-pink-800 p-2 rounded">
                      <div className="font-medium">{t.nextPeriodLabel}</div>
                      <div>{formatDate(record.prediction.nextPeriod)}</div>
                    </div>
                    <div className="bg-purple-100 text-purple-800 p-2 rounded">
                      <div className="font-medium">{t.ovulationLabel}</div>
                      <div>{formatDate(record.prediction.ovulation)}</div>
                    </div>
                    <div className="bg-green-100 text-green-800 p-2 rounded">
                      <div className="font-medium">{t.fertilityWindowLabel}</div>
                      <div>
                        {formatDate(record.prediction.fertilityWindow.start)} {t.to} {formatDate(record.prediction.fertilityWindow.end)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!prediction ? (
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-3 text-gray-800">
              {t.lastPeriodLabel}
            </label>
            <input
              type="date"
              value={lastPeriodDate}
              onChange={handleDateChange}
              max={getTodayDate()}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
            />
            <p className="mt-2 text-sm text-red-600">⚠️ {t.dateValidationError}</p>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-3 text-gray-800">
              {t.cycleLengthLabel}
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="21"
                  max="35"
                  value={cycleLength}
                  onChange={(e) => handleCycleLengthChange(Number(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right,
                      #e9d5ff 0%,
                      #c4b5fd ${((cycleLength - 21) / 14) * 100}%,
                      #e5e7eb ${((cycleLength - 21) / 14) * 100}%,
                      #e5e7eb 100%)`
                  }}
                />
                {/* 滑块样式 */}
                <style jsx>{`
                  .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #9333ea, #ec4899);
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                  }
                  .slider::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #9333ea, #ec4899);
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                  }
                `}</style>
              </div>
              <span className="text-2xl font-bold text-purple-600 min-w-[3rem] text-center">
                {cycleLength}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">{t.cycleLengthRange}</p>
          </div>

          <div className="flex justify-center pt-6">
            <button
              onClick={calculatePrediction}
              disabled={!lastPeriodDate}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {t.calculateButton}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.predictionTitle}</h2>
          </div>

          <div className="grid gap-6">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">🩸</span>
                <h3 className="text-xl font-semibold">{t.nextPeriodLabel}</h3>
              </div>
              <p className="text-2xl font-bold">{formatDate(prediction.nextPeriod)}</p>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">🥚</span>
                <h3 className="text-xl font-semibold">{t.ovulationLabel}</h3>
              </div>
              <p className="text-2xl font-bold">{formatDate(prediction.ovulation)}</p>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">💚</span>
                <h3 className="text-xl font-semibold">{t.fertilityWindowLabel}</h3>
              </div>
              <p className="text-xl font-bold">
                {formatDate(prediction.fertilityWindow.start)} {t.to} {formatDate(prediction.fertilityWindow.end)}
              </p>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <button
              onClick={resetCalculation}
              className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              {t.resetButton}
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 text-sm text-gray-500 text-center">
        <p>{t.disclaimer}</p>
      </div>
    </div>
  );
}
