import type { Socket } from "socket.io"
import sharedEnums from "shared/enums"

const gameRoles = sharedEnums.gameRoles

function routeConnection(socket: Socket) {
    console.log("New connection routed:", socket.id, socket.data)
    console.log(gameRoles.client, gameRoles.host, gameRoles.station)
}

export default routeConnection