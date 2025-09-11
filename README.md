# Undercooked - ideas

## Terminals - things that will stream from and to

1. Projector Terminal - handles core game data like player positions and is the source of truth for all clients
2. Station Terminals - acts as a preperation station, ingredient station, or empty station for items in overcooked
3. Player Terminals - the phones that people use, it should display the currently held item, action, and the secret key

## A list of potential types/classes used for the game

```lua
export type food = {
    foodName: string,
    requiredIngredients: {[string]},
    quality: number
}

export type ingredient = {
    ingredientName: string,
    methods: {[string]: string},
    quality: number
}

export type player = {
    heldItem: string | nil,
}

export type order = {
    foodName: string,
    expiration: number
}

export type stationTerminal = {
    terminalName: string,
    onStation: ingredient | food | nil,
    terminalType: string
}

export type coreTrackedData = {
    currentOrders: {order},
    orderProgress: {completed: number, failed: number},
    players = {[string]: player}
}
```
ligma 