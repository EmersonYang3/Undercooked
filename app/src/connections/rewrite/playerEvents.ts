import enums from "@shared/enums";
import type { PlayerStore } from "@/stores/rewrite/roleStores";
import { holdableItem } from "@shared/types";
export function playerEvents(store: PlayerStore): Record<string, (...args: any[]) => void> {
    return {
        [enums.serverToClientRemotes.clientAccepted]: (clientSpecialKey: string) => {
            console.log("Successfully joined the server");
            console.log("Client Special Key : ", clientSpecialKey);
            store.setId(clientSpecialKey);
            store.isConnected = true;
        },
        [enums.serverToClientRemotes.gameStarted]: (clientKey: string) => {
            store.setKey(clientKey);
        },
        [enums.sharedRemotes.setCurrentItem]: (item: holdableItem) => {
            store.updateInventory(item);
        }
    }
}


export const initialPlayerEvents = (store: PlayerStore): Record<string, (...args: any[]) => void> => ({
    [enums.serverToClientRemotes.pendingJoin]: (identifier: { identifier: number }) => {
        console.log("Identifier for Client : ", identifier.identifier);
    },
    [enums.sharedRemotes.hostRejectedConnection]: () => {
        console.log("You were rejected by the host")
    }
});
