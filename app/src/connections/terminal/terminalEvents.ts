import { TerminalStore } from "@/stores/roleStores";

export function terminalEvents(store: TerminalStore): Record<string, (...args: any[]) => void> {
    return {

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
