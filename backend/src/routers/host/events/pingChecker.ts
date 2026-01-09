import type { Socket } from "socket.io"
import sharedEnums from "shared/enums"

const STHRemotes = sharedEnums.serverToHostRemotes

function ping(hostSocket: Socket) {
    const createdAt = Date.now()
    hostSocket.emit(STHRemotes.pong, createdAt)
}

export default ping