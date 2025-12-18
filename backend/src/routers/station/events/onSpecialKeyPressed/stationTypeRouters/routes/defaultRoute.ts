import type { Socket } from "socket.io"
import type { uniqueIdentifier } from "shared/types"

import specialKeyService from "services/specialKey"
import singletons from "utils/singletons"

const itemPlacer = singletons.itemPlacer

function onSpecialKeyPressed(stationSocket: Socket, stationIdentifier: uniqueIdentifier, specialKey: string) {
    const clientConnection = specialKeyService.getSocketConnectionByKey(specialKey)
    if (!clientConnection) { return }

    const clientIdentifier = clientConnection.identifier

    const isPlacingOrRemoving = itemPlacer.isPlacingOrRemoving(clientIdentifier, stationIdentifier)
    if (isPlacingOrRemoving == "none") { return }

    if (isPlacingOrRemoving == "placing") {
        itemPlacer.removeItemAndGiveTo("player", stationIdentifier, clientIdentifier)
    } else if (isPlacingOrRemoving == "removing") {
        itemPlacer.removeItemAndGiveTo("station", stationIdentifier, clientIdentifier)
    }
}

export default onSpecialKeyPressed