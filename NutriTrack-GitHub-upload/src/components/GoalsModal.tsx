import React, { useState, useMemo } from 'react';
import { NutritionGoal, UserProfile } from '../types/nutrition';
import {
  calculatePersonalizedPlans,
  loadUserProfile,
  saveUserProfile,
} from '../utils/storage';
import { X, Check, Sliders, Activity, User, HeartPulse, Sparkles } from 'lucide-react';

interface GoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: NutritionGoal;
  onSaveGoal: (newGoal: NutritionGoal) => void;
}

export const GoalsModal: React.FC<GoalsModalProps> = ({ isOpen, onClose, goal, onSaveGoal }) => {
  const [profile, setProfile] = useState<UserProfile>(loadUserProfile());
  const [formData, setFormData] = useState<NutritionGoal>(goal);
  const [activePlanId, setActivePlanId] = useState<string>('diet');

  // Compute dynamic personalized recommendation plans strictly based on height & weight
  const personalized = useMemo(() => {
    return calculatePersonalizedPlans(profile);
  }, [profile]);

  if (!isOpen) return null;

  const handleProfileChange = (key: keyof UserProfile, value: any) => {
    const updated = { ...profile, [key]: value };
    setProfile(updated);
    saveUserProfile(updated);

    // Recompute and automatically align the active plan's values
    const newCalc = calculatePersonalizedPlans(updated);
    const matched = newCalc.plans.find((p) => p.id === activePlanId) || newCalc.plans[0];
    if (matched) {
      setFormData({ ...matched.goal });
    }
  };

  const handleSelectPlan = (planId: string) => {
    setActivePlanId(planId);
    const matched = personalized.plans.find((p) => p.id === planId);
    if (matched) {
      setFormData({ ...matched.goal });
    }
  };

  const carbsCal = formData.carbs * 4;
  const proteinCal = formData.protein * 4;
  const fatCal = formData.fat * 9;
  const totalMacroCal = carbsCal + proteinCal + fatCal;

  const carbsRatio = totalMacroCal > 0 ? Math.round((carbsCal / totalMacroCal) * 100) : 0;
  const proteinRatio = totalMacroCal > 0 ? Math.round((proteinCal / totalMacroCal) * 100) : 0;
  const fatRatio = totalMacroCal > 0 ? 100 - carbsRatio - proteinRatio : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserProfile(profile);
    onSaveGoal(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-[#EBEBEB] airbnb-shadow-floating overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EBEBEB] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFF0F2] text-[#FF385C] flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#222222]">
                신체 맞춤 영양 목표 설정
              </h3>
              <p className="text-xs text-[#717171]">
                키, 몸무게를 바탕으로 기초대사량과 개인 맞춤 탄·단·지 플랜을 계산합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#717171] hover:text-[#222222] hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} noValidate className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Section 1: Physical Measurements Input */}
          <div className="bg-[#FAFAFA] p-5 rounded-2xl border border-[#EBEBEB] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#EBEBEB]">
              <span className="text-xs font-bold text-[#222222] flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#FF385C]" />
                1. 나의 신체 정보 (키 · 몸무게 입력)
              </span>
              <span className="text-[11px] text-[#717171]">
                BMI {personalized.bmi} · 표준체중 {personalized.idealWeight}kg
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-[#717171] mb-1">
                  성별
                </label>
                <div className="grid grid-cols-2 gap-1 p-0.5 bg-neutral-200/60 rounded-full">
                  <button
                    type="button"
                    onClick={() => handleProfileChange('gender', 'male')}
                    className={`py-1 text-xs font-bold rounded-full transition-all ${
                      profile.gender === 'male'
                        ? 'bg-[#222222] text-white shadow-xs'
                        : 'text-[#717171]'
                    }`}
                  >
                    남성
                  </button>
                  <button
                    type="button"
                    onClick={() => handleProfileChange('gender', 'female')}
                    className={`py-1 text-xs font-bold rounded-full transition-all ${
                      profile.gender === 'female'
                        ? 'bg-[#222222] text-white shadow-xs'
                        : 'text-[#717171]'
                    }`}
                  >
                    여성
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#717171] mb-1">
                  나이 (만 세)
                </label>
                <input
                  type="number"
                  min="10"
                  max="120"
                  value={profile.age}
                  onChange={(e) => handleProfileChange('age', Number(e.target.value) || 28)}
                  className="w-full px-3 py-1.5 text-xs font-bold font-mono border border-[#DDDDDD] rounded-xl bg-white focus:border-[#222222] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#717171] mb-1">
                  키 (cm)
                </label>
                <input
                  type="number"
                  min="100"
                  max="250"
                  step="0.5"
                  value={profile.height}
                  onChange={(e) => handleProfileChange('height', Number(e.target.value) || 172)}
                  className="w-full px-3 py-1.5 text-xs font-bold font-mono border border-[#DDDDDD] rounded-xl bg-white focus:border-[#222222] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#717171] mb-1">
                  체중 (kg)
                </label>
                <input
                  type="number"
                  min="30"
                  max="250"
                  step="0.5"
                  value={profile.weight}
                  onChange={(e) => handleProfileChange('weight', Number(e.target.value) || 68)}
                  className="w-full px-3 py-1.5 text-xs font-bold font-mono border border-[#DDDDDD] rounded-xl bg-white focus:border-[#222222] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#717171] mb-1">
                평소 일상 활동량
              </label>
              <select
                value={profile.activityLevel}
                onChange={(e) => handleProfileChange('activityLevel', e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-medium border border-[#DDDDDD] rounded-xl bg-white focus:border-[#222222] focus:outline-none"
              >
                <option value="sedentary">앉아서 주로 생활 (운동 거의 안함, 사무직)</option>
                <option value="light">가벼운 활동 (주 1~3회 가벼운 운동/산책)</option>
                <option value="moderate">보통 활동 (주 3~5회 보통 강도 운동)</option>
                <option value="active">활동량 많음 (주 6~7회 강도 높은 운동)</option>
              </select>
            </div>

            {/* Calculated Energy Summary */}
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
              <div className="p-2.5 bg-white rounded-xl border border-[#EBEBEB]">
                <div className="text-[10px] text-[#717171] flex items-center gap-1 font-bold">
                  <HeartPulse className="w-3 h-3 text-[#FF385C]" />
                  기초대사량 (BMR)
                </div>
                <div className="text-base font-extrabold text-[#222222] mt-0.5">
                  {personalized.bmr.toLocaleString()} <span className="text-[10px] font-normal text-[#717171]">kcal</span>
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-[#EBEBEB]">
                <div className="text-[10px] text-[#717171] flex items-center gap-1 font-bold">
                  <Activity className="w-3 h-3 text-emerald-600" />
                  일일 총 소비열량 (TDEE)
                </div>
                <div className="text-base font-extrabold text-[#222222] mt-0.5">
                  {personalized.tdee.toLocaleString()} <span className="text-[10px] font-normal text-[#717171]">kcal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Recommended Preset Plans */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#222222] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FF385C]" />
                2. 체중/신체 맞춤 추천 플랜 선택
              </span>
              <span className="text-[11px] text-[#717171]">클릭 시 자동 반영</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {personalized.plans.map((p) => {
                const isSelected = activePlanId === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelectPlan(p.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#222222] bg-white ring-1 ring-[#222222] airbnb-shadow-md'
                        : 'border-[#EBEBEB] bg-white hover:border-[#DDDDDD] airbnb-shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#222222]">{p.name}</span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#222222] text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <div className="text-[11px] text-[#717171] mt-0.5 line-clamp-1">
                      {p.description}
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#EBEBEB] flex items-baseline justify-between font-mono">
                      <span className="text-base font-extrabold text-[#FF385C]">
                        {p.goal.calories} <span className="text-[10px] font-normal text-[#717171]">kcal</span>
                      </span>
                      <span className="text-[10px] text-[#717171]">
                        탄 {p.goal.carbs} · 단 {p.goal.protein} · 지 {p.goal.fat}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Fine-tune Macro Nutrients */}
          <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] airbnb-shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#EBEBEB]">
              <span className="text-xs font-bold text-[#222222]">
                3. 최종 적용 일일 목표값 (직접 미세조정 가능)
              </span>
              <span className="text-[11px] text-[#717171]">단위: g</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#717171] mb-1">
                  목표 칼로리 (kcal)
                </label>
                <input
                  type="number"
                  min="500"
                  step="any"
                  value={formData.calories || ''}
                  onChange={(e) => setFormData({ ...formData, calories: e.target.value === '' ? 0 : Number(e.target.value) })}
                  className="w-full px-3 py-2 text-sm font-mono font-bold border border-[#DDDDDD] rounded-xl focus:border-[#222222] focus:outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#717171] mb-1">
                  탄수화물 (g)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={formData.carbs || ''}
                  onChange={(e) => setFormData({ ...formData, carbs: e.target.value === '' ? 0 : Number(e.target.value) })}
                  className="w-full px-3 py-2 text-sm font-mono font-bold border border-[#DDDDDD] rounded-xl focus:border-[#222222] focus:outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#717171] mb-1">
                  단백질 (g)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={formData.protein || ''}
                  onChange={(e) => setFormData({ ...formData, protein: e.target.value === '' ? 0 : Number(e.target.value) })}
                  className="w-full px-3 py-2 text-sm font-mono font-bold border border-[#DDDDDD] rounded-xl focus:border-[#222222] focus:outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#717171] mb-1">
                  지방 (g)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={formData.fat || ''}
                  onChange={(e) => setFormData({ ...formData, fat: e.target.value === '' ? 0 : Number(e.target.value) })}
                  className="w-full px-3 py-2 text-sm font-mono font-bold border border-[#DDDDDD] rounded-xl focus:border-[#222222] focus:outline-none bg-white"
                />
              </div>
            </div>

            {/* Computed Macro Energy Proportions Bar */}
            <div className="mt-3 p-3.5 bg-[#FAFAFA] rounded-xl border border-[#EBEBEB]">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-[#222222]">
                  탄·단·지 칼로리 에너지 비율
                </span>
                <span className="font-mono text-[#717171] tabular-nums text-[11px]">
                  영양소 합산: {totalMacroCal.toFixed(0)} kcal
                </span>
              </div>
              <div className="h-2 w-full rounded-full overflow-hidden flex bg-neutral-200">
                <div style={{ width: `${carbsRatio}%` }} className="bg-amber-500" />
                <div style={{ width: `${proteinRatio}%` }} className="bg-emerald-500" />
                <div style={{ width: `${fatRatio}%` }} className="bg-sky-500" />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-[#717171] mt-2">
                <span>탄수화물 {carbsRatio}%</span>
                <span>단백질 {proteinRatio}%</span>
                <span>지방 {fatRatio}%</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 border-t border-[#EBEBEB] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="text-xs sm:text-sm font-semibold text-[#222222] hover:underline cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF385C] via-[#E00B41] to-[#D70466] hover:brightness-105 active:scale-[0.98] rounded-full transition-all shadow-[0_2px_8px_rgba(255,56,92,0.3)] hover:shadow-[0_4px_12px_rgba(255,56,92,0.4)] cursor-pointer"
            >
              맞춤 목표 저장 및 적용
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
