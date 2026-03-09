import type { activeRecipe, uniqueIdentifier } from "shared/types";
import lobby from "./lobby";
import unqi from "./unqi";
import recipeGenerator from "utils/Singletons/recipeGenerator";

import sharedEnums from "shared/enums"

const serverToHostRemotes = sharedEnums.serverToHostRemotes

const Timing = {
    startGrace: { min: 10 * 1000, max: 20 * 1000 },
    timeIncreaseMax: { min: 2 * 60 * 1000, max: 3 * 60 * 1000 },
    trueTimeBetweenRecipes: { min: 3 * 1000, max: 5 * 1000 },
    timeDecreaseRecipeGrace: { min: 30 * 1000, max: 60 * 1000 },
};

const Recipe = {
    maxLerpIterationsDecrease: 5,
    trueMaxRecipes: 10,
};

let isRunning = false;
let minTimeGraceBetweenRecipes = 7 * 1000;
let maxTimeGraceBetweenRecipes = 15 * 1000;
let recipeDecreaseLerpIterations = 0;
let lastDecreaseRecipeGrace = 0;
let lastGeneratedRecipeTick = 0;
let startTickTime = 0;
let maxRecipes = 5;
let timeCache = 0;
let lobbyData = lobby.getLobbyData();

function getRandom(minimumValue: number, maximumValue: number): number {
    return minimumValue + Math.random() * (maximumValue - minimumValue);
}

function exponentiallyLerp(startValue: number, endValue: number, iteration: number, maxIterations: number): number {
    const interpolationFactor = 1 - Math.pow(0.5, iteration / maxIterations);
    return startValue + (endValue - startValue) * interpolationFactor;
}

function getRecipeTimer(): number {
    return 60 * 1000;
}

function tickIncreaseMaxRecipes(timeSinceStart: number): void {
    const timeToMaxIncrease = getRandom(Timing.timeIncreaseMax.min, Timing.timeIncreaseMax.max);
    if (timeSinceStart < timeToMaxIncrease) { return }

    maxRecipes = Math.min(Recipe.trueMaxRecipes, maxRecipes + 1);
}

function tickDecreaseRecipeGrace(currentTick: number): void {
    if (recipeDecreaseLerpIterations >= Recipe.maxLerpIterationsDecrease) { return; }

    const timeSinceLastDecrease = currentTick - lastDecreaseRecipeGrace;
    const graceDecreaseRecipe = getRandom(Timing.timeDecreaseRecipeGrace.min, Timing.timeDecreaseRecipeGrace.max);
    if (timeSinceLastDecrease < graceDecreaseRecipe) { return; }

    recipeDecreaseLerpIterations += 1;

    minTimeGraceBetweenRecipes = exponentiallyLerp(
        minTimeGraceBetweenRecipes,
        Timing.trueTimeBetweenRecipes.min,
        recipeDecreaseLerpIterations,
        Recipe.maxLerpIterationsDecrease
    );

    maxTimeGraceBetweenRecipes = exponentiallyLerp(
        maxTimeGraceBetweenRecipes,
        Timing.trueTimeBetweenRecipes.max,
        recipeDecreaseLerpIterations,
        Recipe.maxLerpIterationsDecrease
    );

    lastDecreaseRecipeGrace = currentTick;
}

function shouldGenerateNewRecipe(): boolean {
    const currentTick = performance.now();
    const graceForStart = getRandom(Timing.startGrace.min, Timing.startGrace.max);
    const timeSinceStart = currentTick - startTickTime;
    if (timeSinceStart < graceForStart) { return false; }

    tickIncreaseMaxRecipes(timeSinceStart);
    if (Object.values(lobbyData.recipesInProgress ?? {}).length == maxRecipes) { return false; }

    tickDecreaseRecipeGrace(currentTick);
    const graceToNextRecipe = getRandom(minTimeGraceBetweenRecipes, maxTimeGraceBetweenRecipes);
    const timeSinceLastRecipe = currentTick - lastGeneratedRecipeTick;
    if (timeSinceLastRecipe < graceToNextRecipe) { return false; }

    lastGeneratedRecipeTick = currentTick
    return true
}

function generateNewRecipe(): activeRecipe {
    console.log("[GameLoop] Stub: generate new recipe")
    const newRecipeName = recipeGenerator.GenerateRecipe()

    return { targetFoodItem: newRecipeName, id: unqi.getUnqi(), timeRemaining: getRecipeTimer() }
}

function tick(): void {
    lobbyData = lobby.getLobbyData()

    const activeRecipes = lobbyData.recipesInProgress ?? {}
    const updatedRecipes: Record<uniqueIdentifier, activeRecipe> = {}

    for (const recipe of Object.values(activeRecipes)) {
        const delta = performance.now() - timeCache
        const updatedTimeRemaining = Math.max(0, recipe.timeRemaining - delta)
        const recipeId = recipe.id

        if (updatedTimeRemaining === 0 && recipe.timeRemaining > 0) {
            console.log(`[GameLoop] Recipe "${recipe.targetFoodItem}" has reached zero time remaining.`)
            continue
        }

        updatedRecipes[recipeId] = { ...recipe, timeRemaining: updatedTimeRemaining, id: recipeId }
    }

    lobby.transformLobbyData((data) => ({ ...data, recipesInProgress: updatedRecipes }))

    if (shouldGenerateNewRecipe()) {
        const newActiveRecipe = generateNewRecipe()
        lobbyData.recipesInProgress[newActiveRecipe.id] = newActiveRecipe
        lobbyData.host.socket.emit(serverToHostRemotes.NEW_RECIPE, newActiveRecipe)
    }

    timeCache = performance.now()
    setImmediate(tick)
}

function startGameLoop(): void {
    if (isRunning) { return }

    const currentTick = performance.now()
    isRunning = true

    timeCache = currentTick
    startTickTime = currentTick
    lastDecreaseRecipeGrace = currentTick

    setImmediate(tick)
}

export default { startGameLoop }