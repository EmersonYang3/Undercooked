import type { Socket } from "socket.io"
import type { handshakeData } from "../../utils/types.ts"

import socketRegistryService from "../../services/socketRegistry.ts"
import lobbyService from "../../services/lobby.ts"

function connected(socket: Socket): { lobbyCode: string | undefined, hostIdentifier: number } {
    const handshakeData = socket.data as handshakeData

    const hostIdentifier = socketRegistryService.registerSocket(socket)
    const createdLobby = lobbyService.createLobby(handshakeData.targetLobbyCode, hostIdentifier, socket.id)wwwww

    return { lobbyCode: createdLobby?.lobbyCode, hostIdentifier: hostIdentifier }
}

export default { connected }