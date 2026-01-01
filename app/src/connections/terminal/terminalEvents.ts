import { TerminalStore } from "@/stores/roleStores";
import { foodItem, plate } from "@shared/types";
//new event -  Clientkey send
//this sets the terminalstores clientKey variable to an array containing the clientKeys.


export function terminalEvents(store: TerminalStore): Record<string, (...args: any[]) => void> {
    return {
        "clientKeys": (clientKeys: Array<string>) => {
            store.clientsKeys = new Set(clientKeys);
        },
        "setCurrentItem": (item: foodItem | plate | null, isRecievingPlate: boolean) => {
            if (!item) { };

        },
    }
}
export const initialTerminalEvents = (store: TerminalStore): Record<string, (...args: any[]) => void> => ({
    "pendingJoin": (identifierObj: { identifier: number }) => {
        console.log("Identifier set in store:", identifierObj.identifier);
    },
    "stationAssigned": (stationName: string) => {
        store.setStationType(1, stationName as any); // example usage
        console.log("Station assigned in store:", stationName);
    },
});
