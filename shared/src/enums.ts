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

    //events related to gameState
    newRecipe = "newRecipe",
    recipeFinished = "recipeFinished",
    scoreUpdate = "scoreUpdate",
    wrongItem = "wrongItem",
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

enum foods {
    // EGGS
    uncookedEgg = "uncookedEgg",
    boiledEgg = "boiledEgg",
    friedEgg = "friedEgg",
    scrambledEgg = "scrambledEgg",
    omelette = "omelette",

    // FRUIT
    dicedBanana = "dicedBanana",
    dicedApple = "dicedApple",
    dicedOrange = "dicedOrange",
    dicedWatermelon = "dicedWatermelon",
    dicedFruit = "dicedFruit",
    fruitSalad = "fruitSalad",
    smoothie = "smoothie",

    // BASE ITEMS
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

    // TOAST VARIANTS
    jamToast = "jamToast",
    cheeseToast = "cheeseToast",
    eggToast = "eggToast",
    baconToast = "baconToast",
    avocadoToast = "avocadoToast",
    pbjToast = "pbjToast",

    // MEALS
    meatballs = "meatballs",

    // VEGETABLES
    carrot = "carrot",
    tomato = "tomato",
    mushroom = "mushroom",
    pumpkin = "pumpkin",
    onion = "onion",

    // STEWS / SOUPS
    carrotStew = "carrotStew",
    tomatoStew = "tomatoStew",
    mushroomStew = "mushroomStew",
    pumpkinSoup = "pumpkinSoup",

    // BAKED GOODS
    croissant = "croissant",
    chocolateCroissant = "chocolateCroissant",
    jamDoughnut = "jamDoughnut",
    pistachioDoughnut = "pistachioDoughnut",
    strawberryDoughnut = "strawberryDoughnut",
    strawberryCake = "strawberryCake",

    // DRINKS
    coffeeBeans = "coffeeBeans",
    teaLeaves = "teaLeaves",
    coffee = "coffee",
    tea = "tea",

    // MISC
    burger = "burger",
    milkAndCookies = "milkAndCookies",
}


enum FoodImageKey {
    AvocadoToast = "avocado_toast",
    BaconToast = "bacon_toast",
    Burger = "burger",
    CarrotStew = "carrot_stew",
    Cheese = "cheese",
    ChocolateCroissant = "chocolate_croissant",
    ChocolateDoughnut = "chocolate_doughnut",
    Croissant = "croissant",
    Coffee = "coffee",
    Tea = "tea",
    EggToast = "egg_toast",
    EmptyBowl1 = "empty_bowl_1",
    EmptyBowl2 = "empty_bowl_2",
    EmptyCup1 = "empty_cup_1",
    EmptyCup2 = "empty_cup_2",
    JamDoughnut = "jam_doughnut",
    JamPastry = "jam_pastry",
    JamToast = "jam_toast",
    Meatballs = "meatballs",
    MilkAndCookies = "milk_and_cookies",
    MushroomStew = "mushroom_stew",
    PBJToast = "pbj_toast",
    PistachioDoughnut = "pistachio_doughnut",
    PumpkinSoup = "pumpkin_soup",
    StrawberryCake = "strawberry_cake",
    StrawberryDoughnut = "strawberry_doughnut",
    Toast = "toast",
    TomatoStew = "tomato_stew",
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
    methods,
    foods,
    isFood,
}

export { stationTypes }