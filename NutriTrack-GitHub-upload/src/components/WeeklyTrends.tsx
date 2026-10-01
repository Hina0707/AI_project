import React from 'react';
import { MealLogItem, NutritionGoal } from '../types/nutrition';
import { getOffsetDateString } from '../utils/storage';
import { BarChart3, Calendar } from 'lucide-react';

interface WeeklyTrendsProps {
  logs: MealLogItem[];
  goal: NutritionGoal;
  onSelectDate: (date: string) => void;
}

export const WeeklyTrends: React.FC<WeeklyTrendsProps> = ({ logs, goal, onSelectDate }) => {
  // Generate last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => getOffsetDateString(-6 + i));

  // Compute daily totals
  const dailyStats = last7Days.map((dateStr) => {
    const dayItems = logs.filter((item) => item.date === dateStr);
    const calories = dayItems.reduce((acc, i) => acc + i.calories, 0);
    const carbs = dayItems.reduce((acc, i) => acc + i.carbs, 0);
    const protein = dayItems.reduce((acc, i) => acc + i.protein, 0);
    const fat = dayItems.reduce((acc, i) => acc + i.fat, 0);

    const dateObj = new Date(dateStr + 'T00:00:00');
    const dayName = ['일', '월', '화', '수', '목', '금', '토'][dateObj.getDay()];
    const shortDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()} (${dayName})`;

    const calPercent = goal.calories > 0 ? Math.round((calories / goal.calories) * 100) : 0;
    const isLogged = dayItems.length > 0;

    return {
      date: dateStr,
      shortDate,
      calories,
      carbs: Number(carbs.toFixed(1)),
      protein: Number(protein.toFixed(1)),
      fat: Number(fat.toFixed(1)),
      itemCount: dayItems.length,
      calPercent,
      isLogged,
    };
  });

  const loggedDays = dailyStats.filter((d) => d.isLogged);
  const avgCalories = loggedDays.length > 0
    ? Math.round(loggedDays.reduce((acc, d) => acc + d.calories, 0) / loggedDays.length)
    : 0;
  const avgCarbs = loggedDays.length > 0
    ? Number((loggedDays.reduce((acc, d) => acc + d.carbs, 0) / loggedDays.length).toFixed(1))
    : 0;
  const avgProtein = loggedDays.length > 0
    ? Number((loggedDays.reduce((acc, d) => acc + d.protein, 0) / loggedDays.length).toFixed(1))
    : 0;

  const maxCal = Math.max(goal.calories * 1.2, ...dailyStats.map((d) => d.calories), 1000);

  return (
    <div className="space-y-6">
      {/* Overview Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] airbnb-shadow-sm hover:airbnb-shadow-md transition-shadow">
          <div className="text-xs font-bold text-[#717171] uppercase tracking-wider">
            최근 7일 일평균 칼로리
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-[#FF385C]">
              {avgCalories.toLocaleString()}
            </span>
            <span className="text-xs text-[#717171]">
              / 목표 {goal.calories.toLocaleString()} kcal
            </span>
          </div>
          <div className="mt-2 text-xs text-[#717171]">
            {loggedDays.length}일 기록 데이터 기준
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] airbnb-shadow-sm hover:airbnb-shadow-md transition-shadow">
          <div className="text-xs font-bold text-[#717171] uppercase tracking-wider">
            일평균 탄수화물
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-[#222222]">
              {avgCarbs}
            </span>
            <span className="text-xs text-[#717171]">
              / 목표 {goal.carbs} g
            </span>
          </div>
          <div className="mt-2 text-xs text-[#717171]">
            목표 대비 {goal.carbs > 0 ? Math.round((avgCarbs / goal.carbs) * 100) : 0}% 수준
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] airbnb-shadow-sm hover:airbnb-shadow-md transition-shadow">
          <div className="text-xs font-bold text-[#717171] uppercase tracking-wider">
            일평균 단백질
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-[#222222]">
              {avgProtein}
            </span>
            <span className="text-xs text-[#717171]">
              / 목표 {goal.protein} g
            </span>
          </div>
          <div className="mt-2 text-xs text-[#717171]">
            목표 대비 {goal.protein > 0 ? Math.round((avgProtein / goal.protein) * 100) : 0}% 수준
          </div>
        </div>
      </div>

      {/* 7-day Bar Visual Progression */}
      <div className="bg-white rounded-2xl border border-[#EBEBEB] p-6 airbnb-shadow-sm hover:airbnb-shadow-md transition-shadow">
        <div className="flex items-center justify-between pb-4 border-b border-[#EBEBEB]">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#222222] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#FF385C]" />
              최근 7일 칼로리 섭취 추이
            </h3>
            <p className="text-xs text-[#717171] mt-0.5">
              원하는 날짜 기둥을 클릭하면 해당 일자의 상세 식단으로 바로 이동합니다.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#717171]">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-0.5 bg-[#FF385C] inline-block" />
              <span>목표선 ({goal.calories} kcal)</span>
            </span>
          </div>
        </div>

        {/* Visual Columns */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4 pt-6 pb-2 items-end min-h-[220px]">
          {dailyStats.map((day) => {
            const heightPercent = Math.min(100, Math.max(8, (day.calories / maxCal) * 100));
            const isOver = day.calories > goal.calories;

            return (
              <div
                key={day.date}
                onClick={() => onSelectDate(day.date)}
                className="flex flex-col items-center cursor-pointer group"
                title={`${day.date}: ${day.calories} kcal (클릭 시 이동)`}
              >
                <div className="text-[11px] font-mono font-bold text-[#222222] mb-1.5 opacity-80 group-hover:opacity-100 group-hover:text-[#FF385C] transition-colors">
                  {day.calories > 0 ? `${day.calories}` : '-'}
                </div>

                <div className="w-full max-w-[48px] bg-neutral-100 rounded-t-xl h-40 flex items-end p-1 relative overflow-hidden group-hover:bg-[#FFF0F2] transition-colors">
                  {day.calories > 0 ? (
                    <div
                      className={`w-full rounded-t-lg transition-all duration-300 ${
                        isOver
                          ? 'bg-amber-500'
                          : 'bg-gradient-to-t from-[#FF385C] to-[#FF5A5F]'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  ) : (
                    <div className="w-full text-center text-[10px] text-[#B0B0B0] pb-2">
                      -
                    </div>
                  )}
                </div>

                <div className="text-center mt-2">
                  <div className="text-xs font-bold text-[#222222] group-hover:text-[#FF385C] transition-colors">
                    {day.shortDate}
                  </div>
                  <div className="text-[10px] text-[#717171] font-mono">
                    {day.itemCount}개
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7-day Tabular Matrix */}
      <div className="bg-white rounded-2xl border border-[#EBEBEB] overflow-hidden airbnb-shadow-sm">
        <div className="px-6 py-4 bg-white border-b border-[#EBEBEB]">
          <h4 className="text-sm font-bold text-[#222222]">
            일자별 영양소 세부 집계표
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono tabular-nums text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 text-[#717171] border-b border-[#EBEBEB]">
                <th className="py-3 px-4 font-bold">날짜</th>
                <th className="py-3 px-4 font-bold text-right">총 칼로리 (kcal)</th>
                <th className="py-3 px-4 font-bold text-right">탄수화물 (g)</th>
                <th className="py-3 px-4 font-bold text-right">단백질 (g)</th>
                <th className="py-3 px-4 font-bold text-right">지방 (g)</th>
                <th className="py-3 px-4 font-bold text-right">목표 달성률</th>
                <th className="py-3 px-4 font-bold text-center">조회</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEBEB]">
              {dailyStats.map((d) => (
                <tr key={d.date} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-[#222222] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#FF385C]" />
                    <span>{d.date} ({d.shortDate.split(' ')[1]})</span>
                  </td>
                  <td className="py-3 px-4 text-right font-extrabold text-[#FF385C]">
                    {d.calories.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-[#222222]">{d.carbs}</td>
                  <td className="py-3 px-4 text-right text-[#222222]">{d.protein}</td>
                  <td className="py-3 px-4 text-right text-[#222222]">{d.fat}</td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-700">
                    {d.calPercent}%
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onSelectDate(d.date)}
                      className="text-xs text-[#222222] hover:text-[#FF385C] font-semibold underline underline-offset-2 cursor-pointer"
                    >
                      상세 식단
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
