import type { uniqueIdentifier } from "shared/types"
import type { Socket } from "socket.io"

import socketRegistry from "services/socketRegistry"
import lobbyService from "services/lobby"
import sharedEnums from "shared/enums"

const serverToHostRemotes = sharedEnums.serverToHostRemotes
const serverToStationRemotes = sharedEnums.serverToStationRemotes

function onAcceptStation(hostSocket: Socket, identifier: uniqueIdentifier, stationName: string) {
    const stationConnection = socketRegistry.getSocketConnectionById(identifier)
    if (!stationConnection) { console.log("Station connection not found"); return }
    
    const isStationInLobby = lobbyService.isConnectionRegistered(stationConnection)
    if (!isStationInLobby) { console.log("Station not in lobby"); return }

    lobbyService.connectStationToLobby(stationConnection)
}

export default onAcceptStation