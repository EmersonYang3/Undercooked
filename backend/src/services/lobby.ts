import type { lobbyData, socketConnection, fixedSocketData } from "utils/types";

let currentLobbyData: lobbyData = { host: { socket: null, identifier: 0 }, clients: [], stations: [], recipesInProgress: {}, playerData: {}, stationData: {} };
let currentLobbyCode = ''

function generateLobbyCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const charactersLength = characters.length;

    let result = '';

    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;

}

function hostAlreadyExists(): boolean {
    return (currentLobbyCode !== '')
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

function transformLobbyData(callback: (data: lobbyData) => lobbyData) {
    currentLobbyData = callback(currentLobbyData)
}

function getLobbyCode(): string {
    return currentLobbyCode
}

function isConnectionRegistered(connection: socketConnection): boolean {
    if (currentLobbyData.host.socket.id === connection.socket.id) {
        return true
    }

    for (const client of currentLobbyData.clients) {
        if (client.socket.id === connection.socket.id) {
            return true
        }
    }

    for (const station of currentLobbyData.stations) {
        if (station.socket.id === connection.socket.id) {
            return true
        }
    }

    return false
}

function loopThroughClients(callback: (client: socketConnection) => void) {
    for (const client of currentLobbyData.clients) {
        callback(client)
    }
}

function emitToAllClients(eventName: string, ...args: any[]): void {
    for (const client of currentLobbyData.clients) {
        client.socket.emit(eventName, ...args)
    }
}

function emitToAllStations(eventName: string, ...args: any[]): void {
    for (const station of currentLobbyData.stations) {
        station.socket.emit(eventName, ...args)
    }
}

export default { generateLobbyCode, lobbyExists, createLobby, getLobbyData, transformLobbyData, isConnectionRegistered, getLobbyCode, emitToAllClients, emitToAllStations, loopThroughClients, hostAlreadyExists }