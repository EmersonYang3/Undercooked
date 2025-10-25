//define an array of ingredients for the food
//theres gonna be a terminal for assembling the foods
//at the terminal is gonna be an array of which players can drop the ingredients in
//might make it a menu where current recipes are shown
//when the recipe has the required ingredients it gets assembled into a single meal item
//the player can then take the assembled meal and put it into the submit station


export type Meal = {
    ingredients: Array<string>,
    quality: number,
    id: number,
    max_quality: number
}//for reference max_quality is defined as the length of inrgedients times some number;
export type Ingredient = {
    //each ingredient has a state to allow a terminal to act on said item
    name: string,
    id: number,
    quality: number,
    state: boolean
}
export type PossibleMeals = "fried_rice" | "fruit_salad" | "steak" | "british_meal" | "grilled_cheese_sandwhich" | "omelette" | "omurice";
export type CookedIngredients = "cooked_egg" | "diced_carrots" | "meat" | "boiled_peas" | "rice" | "sausage" | "bread";
export type BasicIngredients = "aromatics" | "meat" | "egg" | "peas" | "rice" | "raw_sausage" | "cheese";


//the ingredients might have states

const currentMeals: Map<PossibleMeals, Meal> = new Map();
//this wil contain the incomplete meals that need to continue cooking
//for the ingredients i might switch to a map if performance is needed
//everytime the user wants to submit an ingredient the terminal checks against recipes to determine if the ingredient is valid to beutilize
export const recipes: Map<string, Meal> = new Map([
  [
    "british_meal",
    {
      id: 0,
      ingredients: ["cooked_egg"],
      quality: 0,
      max_quality: 1,
    },
  ],
  [
    "italian_pasta",
    {
      id: 1,
      ingredients: ["noodles", "tomato_sauce", "parmesan"],
      quality: 2,
      max_quality: 5,
    },
  ],
  [
    "japanese_sushi",
    {
      id: 2,
      ingredients: ["rice", "fish", "seaweed"],
      quality: 4,
      max_quality: 5,
    },
  ],
  [
    "mexican_taco",
    {
      id: 3,
      ingredients: ["tortilla", "beef", "lettuce", "cheese"],
      quality: 3,
      max_quality: 5,
    },
  ],
  [
    "french_crepe",
    {
      id: 4,
      ingredients: ["flour", "milk", "egg", "sugar"],
      quality: 1,
      max_quality: 5,
    },
  ],
  [
    "american_burger",
    {
      id: 5,
      ingredients: ["bun", "beef_patty", "lettuce", "cheddar"],
      quality: 3,
      max_quality: 5,
    },
  ],
  [
    "indian_curry",
    {
      id: 6,
      ingredients: ["chicken", "curry_powder", "coconut_milk"],
      quality: 4,
      max_quality: 5,
    },
  ],
  [
    "chinese_noodles",
    {
      id: 7,
      ingredients: ["noodles", "soy_sauce", "vegetables"],
      quality: 2,
      max_quality: 5,
    },
  ],
])






//this contains the actual recipes
function submit_ingredient_to_meal(meal_name: PossibleMeals, ingredient: Ingredient): number {
    //do a check with a
    const meal = currentMeals.get(meal_name);
    if (!meal.ingredients.includes(ingredient.name)) {
        //return that the ingredient cannot be submitted to it
        return;
    };
    meal.quality += ingredient.quality;
    const index = meal.ingredients.indexOf(ingredient.name);
    meal.ingredients.splice(index, 1);
    //remove the ingredient from valid ingredients to be used
    if (meal.ingredients.length == 0) {
        return meal.quality / meal.max_quality;
    };
}
//
function select_recipes() {
    const random_index = Math.floor(Math.random() * recipes.size);
    const random_item = recipes.entries[random_index];
    return random_item;
}




