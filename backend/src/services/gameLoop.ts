import { performance } from "node:perf_hooks";

import type { activeRecipe } from "shared/types";
import lobby from "./lobby";

let isRunning = false;
let timeCache = performance.now();

function shouldGenerateNewRecipe(): boolean {
    return true;
}

function generateNewRecipe(): void {
    console.log("[GameLoop] Stub: generate new recipe");
}

function tick(): void {
    const lobbyData = lobby.getLobbyData();

    const activeRecipes: activeRecipe[] = lobbyData.recipesInProgress ?? [];
    const updatedRecipes: activeRecipe[] = [];

    for (const recipe of activeRecipes) {
        const now = performance.now();
        const delta = now - timeCache;

        const updatedTimeRemaining = Math.max(0, recipe.timeRemaining - delta);

        if (updatedTimeRemaining === 0 && recipe.timeRemaining > 0) {
            console.log(`[GameLoop] Recipe "${recipe.targetFoodItem}" has reached zero time remaining.`);
        }

        updatedRecipes.push({ ...recipe, timeRemaining: updatedTimeRemaining });
    }

    lobby.transformLobbyData((data) => ({ ...data, recipesInProgress: updatedRecipes }));

    if (shouldGenerateNewRecipe()) { generateNewRecipe(); }

    timeCache = performance.now();
    setImmediate(tick);
}

function startGameLoop(): void {
    if (isRunning) { return }

    isRunning = true
    timeCache = performance.now()

    setImmediate(tick)
}

export { startGameLoop };