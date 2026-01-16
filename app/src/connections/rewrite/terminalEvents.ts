import { TerminalStore } from "@/stores/rewrite/roleStores";
import enums from "@shared/enums";
import { foodItem, holdableItem } from "@shared/types";
//new event -  Clientkey send
//this sets the terminalstores clientKey variable to an array containing the clientKeys.


export function terminalEvents(store: TerminalStore): Record<string, (...args: any[]) => void> {
    return {
        [enums.sharedRemotes.setCurrentItem]: (item: holdableItem) => {
            store.setCurrentItem(item);
        },
        [enums.serverToStationRemotes.gameStarted]: (keys: Array<string>) => {
            store.clientsKeys = new Set(keys);
        },
        [enums.serverToStationRemotes.stationAssigned]: (stationName: string) => {
            store.setStationType(stationName);
        },
    }
}
export const initialTerminalEvents = (store: TerminalStore): Record<string, (...args: any[]) => void> => ({
    "pendingJoin": (identifierObj: { identifier: number }) => {
        console.log("Identifier set in store:", identifierObj.identifier);
    },
    "stationAssigned": (stationName: string) => {
        store.setStationType(stationName); // example usage
        console.log("Station assigned in store:", stationName);
    },
});
