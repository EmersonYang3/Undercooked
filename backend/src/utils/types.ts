import type { intendedRoles, uniqueIdentifier } from "shared/types"
import type { Socket } from "socket.io"

export type socketConnection = {
    socket: Socket,
    identifier: uniqueIdentifier
}

export type fixedSocketData = {
    intendedRole: intendedRoles,
    lobbyCode: string
}

export type lobbyData = {
    host: socketConnection,
    clients: socketConnection[],
    stations: socketConnection[]
}

export type eventsRegistering = Record<string, (...args: any[]) => void>