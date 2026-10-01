import React from 'react';
import { MealType, MealLogItem } from '../types/nutrition';
import { MEAL_TYPE_LABELS } from '../data/foodDatabase';
import { Plus, Trash2, Clock, Minus } from 'lucide-react';

interface MealSectionProps {
  mealType: MealType;
  items: MealLogItem[];
  onAddClick: (mealType: MealType) => void;
  onDeleteItem: (id: string) => void;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
}

export const MealSection: React.FC<MealSectionProps> = ({
  mealType,
  items,
  onAddClick,
  onDeleteItem,
  onUpdateQuantity,
}) => {
  const meta = MEAL_TYPE_LABELS[mealType] || { label: mealType, timeHint: '', english: '' };

  const subtotalCal = items.reduce((acc, i) => acc + i.calories, 0);
  const subtotalCarbs = items.reduce((acc, i) => acc + i.carbs, 0);
  const subtotalProtein = items.reduce((acc, i) => acc + i.protein, 0);
  const subtotalFat = items.reduce((acc, i) => acc + i.fat, 0);

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBEB] airbnb-shadow-sm hover:airbnb-shadow-md transition-shadow overflow-hidden">
      {/* Header bar */}
      <div className="px-6 py-4 bg-white border-b border-[#EBEBEB] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-baseline gap-2">
            <h3 className="text-base sm:text-lg font-bold text-[#222222]">
              {meta.label}
            </h3>
            <span className="text-xs text-[#717171] font-normal">
              {meta.timeHint}
            </span>
          </div>
          <span className="text-xs text-[#DDDDDD]">·</span>
          <span className="text-xs text-[#717171] font-medium">
            {items.length}개 음식
          </span>
        </div>

        {/* Subtotal metrics & Add Food Button */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono tabular-nums">
          <span className="font-extrabold text-[#222222] text-sm sm:text-base">
            {subtotalCal.toLocaleString()} <span className="text-xs font-normal text-[#717171]">kcal</span>
          </span>
          <div className="hidden sm:flex items-center gap-2.5 text-[#717171] border-l border-[#EBEBEB] pl-3 text-xs">
            <span>탄 <strong className="text-[#222222]">{subtotalCarbs.toFixed(1)}</strong>g</span>
            <span>단 <strong className="text-[#222222]">{subtotalProtein.toFixed(1)}</strong>g</span>
            <span>지 <strong className="text-[#222222]">{subtotalFat.toFixed(1)}</strong>g</span>
          </div>

          <button
            onClick={() => onAddClick(mealType)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#FF385C] to-[#E61E4D] hover:brightness-105 active:scale-[0.98] rounded-full transition-all flex items-center gap-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>음식 추가</span>
          </button>
        </div>
      </div>

      {/* Item rows */}
      {items.length === 0 ? (
        <div className="py-10 px-4 text-center bg-white">
          <p className="text-xs sm:text-sm text-[#717171]">
            기록된 {meta.label} 식단이 없습니다.
          </p>
          <button
            onClick={() => onAddClick(mealType)}
            className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-[#FF385C] hover:underline cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{meta.label} 음식 등록하기</span>
          </button>
        </div>
      ) : (
        <div className="divide-y divide-[#EBEBEB] bg-white">
          {items.map((item) => (
            <div
              key={item.id}
              className="px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 hover:bg-[#FAFAFA] transition-colors"
            >
              {/* Left: Food name & serving info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-bold text-[#222222] truncate">
                    {item.foodName}
                  </span>
                  {item.notes && (
                    <span className="text-xs text-[#717171] truncate max-w-xs">
                      ({item.notes})
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-[#717171] mt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#B0B0B0]" />
                    <span>{item.timestamp}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{item.servingDescription}</span>
                </div>
              </div>

              {/* Middle: Airbnb rounded pill quantity stepper */}
              <div className="flex items-center border border-[#DDDDDD] rounded-full p-0.5 bg-white airbnb-shadow-sm">
                <button
                  type="button"
                  onClick={() => {
                    const newQ = Math.max(0.25, Number((item.quantity - 0.5).toFixed(2)));
                    onUpdateQuantity(item.id, newQ);
                  }}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[#717171] hover:text-[#222222] hover:bg-neutral-100 transition-colors"
                  title="분량 줄이기"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-2.5 text-xs font-bold text-[#222222] font-mono tabular-nums min-w-10 text-center">
                  {item.quantity}인분
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newQ = Number((item.quantity + 0.5).toFixed(2));
                    onUpdateQuantity(item.id, newQ);
                  }}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[#717171] hover:text-[#222222] hover:bg-neutral-100 transition-colors"
                  title="분량 늘리기"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Right: Nutrition stats & delete */}
              <div className="flex items-center gap-4">
                <div className="text-right font-mono tabular-nums">
                  <div className="text-sm font-extrabold text-[#222222]">
                    {item.calories.toLocaleString()} <span className="text-xs font-normal text-[#717171]">kcal</span>
                  </div>
                  <div className="text-[11px] text-[#717171] space-x-1.5">
                    <span>탄 <strong>{item.carbs}g</strong></span>
                    <span>단 <strong>{item.protein}g</strong></span>
                    <span>지 <strong>{item.fat}g</strong></span>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#B0B0B0] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
