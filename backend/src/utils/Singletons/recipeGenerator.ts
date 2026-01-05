import { FoodId, internalFoodData, internalStationData, Recipe } from "shared/types"

import lobbyService from "services/lobby"
import sharedData from "shared/data"
const recipes = sharedData.recipes;
//test data for now
let availableMethods: Set<string> = new Set(["boil"]);
function RefreshMethods() {
    const lobbyData = lobbyService.getLobbyData()
    if (!lobbyData.stationData) { return }
    availableMethods = new Set();
    for (const stationData of Object.values(lobbyData.stationData)) {
        const internalStationData: internalStationData | undefined = stationData[stationData.stationType]
        if (!internalStationData) { continue }
        const method = internalStationData.method
        if (!method || method === "") { continue }
        availableMethods.add(method);
    }
}

const craftableCache = new Map<FoodId, boolean>();
export function CachedIsCraftable(recipe: Recipe): boolean {
    const cached = craftableCache.get(recipe.output);
    if (cached !== undefined) {
        return cached;
    }
    if (!availableMethods.has(recipe.method)) {
        craftableCache.set(recipe.output, false);
        return false;
    }
    for (const input of recipe.inputs) {
        const inputRecipe = recipes[input];
        if (!inputRecipe) continue;

        if (!CachedIsCraftable(inputRecipe)) {
            craftableCache.set(recipe.output, false);
            return false;
        }
    }
    craftableCache.set(recipe.output, true);
    return true;
}
const possibleRecipes: string[] = []
function RefreshValidRecipes() {
    for (const [name, recipe] of Object.entries(recipes)) {
        const shouldConsiderAsRecipe = CachedIsCraftable(recipe as Recipe);
        if (!shouldConsiderAsRecipe) { continue }
        possibleRecipes.push(name);
    }
}
//caching table for faster assembling
function GenerateRecipe(): string {
    if (possibleRecipes.length === 0) { throw new Error("No possible recipes could be generated") }
    const randomIndex = Math.floor(Math.random() * possibleRecipes.length)
    const randomlyPickedRecipe = possibleRecipes[randomIndex]
    return randomlyPickedRecipe
}



export default { RefreshMethods, RefreshValidRecipes, GenerateRecipe, }