import type { Socket } from "socket.io"
import type { uniqueIdentifier } from "shared/types"
import lobby from "services/lobby";
import itemPlacer from "utils/Singletons/itemPlacer";
import specialKeyService from "services/specialKey";
function onSpecialKeyPressed(stationSocket: Socket, stationIdentifier: uniqueIdentifier, specialKey: string) {
    const lobbyData = lobby.getLobbyData();
    const stationData = lobbyData.stationData[stationIdentifier];
    const heldItem = stationData.currentlyHeldItem;
    if (!heldItem || heldItem.isPlated) { return };

    const foodItem = heldItem.foodItems;
    if (foodItem.length != 1) { return };

    const clientConnection = specialKeyService.getSocketConnectionByKey(specialKey);
    if (!clientConnection) { return };

    const clientIdentifier = clientConnection.identifier;
    itemPlacer.GiveItemToClient(clientIdentifier, heldItem);
    
}
export default {
    onSpecialKeyPressed
}