import { uniqueIdentifier, internalStationData, internalFoodData, foodItem, plate } from "shared/types"

import lobbyService from "services/lobby"
import socketRegistry from "services/socketRegistry"

import sharedData from "shared/data"
import sharedEnums from "shared/enums"

const foodData = sharedData.foodData
const stationData = sharedData.stationData

const ServerSharedRemotes = sharedEnums.sharedRemotes

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

function removePlayerItem(identifier: uniqueIdentifier): foodItem | plate | undefined {
    let playerHeldItem: foodItem | plate | undefined = undefined

    lobbyService.transformLobbyData((lobbyData) => {
        const playerData = lobbyData.playerData[identifier]
        const playerSocketConnection = socketRegistry.getSocketConnectionById(identifier)
        if (!playerData || !playerSocketConnection) { return lobbyData }

        playerHeldItem = playerData.currentlyHeldItem
        if (!playerHeldItem) { return lobbyData }

        playerData.currentlyHeldItem = undefined
        playerData.isHoldingPlate = false

        lobbyData.playerData[identifier] = playerData
        playerSocketConnection.socket.emit(ServerSharedRemotes.setCurrentItem, null, false)

        return lobbyData
    })

    return playerHeldItem
}

function givePlayerItem(identifier: uniqueIdentifier, item: foodItem | plate, isRecievingPlate: boolean) {
    lobbyService.transformLobbyData((lobbyData) => {
        const playerData = lobbyData.playerData[identifier]
        const playerSocketConnection = socketRegistry.getSocketConnectionById(identifier)
        if (!playerData || playerData.currentlyHeldItem || !playerSocketConnection) { return lobbyData }

        playerData.currentlyHeldItem = item
        playerData.isHoldingPlate = isRecievingPlate

        lobbyData.playerData[identifier] = playerData
        playerSocketConnection.socket.emit(ServerSharedRemotes.setCurrentItem, item, isRecievingPlate)

        return lobbyData
    })
}

export default { canPlaceFoodInStation, removePlayerItem, givePlayerItem }