import { MealLogItem, NutritionGoal, DailySummary, MealType, UserProfile } from '../types/nutrition';

const STORAGE_KEYS = {
  MEAL_LOGS: 'nutritrack_meal_logs_v1',
  NUTRITION_GOAL: 'nutritrack_goal_v1',
  USER_PROFILE: 'nutritrack_profile_v1',
};

export const DEFAULT_PROFILE: UserProfile = {
  gender: 'male',
  age: 28,
  height: 175,
  weight: 70,
  activityLevel: 'moderate',
};

export const DEFAULT_GOAL: NutritionGoal = {
  calories: 2000,
  carbs: 230,
  protein: 110,
  fat: 50,
};

export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getOffsetDateString(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function generateInitialMealLogs(): MealLogItem[] {
  const today = getTodayDateString();
  const yesterday = getOffsetDateString(-1);

  return [
    // Today - Breakfast
    {
      id: 'init-1',
      date: today,
      mealType: 'breakfast',
      foodName: '현미잡곡밥',
      quantity: 1,
      servingDescription: '1공기 (210g)',
      calories: 330,
      carbs: 70,
      protein: 7.2,
      fat: 2.1,
      timestamp: '08:15',
      notes: '아침 식사 든든하게',
    },
    {
      id: 'init-2',
      date: today,
      mealType: 'breakfast',
      foodName: '삶은 달걀',
      quantity: 1,
      servingDescription: '2개 (100g)',
      calories: 155,
      carbs: 1.1,
      protein: 13,
      fat: 10.5,
      timestamp: '08:20',
      notes: '완숙 달걀 2개',
    },
    {
      id: 'init-3',
      date: today,
      mealType: 'breakfast',
      foodName: '된장찌개',
      quantity: 1,
      servingDescription: '1뚝배기 (300g)',
      calories: 145,
      carbs: 12,
      protein: 11,
      fat: 5.5,
      timestamp: '08:25',
    },
    // Today - Lunch
    {
      id: 'init-4',
      date: today,
      mealType: 'lunch',
      foodName: '닭가슴살 볶음밥',
      quantity: 1,
      servingDescription: '1인분 (250g)',
      calories: 390,
      carbs: 55,
      protein: 24,
      fat: 8,
      timestamp: '12:40',
      notes: '점심 닭가슴살 볶음밥',
    },
    {
      id: 'init-5',
      date: today,
      mealType: 'lunch',
      foodName: '방울토마토',
      quantity: 1,
      servingDescription: '10알 (150g)',
      calories: 30,
      carbs: 6.5,
      protein: 1.4,
      fat: 0.3,
      timestamp: '12:55',
    },
    {
      id: 'init-6',
      date: today,
      mealType: 'lunch',
      foodName: '아이스 아메리카노',
      quantity: 1,
      servingDescription: '1잔 (355ml)',
      calories: 10,
      carbs: 1.5,
      protein: 0.8,
      fat: 0.1,
      timestamp: '13:10',
    },
    // Today - Snack
    {
      id: 'init-7',
      date: today,
      mealType: 'snack',
      foodName: '단백질 쉐이크 (WPI/물 기준)',
      quantity: 1,
      servingDescription: '1회 (30g 분말+물)',
      calories: 120,
      carbs: 2.5,
      protein: 24,
      fat: 1.2,
      timestamp: '16:00',
      notes: '운동 후 단백질 보충',
    },
    {
      id: 'init-8',
      date: today,
      mealType: 'snack',
      foodName: '바나나',
      quantity: 1,
      servingDescription: '1개 (110g)',
      calories: 100,
      carbs: 26,
      protein: 1.3,
      fat: 0.3,
      timestamp: '16:05',
    },
    // Today - Dinner
    {
      id: 'init-9',
      date: today,
      mealType: 'dinner',
      foodName: '소고기 우둔/홍두깨살',
      quantity: 1,
      servingDescription: '1인분 (150g)',
      calories: 220,
      carbs: 0,
      protein: 38,
      fat: 6.5,
      timestamp: '19:10',
      notes: '기름기 적은 소고기 구이',
    },
    {
      id: 'init-10',
      date: today,
      mealType: 'dinner',
      foodName: '고구마 (찐것)',
      quantity: 1,
      servingDescription: '1개 중간 (150g)',
      calories: 195,
      carbs: 45,
      protein: 2.1,
      fat: 0.3,
      timestamp: '19:15',
    },

    // Yesterday Logs for historical demonstration
    {
      id: 'y-1',
      date: yesterday,
      mealType: 'breakfast',
      foodName: '오트밀 (귀리)',
      quantity: 1.5,
      servingDescription: '1회 (40g)',
      calories: 232,
      carbs: 40.5,
      protein: 8.2,
      fat: 4.2,
      timestamp: '08:30',
    },
    {
      id: 'y-2',
      date: yesterday,
      mealType: 'breakfast',
      foodName: '그릭 요거트 (무가당)',
      quantity: 1,
      servingDescription: '1회 (100g)',
      calories: 90,
      carbs: 4,
      protein: 10,
      fat: 3.5,
      timestamp: '08:35',
    },
    {
      id: 'y-3',
      date: yesterday,
      mealType: 'lunch',
      foodName: '서브웨이 로스트치킨 (위트/야채)',
      quantity: 1,
      servingDescription: '15cm 1개',
      calories: 320,
      carbs: 42,
      protein: 26,
      fat: 4.8,
      timestamp: '12:30',
    },
    {
      id: 'y-4',
      date: yesterday,
      mealType: 'dinner',
      foodName: '연어 구이',
      quantity: 1,
      servingDescription: '1토막 (150g)',
      calories: 310,
      carbs: 0,
      protein: 34,
      fat: 18,
      timestamp: '19:30',
    },
    {
      id: 'y-5',
      date: yesterday,
      mealType: 'dinner',
      foodName: '백미 쌀밥',
      quantity: 1,
      servingDescription: '1공기 (210g)',
      calories: 310,
      carbs: 69,
      protein: 6,
      fat: 0.7,
      timestamp: '19:35',
    },
  ];
}

export function loadMealLogs(): MealLogItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MEAL_LOGS);
    if (!raw) {
      const initial = generateInitialMealLogs();
      saveMealLogs(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      const initial = generateInitialMealLogs();
      saveMealLogs(initial);
      return initial;
    }
    return parsed;
  } catch {
    return generateInitialMealLogs();
  }
}

export function saveMealLogs(logs: MealLogItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MEAL_LOGS, JSON.stringify(logs));
  } catch (e) {
    console.error('Failed to save meal logs to localStorage', e);
  }
}

export function loadNutritionGoal(): NutritionGoal {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NUTRITION_GOAL);
    if (!raw) return DEFAULT_GOAL;
    return { ...DEFAULT_GOAL, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_GOAL;
  }
}

export function saveNutritionGoal(goal: NutritionGoal): void {
  try {
    localStorage.setItem(STORAGE_KEYS.NUTRITION_GOAL, JSON.stringify(goal));
  } catch (e) {
    console.error('Failed to save nutrition goal to localStorage', e);
  }
}

export function loadUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save user profile to localStorage', e);
  }
}

export interface PersonalizedPlanCalculation {
  bmr: number;
  tdee: number;
  bmi: number;
  bmiStatus: string;
  idealWeight: number;
  plans: {
    id: string;
    name: string;
    tagline: string;
    description: string;
    goal: NutritionGoal;
  }[];
}

export function calculatePersonalizedPlans(profile: UserProfile): PersonalizedPlanCalculation {
  const heightM = Math.max(0.5, profile.height / 100);
  const weightKg = Math.max(20, profile.weight);
  const age = Math.max(10, profile.age);

  // Mifflin-St Jeor formula
  const bmr = Math.round(
    profile.gender === 'male'
      ? 10 * weightKg + 6.25 * profile.height - 5 * age + 5
      : 10 * weightKg + 6.25 * profile.height - 5 * age - 161
  );

  const activityMultipliers: Record<UserProfile['activityLevel'], number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
  };

  const multiplier = activityMultipliers[profile.activityLevel] || 1.375;
  const tdee = Math.round(bmr * multiplier);
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));

  let bmiStatus = '정상 체중';
  if (bmi < 18.5) bmiStatus = '저체중';
  else if (bmi >= 23 && bmi < 25) bmiStatus = '과체중';
  else if (bmi >= 25) bmiStatus = '비만';

  const idealWeight = Math.round((profile.gender === 'male' ? 22 : 21) * heightM * heightM);

  // 1. 체중 감량 (다이어트) - TDEE - 450 kcal, 고단백 (체중 1.8g), 적정 지방 (25%)
  const dietCalories = Math.max(bmr, tdee - 450);
  const dietProtein = Math.round(weightKg * 1.8);
  const dietFat = Math.round((dietCalories * 0.25) / 9);
  const dietCarbs = Math.max(50, Math.round((dietCalories - dietProtein * 4 - dietFat * 9) / 4));

  // 2. 체중 유지 및 균형 건강 - TDEE, 단백질 (체중 1.4g), 적정 지방 (25%)
  const maintCalories = tdee;
  const maintProtein = Math.round(weightKg * 1.4);
  const maintFat = Math.round((maintCalories * 0.25) / 9);
  const maintCarbs = Math.max(50, Math.round((maintCalories - maintProtein * 4 - maintFat * 9) / 4));

  // 3. 린매스업 (근육 증량) - TDEE + 300 kcal, 고단백 (체중 2.0g), 적정 지방 (25%)
  const bulkCalories = tdee + 300;
  const bulkProtein = Math.round(weightKg * 2.0);
  const bulkFat = Math.round((bulkCalories * 0.25) / 9);
  const bulkCarbs = Math.max(50, Math.round((bulkCalories - bulkProtein * 4 - bulkFat * 9) / 4));

  // 4. 저탄고지 (키토제닉) - TDEE - 200 kcal, 탄수화물 40g 제한, 단백질 (체중 1.5g), 나머지 지방
  const ketoCalories = Math.max(bmr, tdee - 200);
  const ketoCarbs = 40;
  const ketoProtein = Math.round(weightKg * 1.5);
  const ketoFat = Math.max(30, Math.round((ketoCalories - ketoCarbs * 4 - ketoProtein * 4) / 9));

  return {
    bmr,
    tdee,
    bmi,
    bmiStatus,
    idealWeight,
    plans: [
      {
        id: 'diet',
        name: '체중 감량 (다이어트)',
        tagline: '체지방 연소 & 근손실 방지',
        description: `기초대사량(${bmr}kcal)을 보호하면서 체중 1kg당 1.8g의 고단백을 섭취하여 요요 없이 체지방을 줄입니다.`,
        goal: {
          calories: dietCalories,
          carbs: dietCarbs,
          protein: dietProtein,
          fat: dietFat,
        },
      },
      {
        id: 'maintenance',
        name: '체중 유지 & 활력 건강',
        tagline: '현재 체중 안정적 유지',
        description: `회원님의 일일 총 에너지 소비량(${tdee}kcal)에 맞춘 균형 잡힌 영양 비율로 최적의 컨디션을 유지합니다.`,
        goal: {
          calories: maintCalories,
          carbs: maintCarbs,
          protein: maintProtein,
          fat: maintFat,
        },
      },
      {
        id: 'bulk',
        name: '린매스업 (근육량 증량)',
        tagline: '골격근 성장 & 체력 증진',
        description: `체중 1kg당 2.0g의 풍부한 단백질과 추가 에너지(+300kcal)를 공급하여 순수 근육 합성을 극대화합니다.`,
        goal: {
          calories: bulkCalories,
          carbs: bulkCarbs,
          protein: bulkProtein,
          fat: bulkFat,
        },
      },
      {
        id: 'keto',
        name: '저탄고지 (키토제닉)',
        tagline: '탄수화물 최소화 & 케토시스 유도',
        description: `탄수화물을 하루 40g 이하로 엄격히 제한하고 양질의 지방을 주요 에너지원으로 활용합니다.`,
        goal: {
          calories: ketoCalories,
          carbs: ketoCarbs,
          protein: ketoProtein,
          fat: ketoFat,
        },
      },
    ],
  };
}

export function calculateDailySummary(items: MealLogItem[], date: string): DailySummary {
  const dayItems = items.filter((item) => item.date === date);

  const initialBreakdown: Record<MealType, { calories: number; carbs: number; protein: number; fat: number; count: number }> = {
    breakfast: { calories: 0, carbs: 0, protein: 0, fat: 0, count: 0 },
    lunch: { calories: 0, carbs: 0, protein: 0, fat: 0, count: 0 },
    dinner: { calories: 0, carbs: 0, protein: 0, fat: 0, count: 0 },
    snack: { calories: 0, carbs: 0, protein: 0, fat: 0, count: 0 },
  };

  let totalCalories = 0;
  let totalCarbs = 0;
  let totalProtein = 0;
  let totalFat = 0;

  dayItems.forEach((item) => {
    totalCalories += item.calories;
    totalCarbs += item.carbs;
    totalProtein += item.protein;
    totalFat += item.fat;

    const b = initialBreakdown[item.mealType];
    if (b) {
      b.calories += item.calories;
      b.carbs += item.carbs;
      b.protein += item.protein;
      b.fat += item.fat;
      b.count += 1;
    }
  });

  return {
    date,
    totalCalories: Math.round(totalCalories),
    totalCarbs: Number(totalCarbs.toFixed(1)),
    totalProtein: Number(totalProtein.toFixed(1)),
    totalFat: Number(totalFat.toFixed(1)),
    itemCount: dayItems.length,
    mealBreakdown: initialBreakdown,
  };
}
