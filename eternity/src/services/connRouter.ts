import type { Socket } from "socket.io"

import hostSocket from "sockets/host"
import clientSocket from "sockets/client"
import stationSocket from "sockets/station"
import sharedEnums from "shared/enums"

const gameRoles = sharedEnums.gameRoles

function getSocketMap(): Record<string, { init: (socket: Socket) => void }> {
    return {
        [gameRoles.host]: hostSocket,
        [gameRoles.client]: clientSocket,
        [gameRoles.station]: stationSocket
    }
}

function routeConnection(socket: Socket) {
    console.log("New connection routed:", socket.id, socket.data)

    const role = socket.data.intendedRole
    const socketMap = getSocketMap()
    const handler = socketMap[role]

    if (handler) {
        handler.init(socket)
    } else {
        console.log("No handler found for role:", role)
    }
}

export default routeConnection
