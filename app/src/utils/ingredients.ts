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
const recipes: Map<string, Meal> = new Map();
recipes.set("british_meal", {
    ingredients: ["cooked_egg"],
    quality: 0,
    id: 0,
    max_quality: 1,

})






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
    let rando
}




