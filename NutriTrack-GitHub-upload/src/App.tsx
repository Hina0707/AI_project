/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { MealType, MealLogItem, NutritionGoal } from './types/nutrition';
import {
  loadMealLogs,
  saveMealLogs,
  loadNutritionGoal,
  saveNutritionGoal,
  calculateDailySummary,
  getTodayDateString,
} from './utils/storage';
import { Header } from './components/Header';
import { DateNavigator } from './components/DateNavigator';
import { DailyOverview } from './components/DailyOverview';
import { MealSection } from './components/MealSection';
import { AddFoodModal } from './components/AddFoodModal';
import { ExcelExportModal } from './components/ExcelExportModal';
import { GoalsModal } from './components/GoalsModal';
import { WeeklyTrends } from './components/WeeklyTrends';
import {
  FileSpreadsheet,
  Plus,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import heroBannerImg from './assets/images/nutrition_meal_hero_1790816808016.jpg';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'tracker' | 'weekly'>('tracker');
  const [currentDate, setCurrentDate] = useState<string>(getTodayDateString());
  const [mealLogs, setMealLogs] = useState<MealLogItem[]>([]);
  const [nutritionGoal, setNutritionGoal] = useState<NutritionGoal>(loadNutritionGoal());

  // Modals state
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [activeAddMealType, setActiveAddMealType] = useState<MealType>('breakfast');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isGoalsOpen, setIsGoalsOpen] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  // Initial load
  useEffect(() => {
    const logs = loadMealLogs();
    setMealLogs(logs);
    setNutritionGoal(loadNutritionGoal());
  }, []);

  // Sync logs when mealLogs change
  const updateMealLogs = (newLogs: MealLogItem[]) => {
    setMealLogs(newLogs);
    saveMealLogs(newLogs);
  };

  // Day specific items
  const dayItems = useMemo(() => {
    return mealLogs.filter((item) => item.date === currentDate);
  }, [mealLogs, currentDate]);

  // Day summary
  const dailySummary = useMemo(() => {
    return calculateDailySummary(mealLogs, currentDate);
  }, [mealLogs, currentDate]);

  // Handlers
  const handleOpenAddFood = (mealType: MealType) => {
    setActiveAddMealType(mealType);
    setIsAddFoodOpen(true);
  };

  const handleAddMealItem = (newItem: Omit<MealLogItem, 'id'>) => {
    const itemWithId: MealLogItem = {
      ...newItem,
      id: `meal-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };
    const updated = [...mealLogs, itemWithId];
    updateMealLogs(updated);
    showToast(`'${newItem.foodName}'이(가) 식단에 등록되었습니다.`);
  };

  const handleDeleteItem = (id: string) => {
    const target = mealLogs.find((i) => i.id === id);
    const updated = mealLogs.filter((item) => item.id !== id);
    updateMealLogs(updated);
    if (target) {
      showToast(`'${target.foodName}' 항목을 삭제했습니다.`);
    }
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    const updated = mealLogs.map((item) => {
      if (item.id === id) {
        const ratio = newQuantity / item.quantity;
        return {
          ...item,
          quantity: newQuantity,
          calories: Math.round(item.calories * ratio),
          carbs: Number((item.carbs * ratio).toFixed(1)),
          protein: Number((item.protein * ratio).toFixed(1)),
          fat: Number((item.fat * ratio).toFixed(1)),
        };
      }
      return item;
    });
    updateMealLogs(updated);
    showToast(`섭취 분량을 ${newQuantity}인분으로 변경했습니다.`);
  };

  const handleSaveGoal = (newGoal: NutritionGoal) => {
    setNutritionGoal(newGoal);
    saveNutritionGoal(newGoal);
    showToast('새로운 영양 권장 목표치가 저장되었습니다.');
  };

  return (
    <div className="min-h-screen bg-neutral-100/70 text-neutral-900 flex flex-col font-sans">
      {/* Top Bar with Prominent 결괏값 엑셀 다운로드 Button */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenGoals={() => setIsGoalsOpen(true)}
        targetDate={currentDate}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Banner with Top Controls and 결괏값 엑셀 다운로드 */}
        {currentTab === 'tracker' && (
          <div className="relative rounded-2xl overflow-hidden bg-neutral-900 text-white shadow-sm border border-neutral-800">
            <div className="absolute inset-0 z-0">
              <img
                src={heroBannerImg}
                alt="건강 식단 및 영양소 관리"
                className="w-full h-full object-cover opacity-25"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-900/90 to-transparent" />
            </div>

            <div className="relative z-10 px-6 sm:px-8 py-7 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>스마트 영양 계산 & 엑셀 보고서</span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
                  식단관리
                </h1>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handleOpenAddFood('breakfast')}
                  className="px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>음식 기록 추가</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: 오늘의 식단 대시보드 */}
        {currentTab === 'tracker' && (
          <div className="space-y-6">
            {/* Date Selection */}
            <DateNavigator currentDate={currentDate} onDateChange={setCurrentDate} />

            {/* Daily Overview Metric Cards & Proportions */}
            <DailyOverview
              summary={dailySummary}
              goal={nutritionGoal}
              onOpenGoals={() => setIsGoalsOpen(true)}
            />

            {/* 4 Meal Category Sections */}
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  식사별 상세 기록
                </h3>
                <p className="text-xs text-neutral-500">
                  아침, 점심, 저녁, 간식 별로 음식을 등록하고 영양 소계를 확인하세요.
                </p>
              </div>

              {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((mealType) => (
                <MealSection
                  key={mealType}
                  mealType={mealType}
                  items={dayItems.filter((item) => item.mealType === mealType)}
                  onAddClick={handleOpenAddFood}
                  onDeleteItem={handleDeleteItem}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: 주간 통계 및 추이 분석 */}
        {currentTab === 'weekly' && (
          <WeeklyTrends
            logs={mealLogs}
            goal={nutritionGoal}
            onSelectDate={(date) => {
              setCurrentDate(date);
              setCurrentTab('tracker');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-neutral-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-700">식단관리</span>
            <span aria-hidden="true">·</span>
            <span>탄·단·지 칼로리 기록 및 엑셀 리포트 시스템</span>
          </div>
          <div>
            <span>데이터는 브라우저 로컬 저장소에 안전하게 유지됩니다.</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AddFoodModal
        isOpen={isAddFoodOpen}
        onClose={() => setIsAddFoodOpen(false)}
        defaultMealType={activeAddMealType}
        currentDate={currentDate}
        onAddMealItem={handleAddMealItem}
      />

      <ExcelExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        targetDate={currentDate}
        items={dayItems}
        goal={nutritionGoal}
        dailySummary={dailySummary}
        allHistoryItems={mealLogs}
      />

      <GoalsModal
        isOpen={isGoalsOpen}
        onClose={() => setIsGoalsOpen(false)}
        goal={nutritionGoal}
        onSaveGoal={handleSaveGoal}
      />

      {/* Floating Action / Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2.5 rounded-lg shadow-lg text-xs font-medium flex items-center gap-2 transition-all">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
