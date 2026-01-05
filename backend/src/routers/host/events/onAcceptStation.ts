import type { uniqueIdentifier, stationData } from "shared/types"
import type { lobbyData, socketConnection } from "utils/types"
import type { Socket } from "socket.io"

import socketRegistry from "services/socketRegistry"
import lobbyService from "services/lobby"
import sharedEnums, { stationTypes } from "shared/enums"
import itemPlacer from "utils/Singletons/itemPlacer"

const serverToHostRemotes = sharedEnums.serverToHostRemotes
const serverToStationRemotes = sharedEnums.serverToStationRemotes

function pushStationToLobby(stationConnection: socketConnection, stationName: stationTypes, identifier: uniqueIdentifier) {
    lobbyService.transformLobbyData((lobbyData: lobbyData) => {
        const stationData: stationData = { stationType: stationName, currentlyHeldItem: itemPlacer.createEmptyHoldable() }
        lobbyData.stationData[identifier] = stationData
        lobbyData.stations.push(stationConnection)

        return lobbyData
    })
}

function onAcceptStation(hostSocket: Socket, identifier: uniqueIdentifier, stationName: stationTypes) {
    const stationConnection = socketRegistry.getSocketConnectionById(identifier)
    if (!stationConnection) { console.log("Station connection not found"); return }

    const isStationInLobby = lobbyService.isConnectionRegistered(stationConnection)
    if (isStationInLobby) { console.log("Station not in lobby"); return }

    pushStationToLobby(stationConnection, stationName, identifier)

    hostSocket.emit(serverToHostRemotes.newStationJoined, identifier)
    stationConnection.socket.emit(serverToStationRemotes.stationAssigned, stationName)
}

export default onAcceptStation
