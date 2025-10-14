import type { Socket } from "socket.io";

import connect from "../modules/terminal/connect.ts"
import disconnect from "../modules/terminal/disconnect.ts"
import sharedEnums from "shared/enums.ts"

const socketEvents = sharedEnums.socketEvents

function init(socket: Socket) {
    const terminalIdentifier = connect.connect(socket)

    socket.on(socketEvents.disconnect, (reason) => { disconnect.disconnected(socket, reason) })

    socket.emit(socketEvents.terminalConnected, { terminalIdentifier })
}

export default { init }