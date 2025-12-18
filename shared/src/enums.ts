enum hostToServerRemotes {
    startLobby = "startLobby",
    acceptClientJoin = "acceptClientJoin",
    acceptStationJoin = "acceptStationJoin",
    rejectPlayerJoin = "recjectPlayerJoin",
    rejectStationJoin = "rejectStationJoin",
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

enum stationToServerRemotes {
    specialKeyPressed = "specialKeyPressed"
}

enum sharedRemotes {
    connect = "connect",
    connectError = "connect_error",
    hostRejectedConnection = "hostRejectedConnection",
    setCurrentItem = "setCurrentItem"
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
    stationToServerRemotes,

    connValidatorErrors,

    sharedRemotes,
    portServer,
    gameRoles,

    stationTypes,
    methods,
    foods
}