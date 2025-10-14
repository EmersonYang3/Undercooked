enum hostToServerRemotes {
    startLobby = "startLobby",
}

enum portServer {
    port = 3000
}

enum gameRoles {
    host = 'host',
    client = 'client',
    station = 'station'
}

enum connValidatorErrors {
    noHandshakeData = "No handshake auth data provided.",
    invalidHandshakeData = "Invalid handshake auth data provided.",
    hostConnectionFailed = "Host already connected to lobby with provided code.",
    otherConnectionsFailed = "No lobby with provided code exists."
}

enum socketEvents {
    // Connection events
    disconnect = "disconnect",
    
    // Host events
    hostConnected = "host:connected",
    
    // Player events
    playerConnected = "player:connected",
    
    // Terminal events
    terminalConnected = "terminal:connected",
}

export default { 
    hostToServerRemotes, 
    portServer, 
    connValidatorErrors, 
    gameRoles,
    socketEvents
}