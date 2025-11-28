import type { Socket } from "socket.io";
import type { lobbyData } from "utils/types";

import lobbyService from "services/lobby";
import specialKey from "services/specialKey";

import sharedEnums from "shared/enums";

const serverTSRemotes = sharedEnums.serverToStationRemotes
const serverTCRemotes = sharedEnums.serverToClientRemotes

function getAllRegisteredKeys(lobbyData: lobbyData) {
    let allRegisteredKeys = [];

    for (const client of lobbyData.clients) {
        const clientKey = specialKey.getKeyByConnection(client);
        allRegisteredKeys.push(clientKey);
    }

    return allRegisteredKeys;
}

function alertAllStationsGameStarting(availableKeys: string[]) {
    lobbyService.emitToAllStations(serverTSRemotes.gameStarted, availableKeys)
}

function alertAllClientGameStarting() {
    lobbyService.emitToAllClients(serverTCRemotes.gameStarted)
}

function attemptGameStart(hostSocket: Socket) {
    const lobbyData = lobbyService.getLobbyData()
    const registeredKeys = getAllRegisteredKeys(lobbyData)

    alertAllStationsGameStarting(registeredKeys)
    alertAllClientGameStarting()
}

export default attemptGameStart