import type { Socket } from "socket.io"
import type { uniqueIdentifier, plate, foodItem } from "shared/types"

import specialKeyService from "services/specialKey"
import UnqiService from "services/unqi"
import singletons from "utils/singletons"

const itemPlacer = singletons.itemPlacer
const foodTransform = singletons.foodTransform

function onSpecialKeyPressed(stationSocket: Socket, stationIdentifier: uniqueIdentifier, specialKey: string) {
    const clientConnection = specialKeyService.getSocketConnectionByKey(specialKey)
    if (!clientConnection) { return }

    const clientIdentifier = clientConnection.identifier

    const [stationHeldItem, isHoldingPlate] = itemPlacer.getStationHeldItem(stationIdentifier)
    if (stationHeldItem === undefined || !foodTransform.isFoodItem(stationHeldItem)) { return }

    const [playerHeldItem, playerIsHoldingPlate] = itemPlacer.getPlayerHeldItem(clientIdentifier)
    if (playerHeldItem !== undefined) { return }

    const newUnqi = UnqiService.getUnqi()
    const newFoodItem: foodItem = { name: stationHeldItem.name, quality: 5, id: newUnqi }

    itemPlacer.givePlayerItem(clientIdentifier, newFoodItem, false)
}

export default onSpecialKeyPressed