export type uniqueIdentifier = number

export type intendedRoles = 'host' | 'client' | 'station'

export type handshakeData = {
    intendedRole: intendedRoles,
    lobbyCode?: string
}
type Method = string;
type Food = string;

export type internalFoodData = {
    name: string,
    methods: Record<string, string>,
    combinations: Record<string, string>,
    couldBeActiveRecipe: boolean,
    requiredIngredients?: string[]
}

export type foodItem = {
    name: string,
    id: uniqueIdentifier,
    quality: number,
}
export type stationTypes = "boilStation" | "none" | "smth else"
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
    currentlyHeldItem?: foodItem | plate
}

export type playerData = {
    currentPoints: number,
    isHoldingPlate: boolean,
    currentlyHeldItem?: foodItem | plate
}