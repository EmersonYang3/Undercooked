import sharedEnums from "../enums"
import type { FoodId, internalFoodData, Recipe } from "../types"

const foods = sharedEnums.foods
const methods = sharedEnums.methods
export const recipes: Record<string, Recipe> = {
    [foods.boiledEgg]: {
        name: "Boiled Egg",
        inputs: [foods.uncookedEgg],
        method: methods.boil,
        output: foods.boiledEgg
    },
    [foods.friedEgg]: {
        name: "Fried Egg",
        inputs: [foods.uncookedEgg],
        method: methods.fry,
        output: foods.friedEgg
    },
    [foods.scrambledEgg]: {
        name: "Scrambled Egg",
        inputs: [foods.uncookedEgg, foods.onion],
        method: methods.blend,
        output: foods.scrambledEgg,
    },
    [foods.omelette]: {
        name: "Omelette",
        inputs: [foods.scrambledEgg],
        method: methods.fry,
        output: foods.omelette,
    },
}

export const recipesByInput: Record<string, Record<string, string>> = {}
//sorts it by an input key
//allows for o(1) lookups when checking if an item has certain methods 
for (const [name, recipe] of Object.entries(recipes)) {
    let key = inputKey(recipe.inputs);
    if (!recipesByInput[key]) {
        recipesByInput[key] = {}
    }
    recipesByInput[key][recipe.method] = name;
}
export function inputKey(inputs: Array<string>): string {
    //if this fails its most likely due to sort
    //if needs to be fixed write a function that assigns weights to the foods
    //and use those weights for sorting to ensure behavior is known
    return inputs.slice().sort().join("+");
}


export default { recipes, recipesByInput, inputKey }