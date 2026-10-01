import * as XLSX from 'xlsx';
import { MealLogItem, NutritionGoal, DailySummary, MealType } from '../types/nutrition';
import { MEAL_TYPE_LABELS } from '../data/foodDatabase';

export interface ExportReportData {
  targetDate: string;
  items: MealLogItem[];
  goal: NutritionGoal;
  dailySummary: DailySummary;
  allHistoryItems?: MealLogItem[];
}

export function exportNutritionToExcel({
  targetDate,
  items,
  goal,
  dailySummary,
  allHistoryItems = [],
}: ExportReportData, filenamePrefix: string = '식단관리_영양보고서') {
  const wb = XLSX.utils.book_new();

  // ==========================================
  // SHEET 1: 당일 식단 상세 및 영양 분석 (Daily Nutrition Report)
  // ==========================================
  const sheet1Data: (string | number)[][] = [
    ['[식단관리] 일일 식단 영양 섭취 및 분석 보고서'],
    ['생성 일시', new Date().toLocaleString('ko-KR'), '조회 일자', targetDate],
    [],
    ['1. 영양 섭취 목표치 대비 달성 현황'],
    ['구분', '목표 권장량', '실제 섭취량', '잔여 / 초과', '달성률(%)', '총 칼로리 기여 비율'],
    [
      '칼로리 (kcal)',
      goal.calories,
      dailySummary.totalCalories,
      dailySummary.totalCalories - goal.calories,
      goal.calories > 0 ? Number(((dailySummary.totalCalories / goal.calories) * 100).toFixed(1)) : 0,
      '100.0%',
    ],
    [
      '탄수화물 (g)',
      goal.carbs,
      dailySummary.totalCarbs,
      Number((dailySummary.totalCarbs - goal.carbs).toFixed(1)),
      goal.carbs > 0 ? Number(((dailySummary.totalCarbs / goal.carbs) * 100).toFixed(1)) : 0,
      dailySummary.totalCalories > 0
        ? `${((dailySummary.totalCarbs * 4 / dailySummary.totalCalories) * 100).toFixed(1)}% (${(dailySummary.totalCarbs * 4).toFixed(0)} kcal)`
        : '0.0%',
    ],
    [
      '단백질 (g)',
      goal.protein,
      dailySummary.totalProtein,
      Number((dailySummary.totalProtein - goal.protein).toFixed(1)),
      goal.protein > 0 ? Number(((dailySummary.totalProtein / goal.protein) * 100).toFixed(1)) : 0,
      dailySummary.totalCalories > 0
        ? `${((dailySummary.totalProtein * 4 / dailySummary.totalCalories) * 100).toFixed(1)}% (${(dailySummary.totalProtein * 4).toFixed(0)} kcal)`
        : '0.0%',
    ],
    [
      '지방 (g)',
      goal.fat,
      dailySummary.totalFat,
      Number((dailySummary.totalFat - goal.fat).toFixed(1)),
      goal.fat > 0 ? Number(((dailySummary.totalFat / goal.fat) * 100).toFixed(1)) : 0,
      dailySummary.totalCalories > 0
        ? `${((dailySummary.totalFat * 9 / dailySummary.totalCalories) * 100).toFixed(1)}% (${(dailySummary.totalFat * 9).toFixed(0)} kcal)`
        : '0.0%',
    ],
    [],
    ['2. 식사별 섭취 요약'],
    ['식사 구분', '등록 음식 수', '칼로리 (kcal)', '탄수화물 (g)', '단백질 (g)', '지방 (g)', '비중(%)'],
  ];

  const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];
  mealTypes.forEach((mType) => {
    const mealStat = dailySummary.mealBreakdown[mType];
    const pct = dailySummary.totalCalories > 0
      ? ((mealStat.calories / dailySummary.totalCalories) * 100).toFixed(1)
      : '0.0';
    sheet1Data.push([
      MEAL_TYPE_LABELS[mType]?.label || mType,
      mealStat.count,
      mealStat.calories,
      Number(mealStat.carbs.toFixed(1)),
      Number(mealStat.protein.toFixed(1)),
      Number(mealStat.fat.toFixed(1)),
      `${pct}%`,
    ]);
  });

  sheet1Data.push([]);
  sheet1Data.push(['3. 음식별 상세 섭취 기록']);
  sheet1Data.push([
    '순번',
    '식사 구분',
    '기록 시간',
    '음식명',
    '섭취 분량 (배수)',
    '단위 기준',
    '칼로리 (kcal)',
    '탄수화물 (g)',
    '단백질 (g)',
    '지방 (g)',
    '메모 / 비고',
  ]);

  if (items.length === 0) {
    sheet1Data.push(['-', '-', '-', '해당 날짜에 등록된 식단 내역이 없습니다.', '-', '-', 0, 0, 0, 0, '-']);
  } else {
    items.forEach((item, idx) => {
      sheet1Data.push([
        idx + 1,
        MEAL_TYPE_LABELS[item.mealType]?.label || item.mealType,
        item.timestamp,
        item.foodName,
        `${item.quantity}인분`,
        item.servingDescription,
        item.calories,
        Number(item.carbs.toFixed(1)),
        Number(item.protein.toFixed(1)),
        Number(item.fat.toFixed(1)),
        item.notes || '',
      ]);
    });

    // Total Row
    sheet1Data.push([
      '총합계',
      '-',
      '-',
      `총 ${items.length}개 품목`,
      '-',
      '-',
      dailySummary.totalCalories,
      Number(dailySummary.totalCarbs.toFixed(1)),
      Number(dailySummary.totalProtein.toFixed(1)),
      Number(dailySummary.totalFat.toFixed(1)),
      '당일 총합',
    ]);
  }

  const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);

  // Set column widths for clean readability
  ws1['!cols'] = [
    { wch: 10 }, // Col A
    { wch: 14 }, // Col B
    { wch: 12 }, // Col C
    { wch: 24 }, // Col D
    { wch: 16 }, // Col E
    { wch: 18 }, // Col F
    { wch: 15 }, // Col G
    { wch: 14 }, // Col H
    { wch: 14 }, // Col I
    { wch: 14 }, // Col J
    { wch: 22 }, // Col K
  ];

  XLSX.utils.book_append_sheet(wb, ws1, '일일 식단 종합 분석');

  // ==========================================
  // SHEET 2: 전체 누적 식단 데이터베이스 (Full Meal History)
  // ==========================================
  const allLogs = allHistoryItems.length > 0 ? allHistoryItems : items;
  const sheet2Data: (string | number)[][] = [
    ['[식단관리] 누적 식단 원장 데이터'],
    ['날짜', '식사 분류', '시간', '음식명', '섭취 분량', '기준 단위', '칼로리(kcal)', '탄수화물(g)', '단백질(g)', '지방(g)', '메모'],
  ];

  // Sort by date descending, then mealType
  const sortedLogs = [...allLogs].sort((a, b) => {
    if (b.date !== a.date) return b.date.localeCompare(a.date);
    return a.timestamp.localeCompare(b.timestamp);
  });

  sortedLogs.forEach((item) => {
    sheet2Data.push([
      item.date,
      MEAL_TYPE_LABELS[item.mealType]?.label || item.mealType,
      item.timestamp,
      item.foodName,
      `${item.quantity}인분`,
      item.servingDescription,
      item.calories,
      Number(item.carbs.toFixed(1)),
      Number(item.protein.toFixed(1)),
      Number(item.fat.toFixed(1)),
      item.notes || '',
    ]);
  });

  const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);
  ws2['!cols'] = [
    { wch: 13 },
    { wch: 12 },
    { wch: 10 },
    { wch: 22 },
    { wch: 12 },
    { wch: 16 },
    { wch: 14 },
    { wch: 14 },
    { wch: 14 },
    { wch: 14 },
    { wch: 24 },
  ];
  XLSX.utils.book_append_sheet(wb, ws2, '전체 누적 원장');

  // Write and trigger download
  const cleanDate = targetDate.replace(/-/g, '');
  const fileName = `${filenamePrefix}_${cleanDate}.xlsx`;
  XLSX.writeFile(wb, fileName);
  return fileName;
}

export function exportNutritionToCSV(items: MealLogItem[], targetDate: string): string {
  const headers = ['날짜,식사구분,시간,음식명,섭취량,칼로리(kcal),탄수화물(g),단백질(g),지방(g),메모'];
  const rows = items.map((item) => {
    const meal = MEAL_TYPE_LABELS[item.mealType]?.label || item.mealType;
    const memo = (item.notes || '').replace(/"/g, '""');
    return `"${item.date}","${meal}","${item.timestamp}","${item.foodName}","${item.quantity}인분",${item.calories},${item.carbs},${item.protein},${item.fat},"${memo}"`;
  });

  const csvContent = '\uFEFF' + [headers, ...rows].join('\n'); // Add BOM for Excel UTF-8 Korean support
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const fileName = `식단관리_기록_${targetDate.replace(/-/g, '')}.csv`;
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return fileName;
}
