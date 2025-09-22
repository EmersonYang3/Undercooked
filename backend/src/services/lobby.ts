import unqiService from "./unqi.ts"

import type { Lobby } from "../utils/types.ts"

let lobbies: Record<string, Lobby> = {}

function doesLobbyExist(lobbyCode: string): boolean {
    const lobby = lobbies[lobbyCode]

    return !!lobby
}

function createLobby(lobbyCode: string) { }

function removeLobby(lobbyCode: string) { }

export default { doesLobbyExist, createLobby }