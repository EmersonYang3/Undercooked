import { internalStationData } from "shared/types"
import { stationTypes } from "shared/enums"

import lobbyService from "services/lobby"
import sharedData from "shared/data"

const foodData = sharedData.foodData;
const stationDataMap = sharedData.stationData as Record<stationTypes, internalStationData>;

let availableMethods: Set<string> = new Set(["boil"]);

function RefreshMethods() {
    const lobbyData = lobbyService.getLobbyData()
    if (!lobbyData.stationData) { return }
    availableMethods = new Set();
    for (const stationData of Object.values(lobbyData.stationData)) {
        const internalStation: internalStationData | undefined = stationDataMap[stationData.stationType]
        if (!internalStation) { continue }
        const method = internalStation.method
        if (!method || method === "") { continue }
        availableMethods.add(method);
    }
}

const possibleRecipes: string[] = []

function RefreshValidRecipes() {
    possibleRecipes.length = 0
    for (const [name, data] of Object.entries(foodData)) {
        if (!data.considerAsRecipe) { continue }
        // at least one of the required items should be achievable with currently available methods
        if (data.requiredItems.length === 0) {
            possibleRecipes.push(name)
            continue
        }

        const hasPath = data.requiredItems.some((req) => {
            const reqData = foodData[req]
            if (!reqData) { return false }
            return Object.keys(reqData.methods).some((method) => availableMethods.has(method))
        })

        if (hasPath) { possibleRecipes.push(name) }
    }
}

function GenerateRecipe(): string {
    if (possibleRecipes.length === 0) { throw new Error("No possible recipes could be generated") }
    const randomIndex = Math.floor(Math.random() * possibleRecipes.length)
    const randomlyPickedRecipe = possibleRecipes[randomIndex]
    return randomlyPickedRecipe
}

export default { RefreshMethods, RefreshValidRecipes, GenerateRecipe }