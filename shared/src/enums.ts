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

export default { 
    hostToServerRemotes, 
    portServer, 
    connValidatorErrors, 
    gameRoles 
}