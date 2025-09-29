import type { Socket } from "socket.io";

import connect from "../modules/host/connect.ts"
import disconnect from "../modules/host/disconnect.ts"

function init(socket: Socket) {
    const { lobbyCode, hostIdentifier } = connect.connected(socket)

    socket.on("disconnect", (reason) => {
        disconnect.disconnected(socket, reason)

        console.log(lobbyCode, hostIdentifier)
    })
}

export default { init }