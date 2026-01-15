export type uniqueIdentifier = number

export type intendedRoles = 'host' | 'client' | 'station'

export type handshakeData = {
    intendedRole: intendedRoles,
    lobbyCode?: string
}

export type internalFoodData = {
    name: string;
    methods: Record<string, string>;
    considerAsRecipe: boolean;
    requiredItems: string[];
}

export type foodItem = {
    name: string,
    id: uniqueIdentifier,
    quality: number,
}

export type holdableItem = {
    foodItems: foodItem[];
    isPlated: boolean;
}

export type internalStationData = {
    method?: string,
    dispensingItem?: string
}

export type activeRecipe = {
    targetFoodItem: string,
    timeRemaining: number,
    id: uniqueIdentifier,
}

export type stationData = {
    stationType: string,
    currentlyHeldItem: holdableItem,
}

export type playerData = {
    currentPoints: number,
    currentlyHeldItem: holdableItem,
}

export type FoodId = string;