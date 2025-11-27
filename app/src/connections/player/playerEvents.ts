import { Socket } from "socket.io-client";
import type { PlayerStore } from "@/stores/sockets";

export function playerEventFactory(store: PlayerStore): Record<string, (...args: any[]) => void> {
    return {
        "reject": () => {

        },
        "update": (item: string | null) => {
            if (item) {
                store.updateInventory(item)
            }
            else {
                store.clearInventory();
            }
        },
        "disconnect": () => {
            store.endGame();
        }
    }
}