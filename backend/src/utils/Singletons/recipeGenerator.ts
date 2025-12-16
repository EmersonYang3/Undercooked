import { internalFoodData, internalStationData } from "shared/types"

import lobbyService from "services/lobby"
import sharedData from "shared/data"

let availableMethods: Record<string, true> = {}




function RefreshMethods() {
    const lobbyData = lobbyService.getLobbyData()
    if (!lobbyData.stationData) { return }

    availableMethods = {}

    for (const stationData of Object.values(lobbyData.stationData)) {
        const internalStationData: internalStationData | undefined = stationData[stationData.stationType]
        if (!internalStationData) { continue }

        const method = internalStationData.method
        if (!method || method === "") { continue }

        availableMethods[method] = true
    }
}

function ShouldConsiderAsRecipe(foodValue: internalFoodData) {
    const couldBeActiveRecipe = foodValue.couldBeActiveRecipe
    if (!couldBeActiveRecipe) { return false }

    let hasAvailableMethod = false

    for (const method of Object.keys(foodValue.methods)) {
        if (availableMethods[method]) { hasAvailableMethod = true; break }
    }

    return hasAvailableMethod
}

function GenerateRecipe(): string {
    const possibleRecipes: string[] = []

    for (const [foodKey, foodValue] of Object.entries(sharedData.foodData)) {
        const shouldConsiderAsRecipe = ShouldConsiderAsRecipe(foodValue)
        if (!shouldConsiderAsRecipe) { continue }

        possibleRecipes.push(foodKey)
    }

    if (possibleRecipes.length === 0) { throw new Error("No possible recipes could be generated") }

    const randomIndex = Math.floor(Math.random() * possibleRecipes.length)
    const randomlyPickedRecipe = possibleRecipes[randomIndex]

    return randomlyPickedRecipe
}


export default { RefreshMethods, GenerateRecipe }