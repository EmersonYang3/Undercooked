import type { uniqueIdentifier } from "shared/types"
import type { Socket } from "socket.io"

import specialKeyService from "services/specialKey"
import singletons from "utils/singletons"

const itemPlacer = singletons.itemPlacer
const foodTransform = singletons.foodTransform

function onSpecialKeyPressed(stationSocket: Socket, stationIdentifier: uniqueIdentifier, specialKey: string) {
    const clientConnection = specialKeyService.getSocketConnectionByKey(specialKey)
    if (!clientConnection) { return }

    const clientIdentifier = clientConnection.identifier
    const [playerHeldItem, playerIsHoldingPlate] = itemPlacer.getPlayerHeldItem(clientIdentifier)
    if (playerHeldItem == undefined || !foodTransform.isPlate(playerHeldItem)) { return }

    const playerHeldFood = playerHeldItem.foodItem
    if (playerHeldFood === undefined || !foodTransform.isFoodItem(playerHeldFood)) { return }

    itemPlacer.removePlayerItem(clientIdentifier)
}

export default onSpecialKeyPressed