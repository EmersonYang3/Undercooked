import sharedEnums from "../enums"
import type { internalFoodData } from "../types"

const foods = sharedEnums.foods
const methods = sharedEnums.methods

export const foodData: Record<string, internalFoodData> = {
    [foods.uncookedEgg]: {
        name: "Uncooked Egg",
        methods: {
            [methods.boil]: foods.boiledEgg,
            [methods.fry]: foods.friedEgg,
            [methods.blend]: foods.scrambledEgg,
        },
        considerAsRecipe: false,
        requiredItems: [],
    },
    [foods.boiledEgg]: {
        name: "Boiled Egg",
        methods: {},
        considerAsRecipe: true,
        requiredItems: [foods.uncookedEgg],
    },
    [foods.friedEgg]: {
        name: "Fried Egg",
        methods: {},
        considerAsRecipe: true,
        requiredItems: [foods.uncookedEgg],
    },
    [foods.scrambledEgg]: {
        name: "Scrambled Egg",
        methods: {
            [methods.fry]: foods.omelette,
        },
        considerAsRecipe: true,
        requiredItems: [foods.uncookedEgg, foods.onion],
    },
    [foods.omelette]: {
        name: "Omelette",
        methods: {},
        considerAsRecipe: true,
        requiredItems: [foods.scrambledEgg],
    },
    [foods.dicedFruit]: {
        name: "Diced Fruit Mix",
        methods: {
            [methods.blend]: foods.smoothie,
        },
        considerAsRecipe: false,
        requiredItems: [foods.dicedBanana, foods.dicedApple, foods.dicedOrange, foods.dicedWatermelon],
    },
    [foods.fruitSalad]: {
        name: "Fruit Salad",
        methods: {},
        considerAsRecipe: true,
        requiredItems: [foods.dicedBanana, foods.dicedApple, foods.dicedOrange, foods.dicedWatermelon],
    },
    [foods.smoothie]: {
        name: "Smoothie",
        methods: {},
        considerAsRecipe: true,
        requiredItems: [foods.dicedFruit],
    },
}

export default { foodData }