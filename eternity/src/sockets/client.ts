import type { Socket } from "socket.io"

import connect from "modules/client/connect"
import disconnect from "modules/client/disconnect"
import sharedEnums from "shared/enums"

const socketEvents = sharedEnums.socketEvents

function init(socket: Socket) {
    const { lobbyCode, clientIdentifier, specialKey } = connect(socket)

    socket.on(socketEvents.disconnect, (reason) => { disconnect(socket, reason) })

    socket.emit(socketEvents.playerConnected, { lobbyCode, clientIdentifier, specialKey })
}

export default { init }
