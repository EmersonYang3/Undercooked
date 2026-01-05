import { uniqueIdentifier, internalStationData, internalFoodData, foodItem, plate, stationTypes } from "shared/types"

import lobbyService from "services/lobby"
import socketRegistry from "services/socketRegistry"

import sharedData from "shared/data"
import sharedEnums from "shared/enums"
import { recipesByInput } from "shared/data/foodData"

const recipes = sharedData.recipes;
const stationData = sharedData.stationData

const ServerSharedRemotes = sharedEnums.sharedRemotes

//actions that can be done
//the player can grab a plate from a dispenser station 
//if the player has said plate they can place it down at an empty station
//once its placed they can then place some foodItem on it (hot dog or sm other completed recipe)
//the player can also grab items and place them onto an empty station. 
//the empty station performs checks to see if the item can be merged
//this continues until eventually the item is completed and placed on a plate to be served
//or if the item is trash it must be discarded in a discard station or smth 
//this encourages accuracy in gameplay
//current important station types: disposal, dispenser, empty, serve/submit, 
function canPlaceFoodInStation(food: string, stationIdentifier: uniqueIdentifier): boolean {
    const lobbyData = lobbyService.getLobbyData();
    const targetStationData = lobbyData.stationData[stationIdentifier];
    if (!targetStationData) { return false };

    const stationType: stationTypes = targetStationData.stationType;
    if (stationType == "submit") {

    }
    const internalStationData: internalStationData = stationData[stationType];
    const internalFoodData = recipes[food];
    if (!internalFoodData || !internalStationData) { return false }

    const stationMethod = internalStationData.method;
    const isMethodValid = recipesByInput[food][stationMethod] !== undefined;

    return isMethodValid;
}


function getAction(playerIdentifier: uniqueIdentifier, stationIdentifier: uniqueIdentifier): "submit" | "none" | "assemble" | "placing" | "combining" | "removing" {
    const lobbyData = lobbyService.getLobbyData()
    const playerData = lobbyData.playerData[playerIdentifier];
    const stationData = lobbyData.stationData[stationIdentifier]
    if (!playerData || !stationData) { return "none" }
    const isPlayerHoldingItem = playerData.currentlyHeldItem !== undefined
    const isStationHoldingItem = stationData.currentlyHeldItem !== undefined
    if (stationData.stationType == "submit") { return "submit" }
    if (stationData.isHoldingPlate && isPlayerHoldingItem && !playerData.isHoldingPlate) {
        return "assemble";
    } else if (!isStationHoldingItem && isPlayerHoldingItem) {
        //leave
        return "placing";
    } else if (isStationHoldingItem && isPlayerHoldingItem) {
        //leave
        return "combining";
    } else if (!isPlayerHoldingItem && isStationHoldingItem) {
        //leave
        return "removing";
    }
    return "none";
}






function getPlayerHeldItem(identifier: uniqueIdentifier): [foodItem | plate, boolean] | undefined {
    const lobbyData = lobbyService.getLobbyData()
    const playerData = lobbyData.playerData[identifier]
    if (!playerData || playerData.currentlyHeldItem === undefined) { return undefined }

    return [playerData.currentlyHeldItem, playerData.isHoldingPlate]
}
function getStationHeldItem(identifier: uniqueIdentifier): [foodItem | plate, boolean] | undefined {
    const lobbyData = lobbyService.getLobbyData()
    const stationData = lobbyData.stationData[identifier]
    if (!stationData || stationData.currentlyHeldItem === undefined) { return undefined }

    return [stationData.currentlyHeldItem, stationData.isHoldingPlate]
}
function removePlayerItem(identifier: uniqueIdentifier): [foodItem | plate | undefined, boolean] {
    let playerHeldItem: foodItem | plate | undefined = undefined
    let isItemAPlate = false

    lobbyService.transformLobbyData((lobbyData) => {
        const playerData = lobbyData.playerData[identifier]
        const playerSocketConnection = socketRegistry.getSocketConnectionById(identifier)
        if (!playerData || !playerSocketConnection) { return lobbyData }

        playerHeldItem = playerData.currentlyHeldItem
        if (!playerHeldItem) { return lobbyData }

        isItemAPlate = playerData.isHoldingPlate

        playerData.currentlyHeldItem = undefined
        playerData.isHoldingPlate = false

        lobbyData.playerData[identifier] = playerData
        playerSocketConnection.socket.emit(ServerSharedRemotes.setCurrentItem, null, false)

        return lobbyData
    })

    return [playerHeldItem, isItemAPlate]
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

function removeStationItem(identifier: uniqueIdentifier): [foodItem | plate | undefined, boolean] {
    let stationHeldItem: foodItem | plate | undefined = undefined
    let isItemAPlate = false

    lobbyService.transformLobbyData((lobbyData) => {
        const stationData = lobbyData.stationData[identifier]
        const stationSocketConnection = socketRegistry.getSocketConnectionById(identifier)
        if (!stationData || !stationSocketConnection) { return lobbyData }

        stationHeldItem = stationData.currentlyHeldItem
        if (!stationHeldItem) { return lobbyData }

        isItemAPlate = stationData.isHoldingPlate

        stationData.currentlyHeldItem = undefined
        stationData.isHoldingPlate = false
        lobbyData.stationData[identifier] = stationData

        stationSocketConnection.socket.emit(ServerSharedRemotes.setCurrentItem, null, false)

        return lobbyData
    })

    return [stationHeldItem, isItemAPlate]
}

function giveStationItem(identifier: uniqueIdentifier, item: foodItem | plate, isRecievingPlate: boolean) {
    lobbyService.transformLobbyData((lobbyData) => {
        const stationData = lobbyData.stationData[identifier]
        const stationSocketConnection = socketRegistry.getSocketConnectionById(identifier)
        if (!stationData || stationData.currentlyHeldItem || !stationSocketConnection) { return lobbyData }

        stationData.currentlyHeldItem = item
        stationData.isHoldingPlate = isRecievingPlate
        lobbyData.stationData[identifier] = stationData

        stationSocketConnection.socket.emit(ServerSharedRemotes.setCurrentItem, item, isRecievingPlate)

        return lobbyData
    })
}

function removeItemAndGiveTo(reciever: "station" | "player", fromIdentifier: uniqueIdentifier, toIdentifier: uniqueIdentifier) {
    if (reciever === "player") {
        const [removedStationItem, itemType] = removeStationItem(fromIdentifier)
        if (!removedStationItem) { return }
        givePlayerItem(toIdentifier, removedStationItem, itemType)
    } else {
        const [removedPlayerItem, itemType] = removePlayerItem(fromIdentifier)
        if (!removedPlayerItem) { return }
        giveStationItem(toIdentifier, removedPlayerItem, itemType)
    }
}
export default { canPlaceFoodInStation, removePlayerItem, givePlayerItem, removeStationItem, giveStationItem, getAction, getPlayerHeldItem, getStationHeldItem, removeItemAndGiveTo }