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

    newRecipe = "newRecipe",
    recipeFinished = "recipeFinished",
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
    omelette = "omelette",
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
    crossiant = "crossiant",
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
export const FoodSet = new Set<string>(Object.values(foods));

export function isFood(value: unknown): value is foods {
    return typeof value === "string" && FoodSet.has(value);
}

export enum methods {
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
    foods,
    isFood,
}

export { stationTypes }