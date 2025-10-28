import type { socketConnection } from "utils/types";
import type { uniqueIdentifier } from "shared/types";
import type { Socket } from "socket.io";

import unqiService from "services/unqi"

let registry: Record<uniqueIdentifier, socketConnection> = {}

function registerSocketConnection(socket: Socket): socketConnection {
    const identifier = unqiService.getUnqi()
    registry[identifier] = { socket, identifier }

    return registry[identifier]
}

function getSocketConnectionById(identifier: uniqueIdentifier): socketConnection | null {
    return registry[identifier] || null
}

export default { registerSocketConnection, getSocketConnectionById }