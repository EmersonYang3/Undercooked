export type role = 'host' | 'player' | 'terminal'

export interface handshakeData {
    targetLobbyCode: string,
    intendedRole: role,
}

export type Lobby = {
    creationTime: string
}