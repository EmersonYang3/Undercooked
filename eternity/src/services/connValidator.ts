import lobbyService from "services/lobby"
import sharedEnums from "shared/enums"

import type { Socket, ExtendedError } from "socket.io";
import type { handshakeData, intendedRoles } from "shared/types";

const connValidatorErr = sharedEnums.connValidatorErrors
const gameRoles = sharedEnums.gameRoles

const validRoles: Record<intendedRoles, true> = { host: true, client: true, station: true }

function throwError(message: string) {
    return new Error(message)
}

function ensureHandshakeData(data: any): boolean {
    if (!data) { return false }

    if (!data.intendedRole || typeof data.intendedRole !== 'string') { return false }

    if (!validRoles[data.intendedRole as intendedRoles]) { return false }

    return true
}

function formatHandshakeData(data: any): handshakeData {
    const formattedHandshakeData: handshakeData = {
        intendedRole: data.intendedRole,
        lobbyCode: data.lobbyCode
    }

    return formattedHandshakeData
}

function validateHost(data: handshakeData, socket: Socket): boolean {
    let targetLobbyCode = ""

    if (!data.lobbyCode) { 
        targetLobbyCode = lobbyService.generateLobbyCode() 
    } else {
        targetLobbyCode = data.lobbyCode.toUpperCase()
    }

    const isHostingAlready = lobbyService.lobbyExists(targetLobbyCode)

    if (isHostingAlready) { return false }

    socket.data = { ...data, lobbyCode: targetLobbyCode }

    return true
}

function validateOthers(data: handshakeData, socket: Socket): boolean {
    if (!data.lobbyCode) { return false }
    if (!lobbyService.lobbyExists(data.lobbyCode)) { return false }

    socket.data = { ...data, lobbyCode: data.lobbyCode.toUpperCase() }

    return true
}

function validateConnection(socket: Socket, next: (err?: ExtendedError) => void) {
    const handshakeAuthData = socket.handshake.auth
    if (!handshakeAuthData) { return next(throwError(connValidatorErr.noHandshakeData)) }

    const isHandshakeDataValid = ensureHandshakeData(handshakeAuthData)
    if (!isHandshakeDataValid) { return next(throwError(connValidatorErr.invalidHandshakeData)) }

    const formattedHandshakeData: handshakeData = formatHandshakeData(handshakeAuthData)

    if (formattedHandshakeData.intendedRole === gameRoles.host) {
        const isHostValid = validateHost(formattedHandshakeData, socket)
        if (!isHostValid) { return next(throwError(connValidatorErr.hostConnectionFailed)) }

    } else {
        const isOtherValid = validateOthers(formattedHandshakeData, socket)
        if (!isOtherValid) { return next(throwError(connValidatorErr.otherConnectionsFailed)) }
    }

    return next()
}

export default validateConnection