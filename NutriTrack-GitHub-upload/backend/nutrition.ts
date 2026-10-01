import { GoogleGenAI } from '@google/genai';
import { PRESET_FOODS } from '../src/data/foodDatabase.js';

// In-memory cache for fast repeated queries
const nutritionCache = new Map<string, any[]>();

// Search Nutrition API endpoint
export async function searchNutrition(query: string) {
  query = query.trim();
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  if (!query) {
    return ({ items: [] });
  }

  // 1. Check in-memory cache first
  const cacheKey = query.toLowerCase().replace(/\s+/g, '');
  if (nutritionCache.has(cacheKey)) {
    return ({ items: nutritionCache.get(cacheKey), source: 'cache' });
  }

  // 2. Search local database
  const localMatches = PRESET_FOODS.filter((f) => {
    const nameNoSpaces = f.name.toLowerCase().replace(/\s+/g, '');
    return nameNoSpaces.includes(cacheKey);
  }).map((f) => ({
    name: f.name,
    servingSize: f.servingSize,
    servingGrams: f.servingGrams || 100,
    calories: f.calories,
    carbs: f.carbs,
    protein: f.protein,
    fat: f.fat,
    source: '연동',
  }));

  // If we already have multiple exact matches and no AI needed
  if (localMatches.length >= 5) {
    nutritionCache.set(cacheKey, localMatches);
    return ({ items: localMatches, source: 'local' });
  }

  // 3. Connect to Real-time Nutrition Knowledge via InOut & Pillyze criteria
  if (ai) {
    try {
      const prompt = `당신은 대표 다이어트 식단 서비스인 "인아웃(InOut)" 및 "필라이즈(Pillyze)" 식단 칼로리·영양성분 데이터베이스 기준 전담 검색 엔진입니다.
사용자 검색어: "${query}"

인아웃(InOut) 및 필라이즈(Pillyze)에서 검색되는 한국 음식, 편의점 상품, 가공식품, 프랜차이즈 메뉴(예: 햇반, 컵누들, 신라면, 닭가슴살, 햄버거, 샌드위치, 카페 음료, 외식 메뉴 등)의 실제 등록 영양 데이터(1회 섭취 제공량, 칼로리, 탄수화물g, 단백질g, 지방g) 2~5개를 JSON 배열로만 응답하세요.
각 항목의 "source"는 "인아웃 DB" 또는 "필라이즈 DB"로 표기하세요.

반드시 아래 JSON 형식만 반환하고 마크다운 코드블록이나 다른 설명은 절대 넣지 마세요:
[
  {
    "name": "인아웃/필라이즈 기준 메뉴·상품명",
    "servingSize": "1개 (210g) 또는 1인분",
    "servingGrams": 210,
    "calories": 315,
    "carbs": 70,
    "protein": 5,
    "fat": 1.5,
    "source": "인아웃 DB"
  }
]`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.1,
        },
      });

      const rawText = response.text?.trim() || '[]';
      let aiItems: any[] = [];
      try {
        aiItems = JSON.parse(rawText);
        if (!Array.isArray(aiItems)) aiItems = [];
      } catch {
        aiItems = [];
      }

      // Merge local matches and AI items, deduplicating by name
      const seen = new Set<string>();
      const combined: any[] = [];

      for (const item of [...aiItems, ...localMatches]) {
        const cleanName = item.name?.trim();
        if (cleanName && !seen.has(cleanName)) {
          seen.add(cleanName);
          combined.push({
            name: cleanName,
            servingSize: item.servingSize || '1인분',
            servingGrams: Number(item.servingGrams) || 100,
            calories: Math.round(Number(item.calories) || 0),
            carbs: Number(Number(item.carbs || 0).toFixed(1)),
            protein: Number(Number(item.protein || 0).toFixed(1)),
            fat: Number(Number(item.fat || 0).toFixed(1)),
            source: '연동',
          });
        }
      }

      nutritionCache.set(cacheKey, combined);
      return ({ items: combined, source: 'live_network' });
    } catch (err) {
      console.error('Error fetching live nutrition data:', err);
    }
  }

  // Fallback to local matches
  nutritionCache.set(cacheKey, localMatches);
  return ({ items: localMatches, source: 'local_fallback' });
}
