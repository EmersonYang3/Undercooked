import type { Socket } from "socket.io"
import type { uniqueIdentifier } from "shared/types"

import sharedEnums from "shared/enums"
import socketRegistry from "services/socketRegistry"

const sharedRemotes = sharedEnums.sharedRemotes

function onRejectConnection(hostSocket: Socket, rejectedSocketId: uniqueIdentifier) {
    const isRealConnection = socketRegistry.doesSocketConnectionIdExist(rejectedSocketId)
    if (!isRealConnection) { return }

    const rejectedConnection = socketRegistry.getSocketConnectionById(rejectedSocketId)
    if (!rejectedConnection) { return }

    socketRegistry.removeSocketConnectionById(rejectedSocketId)
    rejectedConnection.socket.emit(sharedRemotes.hostRejectedConnection)
}

export default onRejectConnection
