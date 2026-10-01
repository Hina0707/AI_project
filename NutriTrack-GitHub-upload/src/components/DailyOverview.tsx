import React from 'react';
import { DailySummary, NutritionGoal } from '../types/nutrition';
import { Flame, Wheat, Beef, Droplets, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface DailyOverviewProps {
  summary: DailySummary;
  goal: NutritionGoal;
  onOpenGoals: () => void;
}

export const DailyOverview: React.FC<DailyOverviewProps> = ({ summary, goal, onOpenGoals }) => {
  const calPercent = goal.calories > 0 ? Math.min(100, Math.round((summary.totalCalories / goal.calories) * 100)) : 0;
  const carbsPercent = goal.carbs > 0 ? Math.min(100, Math.round((summary.totalCarbs / goal.carbs) * 100)) : 0;
  const proteinPercent = goal.protein > 0 ? Math.min(100, Math.round((summary.totalProtein / goal.protein) * 100)) : 0;
  const fatPercent = goal.fat > 0 ? Math.min(100, Math.round((summary.totalFat / goal.fat) * 100)) : 0;

  const remainingCal = goal.calories - summary.totalCalories;

  // Caloric distribution (탄 4kcal/g, 단 4kcal/g, 지 9kcal/g)
  const carbsCal = summary.totalCarbs * 4;
  const proteinCal = summary.totalProtein * 4;
  const fatCal = summary.totalFat * 9;
  const totalMacroCal = carbsCal + proteinCal + fatCal;

  const carbsRatio = totalMacroCal > 0 ? Math.round((carbsCal / totalMacroCal) * 100) : 0;
  const proteinRatio = totalMacroCal > 0 ? Math.round((proteinCal / totalMacroCal) * 100) : 0;
  const fatRatio = totalMacroCal > 0 ? 100 - carbsRatio - proteinRatio : 0;

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBEB] p-6 airbnb-shadow-sm hover:airbnb-shadow-md transition-shadow">
      {/* Title & Goal link */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#EBEBEB]">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#222222] tracking-tight">
            일일 영양 섭취 현황
          </h2>
          <div className="flex items-center gap-2 text-xs text-[#717171] mt-1">
            <span>총 {summary.itemCount}개 음식 기록됨</span>
            <span aria-hidden="true">·</span>
            <span>일일 목표치 기준</span>
          </div>
        </div>

        <button
          onClick={onOpenGoals}
          className="text-xs font-semibold text-[#222222] hover:text-[#717171] underline transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>목표치 설정</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main 4 Metric Cards Grid - Airbnb Host Performance Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {/* 1. 칼로리 (Calories - Airbnb Coral Accent) */}
        <div className="p-4 rounded-xl bg-white border border-[#EBEBEB] hover:border-[#DDDDDD] airbnb-shadow-sm transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#717171] flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-[#FFF0F2] text-[#FF385C] flex items-center justify-center">
                <Flame className="w-3.5 h-3.5" />
              </div>
              <span>칼로리 (Energy)</span>
            </span>
            <span className="text-xs font-mono font-bold text-[#FF385C]">
              {calPercent}%
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#222222] tabular-nums font-mono tracking-tight">
              {summary.totalCalories.toLocaleString()}
            </span>
            <span className="text-xs text-[#717171]">
              / {goal.calories.toLocaleString()} kcal
            </span>
          </div>
          <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden mt-3">
            <div
              className="h-full transition-all duration-500 rounded-full bg-gradient-to-r from-[#FF385C] to-[#E61E4D]"
              style={{ width: `${Math.min(100, (summary.totalCalories / (goal.calories || 1)) * 100)}%` }}
            />
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs text-[#717171]">
            <span className="font-medium">
              {remainingCal >= 0 ? `${remainingCal.toLocaleString()} kcal 잔여` : `${Math.abs(remainingCal).toLocaleString()} kcal 초과`}
            </span>
            {remainingCal >= 0 ? (
              <span className="text-emerald-700 flex items-center gap-1 font-semibold text-[11px]">
                <CheckCircle2 className="w-3 h-3" /> 목표 내 섭취
              </span>
            ) : (
              <span className="text-rose-600 font-semibold text-[11px]">초과 주의</span>
            )}
          </div>
        </div>

        {/* 2. 탄수화물 (Carbohydrates) */}
        <div className="p-4 rounded-xl bg-white border border-[#EBEBEB] hover:border-[#DDDDDD] airbnb-shadow-sm transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#717171] flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                <Wheat className="w-3.5 h-3.5" />
              </div>
              <span>탄수화물 (Carbs)</span>
            </span>
            <span className="text-xs font-mono font-bold text-[#222222]">
              {carbsPercent}%
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#222222] tabular-nums font-mono tracking-tight">
              {summary.totalCarbs.toFixed(1)}
            </span>
            <span className="text-xs text-[#717171]">
              / {goal.carbs}g
            </span>
          </div>
          <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden mt-3">
            <div
              className="h-full transition-all duration-500 rounded-full bg-amber-500"
              style={{ width: `${Math.min(100, carbsPercent)}%` }}
            />
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs text-[#717171]">
            <span>{carbsCal} kcal ({carbsRatio}%)</span>
            <span className="font-mono text-[11px]">
              {(goal.carbs - summary.totalCarbs) >= 0 ? `${(goal.carbs - summary.totalCarbs).toFixed(1)}g 잔여` : '목표 달성'}
            </span>
          </div>
        </div>

        {/* 3. 단백질 (Protein) */}
        <div className="p-4 rounded-xl bg-white border border-[#EBEBEB] hover:border-[#DDDDDD] airbnb-shadow-sm transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#717171] flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Beef className="w-3.5 h-3.5" />
              </div>
              <span>단백질 (Protein)</span>
            </span>
            <span className="text-xs font-mono font-bold text-[#222222]">
              {proteinPercent}%
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#222222] tabular-nums font-mono tracking-tight">
              {summary.totalProtein.toFixed(1)}
            </span>
            <span className="text-xs text-[#717171]">
              / {goal.protein}g
            </span>
          </div>
          <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden mt-3">
            <div
              className="h-full transition-all duration-500 rounded-full bg-emerald-500"
              style={{ width: `${Math.min(100, proteinPercent)}%` }}
            />
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs text-[#717171]">
            <span>{proteinCal} kcal ({proteinRatio}%)</span>
            <span className="font-mono text-[11px]">
              {(goal.protein - summary.totalProtein) >= 0 ? `${(goal.protein - summary.totalProtein).toFixed(1)}g 잔여` : '목표 달성'}
            </span>
          </div>
        </div>

        {/* 4. 지방 (Fat) */}
        <div className="p-4 rounded-xl bg-white border border-[#EBEBEB] hover:border-[#DDDDDD] airbnb-shadow-sm transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#717171] flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center">
                <Droplets className="w-3.5 h-3.5" />
              </div>
              <span>지방 (Fat)</span>
            </span>
            <span className="text-xs font-mono font-bold text-[#222222]">
              {fatPercent}%
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#222222] tabular-nums font-mono tracking-tight">
              {summary.totalFat.toFixed(1)}
            </span>
            <span className="text-xs text-[#717171]">
              / {goal.fat}g
            </span>
          </div>
          <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden mt-3">
            <div
              className="h-full transition-all duration-500 rounded-full bg-sky-500"
              style={{ width: `${Math.min(100, fatPercent)}%` }}
            />
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs text-[#717171]">
            <span>{fatCal} kcal ({fatRatio}%)</span>
            <span className="font-mono text-[11px]">
              {(goal.fat - summary.totalFat) >= 0 ? `${(goal.fat - summary.totalFat).toFixed(1)}g 잔여` : '목표 달성'}
            </span>
          </div>
        </div>
      </div>

      {/* Macro Ratio Breakdown Bar */}
      <div className="mt-6 pt-5 border-t border-[#EBEBEB]">
        <div className="flex items-center justify-between text-xs text-[#717171] mb-2 font-medium">
          <span>탄·단·지 칼로리 구성 비율</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>탄수화물 <strong>{carbsRatio}%</strong></span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>단백질 <strong>{proteinRatio}%</strong></span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span>지방 <strong>{fatRatio}%</strong></span>
            </span>
          </div>
        </div>

        <div className="w-full h-3 rounded-full bg-neutral-100 flex overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all duration-500"
            style={{ width: `${carbsRatio}%` }}
            title={`탄수화물 ${carbsRatio}%`}
          />
          <div
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${proteinRatio}%` }}
            title={`단백질 ${proteinRatio}%`}
          />
          <div
            className="h-full bg-sky-500 transition-all duration-500"
            style={{ width: `${fatRatio}%` }}
            title={`지방 ${fatRatio}%`}
          />
        </div>
      </div>
    </div>
  );
};
