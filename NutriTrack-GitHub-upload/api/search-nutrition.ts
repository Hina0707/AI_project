import { searchNutrition } from '../backend/nutrition.js';

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('q') || '';
  try {
    return Response.json(await searchNutrition(query));
  } catch (error) {
    console.error('Nutrition search failed:', error);
    return Response.json({ error: 'Nutrition search failed' }, { status: 500 });
  }
}
