enum hostToServerRemotes {
    startLobby = "startLobby",
    acceptClientJoin = "acceptClientJoin",
    acceptStationJoin = "acceptStationJoin",
    rejectPlayerJoin = "recjectPlayerJoin",
    rejectStationJoin = "rejectStationJoin",
    ping = "ping",
}

enum serverToHostRemotes {
    lobbyStarted = "lobbyStarted",
    clientPendingJoin = "clientPendingJoin",
    stationPendingJoin = "stationPendingJoin",
    newClientJoined = "newClientJoined",
    newStationJoined = "newStationJoined",

    newRecipe = "newRecipe",
    recipeFinished = "recipeFinished",
    scoreUpdate = "scoreUpdate",
    wrongItem = "wrongItem",

    GAME_STARTED = "gameStarted",

    pong = "pong",
}

enum serverToClientRemotes {
    pendingJoin = "pendingJoin",
    clientAccepted = "clientAccepted",
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
    hostAlreadyExists = "A host with a lobby already exists. Only a single lobby and host allowed at a time. Restart the backend server to destroy existing lobby",
    otherConnectionsFailed = "No lobby with provided code exists."
}

enum stationTypes {
    emptyStation = "emptyStation",
    boilingStation = "boilingStation",
    fryingStation = "fryingStation",
    dicingStation = "dicingStation",
    submitStation = "submitStation",
    steamingStation = "steamingStation",
    blendingStation = "blendingStation",
    dispenseStation = "dispenseStation",
    disposeStation = "disposalStation",
}

enum staticStations {
    emptyStation = "emptyStation",
    dispenseStation = "dispenseStation",
    disposeStation = "disposalStation",
    submitStation = "submitStation",
    steamingStation = "steamingStation",
    blendingStation = "blendingStation",
}
enum dynamicStations {
    boilingStation = "boilingStation",
    fryingStation = "fryingStation",
    dicingStation = "dicingStation",
}



enum foods {
    uncookedEgg = "uncookedEgg",
    boiledEgg = "boiledEgg",
    friedEgg = "friedEgg",
    scrambledEgg = "scrambledEgg",
    omelette = "omelette",

    dicedBanana = "dicedBanana",
    dicedApple = "dicedApple",
    dicedOrange = "dicedOrange",
    dicedWatermelon = "dicedWatermelon",
    dicedFruit = "dicedFruit",
    fruitSalad = "fruitSalad",
    smoothie = "smoothie",

    bread = "bread",
    toast = "toast",
    jam = "jam",
    cheese = "cheese",
    butter = "butter",
    dough = "dough",
    chocolate = "chocolate",
    milk = "milk",
    cookie = "cookie",
    water = "water",

    jamToast = "jamToast",
    cheeseToast = "cheeseToast",
    eggToast = "eggToast",
    baconToast = "baconToast",
    avocadoToast = "avocadoToast",
    pbjToast = "pbjToast",

    meatballs = "meatballs",

    carrot = "carrot",
    tomato = "tomato",
    mushroom = "mushroom",
    pumpkin = "pumpkin",
    onion = "onion",

    carrotStew = "carrotStew",
    tomatoStew = "tomatoStew",
    mushroomStew = "mushroomStew",
    pumpkinSoup = "pumpkinSoup",

    croissant = "croissant",
    chocolateCroissant = "chocolateCroissant",
    jamDoughnut = "jamDoughnut",
    pistachioDoughnut = "pistachioDoughnut",
    strawberryDoughnut = "strawberryDoughnut",
    strawberryCake = "strawberryCake",

    coffeeBeans = "coffeeBeans",
    teaLeaves = "teaLeaves",
    coffee = "coffee",
    tea = "tea",

    burger = "burger",
    milkAndCookies = "milkAndCookies",
}

enum methods {
    boil = "boil",
    fry = "fry",
    dice = "dice",
    steam = "steam",
    blend = "blend",
    submit = "submit",
    disposal = "disposal",
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
    staticStations,
    dynamicStations,
    methods,
    foods,
}