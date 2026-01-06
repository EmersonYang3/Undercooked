import sharedEnums from "./enums";
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
export type stationTypes = "boilStation" | "fryStation" | "disposal" | "none" | "submit" | "dispenser";
export type internalStationData = {
    method: string
}

export type activeRecipe = {
    targetFoodItem: string,
    timeRemaining: number,
    id: uniqueIdentifier
}

export type plate = {
    foodItem: foodItem,
}

export type stationData = {
    stationType: stationTypes,
    isHoldingPlate: boolean,
    currentlyHeldItem?: foodItem | plate
}

export type playerData = {
    currentPoints: number,
    isHoldingPlate: boolean,
    currentlyHeldItem?: foodItem | plate
}
export type FoodId = string;
enum methods {
    boil = "boil",
    fry = "fry",
    combine = "combine",
    dice = "dice",
    steam = "steam",
    blend = "blend",
    submit = "submit",
}
export type MethodId = `${methods}`;
export interface Recipe {
    name: string;
    inputs: FoodId[],
    method: MethodId;
    output: FoodId;
}
export type InternalFoodData = {
    id: uniqueIdentifier,
    time_remaining: number,
    recipe_name: string,
}