import { Socket } from "socket.io";

import type { ExtendedError } from "socket.io"
import type { handshakeData, role } from "../utils/types.ts";

import lobbyService from "./lobby.ts"

const allowedRoles: Record<role, boolean> = {"host": true, "player": true, "terminal": true}

function isHandshakeDataValid(data: any): boolean {
    return data && typeof data === "object" 
    && typeof data.targetLobbyCode === "string" 
    && typeof data.intendedRole === "string"
    && (data.intendedRole in allowedRoles);
}

function ensureHandshakeData(data: any): handshakeData {
    return { targetLobbyCode: data.targetLobbyCode, intendedRole: data.intendedRole as role }
}

function validateIfHost(data: handshakeData): boolean {
    if (data.intendedRole !== "host") return true;
    
    return !lobbyService.doesLobbyExist(data.targetLobbyCode);
}

function validateConnection(socket: Socket, next: (err?: ExtendedError) => void) {
    if (!isHandshakeDataValid(socket.handshake.auth)) {
        console.log("Recived invalid handshake data:", socket.handshake.auth);

        return next(new Error("Invalid handshake data"));
    }

    const ensuredHandshakeData = ensureHandshakeData(socket.handshake.auth);

    if (ensuredHandshakeData.intendedRole === "host" && !validateIfHost(ensuredHandshakeData)) {
        console.log("Host attempted to connect to an already existing lobby:", ensuredHandshakeData.targetLobbyCode);

        return next(new Error("Lobby with this code already exists"));
    } else if (ensuredHandshakeData.intendedRole !== "host" && !lobbyService.doesLobbyExist(ensuredHandshakeData.targetLobbyCode)) {
        console.log("Player/Terminal attempted to connect to a non-existing lobby:", ensuredHandshakeData.targetLobbyCode);
        return next(new Error("Lobby with this code does not exist"));
    }

    socket.data = ensuredHandshakeData;

    next();
}

export default { validateConnection }