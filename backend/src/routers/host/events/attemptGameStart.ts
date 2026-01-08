import lobbyService from "services/lobby"
import specialKey from "services/specialKey"
import gameLoop from "services/gameLoop"

import sharedEnums from "shared/enums"
import singletons from "utils/singletons"

const serverTSRemotes = sharedEnums.serverToStationRemotes
const serverTCRemotes = sharedEnums.serverToClientRemotes

function alertAllGameStarting() {
    let allRegisteredKeys = [];

    lobbyService.loopThroughClients((client) => {
        const clientKey = specialKey.getKeyByConnection(client)
        if (!clientKey) return

        client.socket.emit(serverTCRemotes.gameStarted, clientKey)
        allRegisteredKeys.push(clientKey);
    })

    lobbyService.emitToAllStations(serverTSRemotes.gameStarted, allRegisteredKeys)
}

function attemptGameStart() {
    singletons.recipeGenerator.RefreshMethods();
    singletons.recipeGenerator.RefreshValidRecipes();

    alertAllGameStarting()

    gameLoop.startGameLoop()
}

export default attemptGameStart