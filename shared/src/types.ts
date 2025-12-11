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
}

export type foodItem = {
    name: string,
    id: uniqueIdentifier,
    quality: number,
}

export type internalStationData = {
    method: string
}

export type activeRecipe = {
    targetFoodItem: string,
    timeRemaining: number
}

export type stationData = {
    stationType: string,
    currentFoodItem?: foodItem
}

export type playerData = {
    currentPoints: number,
    currentlyHeldItem?: foodItem
}