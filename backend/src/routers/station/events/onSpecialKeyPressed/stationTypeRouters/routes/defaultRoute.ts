import type { Socket } from "socket.io"
import type { uniqueIdentifier } from "shared/types"

import lobby from "services/lobby"
import specialKeyService from "services/specialKey"
import singletons from "utils/singletons"

const itemPlacer = singletons.itemPlacer

function onSpecialKeyPressed(stationSocket: Socket, stationIdentifier: uniqueIdentifier, specialKey: string) {
    const lobbyData = lobby.getLobbyData()
    const stationData = lobbyData.stationData[stationIdentifier]
    const clientConnection = specialKeyService.getSocketConnectionByKey(specialKey)
    if (!clientConnection) return

    const clientIdentifier = clientConnection.identifier;
    const clientData = lobbyData.playerData[clientIdentifier];
    const clientItem = clientData.currentlyHeldItem;
    const stationItem = stationData.currentlyHeldItem;
    if (clientItem.isPlated) return

    const clientHasFood = clientItem.foodItems.length > 0
    if (!clientHasFood) return

    const stationHasFood = stationItem.foodItems.length > 0

    if (stationHasFood && !clientHasFood) {
        const removedStationItem = itemPlacer.RemoveItemFromStation(stationIdentifier)
        itemPlacer.GiveItemToClient(clientIdentifier, removedStationItem)
    } else {
        const removedClientItem = itemPlacer.RemoveItemFromClient(clientIdentifier)
        itemPlacer.GiveItemToStation(stationIdentifier, removedClientItem)
    }
}

export default onSpecialKeyPressed