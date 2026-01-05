import type { Socket } from "socket.io"
import type { uniqueIdentifier, plate, foodItem } from "shared/types"

import specialKeyService from "services/specialKey"
import singletons from "utils/singletons"
import lobby from "services/lobby"
const itemPlacer = singletons.itemPlacer;
const foodTransform = singletons.foodTransform

// function onSpecialKeyPressed(stationSocket: Socket, stationIdentifier: uniqueIdentifier, specialKey: string) {
//     const clientConnection = specialKeyService.getSocketConnectionByKey(specialKey)
//     if (!clientConnection) { return }

//     const clientIdentifier = clientConnection.identifier

//     const whatAction = itemPlacer.getAction(clientIdentifier, stationIdentifier)
//     if (whatAction == "none") { return }

//     if (whatAction == "placing") {
//         itemPlacer.removeItemAndGiveTo("player", stationIdentifier, clientIdentifier)
//     } else if (whatAction == "submit") {
//     } else if (whatAction == "removing") {
//         itemPlacer.removeItemAndGiveTo("station", stationIdentifier, clientIdentifier)

//     } else if (whatAction == "combining") {
//         const [playerHeldItem, isItemAPlate] = itemPlacer.getPlayerHeldItem(clientIdentifier)
//         if (!playerHeldItem || isItemAPlate || !foodTransform.isFoodItem(playerHeldItem)) { return }

//         const [stationHeldItem, isItemBPlate] = itemPlacer.getStationHeldItem(stationIdentifier)
//         if (!stationHeldItem || !isItemBPlate || !foodTransform.isPlate(stationHeldItem)) { return }

//         const canCombineItems = foodTransform.CanCombineFoodItems(playerHeldItem, stationHeldItem.foodItem)
//         if (!canCombineItems) { return }

//         const combinedItem = foodTransform.CombineFoodItems(playerHeldItem, stationHeldItem.foodItem)
//         if (!combinedItem) { return }

//         const newPlate: plate = { foodItem: combinedItem }
//         itemPlacer.removePlayerItem(clientIdentifier)
//         itemPlacer.giveStationItem(stationIdentifier, newPlate, true)
//     }
// }



//things to fix 
//since we've moved to allowing multiple items it means stations can hold multipe items
//stationData should have its currentlyHeldItem field to an Array<string> | plate
//idk what it'll break so ill implement tommorow;
function onSpecialKeyPressed(stationSocket: Socket, stationIdentifier: uniqueIdentifier, specialKey: string) {
    const clientConnection = specialKeyService.getSocketConnectionByKey(specialKey)
    if (!clientConnection) { return };
    const clientIdentifier = clientConnection.identifier;
    const lobbyData = lobby.getLobbyData();
    const playerData = lobbyData.playerData[clientIdentifier];
    const stationData = lobbyData.stationData[stationIdentifier];
    if (!playerData || !stationData) { return "none" };
    const isPlayerHoldingItem = playerData.currentlyHeldItem !== undefined;
    const isStationHoldingItem = stationData.currentlyHeldItem !== undefined;
    //this could definitely be improved but im just getting the basic idea down to make it more readable.
    if (!isStationHoldingItem && isPlayerHoldingItem) {
        itemPlacer.removeItemAndGiveTo("station", clientIdentifier, stationIdentifier);
    } else if (isStationHoldingItem && !stationData.isHoldingPlate && isPlayerHoldingItem) {
        //this will need to be changed to accomodate for stationData heldItems field change
        const yes = foodTransform.CanCombineFoodItems([stationData.currentlyHeldItem as foodItem, playerData.currentlyHeldItem as foodItem]);
        if (yes) {
            let resultingItem = foodTransform.CombineFoodItems([stationData.currentlyHeldItem as foodItem, playerData.currentlyHeldItem as foodItem]);
            itemPlacer.removePlayerItem(clientIdentifier);
            itemPlacer.giveStationItem(stationIdentifier, resultingItem, true);
        }
    } else if (stationData.isHoldingPlate && isPlayerHoldingItem && !playerData.isHoldingPlate) {
        itemPlacer.removeItemAndGiveTo("station", clientIdentifier, stationIdentifier);
    } else if (isStationHoldingItem && playerData.isHoldingPlate) {
        playerData.isHoldingPlate = false;
        stationData.isHoldingPlate = true;
        //idk if we gotta do some emit stuff but ill check later
    }
    //these checks should porably be first
    else if (stationData.stationType == "submit" && playerData.isHoldingPlate) {
        submitItem();
    } else if (stationData.stationType == "disposal" && isPlayerHoldingItem) {
        itemPlacer.removePlayerItem(clientIdentifier);
    }
}
//cases covered
//if station has plate and player has item
//station places item in plate
//if station has nothing and player has plate
//station takes plate from player
//if station has item and player has item
//attempt combine items and place in station
//if combine fails then append items to stations held list 
//if station has no item and player has item
//place item in station

//not covered
//if station has item | plate and player no item 
//player takes item | plate
//stationType specific actions
// - dispensers
// - submit
// - empty station

function submitItem() {
    //this checks if the item is valid for submission to the 
}
function placeOnPlate(foodItem: foodItem): plate {
    let plate: plate = {
        foodItem: foodItem,
    }
    return plate;
}
function canCombine(itemA: foodItem, itemB: foodItem) {
}

export default onSpecialKeyPressed