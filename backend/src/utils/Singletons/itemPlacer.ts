import { uniqueIdentifier, internalStationData, internalFoodData } from "shared/types"

import lobbyService from "services/lobby"
import sharedData from "shared/data"

const foodData = sharedData.foodData
const stationData = sharedData.stationData

function canPlaceFoodInStation(food: string, stationIdentifier: uniqueIdentifier): boolean {
    const lobbyData = lobbyService.getLobbyData()
    const targetStationData = lobbyData.stationData[stationIdentifier]
    if (!targetStationData) { return false }

    const stationType: string = targetStationData.stationType
    const internalStationData: internalStationData = stationData[stationType]
    const internalFoodData: internalFoodData = foodData[food]
    if (!internalFoodData || !internalStationData) { return false }

    const stationMethod = internalStationData.method
    const isMethodValid = internalFoodData.methods[stationMethod] !== undefined

    return isMethodValid
}

export default { canPlaceFoodInStation }