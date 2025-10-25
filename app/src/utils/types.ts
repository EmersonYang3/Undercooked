export type TerminalName = "oven" | "stove" | "chop" | "cook" | "boil" | "gather" | "serve" | "holding";
export type Ingredients =
    | "fruits"
    | "bacon"
    | "egg"
    | "sausage"
    | "potato"
    | "carrot"
    | "curry_cubes"
    | "raw_rice"
    | "chicken"
    | "tomato"
    | "lettuce"
    | "bread"
    | "cheese"
    | "onion"
    | "flour"
    | "butter"
    | "milk"
    | "salt"
    | "pepper"
    | "" // placeholder slots if needed

export type Methods = "fry" | "flip" | "boil" | "chop" | "mash" | "peel";
export type Food = "curry" | "british_meal" | "rice" | "fried_chicken" | "";


//might have to do smth where theres like intermediary steps cuz for chicken you gotta batter it and then fry it 
//otherwise we could remove it from the list



//sink for washing the ingreidients 
//most ingreidients should be grabbed from the fridge area 
//idk how we gonna do the fridge cuz we have to have a system to show where each item is it grab from


//the sink should be used to wash stuff or add water unless we don't want to add that (might be too annoying to implement) 

//basic idea for having the clients hold item
//clients have a key thats unique to them
//when at a terminal they can pick that key to communicate that they want to move the item from the terminal to their phone



//fruits is currently a placeholder waiting for assets 
export type food = {
    foodName: string,
    requiredIngredients: Array<string>,
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
    expiration: number,
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
    id: number,
    asset: string
}//for v-for to ensure proper indentification due to possible clashing ingredient Name
//possibly limit the amount of recipes served based off ot the total amount of statiwon temrinals able to perform an action
//make sure that the requirement is atleast 3 terminals to avoid boring gameplay
//


export type MethodsArray = Array<Methods>

export type InventoryItem = {
    id: number,
    name: string,
    quantity: number,
    methods: MethodsArray
}
export type TimedItem = {
    remaining_time: number,
    id: number,
    status: boolean,
    LUT_KEY: string,
}









//id = slot number???
//