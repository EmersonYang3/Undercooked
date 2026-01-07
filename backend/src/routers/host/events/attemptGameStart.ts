import type { Socket } from "socket.io";

import lobbyService from "services/lobby";
import specialKey from "services/specialKey";

import sharedEnums from "shared/enums";
import singletons from "utils/singletons";

const serverTSRemotes = sharedEnums.serverToStationRemotes
const serverTCRemotes = sharedEnums.serverToClientRemotes

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
function attemptGameStart() {
    singletons.recipeGenerator.RefreshMethods();
    singletons.recipeGenerator.RefreshValidRecipes();

    alertAllGameStarting()
}

export default attemptGameStart