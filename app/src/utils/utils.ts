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
function onAnyEvent(socket: Socket, eventMap: Record<string, (event, ...args: any[]) => void>) {
    Object.entries(eventMap).forEach(([eventNames, callback]) => {
        socket.onAny((event, ...args) => {
            const handler = eventMap[event];
            if (handler) handler(args);
        });
    })
}