import { holdableItem, internalFoodData, uniqueIdentifier } from "shared/types";
import recipeGenerator from "./recipeGenerator";
import unqi from "../../services/unqi";
import foodData from "shared/data/foodData";

const MaxRecipes = 5;
const currentRecipes: Record<uniqueIdentifier, internalFoodData> = {};
let finishedRecipes = 0;
let score = 0;



function GenerateInitialRecipes() {
    for (let i = 0; i < MaxRecipes; i++) {
        GenerateNewRecipe();
    }
}
function GenerateNewRecipe() {
    const uniqId = unqi.getUnqi();
    const recipeName = recipeGenerator.GenerateRecipe();
    const internalRep = foodData[recipeName];
    currentRecipes[uniqId] = internalRep;
}
function AttemptSubmit(item: holdableItem): boolean {
    if (item.foodItems.length != 1) { return false };
    if (!item.foodItems[0]) { return false };
    const toBeSubmitted = item.foodItems[0];
    let matched = false;
    for (const [id, data] of Object.entries(currentRecipes)) {
        if (data.name == toBeSubmitted.name) {
            score += toBeSubmitted.quality;
            matched = true;
            unqi.freeUnqi(Number(id));
            delete currentRecipes[id];
            break;
        }
    }
    if (!matched) {
        score -= toBeSubmitted.quality;
    }
    GenerateNewRecipe();
    return true;
}
export default { AttemptSubmit, GenerateNewRecipe, GenerateInitialRecipes };