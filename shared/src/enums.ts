enum hostToServerRemotes {
    startLobby = "startLobby",
    acceptClientJoin = "acceptClientJoin",
    acceptStationJoin = "acceptStationJoin"
}

enum serverToHostRemotes {
    lobbyStarted = "lobbyStarted",
    clientPendingJoin = "clientPendingJoin",
    stationPendingJoin = "stationPendingJoin",
    newClientJoined = "newClientJoined",
    newStationJoined = "newStationJoined"
}

enum serverToClientRemotes {
    pendingJoin = "pendingJoin",
    clientAccepted = "clientAccepted",
    changeCurrentlyHeldItem = "changeCurrentlyHeldItem",
    gameStarted = "gameStarted"
}


enum serverToStationRemotes {
    pendingJoin = "pendingJoin",
    stationAssigned = "stationAssigned",
    gameStarted = "gameStarted"
}

enum sharedRemotes {
    connect = "connect",
    connectError = "connect_error",
    hostRejectedConnection = "hostRejectedConnection"
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

enum stationTypes {
    empty = "empty",
    boilingStation = "boilingStation"
}

enum foods {
    uncookedEgg = "uncookedEgg",
    boiledEgg = "boiledEgg"
}

enum methods {
    boil = "boil"
}

export default {
    hostToServerRemotes,
    serverToHostRemotes,
    serverToClientRemotes,
    serverToStationRemotes,
    connValidatorErrors,

    sharedRemotes,
    portServer,
    gameRoles,

    stationTypes,
    methods,
    foods
}