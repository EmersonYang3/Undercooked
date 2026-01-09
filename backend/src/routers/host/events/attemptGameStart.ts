import lobbyService from "services/lobby"
import specialKey from "services/specialKey"
import gameLoop from "services/gameLoop"

import sharedEnums from "shared/enums"
import sharedData from "shared/data"
import singletons from "utils/singletons"
import { foodItem, holdableItem } from "shared/types"

import unqiService from "services/unqi"

const serverTSRemotes = sharedEnums.serverToStationRemotes
const serverTCRemotes = sharedEnums.serverToClientRemotes
const sharedStationData = sharedData.stationData

function alertAllGameStarting() {
    let allRegisteredKeys: string[] = [];

    lobbyService.loopThroughClients((client) => {
        const clientKey = specialKey.getKeyByConnection(client)
        if (!clientKey) return

        client.socket.emit(serverTCRemotes.gameStarted, clientKey)
        allRegisteredKeys.push(clientKey);
    })

    lobbyService.emitToAllStations(serverTSRemotes.gameStarted, allRegisteredKeys)
}

function generateFoodItem(itemName: string): foodItem {
    return { name: itemName, id: unqiService.getUnqi(), quality: 5 }
}

function setDispensingItemsToStations() {
    const lobbyData = lobbyService.getLobbyData()
    const stationData = lobbyData.stationData

    for (const [stationIdentifier, station] of Object.entries(stationData)) {
        const internalStationData = sharedStationData[station.stationType]
        const dispensingItem = internalStationData.dispensingItem
        if (!dispensingItem) continue

        const generatedFoodItem = generateFoodItem(dispensingItem)
        station.currentlyHeldItem = { foodItems: [generatedFoodItem], isPlated: false }
    }

    lobbyService.transformLobbyData(() => ({ ...lobbyData }))
}

function attemptGameStart() {
    singletons.recipeGenerator.RefreshMethods();
    singletons.recipeGenerator.RefreshValidRecipes();

    alertAllGameStarting()
    setDispensingItemsToStations()

    gameLoop.startGameLoop()
}

export default attemptGameStart