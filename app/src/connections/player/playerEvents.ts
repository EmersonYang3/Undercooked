import { Socket } from "socket.io-client";
import type { PlayerStore } from "../terminal/stationEvents";


//pinia store to store external state variables not specified in the callback
//ex: start ref which triggers everything in terms of state
//pinia stores can store both variables and function making it ideal for this 
//allows easy reusuability of stores based off the type of store requested
export function playerEventFactory(store: PlayerStore): Record<string, (...args: any[]) => void> {
    return {
        "reject": () => {

        },
        "connect": (uniqid: number) => {
            store.setId(uniqid);
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