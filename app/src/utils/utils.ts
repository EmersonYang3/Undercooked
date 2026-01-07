import { Socket } from "socket.io-client";

export function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
export function onEvents(socket: Socket, eventMap: Record<string, (...args: any[]) => void>) {
    Object.entries(eventMap).forEach(([eventName, callback]) => {
        socket.on(eventName, (...args) => {
            callback(...args);
        })
    })
}
