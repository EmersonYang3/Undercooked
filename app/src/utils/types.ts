type TerminalName =
      "oven"
    | "stove"
    | "chop"
    | "cook"
    | "boil"
    | "gather"
    | "serve";

type food = {
    foodName: string,
    requiredIngredients: [string],
    quality: number,
}
type ingredient = {
    ingredientName: string,
    methods: Record<string, string>,
    quality: number
}
type player = {
    heldItem: string | null
}
type order = {
    foodName: string,
    expiration: number
}
type stationTerminal = {
    terminalName: TerminalName,
    onStation: ingredient | food | null
}

type coreTrackedDrata = {
    currentOrders: [order],
    orderProgress: { completed: number, failed: number },
    players: Record<string, player>
}
//prob use a map for the records instead 