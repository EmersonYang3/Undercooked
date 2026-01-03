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
    newStationJoined = "newStationJoined",

    //not implemented
    newRecipe = "newRecipe",
    recipeFinished = "recipeFinished",
}

enum serverToClientRemotes {
    pendingJoin = "pendingJoin",
    clientAccepted = "clientAccepted",
    changeCurrentlyHeldItem = "changeCurrentlyHeldItem",
    gameStarted = "gameStarted"
}
//all implemented

enum serverToStationRemotes {
    pendingJoin = "pendingJoin",
    stationAssigned = "stationAssigned",
    gameStarted = "gameStarted"
}
//all implemented

enum stationToServerRemotes {
    specialKeyPressed = "specialKeyPressed"
}
//in progress

enum sharedRemotes {
    connect = "connect",
    connectError = "connect_error",
    hostRejectedConnection = "hostRejectedConnection",
    setCurrentItem = "setCurrentItem"
}
//implemented setCurrentItem for both client and station
//this should be seperated into two tytpes of sharedRemotes
//considering some are only for 2 types instead of all

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
    boilingStation = "boilingStation",
    fryingStation = "fryingStation",
    dicingStation = "dicingStation",
    submitStation = "submitStation",
    steamingStation = "steamingStation",
    blendingStation = "blendingStation",
}

enum foods {
    uncookedEgg = "uncookedEgg",
    boiledEgg = "boiledEgg",
    friedEgg = "friedEgg",
    scrambledEgg = "scrambledEgg",
    batter = "batter",
    shrimp = "shrimp",
    chicken = "chicken",
    onion = "onion",
    batteredShrimp = "batteredShrimp",
    batteredChicken = "batteredChicken",
    batteredOnion = "batteredOnion",
    friedShrimp = "friedShrimp",
    friedChicken = "friedChicken",
    friedOnion = "friedOnion",
    dough = "dough",
    doughnut = "doughnut",
    bread = "bread",
    toast = "toast",
    crossiant = "crossiant", //idk what to implement for this
    milk = "milk",
    warmMilk = "warmMilk",
    banana = "banana",
    apple = "apple",
    orange = "orange",
    watermelon = "watermelon",
    dicedBanana = "dicedBanana",
    dicedApple = "dicedApple",
    dicedOrange = "dicedOrange",
    dicedWatermelon = "dicedWatermelon",
    dicedFruit = "dicedFruit",
    lettuce = "lettuce",
    fish = "fish",
    steamedFish = "steamedFish",
    rice = "rice",
    steamedRice = "steamedRice",
    potato = "potato",
    steamedPotato = "steamedPotato",
    fruitSalad = "fruitSalad",
    smoothie = "smoothie",
}

enum methods {
    boil = "boil",
    fry = "fry",
    combine = "combine",
    dice = "dice",
    steam = "steam",
    blend = "blend",
    submit = "submit",
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