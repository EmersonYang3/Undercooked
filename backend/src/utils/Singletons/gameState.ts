import { InternalFoodData, uniqueIdentifier } from "shared/types";
import recipeGenerator from "./recipeGenerator";
import unqi from "../../services/unqi";
import lobby from "services/lobby";

const MAXRECIPES = 5;
let currentRecipes: Map<uniqueIdentifier, InternalFoodData> = new Map();
let finishedRecipes = 0;
let score = 0;
function CreateInitialRecipes() {
    for (let i = 0; i < MAXRECIPES; i++) {
        CreateRecipe();
    }
}
function CreateRecipe() {
    if (currentRecipes.size >= MAXRECIPES) {
        console.log("Max recipes allowed at a time, recipe not created");
        return;
    }
    let uniqId = unqi.getUnqi();
    let new_recipe = recipeGenerator.GenerateRecipe();
    let foodItem: InternalFoodData = {
        id: uniqId,
        time_remaining: 60 * 1000,
        recipe_name: new_recipe,
    }
    currentRecipes.set(uniqId, foodItem);
    let lobbyData = lobby.getLobbyData();
    lobbyData.host.socket.emit("newRecipe", foodItem)
}
function FinishRecipe(identifier: uniqueIdentifier) {
    let foodData = currentRecipes.get(identifier);
    let recipeScore = CalculateRecipeScore(foodData.recipe_name);
    score += recipeScore;
    finishedRecipes += 1;
    let lobbyData = lobby.getLobbyData();
    lobbyData.host.socket.emit("recipeFinished", identifier);
    currentRecipes.delete(identifier);
    unqi.freeUnqi(identifier);
}
function CalculateRecipeScore(recipe: string): number {
    //subsitute method for now
    return 0;
}
export default { CreateInitialRecipes, CreateRecipe, FinishRecipe };