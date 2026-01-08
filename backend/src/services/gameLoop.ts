import type { activeRecipe, uniqueIdentifier } from "shared/types";
import lobby from "./lobby";
import unqi from "./unqi";
import recipeGenerator from "utils/Singletons/recipeGenerator";

const minStartGrace = 10 * 1000
const maxStartGrace = 20 * 1000
const minTimeIncreaseMax = 2 * 60 * 1000
const maxTimeIncreaseMax = 3 * 60 * 1000
const trueMinTimeBetweenRecipes = 3 * 1000
const trueMaxTimeBetweenRecipes = 5 * 1000
const minTimeDecreaseRecipeGrace = 30 * 1000
const maxTimeDecreaseRecipeGrace = 60 * 1000
const maxLerpIterationsRecipeDecrease = 5
const trueMaxRecipes = 10

let isRunning = false
let minTimeGraceBetweenRecipes = 7 * 1000
let maxTimeGraceBetweenRecipes = 15 * 1000
let recipeDecreaseLerpIterations = 0
let lastDecreaseRecipeGrace = 0
let lastGeneratedRecipeTick = 0
let startTickTime = 0
let maxRecipes = 5
let timeCache = 0

let lobbyData = lobby.getLobbyData()

function exponentiallyLerp(startValue: number, endValue: number, iteration: number, maxIterations: number): number {
    const t = 1 - Math.pow(0.5, iteration / maxIterations)
    return startValue + (endValue - startValue) * t
}

function getRecipeTimer(): number {
    return 60 * 1000
}

function getRandom(minimumValue: number, maximumValue: number): number {
    return minimumValue + Math.random() * (maximumValue - minimumValue)
}

function tickIncreaseMaxRecipes(timeSinceStart: number): void {
    const timeToMaxIncrease = getRandom(minTimeIncreaseMax, maxTimeIncreaseMax)
    if (timeSinceStart < timeToMaxIncrease) { return }

    maxRecipes = Math.min(trueMaxRecipes, maxRecipes + 1)
}

function tickDecreaseRecipeGrace(currentTick: number): void {
    if (recipeDecreaseLerpIterations >= maxLerpIterationsRecipeDecrease) { return }

    const timeSinceLastDecrease = currentTick - lastDecreaseRecipeGrace
    const graceDecreaseRecipe = getRandom(minTimeDecreaseRecipeGrace, maxTimeDecreaseRecipeGrace)
    if (timeSinceLastDecrease < graceDecreaseRecipe) { return }

    recipeDecreaseLerpIterations += 1

    minTimeGraceBetweenRecipes = exponentiallyLerp(minTimeGraceBetweenRecipes, trueMinTimeBetweenRecipes, recipeDecreaseLerpIterations, maxLerpIterationsRecipeDecrease)
    maxTimeGraceBetweenRecipes = exponentiallyLerp(maxTimeGraceBetweenRecipes, trueMaxTimeBetweenRecipes, recipeDecreaseLerpIterations, maxLerpIterationsRecipeDecrease)

    lastDecreaseRecipeGrace = currentTick
}

function shouldGenerateNewRecipe(): boolean {
    const currentTick = performance.now()
    const graceForStart = getRandom(minStartGrace, maxStartGrace)
    const timeSinceStart = currentTick - startTickTime
    if (timeSinceStart < graceForStart) { return false }

    tickIncreaseMaxRecipes(timeSinceStart)
    if (Object.values(lobbyData.recipesInProgress ?? {}).length == maxRecipes) { return false }

    tickDecreaseRecipeGrace(currentTick)
    const graceToNextRecipe = getRandom(minTimeGraceBetweenRecipes, maxTimeGraceBetweenRecipes)
    const timeSinceLastRecipe = currentTick - lastGeneratedRecipeTick
    if (timeSinceLastRecipe < graceToNextRecipe) { return false }
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
        lobbyData.host.socket.emit("newRecipe", newActiveRecipe)
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