import type { Socket } from "socket.io"

import connect from "modules/host/connect"
import disconnect from "modules/host/disconnect"
import sharedEnums from "shared/enums"

const socketEvents = sharedEnums.socketEvents

function init(socket: Socket) {
    const { lobbyCode, hostIdentifier } = connect(socket)

    socket.on(socketEvents.disconnect, (reason) => { disconnect(socket, reason) })

    socket.emit(socketEvents.hostConnected, { lobbyCode, hostIdentifier })
}

export default { init }
