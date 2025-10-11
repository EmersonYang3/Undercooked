import type { Socket } from "socket.io"

export type uniqueIdentifier = number

export type intendedRoles = 'host' | 'client' | 'station'

export type handshakeData = {
    intendedRole: intendedRoles,
    lobbyCode?: string
}
export type connection = {
    socket: Socket,
    identifier: uniqueIdentifier
}