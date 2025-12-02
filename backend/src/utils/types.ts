import type { intendedRoles, uniqueIdentifier, activeRecipe, playerData, stationData } from "shared/types"
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
    stations: socketConnection[],

    recipesInProgress?: activeRecipe[],
    playerData?: Record<uniqueIdentifier, playerData>,
    stationData?: Record<uniqueIdentifier, stationData>
}

export type eventsRegistering = Record<string, (...args: any[]) => void>