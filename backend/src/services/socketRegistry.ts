import type { Socket } from "socket.io"
import unqiService from "./unqi.ts"

let players: Record<number, Socket> = {}

function registerSocket(socket: Socket): number {
    const playerId = unqiService.getUnqi()
    players[playerId] = socket
    
    return playerId
}

function removePlayerId(playerId: number) {
    delete players[playerId]

    unqiService.freeUnqi(playerId)
}

function getPlayerIdFromSocket(socket: Socket): number | null {
    const id = Object.keys(players).find(key => players[Number(key)] === socket)
    return id ? Number(id) : null
}

function getSocketFromId(playerId: number): Socket | null {
    return players[playerId] || null
}

function removePlayer(socket: Socket | null, playerId: number | null) {
    if (socket) {
        const id = getPlayerIdFromSocket(socket)
        removePlayerId(id!)
    } else {
        removePlayerId(playerId!)
    }
}

export default { registerSocket, removePlayer, removePlayerId, getPlayerIdFromSocket, getSocketFromId }