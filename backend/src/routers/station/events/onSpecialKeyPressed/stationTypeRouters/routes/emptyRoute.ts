import type { Socket } from "socket.io"
import type { uniqueIdentifier } from "shared/types"
import lobby from "services/lobby"
import itemPlacer from "utils/Singletons/itemPlacer";
import foodTransformer from "utils/Singletons/foodTransformer";
import specialKeyService from "services/specialKey";
function onSpecialKeyPressed(stationSocket: Socket, stationIdentifier: uniqueIdentifier, specialKey: string) {
    const lobbyData = lobby.getLobbyData();
    const stationData = lobbyData.stationData[stationIdentifier];
    const heldItem = stationData.currentlyHeldItem;
    if (!heldItem) { return };

    const clientConnection = specialKeyService.getSocketConnectionByKey(specialKey);
    if (!clientConnection) { return };

    const clientIdentifier = clientConnection.identifier;
    const clientData = lobbyData.playerData[clientIdentifier];

    const clientItem = clientData.currentlyHeldItem;
    const stationItem = stationData.currentlyHeldItem;
    const clientHasFood = clientItem.foodItems.length > 0;
    const stationHasFood = stationItem.foodItems.length > 0;

    if (!clientHasFood && !stationHasFood) { return "Both are empty, nothing was done" };
    if (clientItem.isPlated && stationItem.isPlated) { return "Cannot place plate on plate" };

    if (!clientHasFood && !clientItem.isPlated && stationHasFood) {
        const removedItem = itemPlacer.RemoveItemFromStation(clientIdentifier);
        itemPlacer.GiveItemToClient(clientIdentifier, removedItem);
    }
    if (!clientItem.isPlated && stationItem.isPlated && clientHasFood) {
        const clientHoldable = itemPlacer.RemoveItemFromClient(clientIdentifier);
        itemPlacer.GiveItemToStation(stationIdentifier, clientHoldable);
    }
    if (clientHasFood && stationHasFood && !stationItem.isPlated && !clientItem.isPlated) {
        const stationHoldable = itemPlacer.RemoveItemFromStation(stationIdentifier);
        const clientHoldable = itemPlacer.RemoveItemFromClient(clientIdentifier);
        const combinedItem = foodTransformer.CombineItems(stationHoldable, clientHoldable);
        itemPlacer.GiveItemToStation(stationIdentifier, combinedItem);
    }
}



export default {
    onSpecialKeyPressed
}