import type { Socket } from "socket.io"
import type { uniqueIdentifier } from "shared/types"
import lobby from "services/lobby"
import specialKeyService from "services/specialKey";
import gameLoop from "services/gameLoop";
import itemPlacer from "utils/Singletons/itemPlacer";
import socketRegistry from "services/socketRegistry";
import enums from "shared/enums";
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
    if (!gameLoop.attemptSubmit(clientItem)) {
        stationSocket.emit(enums.serverToHostRemotes.wrongItem);
        return "Failed to submit item"
    };
    itemPlacer.RemoveItemFromClient(clientIdentifier);
    return "Item was submitted successfully";
}

export default {
    onSpecialKeyPressed
}