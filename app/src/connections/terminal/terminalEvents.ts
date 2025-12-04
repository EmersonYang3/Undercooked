import { TerminalStore } from "@/stores/roleStores";
//new event -  Clientkey send
//this sets the terminalstores clientKey variable to an array containing the clientKeys.


export function terminalEvents(store: TerminalStore): Record<string, (...args: any[]) => void> {
    return {
        "clientKeys": (clientKeys: Array<string>) => {
            store.clientsKeys = clientKeys;
            //temporary
        },
        "placedItem": (item: null | string) => {
            store.placeItem(item);
        }
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
