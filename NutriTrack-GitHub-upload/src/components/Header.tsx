import React from 'react';
import { Download, Sliders, Calendar, BarChart3, Utensils } from 'lucide-react';

interface HeaderProps {
  currentTab: 'tracker' | 'weekly';
  onTabChange: (tab: 'tracker' | 'weekly') => void;
  onOpenExport: () => void;
  onOpenGoals: () => void;
  targetDate: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenExport,
  onOpenGoals,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single element wordmark */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-white">
            <Utensils className="w-4 h-4" />
          </div>
          <span className="text-xl font-bold tracking-tight text-neutral-900 font-sans">
            식단관리
          </span>
        </div>

        {/* Zone 2: Navigation controls (Removed 영양 백과) */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onTabChange('tracker')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'tracker'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>오늘의 식단</span>
          </button>

          <button
            onClick={() => onTabChange('weekly')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'weekly'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>주간 통계</span>
          </button>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGoals}
            className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            title="일일 권장 목표치 설정"
          >
            <Sliders className="w-3.5 h-3.5 text-neutral-500" />
            <span className="hidden md:inline">목표치 설정</span>
            <span className="md:hidden">목표</span>
          </button>

          <button
            onClick={onOpenExport}
            className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors shadow-xs flex items-center gap-1.5 whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>엑셀 다운로드</span>
          </button>
        </div>
      </div>
    </header>
  );
};
