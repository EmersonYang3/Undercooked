import type { Socket } from "socket.io"

import hostSocket from  "../sockets/host.ts"
import playerSocket from "../sockets/player.ts"
import terminalSocket from "../sockets/terminal.ts"

const socketMap: Record<string, { init: (socket: Socket) => void }> = {
    "host": hostSocket,
    "player": playerSocket,
    "terminal": terminalSocket
}

function onConnected(socket: Socket) {
    console.log("Routing connection for socket:", socket.id, socket.data);

    const role = socket.data.intendedRole
    const handler = socketMap[role]

    if (handler) {
        handler.init(socket);
    } else {
        console.log("No handler found for role:", role); 
    }
}

function onDisconnected(socket: Socket, reason: any) {
    console.log("Socket disconnected:", socket.id, "Reason:", reason);
}

export default { onConnected, onDisconnected }