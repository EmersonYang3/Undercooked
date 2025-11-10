export type uniqueIdentifier = number

export type intendedRoles = 'host' | 'client' | 'station'

export type availableStations = 'empty'

export type handshakeData = {
    intendedRole: intendedRoles,
    lobbyCode?: string
}