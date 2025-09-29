import unqiService from "./unqi.ts"

import type { Lobby } from "../utils/types.ts"

let lobbies: Record<string, Lobby> = {}

function doesLobbyExist(lobbyCode: string): boolean {
    const lobby = lobbies[lobbyCode]

    return !!lobby
}

function createLobby(lobbyCode: string, playerIdentifier: number, socketIdentifier: string): Lobby | null { 
    if (doesLobbyExist(lobbyCode)) { return null }

    const newLobby: Lobby = {
        host: { internalIdentifier: playerIdentifier, socketId: socketIdentifier },
        lobbyCode: lobbyCode,
        activeRecipes: [],
        terminals: [],
        players: [],

        creationTime: new Date().toISOString()
    }

    return newLobby
}

function removeLobby(lobbyCode: string) { 
    if (!doesLobbyExist(lobbyCode)) { return }
    delete lobbies[lobbyCode]
}

export default { doesLobbyExist, createLobby, removeLobby }