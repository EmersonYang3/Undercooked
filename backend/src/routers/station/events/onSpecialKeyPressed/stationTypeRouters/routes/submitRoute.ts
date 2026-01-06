import type { Socket } from "socket.io"
import type { uniqueIdentifier } from "shared/types"
import lobby from "services/lobby"
import itemPlacer from "utils/Singletons/itemPlacer";
import foodTransformer from "utils/Singletons/foodTransformer";
import specialKeyService from "services/specialKey";
import gameState from "utils/Singletons/gameState";
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
    const clientHasFood = clientItem.foodItems.length > 0;
    if (!clientItem.isPlated) { return };
    if (!gameState.AttemptSubmit(clientItem)) {
        return "Failed to submit item"
    };
    return "Item was submitted successfully";
}

export default {
    onSpecialKeyPressed
}