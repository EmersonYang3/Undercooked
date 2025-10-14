import type { Socket } from "socket.io"

import connect from "modules/station/connect"
import disconnect from "modules/station/disconnect"
import sharedEnums from "shared/enums"

const socketEvents = sharedEnums.socketEvents

function init(socket: Socket) {
    const stationIdentifier = connect(socket)

    socket.on(socketEvents.disconnect, (reason) => { disconnect(socket, reason) })

    socket.emit(socketEvents.terminalConnected, { stationIdentifier })
}

export default { init }
