import React, { useState } from 'react';
import { MealLogItem, NutritionGoal, DailySummary } from '../types/nutrition';
import { exportNutritionToExcel, exportNutritionToCSV } from '../utils/excelExporter';
import { MEAL_TYPE_LABELS } from '../data/foodDatabase';
import { X, FileSpreadsheet, Download, Copy, Check, Table } from 'lucide-react';

interface ExcelExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetDate: string;
  items: MealLogItem[];
  goal: NutritionGoal;
  dailySummary: DailySummary;
  allHistoryItems: MealLogItem[];
}

export const ExcelExportModal: React.FC<ExcelExportModalProps> = ({
  isOpen,
  onClose,
  targetDate,
  items,
  goal,
  dailySummary,
  allHistoryItems,
}) => {
  const [exportScope, setExportScope] = useState<'day' | 'all'>('day');
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const activeItems = exportScope === 'day' ? items : allHistoryItems;

  const handleDownloadXlsx = () => {
    try {
      const fileName = exportNutritionToExcel({
        targetDate,
        items,
        goal,
        dailySummary,
        allHistoryItems,
      });
      setDownloadSuccess(`${fileName} 파일이 정상 다운로드되었습니다.`);
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (e) {
      console.error(e);
      alert('엑셀 파일 생성 중 오류가 발생했습니다.');
    }
  };

  const handleDownloadCsv = () => {
    try {
      const fileName = exportNutritionToCSV(activeItems, targetDate);
      setDownloadSuccess(`${fileName} 파일이 다운로드되었습니다.`);
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (e) {
      console.error(e);
      alert('CSV 파일 생성 중 오류가 발생했습니다.');
    }
  };

  const handleCopyToClipboard = async () => {
    const header = ['날짜', '식사구분', '시간', '음식명', '섭취량', '칼로리(kcal)', '탄수화물(g)', '단백질(g)', '지방(g)', '메모'].join('\t');
    const rows = activeItems.map((i) => [
      i.date,
      MEAL_TYPE_LABELS[i.mealType]?.label || i.mealType,
      i.timestamp,
      i.foodName,
      `${i.quantity}인분`,
      i.calories,
      i.carbs,
      i.protein,
      i.fat,
      i.notes || '',
    ].join('\t'));

    const textToCopy = [header, ...rows].join('\n');
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-[#EBEBEB] airbnb-shadow-floating overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EBEBEB] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFF0F2] text-[#FF385C] flex items-center justify-center shadow-xs">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#222222]">
                식단 엑셀 보고서 다운로드
              </h3>
              <p className="text-xs text-[#717171]">
                수집된 탄수화물, 단백질, 칼로리 데이터를 구조화된 엑셀 보고서로 내보냅니다.
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

        {/* Options & Filter Bar */}
        <div className="px-6 py-3 border-b border-[#EBEBEB] bg-white flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#222222]">추출 범위:</span>
            <div className="flex items-center bg-neutral-100 p-1 rounded-full border border-[#EBEBEB]">
              <button
                type="button"
                onClick={() => setExportScope('day')}
                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                  exportScope === 'day'
                    ? 'bg-[#222222] text-white shadow-xs'
                    : 'text-[#717171] hover:text-[#222222]'
                }`}
              >
                당일 식단 ({targetDate})
              </button>
              <button
                type="button"
                onClick={() => setExportScope('all')}
                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                  exportScope === 'all'
                    ? 'bg-[#222222] text-white shadow-xs'
                    : 'text-[#717171] hover:text-[#222222]'
                }`}
              >
                전체 누적 기록 ({allHistoryItems.length}개)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyToClipboard}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#222222] bg-white border border-[#DDDDDD] hover:border-[#222222] rounded-full hover:bg-neutral-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '복사 완료!' : '표 클립보드 복사'}</span>
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {downloadSuccess && (
          <div className="px-6 py-2.5 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 font-semibold">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Scrollable Spreadsheet Preview */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#FAFAFA] space-y-6">
          {/* 1. Goal vs Consumed Macro Summary Preview */}
          <div className="bg-white rounded-2xl border border-[#EBEBEB] overflow-hidden airbnb-shadow-sm">
            <div className="px-4 py-3 bg-white border-b border-[#EBEBEB] flex items-center justify-between">
              <span className="text-xs font-bold text-[#222222] flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5 text-[#FF385C]" />
                [시트 1 미리보기] 목표치 대비 영양소 달성 분석표
              </span>
              <span className="text-[11px] text-[#717171] font-mono">
                기준일: {targetDate}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono tabular-nums text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 text-[#717171] font-bold border-b border-[#EBEBEB]">
                    <th className="py-2.5 px-4">영양소 구분</th>
                    <th className="py-2.5 px-4 text-right">목표치</th>
                    <th className="py-2.5 px-4 text-right">실제 섭취량</th>
                    <th className="py-2.5 px-4 text-right">과부족</th>
                    <th className="py-2.5 px-4 text-right">달성률</th>
                    <th className="py-2.5 px-4 text-right">총 열량 기여율</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBEBEB]">
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-[#222222]">칼로리 (Energy)</td>
                    <td className="py-2.5 px-4 text-right">{goal.calories} kcal</td>
                    <td className="py-2.5 px-4 text-right font-extrabold text-[#FF385C]">{dailySummary.totalCalories} kcal</td>
                    <td className="py-2.5 px-4 text-right">{dailySummary.totalCalories - goal.calories} kcal</td>
                    <td className="py-2.5 px-4 text-right font-bold text-emerald-700">
                      {goal.calories > 0 ? ((dailySummary.totalCalories / goal.calories) * 100).toFixed(1) : 0}%
                    </td>
                    <td className="py-2.5 px-4 text-right">100.0%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-[#222222]">탄수화물 (Carbs)</td>
                    <td className="py-2.5 px-4 text-right">{goal.carbs} g</td>
                    <td className="py-2.5 px-4 text-right font-bold text-[#222222]">{dailySummary.totalCarbs} g</td>
                    <td className="py-2.5 px-4 text-right">{(dailySummary.totalCarbs - goal.carbs).toFixed(1)} g</td>
                    <td className="py-2.5 px-4 text-right font-bold">
                      {goal.carbs > 0 ? ((dailySummary.totalCarbs / goal.carbs) * 100).toFixed(1) : 0}%
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      {dailySummary.totalCalories > 0 ? `${((dailySummary.totalCarbs * 4 / dailySummary.totalCalories) * 100).toFixed(1)}%` : '0%'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-[#222222]">단백질 (Protein)</td>
                    <td className="py-2.5 px-4 text-right">{goal.protein} g</td>
                    <td className="py-2.5 px-4 text-right font-bold text-[#222222]">{dailySummary.totalProtein} g</td>
                    <td className="py-2.5 px-4 text-right">{(dailySummary.totalProtein - goal.protein).toFixed(1)} g</td>
                    <td className="py-2.5 px-4 text-right font-bold">
                      {goal.protein > 0 ? ((dailySummary.totalProtein / goal.protein) * 100).toFixed(1) : 0}%
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      {dailySummary.totalCalories > 0 ? `${((dailySummary.totalProtein * 4 / dailySummary.totalCalories) * 100).toFixed(1)}%` : '0%'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-[#222222]">지방 (Fat)</td>
                    <td className="py-2.5 px-4 text-right">{goal.fat} g</td>
                    <td className="py-2.5 px-4 text-right font-bold text-[#222222]">{dailySummary.totalFat} g</td>
                    <td className="py-2.5 px-4 text-right">{(dailySummary.totalFat - goal.fat).toFixed(1)} g</td>
                    <td className="py-2.5 px-4 text-right font-bold">
                      {goal.fat > 0 ? ((dailySummary.totalFat / goal.fat) * 100).toFixed(1) : 0}%
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      {dailySummary.totalCalories > 0 ? `${((dailySummary.totalFat * 9 / dailySummary.totalCalories) * 100).toFixed(1)}%` : '0%'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Detailed Food Log Sheet Preview */}
          <div className="bg-white rounded-2xl border border-[#EBEBEB] overflow-hidden airbnb-shadow-sm">
            <div className="px-4 py-3 bg-white border-b border-[#EBEBEB] flex items-center justify-between">
              <span className="text-xs font-bold text-[#222222] flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5 text-[#FF385C]" />
                [시트 2 미리보기] 식사별 상세 기록 명세서 ({activeItems.length}건)
              </span>
            </div>

            <div className="overflow-x-auto max-h-64">
              <table className="w-full text-xs font-mono tabular-nums text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 text-[#717171] font-bold border-b border-[#EBEBEB] sticky top-0 bg-white">
                    <th className="py-2.5 px-4">날짜</th>
                    <th className="py-2.5 px-4">식사</th>
                    <th className="py-2.5 px-4">시간</th>
                    <th className="py-2.5 px-4">음식명</th>
                    <th className="py-2.5 px-4 text-right">칼로리</th>
                    <th className="py-2.5 px-4 text-right">탄수화물</th>
                    <th className="py-2.5 px-4 text-right">단백질</th>
                    <th className="py-2.5 px-4 text-right">지방</th>
                    <th className="py-2.5 px-4">메모</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBEBEB]">
                  {activeItems.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-[#717171]">
                        해당 범위에 기록된 식단 데이터가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    activeItems.map((item) => (
                      <tr key={item.id} className="hover:bg-neutral-50/80">
                        <td className="py-2 px-4 text-[#717171]">{item.date}</td>
                        <td className="py-2 px-4 font-semibold text-[#222222]">
                          {MEAL_TYPE_LABELS[item.mealType]?.label || item.mealType}
                        </td>
                        <td className="py-2 px-4 text-[#717171]">{item.timestamp}</td>
                        <td className="py-2 px-4 font-bold text-[#222222]">{item.foodName}</td>
                        <td className="py-2 px-4 text-right font-bold text-[#FF385C]">{item.calories} kcal</td>
                        <td className="py-2 px-4 text-right">{item.carbs} g</td>
                        <td className="py-2 px-4 text-right">{item.protein} g</td>
                        <td className="py-2 px-4 text-right">{item.fat} g</td>
                        <td className="py-2 px-4 text-[#717171] truncate max-w-xs">{item.notes || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-white border-t border-[#EBEBEB] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#717171]">
            <span>Microsoft Excel, Google 스프레드시트와 100% 호환됩니다.</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleDownloadCsv}
              className="px-4 py-2.5 text-xs sm:text-sm font-bold text-[#222222] bg-white border border-[#DDDDDD] hover:border-[#222222] rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV 다운로드</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadXlsx}
              className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF385C] via-[#E00B41] to-[#D70466] hover:brightness-105 active:scale-[0.98] rounded-full transition-all shadow-[0_2px_8px_rgba(255,56,92,0.3)] hover:shadow-[0_4px_12px_rgba(255,56,92,0.4)] flex items-center gap-2 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>엑셀(.XLSX) 파일로 다운로드</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
