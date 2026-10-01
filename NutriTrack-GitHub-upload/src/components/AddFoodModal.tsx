import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MealType, MealLogItem } from '../types/nutrition';
import { PRESET_FOODS, MEAL_TYPE_LABELS } from '../data/foodDatabase';
import { X, Plus, Search, Loader2 } from 'lucide-react';

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMealType: MealType;
  currentDate: string;
  onAddMealItem: (item: Omit<MealLogItem, 'id'>) => void;
}

export const AddFoodModal: React.FC<AddFoodModalProps> = ({
  isOpen,
  onClose,
  defaultMealType,
  currentDate,
  onAddMealItem,
}) => {
  const [mealType, setMealType] = useState<MealType>(defaultMealType);
  const [foodName, setFoodName] = useState('');
  const [servingDescription, setServingDescription] = useState('1인분 (200g)');
  const [calories, setCalories] = useState<number | ''>(250);
  const [carbs, setCarbs] = useState<number | ''>(35);
  const [protein, setProtein] = useState<number | ''>(15);
  const [fat, setFat] = useState<number | ''>(5);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [liveResults, setLiveResults] = useState<any[]>([]);
  const [isSearchingLive, setIsSearchingLive] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync defaultMealType when modal opens
  useEffect(() => {
    setMealType(defaultMealType);
    setShowSuggestions(false);
    setLiveResults([]);
  }, [defaultMealType, isOpen]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter local food database instantly
  const localMatchingFoods = useMemo(() => {
    const rawQuery = foodName.trim().toLowerCase();
    if (!rawQuery || rawQuery.length < 1) return [];

    const queryNoSpaces = rawQuery.replace(/\s+/g, '');
    return PRESET_FOODS.filter((f) => {
      const name = f.name.toLowerCase();
      const nameNoSpaces = name.replace(/\s+/g, '');
      return (
        name.includes(rawQuery) ||
        nameNoSpaces.includes(queryNoSpaces) ||
        (rawQuery.includes('햇반') && name.includes('햇반')) ||
        (rawQuery.includes('라면') && (name.includes('라면') || name.includes('컵누들')))
      );
    }).slice(0, 8);
  }, [foodName]);

  // Background live search against backend nutrition server
  useEffect(() => {
    const query = foodName.trim();
    if (query.length < 2) {
      setLiveResults([]);
      setIsSearchingLive(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsSearchingLive(true);
        const res = await fetch(`/api/search-nutrition?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.items)) {
            setLiveResults(data.items);
          }
        }
      } catch (e) {
        console.error('Failed to search nutrition backend:', e);
      } finally {
        setIsSearchingLive(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [foodName]);

  // Merge local matches and live database results
  const combinedSuggestions = useMemo(() => {
    const list: any[] = [];
    const seen = new Set<string>();

    for (const item of localMatchingFoods) {
      const key = item.name.toLowerCase().replace(/\s+/g, '');
      if (!seen.has(key)) {
        seen.add(key);
        list.push({
          id: item.id,
          name: item.name,
          servingSize: item.servingSize,
          calories: item.calories,
          carbs: item.carbs,
          protein: item.protein,
          fat: item.fat,
          source: '연동',
        });
      }
    }

    for (const item of liveResults) {
      const key = item.name?.toLowerCase().replace(/\s+/g, '');
      if (key && !seen.has(key)) {
        seen.add(key);
        list.push({
          id: `live-${key}`,
          name: item.name,
          servingSize: item.servingSize || '1인분',
          calories: item.calories,
          carbs: item.carbs,
          protein: item.protein,
          fat: item.fat,
          source: '연동',
        });
      }
    }

    return list.slice(0, 10);
  }, [localMatchingFoods, liveResults]);

  const handleSelectSuggestedFood = (food: {
    name: string;
    servingSize: string;
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  }) => {
    setFoodName(food.name);
    setServingDescription(food.servingSize);
    setCalories(food.calories);
    setCarbs(food.carbs);
    setProtein(food.protein);
    setFat(food.fat);
    setShowSuggestions(false);
  };

  if (!isOpen) return null;

  const numCal = typeof calories === 'number' ? calories : 0;
  const numCarbs = typeof carbs === 'number' ? carbs : 0;
  const numProtein = typeof protein === 'number' ? protein : 0;
  const numFat = typeof fat === 'number' ? fat : 0;

  const calculatedCalories = Math.round(numCal * quantity);
  const calculatedCarbs = Number((numCarbs * quantity).toFixed(1));
  const calculatedProtein = Number((numProtein * quantity).toFixed(1));
  const calculatedFat = Number((numFat * quantity).toFixed(1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName.trim()) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    onAddMealItem({
      date: currentDate,
      mealType,
      foodName: foodName.trim(),
      quantity,
      servingDescription: servingDescription.trim() || '1인분',
      calories: calculatedCalories,
      carbs: calculatedCarbs,
      protein: calculatedProtein,
      fat: calculatedFat,
      timestamp: timeStr,
      notes: notes.trim() || undefined,
    });

    onClose();
    setFoodName('');
    setNotes('');
    setQuantity(1);
    setShowSuggestions(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-[#EBEBEB] airbnb-shadow-floating overflow-hidden my-6">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EBEBEB] flex items-center justify-between bg-white">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#222222] flex items-center gap-2">
              <span>음식 기록 추가</span>
              <span className="inline-flex items-center text-[11px] font-bold text-[#FF385C] bg-[#FFF0F2] px-2.5 py-0.5 rounded-full">
                연동
              </span>
            </h3>
            <p className="text-xs text-[#717171] mt-0.5">
              메뉴를 입력하면 칼로리와 탄·단·지를 실시간으로 자동 채워줍니다.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#717171] hover:text-[#222222] hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="p-6 space-y-4">
            {/* Meal type selector - Airbnb Pill Tabs */}
            <div>
              <label className="block text-xs font-bold text-[#222222] mb-1.5">
                식사 구분
              </label>
              <div className="grid grid-cols-4 gap-2 p-1 bg-neutral-100 rounded-full border border-[#EBEBEB]">
                {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setMealType(type)}
                    className={`py-1.5 px-3 text-xs sm:text-sm font-bold rounded-full transition-all text-center ${
                      mealType === type
                        ? 'bg-[#222222] text-white shadow-xs'
                        : 'text-[#717171] hover:text-[#222222]'
                    }`}
                  >
                    {MEAL_TYPE_LABELS[type]?.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Food Name & Serving size unit with Smart Auto-Fill */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="relative" ref={dropdownRef}>
                <label className="block text-xs font-bold text-[#222222] mb-1 flex items-center justify-between">
                  <span>음식명 *</span>
                  <span className="text-[10px] text-[#FF385C] font-semibold flex items-center gap-1">
                    {isSearchingLive ? (
                      <>
                        <Loader2 className="w-2.5 h-2.5 animate-spin" />
                        <span>검색 중...</span>
                      </>
                    ) : (
                      <span>연동</span>
                    )}
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="예: 햇반, 컵누들, 신라면, 싸이버거, 닭가슴살"
                    value={foodName}
                    onChange={(e) => {
                      setFoodName(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => {
                      if (foodName.trim().length > 0) setShowSuggestions(true);
                    }}
                    className="w-full pl-3.5 pr-8 py-2.5 text-sm border border-[#DDDDDD] hover:border-[#222222] focus:border-[#222222] rounded-xl focus:outline-none bg-white transition-colors"
                    autoFocus
                  />
                  <Search className="w-4 h-4 text-[#717171] absolute right-3 top-3 pointer-events-none" />
                </div>

                {/* Autocomplete Dropdown List */}
                {showSuggestions && combinedSuggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#EBEBEB] rounded-2xl airbnb-shadow-lg z-30 overflow-hidden divide-y divide-[#EBEBEB] max-h-64 overflow-y-auto">
                    <div className="px-3.5 py-2 bg-neutral-50 text-[11px] font-bold text-[#717171] flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        {isSearchingLive ? (
                          <Loader2 className="w-3 h-3 animate-spin text-[#FF385C]" />
                        ) : (
                          <span>💡</span>
                        )}
                        <span>추천 결과 ({combinedSuggestions.length}건, 클릭 시 자동 입력)</span>
                      </span>
                      <span className="text-[10px] text-[#FF385C] font-semibold">연동</span>
                    </div>
                    {combinedSuggestions.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectSuggestedFood(item)}
                        className="px-3.5 py-2.5 text-xs hover:bg-[#FFF8F6] cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="font-bold text-[#222222] truncate flex items-center gap-1.5">
                            <span>{item.name}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full font-semibold bg-[#FFF0F2] text-[#FF385C]">
                              연동
                            </span>
                          </div>
                          <div className="text-[11px] text-[#717171] truncate mt-0.5">
                            {item.servingSize}
                          </div>
                        </div>
                        <div className="text-right shrink-0 font-mono text-[11px]">
                          <span className="font-extrabold text-[#222222] text-xs">
                            {item.calories} kcal
                          </span>
                          <div className="text-[10px] text-[#717171]">
                            탄 {item.carbs}g · 단 {item.protein}g · 지 {item.fat}g
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#222222] mb-1">
                  기준 단위 / 제공량
                </label>
                <input
                  type="text"
                  placeholder="예: 1개 (210g), 1팩, 1그릇"
                  value={servingDescription}
                  onChange={(e) => setServingDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-[#DDDDDD] hover:border-[#222222] focus:border-[#222222] rounded-xl focus:outline-none bg-white transition-colors"
                />
              </div>
            </div>

            {/* Quick Popular Picks - Airbnb Rounded Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] text-[#717171] shrink-0 font-medium">빠른 선택:</span>
              {[
                { name: 'CJ 햇반 백미 (210g)', cal: 315, c: 70, p: 5, f: 1.5, s: '1개 (210g)' },
                { name: '닭가슴살 (스팀/수비드 100g)', cal: 115, c: 0.5, p: 24, f: 1.5, s: '1팩 (100g)' },
                { name: '삶은 달걀', cal: 155, c: 1.1, p: 13, f: 10.5, s: '2개 (100g)' },
                { name: '오뚜기 컵누들 매콤한맛', cal: 120, c: 27, p: 1, f: 0.7, s: '1컵 (37.8g)' },
                { name: '서브웨이 로스트치킨', cal: 320, c: 42, p: 26, f: 4.8, s: '15cm 1개' },
                { name: '스타벅스 아메리카노', cal: 10, c: 1.5, p: 0.8, f: 0.1, s: '1잔 (355ml)' },
              ].map((quick) => (
                <button
                  key={quick.name}
                  type="button"
                  onClick={() => {
                    setFoodName(quick.name);
                    setServingDescription(quick.s);
                    setCalories(quick.cal);
                    setCarbs(quick.c);
                    setProtein(quick.p);
                    setFat(quick.f);
                    setShowSuggestions(false);
                  }}
                  className="px-3 py-1 text-[11px] font-medium bg-white hover:bg-neutral-50 border border-[#DDDDDD] hover:border-[#222222] text-[#222222] rounded-full shrink-0 transition-colors airbnb-shadow-sm cursor-pointer"
                >
                  +{quick.name}
                </button>
              ))}
            </div>

            {/* Nutrition Inputs */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#222222]">
                  기준 영양 성분 (1회 기준)
                </label>
                <span className="text-[11px] text-[#717171]">
                  자유롭게 수정 가능 (1단위 제한 없음)
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#717171] mb-1">
                    칼로리 (kcal)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono font-bold border border-[#DDDDDD] focus:border-[#222222] rounded-xl focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#717171] mb-1">
                    탄수화물 (g)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono font-bold border border-[#DDDDDD] focus:border-[#222222] rounded-xl focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#717171] mb-1">
                    단백질 (g)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono font-bold border border-[#DDDDDD] focus:border-[#222222] rounded-xl focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#717171] mb-1">
                    지방 (g)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={fat}
                    onChange={(e) => setFat(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono font-bold border border-[#DDDDDD] focus:border-[#222222] rounded-xl focus:outline-none bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Quantity Multiplier & Notes */}
            <div className="pt-3 border-t border-[#EBEBEB] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="block text-xs font-bold text-[#222222] mb-1">
                  섭취 분량 (배수)
                </label>
                <div className="flex items-center gap-1.5">
                  {[0.5, 1, 1.5, 2].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuantity(q)}
                      className={`px-3 py-1 text-xs font-bold rounded-full transition-all border ${
                        quantity === q
                          ? 'bg-[#222222] text-white border-[#222222]'
                          : 'bg-white text-[#717171] border-[#DDDDDD] hover:border-[#222222]'
                      }`}
                    >
                      {q}인분
                    </button>
                  ))}
                  <div className="flex items-center gap-1 ml-2">
                    <input
                      type="number"
                      min="0.1"
                      step="any"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value === '' ? 1 : Number(e.target.value))}
                      className="w-16 px-2 py-1 text-xs font-mono font-bold border border-[#DDDDDD] rounded-lg text-center bg-white"
                    />
                    <span className="text-xs text-[#717171]">배</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 sm:max-w-xs">
                <label className="block text-xs font-bold text-[#222222] mb-1">
                  식단 메모 (선택)
                </label>
                <input
                  type="text"
                  placeholder="예: 밥 덜어먹음, 소스 제외"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-[#DDDDDD] hover:border-[#222222] focus:border-[#222222] rounded-xl focus:outline-none bg-white transition-colors"
                />
              </div>
            </div>

            {/* Real-time Result Preview */}
            <div className="p-4 bg-[#FAFAFA] rounded-2xl border border-[#EBEBEB] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-bold text-[#222222]">
                  {foodName.trim() || '입력 중인 음식'}
                </span>
                <span className="text-[#717171] ml-1">
                  ({quantity}인분 환산 결과)
                </span>
              </div>
              <div className="flex items-center gap-3 font-mono tabular-nums">
                <span className="font-extrabold text-[#FF385C] text-sm">
                  {calculatedCalories} kcal
                </span>
                <span className="text-[#DDDDDD]">|</span>
                <span className="text-[#717171]">탄 <strong className="text-[#222222]">{calculatedCarbs}g</strong></span>
                <span className="text-[#717171]">단 <strong className="text-[#222222]">{calculatedProtein}g</strong></span>
                <span className="text-[#717171]">지 <strong className="text-[#222222]">{calculatedFat}g</strong></span>
              </div>
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="px-6 py-4 bg-white border-t border-[#EBEBEB] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="text-xs sm:text-sm font-semibold text-[#222222] hover:underline cursor-pointer"
            >
              취소
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF385C] via-[#E00B41] to-[#D70466] hover:brightness-105 active:scale-[0.98] rounded-full transition-all flex items-center gap-1.5 shadow-[0_2px_8px_rgba(255,56,92,0.3)] hover:shadow-[0_4px_12px_rgba(255,56,92,0.4)] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>식단에 추가하기</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
