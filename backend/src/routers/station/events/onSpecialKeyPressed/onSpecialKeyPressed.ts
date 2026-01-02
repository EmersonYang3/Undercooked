import type { Socket } from "socket.io"
import type { uniqueIdentifier } from "shared/types"

import lobbyService from "services/lobby"
import stationTypeToRoute from "./stationTypeRouters/stationTypeToRoute"

function onSpecialKeyPressed(stationSocket: Socket, stationIdentifier: uniqueIdentifier, specialKey: string) {
    const lobbyData = lobbyService.getLobbyData()
    if (!lobbyData) { return }

    const stationData = lobbyData.stationData[stationIdentifier]
    if (!stationData) { return }

    const stationType = stationData.stationType
    const stationTypeRoute = stationTypeToRoute[stationType] || stationTypeToRoute.defaultRoute

    stationTypeRoute(stationSocket, stationIdentifier, specialKey)
}
export default onSpecialKeyPressed