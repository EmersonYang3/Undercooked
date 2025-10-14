import type { Socket } from "socket.io"
import type { handshakeData } from "../../utils/types.ts"

import socketRegistryService from "../../services/socketRegistry.ts"
import lobbyService from "../../services/lobby.ts"

function connected(socket: Socket): { lobbyCode: string | undefined, playerIdentifier: number, specialKey: string } {
    const handshakeData = socket.data as handshakeData

    const playerIdentifier = socketRegistryService.registerSocket(socket)
    
    // TODO: Add player to lobby and generate special key
    const specialKey = "TEMP_KEY" // Placeholder until specialKey service is available
    
    return { lobbyCode: handshakeData.targetLobbyCode, playerIdentifier: playerIdentifier, specialKey: specialKey }
}

export default { connected }
