import type { Socket } from "socket.io";

import connect from "../modules/host/connect.ts"
import disconnect from "../modules/host/disconnect.ts"
import sharedEnums from "shared/enums.ts"

const socketEvents = sharedEnums.socketEvents

function init(socket: Socket) {
    const { lobbyCode, hostIdentifier } = connect.connected(socket)

    socket.on(socketEvents.disconnect, (reason) => { disconnect.disconnected(socket, reason) })

    socket.emit(socketEvents.hostConnected, { lobbyCode, hostIdentifier })
}

export default { init }