import { performance } from "node:perf_hooks";

import type { activeRecipe, uniqueIdentifier } from "shared/types";
import lobby from "./lobby";
import unqi from "./unqi";
import recipeGenerator from "utils/Singletons/recipeGenerator";
import foodData from "shared/data/foodData";


const lobbyData = lobby.getLobbyData();
const maxRecipes = 5;

let isRunning = false;
let timeCache = performance.now();

let score = 0;

function shouldGenerateNewRecipe(): boolean {
    return Object.values(lobbyData.recipesInProgress).length >= maxRecipes;
}

function generateNewRecipe(): activeRecipe {
    console.log("[GameLoop] Stub: generate new recipe");
    const newRecipeName = recipeGenerator.GenerateRecipe();
    const newActiveRecipe: activeRecipe = {
        targetFoodItem: newRecipeName,
        id: unqi.getUnqi(),
        timeRemaining: 6000,
    }
    return newActiveRecipe;
}

function finishRecipe(id: uniqueIdentifier, failedRecipe: boolean): void {
    console.log(`[GameLoop] Stub: finished recipe ${id}`);
    const recipe = lobbyData.recipesInProgress[id];
    const internalEntry = foodData.recipes[recipe.targetFoodItem];
    if (failedRecipe) {
        score;
    }
    delete lobbyData.recipesInProgress[id];
}

function tick(): void {
    const activeRecipes: Record<uniqueIdentifier, activeRecipe> = lobbyData.recipesInProgress ?? {};
    const updatedRecipes: Record<uniqueIdentifier, activeRecipe> = {};
    for (const recipe of Object.values(activeRecipes)) {
        const now = performance.now();
        const delta = now - timeCache;

        const updatedTimeRemaining = Math.max(0, recipe.timeRemaining - delta);

        if (updatedTimeRemaining === 0 && recipe.timeRemaining > 0) {
            console.log(`[GameLoop] Recipe "${recipe.targetFoodItem}" has reached zero time remaining.`);
            finishRecipe(recipe.id, true);
            continue;
        }
        const newId = unqi.getUnqi();
        updatedRecipes[newId] = { ...recipe, timeRemaining: updatedTimeRemaining, id: newId };
    }
    lobby.transformLobbyData((data) => ({ ...data, recipesInProgress: updatedRecipes }));

    if (shouldGenerateNewRecipe()) { generateNewRecipe(); }

    timeCache = performance.now();
    setImmediate(tick);
}

function startGameLoop(): void {
    if (isRunning) { return }
    recipeGenerator.RefreshMethods();
    while (Object.values(lobbyData.recipesInProgress).length < maxRecipes) {
        const newActiveRecipe = generateNewRecipe();
        lobbyData.recipesInProgress[newActiveRecipe.id] = newActiveRecipe;
    }

    isRunning = true
    timeCache = performance.now()

    setImmediate(tick)
}

export { startGameLoop, finishRecipe };