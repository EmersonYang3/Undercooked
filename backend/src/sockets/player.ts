import type { Socket } from "socket.io";

import connect from "../modules/player/connect.ts"
import disconnect from "../modules/player/disconnect.ts"
import sharedEnums from "shared/enums.ts"

const socketEvents = sharedEnums.socketEvents

function init(socket: Socket) {
    const { lobbyCode, playerIdentifier, specialKey } = connect.connected(socket)

    socket.on(socketEvents.disconnect, (reason) => { disconnect.disconnected(socket, reason) })

    socket.emit(socketEvents.playerConnected, { lobbyCode, playerIdentifier, specialKey })
}

export default { init }