import type { Socket } from "socket.io"
import type { uniqueIdentifier, plate, foodItem } from "shared/types"

import specialKeyService from "services/specialKey"
import singletons from "utils/singletons"
import lobby from "services/lobby"
const itemPlacer = singletons.itemPlacer
const foodTransform = singletons.foodTransform

function onSpecialKeyPressed(stationSocket: Socket, stationIdentifier: uniqueIdentifier, specialKey: string) {
    const clientConnection = specialKeyService.getSocketConnectionByKey(specialKey)
    if (!clientConnection) { return }

    const clientIdentifier = clientConnection.identifier

    const whatAction = itemPlacer.getAction(clientIdentifier, stationIdentifier)
    if (whatAction == "none") { return }

    if (whatAction == "placing") {
        itemPlacer.removeItemAndGiveTo("player", stationIdentifier, clientIdentifier)

    } else if (whatAction == "submit") {
        itemPlacer.removeStationItem(stationIdentifier);
        let lobbyData = lobby.getLobbyData();
        let item = lobbyData.stationData[stationIdentifier].currentlyHeldItem as foodItem;
        //why do we even have plates unless its for easier detection???
        //for now imma do a type assertion
        //FIX THIS LATER
        singletons.gameState.FinishRecipe(item);
    } else if (whatAction == "removing") {
        itemPlacer.removeItemAndGiveTo("station", stationIdentifier, clientIdentifier)

    } else if (whatAction == "combining") {
        const [playerHeldItem, isItemAPlate] = itemPlacer.getPlayerHeldItem(clientIdentifier)
        if (!playerHeldItem || isItemAPlate || !foodTransform.isFoodItem(playerHeldItem)) { return }

        const [stationHeldItem, isItemBPlate] = itemPlacer.getStationHeldItem(stationIdentifier)
        if (!stationHeldItem || !isItemBPlate || !foodTransform.isPlate(stationHeldItem)) { return }

        const canCombineItems = foodTransform.CanCombineFoodItems(playerHeldItem, stationHeldItem.foodItem)
        if (!canCombineItems) { return }

        const combinedItem = foodTransform.CombineFoodItems(playerHeldItem, stationHeldItem.foodItem)
        if (!combinedItem) { return }

        const newPlate: plate = { foodItem: combinedItem }
        itemPlacer.removePlayerItem(clientIdentifier)
        itemPlacer.giveStationItem(stationIdentifier, newPlate, true)
    }
}

export default onSpecialKeyPressed