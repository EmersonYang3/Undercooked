import { TerminalStore } from "@/stores/roleStores";
import { foodItem, plate } from "@shared/types";
//new event -  Clientkey send
//this sets the terminalstores clientKey variable to an array containing the clientKeys.


export function terminalEvents(store: TerminalStore): Record<string, (...args: any[]) => void> {
    return {
        "setCurrentItem": (item: foodItem | plate | null, isRecievingPlate: boolean) => {
            if (!item) { };

        },
        "gameStarted": (keys: Array<string>) => {
            store.clientsKeys = new Set(keys);
        }
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
