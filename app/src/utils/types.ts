export type TerminalName = "oven" | "stove" | "chop" | "cook" | "boil" | "gather" | "serve" | "holding";

export type food = {
    foodName: string,
    requiredIngredients: [string],
    quality: number,
}

export type ingredient = {
    ingredientName: string,
    methods: [string],
    quality: number
}

export type player = {
    heldItem: string | null,
    score: number
}

export type order = {
    foodName: string,
    expiration: number
}

export type stationTerminal = {
    terminalName: TerminalName,
    onStation: ingredient | food | null
}

export type coreTrackedData = {
    currentOrders: [order],
    orderProgress: { completed: number, failed: number },
    playerPorts: Record<string, player>,
}