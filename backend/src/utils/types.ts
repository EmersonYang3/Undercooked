export type role = 'host' | 'player' | 'terminal'
export type methods = 'chop' | 'boil' | 'fry' | 'bake' | 'mix' | 'slice' | 'dissolve'
export type terminalNames = 'choppingBoard' | 'stove' | 'oven' | 'mixingBowl' | 'cuttingStation' | 'sink'

export interface handshakeData {
    targetLobbyCode: string,
    intendedRole: role,
}

export type host = {
    socketId: string,
}

export type recipe = {
    id: string,
    name: string,

    requiredIngredients: string[],
    quality: number
}

export type ingredient = {
    id: string,
    name: string,

    availableMethods: Record<methods, ingredient | recipe>,
    quality: number
}

export type player = {
    currentlyHolding: ingredient | recipe | null,
    specialKey: string,
    socketId: string,
}

export type timedRecipe = {
    id: string,
    name: string,

    requiredIngredients: string[],
    
    lifetimeLeft: number,
    totalLifetime: number
}

export type terminal = {
    socketId: string,
    terminalName: terminalNames,
    currentItem: ingredient | recipe | null,
    progress: number
}

export type Lobby = {
    host: host,
    lobbyCode: string,

    activeRecipes: timedRecipe[],

    terminals: terminal[]
    players: player[],

    creationTime: string
}