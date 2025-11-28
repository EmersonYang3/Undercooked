export interface ingredient_info {
  ingredientName: string;
  methods: string[];
  quality: number;
}

export interface Timer {
  id: number;
  IngredientName: string;
  cook_time: number;
  time_remaining: number;
  asset: string;
}
