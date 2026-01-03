import { foodItem, internalFoodData, uniqueIdentifier } from "shared/types";
import recipeGenerator from "utils/Singletons/recipeGenerator";
import unqi from "../../services/unqi";
import foodData from "shared/data/foodData";
import lobby from "services/lobby";
const MAXRECIPES = 5;
//on the host side they must also maintain a copy of this map aswell
//but with foodItem isntead
//switch this to activeRecipe for timer
let currentRecipes: Map<uniqueIdentifier, internalFoodData> = new Map();
let finishedRecipes = 0;
let score = 0;
//returns a new foodItem after completion
function CreateInitialRecipes() {
    for (let i = 0; i++; i < MAXRECIPES) {
        CreateRecipe();
    }
}
function FinishRecipe(foodItem: foodItem) {
    let internalFoodData = currentRecipes.get(foodItem.id);
    unqi.freeUnqi(foodItem.id);
    //idk if this is correct
    let recipeScore = CalculateRecipeScore(internalFoodData);
    score += recipeScore;
    finishedRecipes += 1;
    let lobbyData = lobby.getLobbyData();
    lobbyData.host.socket.emit("recipeFinished", foodItem.id);
    currentRecipes.delete(foodItem.id);
}
function CalculateRecipeScore(recipe: internalFoodData): number {
    //subsitute method for now
    return 0;
}
//this stores the recipe so the server can actually use it
function CreateRecipe(): foodItem {
    if (currentRecipes.size >= MAXRECIPES) {
        console.log("Max recipes allowed at a time, recipe not created");
        return;
    }
    let uniqId = unqi.getUnqi();
    let new_recipe = recipeGenerator.GenerateRecipe();
    let foodItem: foodItem = {
        name: new_recipe,
        id: uniqId,
        quality: 0,
    };
    currentRecipes.set(uniqId, foodData[new_recipe]);
    let lobbyData = lobby.getLobbyData();
    //transform foodItem into an activeRecipe.
    lobbyData.host.socket.emit("newRecipe", foodItem);
    return foodItem;
}
export default { FinishRecipe, CreateRecipe, score, CreateInitialRecipes };