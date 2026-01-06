import type { Socket } from "socket.io"
import type { uniqueIdentifier } from "shared/types"
import specialKeyService from "services/specialKey";
import lobby from "services/lobby";
import itemPlacer from "utils/Singletons/itemPlacer";
function onSpecialKeyPressed(stationSocket: Socket, stationIdentifier: uniqueIdentifier, specialKey: string) {
    const lobbyData = lobby.getLobbyData();
    const stationData = lobbyData.stationData[stationIdentifier];
    const clientConnection = specialKeyService.getSocketConnectionByKey(specialKey);
    if (!clientConnection) { return };
    const clientIdentifier = clientConnection.identifier;
    const clientData = lobbyData.playerData[clientIdentifier];
    const clientItem = clientData.currentlyHeldItem;
    const stationItem = stationData.currentlyHeldItem;
    const clientHasFood = clientItem.foodItems.length > 0;
    const stationHasFood = stationItem.foodItems.length > 0;
    if (stationHasFood && !clientHasFood) {
        const removedStationitem = itemPlacer.RemoveItemFromStation(stationIdentifier);
        itemPlacer.GiveItemToClient(clientIdentifier, removedStationitem);
        return;
    }
    if (clientItem.isPlated) { return "Plated already, cannot do anything on a plated item" }
    if (!clientHasFood) { return "Cannot act on an empty item" };
    const removedClientItem = itemPlacer.RemoveItemFromClient(clientIdentifier);
    itemPlacer.GiveItemToStation(stationIdentifier, removedClientItem);
}


export default onSpecialKeyPressed