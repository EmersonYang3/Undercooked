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

function getIdBySocket(socket: Socket): uniqueIdentifier | null {
    for (const id in registry) {
        if (registry[id].socket == socket) {
            return registry[id].identifier
        }
    }

    return null
}

function doesSocketConnectionIdExist(identifier: uniqueIdentifier): boolean {
    return Boolean(registry[identifier])
}

function removeSocketConnectionById(identifier: uniqueIdentifier): void {
    delete registry[identifier]
}

export default { registerSocketConnection, getSocketConnectionById, getIdBySocket, removeSocketConnectionById, doesSocketConnectionIdExist }