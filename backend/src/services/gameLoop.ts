import { performance } from "node:perf_hooks";

import type { activeRecipe, holdableItem, uniqueIdentifier } from "shared/types";
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
function attemptSubmit(id: uniqueIdentifier, item: holdableItem) {
    if (item.foodItems.length != 1) { return false };
    if (!item.foodItems[0]) { return false };
    const toBeSubmitted = item.foodItems[0];
    let matched = false;
    for (const [id, data] of Object.entries(lobbyData.recipesInProgress)) {
        if (data.targetFoodItem == toBeSubmitted.name) {
            score += toBeSubmitted.quality;
            matched = true;
            break;
        }
    }
    finishRecipe(id, matched, toBeSubmitted.quality);
}
function finishRecipe(id: uniqueIdentifier, failedRecipe: boolean, quality?: number): void {
    console.log(`[GameLoop] Stub: finished recipe ${id}`);
    const recipe = lobbyData.recipesInProgress[id];
    const internalEntry = foodData.foodData[recipe.targetFoodItem];
    if (failedRecipe) {
        score -= 5;
    } else {
        score += quality;
    }
    lobbyData.host.socket.emit("scoreUpdate", score);
    lobbyData.host.socket.emit("finishRecipe", id);
    unqi.freeUnqi(Number(id));
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

    if (shouldGenerateNewRecipe()) {
        const newActiveRecipe = generateNewRecipe();
        lobbyData.recipesInProgress[newActiveRecipe.id] = newActiveRecipe;
        lobbyData.host.socket.emit("newRecipe", newActiveRecipe);
    }

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