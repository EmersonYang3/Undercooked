import sharedEnums from "shared/enums"
import lobbyService from "services/lobby"
import socketRegistry from "services/socketRegistry"

import type { holdableItem, uniqueIdentifier } from "shared/types"

const serverToClientRemotes = sharedEnums.serverToClientRemotes
const sharedRemotes = sharedEnums.sharedRemotes

export function createEmptyHoldable(): holdableItem {
    return { foodItems: [], isPlated: false }
}

function cloneHoldable(item?: holdableItem): holdableItem {
    if (!item) { return createEmptyHoldable() }
    return {
        isPlated: item.isPlated,
        foodItems: item.foodItems.map((f) => ({ ...f })),
    }
}



function GetAction(clientIdentifier: uniqueIdentifier, stationIdentifier: uniqueIdentifier): "place" | "remove" | "none" {
    const lobbyData = lobbyService.getLobbyData()
    const player = lobbyData.playerData[clientIdentifier]
    const station = lobbyData.stationData[stationIdentifier]
    if (!player || !station) { return "none" }

    const playerItem = player.currentlyHeldItem
    const stationItem = station.currentlyHeldItem

    const playerHasFood = playerItem.foodItems.length > 0
    const stationHasFood = stationItem.foodItems.length > 0

    if (playerHasFood && !playerItem.isPlated) { return "place" }
    if (!playerHasFood && stationHasFood) { return "remove" }
    return "none"
}

function RemoveItemFromClient(clientIdentifier: uniqueIdentifier): holdableItem {
    const lobbyData = lobbyService.getLobbyData()
    const player = lobbyData.playerData[clientIdentifier]
    if (!player) { return createEmptyHoldable() }

    const removedItem = cloneHoldable(player.currentlyHeldItem)
    player.currentlyHeldItem = createEmptyHoldable()
    return removedItem
}

function AlertClientHoldingItemChanged(clientIdentifier: uniqueIdentifier, newItem: holdableItem): void {
    const connection = socketRegistry.getSocketConnectionById(clientIdentifier)
    if (!connection) { return }

    connection.socket.emit(serverToClientRemotes.changeCurrentlyHeldItem, newItem)
}

function RemoveItemFromStation(stationIdentifier: uniqueIdentifier): holdableItem {
    const lobbyData = lobbyService.getLobbyData()
    const station = lobbyData.stationData[stationIdentifier]
    if (!station) { return createEmptyHoldable() }

    const removedItem = cloneHoldable(station.currentlyHeldItem)
    station.currentlyHeldItem = createEmptyHoldable()
    return removedItem
}

function AlertStationHoldingItemChanged(stationIdentifier: uniqueIdentifier, newItem: holdableItem): void {
    const connection = socketRegistry.getSocketConnectionById(stationIdentifier)
    if (!connection) { return }

    connection.socket.emit(sharedRemotes.setCurrentItem, newItem)
}

function GiveItemToClient(clientIdentifier: uniqueIdentifier, item: holdableItem): void {
    const lobbyData = lobbyService.getLobbyData()
    const player = lobbyData.playerData[clientIdentifier]
    if (!player) { return }

    player.currentlyHeldItem = cloneHoldable(item)
    AlertClientHoldingItemChanged(clientIdentifier, player.currentlyHeldItem)
}

function GiveItemToStation(stationIdentifier: uniqueIdentifier, item: holdableItem): void {
    const lobbyData = lobbyService.getLobbyData()
    const station = lobbyData.stationData[stationIdentifier]
    if (!station) { return }

    station.currentlyHeldItem = cloneHoldable(item)
    AlertStationHoldingItemChanged(stationIdentifier, station.currentlyHeldItem)
}

export default {
    GetAction,
    RemoveItemFromClient,
    AlertClientHoldingItemChanged,
    RemoveItemFromStation,
    AlertStationHoldingItemChanged,
    GiveItemToClient,
    GiveItemToStation,
    createEmptyHoldable,
}
