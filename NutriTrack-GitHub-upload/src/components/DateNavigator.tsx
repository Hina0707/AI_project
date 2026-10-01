import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, RotateCcw } from 'lucide-react';
import { getTodayDateString } from '../utils/storage';

interface DateNavigatorProps {
  currentDate: string;
  onDateChange: (newDate: string) => void;
}

export const DateNavigator: React.FC<DateNavigatorProps> = ({ currentDate, onDateChange }) => {
  const today = getTodayDateString();
  const isToday = currentDate === today;

  const handlePrevDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    onDateChange(`${y}-${m}-${day}`);
  };

  const handleNextDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    onDateChange(`${y}-${m}-${day}`);
  };

  const handleToday = () => {
    onDateChange(today);
  };

  // Formatted date string in Korean (e.g., 2026년 9월 30일 (수))
  const dateObj = new Date(currentDate + 'T00:00:00');
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][dateObj.getDay()];
  const formattedDate = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일 (${dayOfWeek})`;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
      {/* Airbnb Signature Floating Date Capsule */}
      <div className="flex items-center bg-white border border-[#DDDDDD] rounded-full p-1.5 airbnb-shadow-sm hover:airbnb-shadow-md transition-shadow">
        <button
          onClick={handlePrevDay}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#717171] hover:text-[#222222] hover:bg-neutral-100 transition-colors"
          aria-label="이전 날짜"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 px-4 py-1 border-x border-[#EBEBEB]">
          <div className="w-7 h-7 rounded-full bg-[#FFF8F6] text-[#FF385C] flex items-center justify-center">
            <CalendarIcon className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm sm:text-base font-bold text-[#222222] tabular-nums">
            {formattedDate}
          </span>
          {isToday && (
            <span className="text-[11px] font-semibold text-[#FF385C] bg-[#FFF0F2] px-2 py-0.5 rounded-full">
              오늘
            </span>
          )}
        </div>

        <button
          onClick={handleNextDay}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#717171] hover:text-[#222222] hover:bg-neutral-100 transition-colors"
          aria-label="다음 날짜"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Date picker input & Reset to today */}
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={currentDate}
          onChange={(e) => {
            if (e.target.value) onDateChange(e.target.value);
          }}
          className="px-3.5 py-1.5 text-xs font-medium text-[#222222] bg-white border border-[#DDDDDD] rounded-full hover:border-[#222222] focus:outline-none focus:ring-1 focus:ring-[#222222] cursor-pointer airbnb-shadow-sm transition-colors"
        />

        {!isToday && (
          <button
            onClick={handleToday}
            className="px-3.5 py-1.5 text-xs font-semibold text-[#222222] bg-white border border-[#DDDDDD] hover:border-[#222222] rounded-full transition-colors flex items-center gap-1 airbnb-shadow-sm"
          >
            <RotateCcw className="w-3 h-3 text-[#FF385C]" />
            <span>오늘로 이동</span>
          </button>
        )}
      </div>
    </div>
  );
};
