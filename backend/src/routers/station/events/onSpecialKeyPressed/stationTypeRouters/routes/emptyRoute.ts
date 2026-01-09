import type { Socket } from "socket.io"
import type { uniqueIdentifier } from "shared/types"

import lobby from "services/lobby"
import itemPlacer from "utils/Singletons/itemPlacer"
import foodTransformer from "utils/Singletons/foodTransformer"
import specialKeyService from "services/specialKey"

function onSpecialKeyPressed(stationSocket: Socket, stationIdentifier: uniqueIdentifier, specialKey: string) {
    const lobbyData = lobby.getLobbyData()
    const stationData = lobbyData.stationData[stationIdentifier]
    const heldItem = stationData.currentlyHeldItem
    if (!heldItem) return

    const clientConnection = specialKeyService.getSocketConnectionByKey(specialKey)
    if (!clientConnection) return

    const clientIdentifier = clientConnection.identifier
    const clientData = lobbyData.playerData[clientIdentifier]
    const clientItem = clientData.currentlyHeldItem

    const clientHasFood = clientItem.foodItems.length > 0
    const stationHasFood = heldItem.foodItems.length > 0

    if (!clientHasFood && !stationHasFood) return
    if (clientItem.isPlated && heldItem.isPlated) return

    if (!clientHasFood && !clientItem.isPlated && stationHasFood) {
        const removedItem = itemPlacer.RemoveItemFromStation(clientIdentifier)
        itemPlacer.GiveItemToClient(clientIdentifier, removedItem)
        return
    }

    if (!clientItem.isPlated && heldItem.isPlated && clientHasFood) {
        const clientHoldable = itemPlacer.RemoveItemFromClient(clientIdentifier)
        itemPlacer.GiveItemToStation(stationIdentifier, clientHoldable)
        return
    }

    if (clientHasFood && stationHasFood && !heldItem.isPlated && !clientItem.isPlated) {
        const stationHoldable = itemPlacer.RemoveItemFromStation(stationIdentifier)
        const clientHoldable = itemPlacer.RemoveItemFromClient(clientIdentifier)
        const combinedItem = foodTransformer.CombineItems(stationHoldable, clientHoldable)
        itemPlacer.GiveItemToStation(stationIdentifier, combinedItem)
    }
}

export default { onSpecialKeyPressed };