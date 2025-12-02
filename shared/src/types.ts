export type uniqueIdentifier = number

export type intendedRoles = 'host' | 'client' | 'station'
export type availableStations = 'empty'

export type handshakeData = {
    intendedRole: intendedRoles,
    lobbyCode?: string
}

export type availableMethods = 'boil'

export type foodItem = {
    name: string,
    quality: number,

    methods: Record<availableMethods, string>,
    combinations: Record<string, string>,

    id: uniqueIdentifier,
}

export type activeRecipe = {
    targetFoodItem: string,
    timeRemaining: number
}

export type stationData = {
    stationType: availableStations,
    currentFoodItem?: foodItem
}

export type playerData = {
    currentPoints: number,
    currentlyHeldItem?: foodItem 
}