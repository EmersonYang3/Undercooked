import type { lobbyData, socketConnection, fixedSocketData } from "utils/types";

let currentLobbyData: lobbyData = {
    host: { socket: null, identifier: 0 },
    clients: [],
    stations: []
}

let currentLobbyCode = ''

function generateLobbyCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;

    let result = '';

    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;

}

function lobbyExists(lobbyCode: string): boolean {
    return (lobbyCode === currentLobbyCode && lobbyCode !== '')
}

function createLobby(hostConnection: socketConnection): string {
    const hostConnectionData = hostConnection.socket.data as fixedSocketData

    currentLobbyData.host = hostConnection
    currentLobbyCode = hostConnectionData.lobbyCode

    return currentLobbyCode
}

function getLobbyData(): lobbyData {
    return currentLobbyData
}

export default { generateLobbyCode, lobbyExists, createLobby, getLobbyData }