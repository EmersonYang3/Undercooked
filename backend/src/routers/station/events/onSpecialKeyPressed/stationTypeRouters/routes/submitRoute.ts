import type { Socket } from "socket.io"
import type { uniqueIdentifier } from "shared/types"

import lobby from "services/lobby"
import specialKeyService from "services/specialKey"
import itemPlacer from "utils/Singletons/itemPlacer"

function onSpecialKeyPressed(stationSocket: Socket, stationIdentifier: uniqueIdentifier, specialKey: string) {
    const lobbyData = lobby.getLobbyData()
    const stationData = lobbyData.stationData[stationIdentifier]
    const heldItem = stationData.currentlyHeldItem
    if (!heldItem) { return }

    const clientConnection = specialKeyService.getSocketConnectionByKey(specialKey)
    if (!clientConnection) { return }

    const clientIdentifier = clientConnection.identifier
    const clientData = lobbyData.playerData[clientIdentifier]
    const clientItem = clientData.currentlyHeldItem
    if (!clientItem.isPlated) { return }

    itemPlacer.RemoveItemFromClient(clientIdentifier);
}

export default { onSpecialKeyPressed }