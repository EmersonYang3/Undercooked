import enums from "@shared/enums";
import type { PlayerStore } from "@/stores/roleStores";
export function playerEvents(store: PlayerStore): Record<string, (...args: any[]) => void> {
    return {

    }
}
//these are always bound to the socket as it allows for picking up of the inital events 


export const initialPlayerEvents = (store: PlayerStore): Record<string, (...args: any[]) => void> => ({
    [enums.serverToClientRemotes.pendingJoin]: (identifier: { identifier: number }) => {
        console.log("Identifier for Client : ", identifier.identifier);
    },
    [enums.serverToClientRemotes.clientAccepted]: (clientSpecialKey: string) => {
        console.log("Successfully joined the server");
        console.log("Client Special Key : ", clientSpecialKey);
        store.setId(clientSpecialKey);
    },
});
