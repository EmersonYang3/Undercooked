import sharedEnums, { stationTypes } from "./enums";

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
    method: string
}

export type activeRecipe = {
    targetFoodItem: string,
    timeRemaining: number
}

export type stationData = {
    stationType: stationTypes,
    currentlyHeldItem: holdableItem,
}

export type playerData = {
    currentPoints: number,
    currentlyHeldItem: holdableItem,
}

export type FoodId = string;