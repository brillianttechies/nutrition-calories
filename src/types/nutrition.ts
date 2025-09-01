export interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutritionResponse {
  status: string;
  food: FoodItem[];
  total: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface MacroData {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  fiber?: number;
  sugar?: number;
}