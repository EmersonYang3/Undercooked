export type uniqueIdentifier = number

export type intendedRoles = 'host' | 'client' | 'station'

export type handshakeData = {
    intendedRole: intendedRoles,
    lobbyCode?: string
}

export type internalFoodData = {
    name: string,

    methods: Record<string, string>,
    combinations: Record<string, string>,
    couldBeActiveRecipe: boolean,
}

export type foodItem = internalFoodData & {
    quality: number,
    id: uniqueIdentifier,
}

export type internalStationData = {
    method: string
}

export type activeRecipe = {
    targetFoodItem: string,
    timeRemaining: number
}

export type plate = {
    foodItem: foodItem,
}

export type stationData = {
    stationType: string,
    isHoldingPlate: boolean,
    currentFoodItem?: foodItem | plate
}

export type playerData = {
    currentPoints: number,
    isHoldingPlate: boolean,
    currentlyHeldItem?: foodItem | plate
}