import { TerminalStore } from "@/stores/sockets";

export function stationEventFactory(store: TerminalStore): Record<string, (...args: any[]) => void> {
    return {
        "reject": () => {

        },
        "connect": () => {
            store.startGame();
        },
        "": () => {
            store
        },
        "disconnect": () => {
            store.endGame();
        }
    }
}
