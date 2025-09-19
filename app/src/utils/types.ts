export type TerminalName = "oven" | "stove" | "chop" | "cook" | "boil" | "gather" | "serve" | "holding";
export type Ingredients =  "fruits" | "bacon" | "egg" | "sausage" | "potato" | "carrot"; 
export type Methods = "fry" | "flip" | "boil" | "chop" | "mash" | "peel" 
//fruits is currently a placeholder waiting for assets 
export type food = {
    foodName: string,
    requiredIngredients: [string],
    quality: number,
}

export type ingredient_info = {
    ingredientName: Ingredients,
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
    onStation: ingredient_info | food | null
}

export type coreTrackedData = {
    currentOrders: [order],
    orderProgress: { completed: number, failed: number },
    playerPorts: Record<string, player>,
}
export type Timer = {
    IngredientName: Ingredients,
    time_remaining: number,
    cook_time: number, 
    id:number,
    asset:string
}//for v-for to ensure proper indentification due to possible clashing ingredient Name