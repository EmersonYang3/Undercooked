import type { Socket } from "socket.io"

function routeConnection(socket: Socket) {
    console.log("New connection routed:", socket.id, socket.data)
}

export default routeConnection