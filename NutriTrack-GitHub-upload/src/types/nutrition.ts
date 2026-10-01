export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FoodItem {
  id: string;
  name: string;
  category: 'rice' | 'soup' | 'protein' | 'salad' | 'snack' | 'drink' | 'general';
  servingSize: string; // e.g. "1공기 (210g)", "100g", "1개"
  servingGrams: number;
  calories: number; // kcal
  carbs: number;    // g (탄수화물)
  protein: number;  // g (단백질)
  fat: number;      // g (지방)
}

export interface MealLogItem {
  id: string;
  date: string; // YYYY-MM-DD
  mealType: MealType;
  foodName: string;
  quantity: number; // Multiplier, e.g. 1.0 = 1인분
  servingDescription: string;
  calories: number; // total = item.calories * quantity
  carbs: number;    // total = item.carbs * quantity
  protein: number;  // total = item.protein * quantity
  fat: number;      // total = item.fat * quantity
  timestamp: string; // HH:mm
  notes?: string;
}

export interface NutritionGoal {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

export interface UserProfile {
  gender: 'male' | 'female';
  age: number;
  height: number; // cm
  weight: number; // kg
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
}

export interface DailySummary {
  date: string;
  totalCalories: number;
  totalCarbs: number;
  totalProtein: number;
  totalFat: number;
  itemCount: number;
  mealBreakdown: Record<MealType, { calories: number; carbs: number; protein: number; fat: number; count: number }>;
}
