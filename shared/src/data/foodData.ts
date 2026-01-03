import sharedEnums from "../enums"
import type { internalFoodData } from "../types"

const foods = sharedEnums.foods
const methods = sharedEnums.methods

const foodData: Record<string, internalFoodData> = {
    [foods.uncookedEgg]: {
        name: "Uncooked Egg",
        methods: {
            [methods.boil]: foods.boiledEgg,
            [methods.fry]: foods.friedEgg,
            [methods.combine]: foods.scrambledEgg,
        },
        combinations: {},
        couldBeActiveRecipe: false,
    },

    [foods.boiledEgg]: {
        name: "Boiled Egg",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: true,
        requiredIngredients: [foods.uncookedEgg],
    },

    [foods.friedEgg]: {
        name: "Fried Egg",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: true,
        requiredIngredients: [foods.uncookedEgg],
    },

    [foods.scrambledEgg]: {
        name: "Scrambled Egg",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: true,
        requiredIngredients: [foods.uncookedEgg],
    },

    [foods.batter]: {
        name: "Batter",
        methods: {},
        combinations: {
            shrimp: foods.batteredShrimp,
            chicken: foods.batteredChicken,
            onion: foods.batteredOnion,
        },
        couldBeActiveRecipe: false,
    },

    [foods.batteredShrimp]: {
        name: "Battered Shrimp",
        methods: { [methods.fry]: foods.friedShrimp },
        combinations: {},
        couldBeActiveRecipe: true,
        requiredIngredients: [foods.batter, foods.shrimp],
    },

    [foods.batteredChicken]: {
        name: "Battered Chicken",
        methods: { [methods.fry]: foods.friedChicken },
        combinations: {},
        couldBeActiveRecipe: true,
        requiredIngredients: [foods.batter, foods.chicken],
    },

    [foods.batteredOnion]: {
        name: "Battered Onion",
        methods: { [methods.fry]: foods.friedOnion },
        combinations: {},
        couldBeActiveRecipe: true,
        requiredIngredients: [foods.batter, foods.onion],
    },

    [foods.friedShrimp]: {
        name: "Fried Shrimp",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: true,
        requiredIngredients: [foods.batteredShrimp],
    },

    [foods.friedChicken]: {
        name: "Fried Chicken",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: true,
        requiredIngredients: [foods.batteredChicken],
    },

    [foods.friedOnion]: {
        name: "Fried Onion",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: true,
        requiredIngredients: [foods.batteredOnion],
    },

    [foods.dough]: {
        name: "Dough",
        methods: {
            [methods.fry]: foods.doughnut,
        },
        combinations: {},
        couldBeActiveRecipe: false,
    },

    [foods.doughnut]: {
        name: "Doughnut",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: true,
        requiredIngredients: [foods.dough],
    },
    [foods.bread]: {
        name: "Bread",
        methods: { [methods.fry]: foods.toast },
        combinations: {},
        couldBeActiveRecipe: true,
    },
    [foods.toast]: {
        name: "Toast",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: true,
        requiredIngredients: [foods.bread],
    },
    [foods.crossiant]: {
        name: "Croissant",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: false,
    },
    [foods.milk]: {
        name: "Milk",
        methods: { [methods.boil]: foods.warmMilk },
        combinations: {
            banana: foods.smoothie,
            apple: foods.smoothie,
        },
        couldBeActiveRecipe: false,
    },

    [foods.warmMilk]: {
        name: "Warm Milk",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: true,
    },
    [foods.banana]: {
        name: "Banana",
        methods: { [methods.dice]: foods.dicedBanana },
        combinations: {},
        couldBeActiveRecipe: false,
    },

    [foods.apple]: {
        name: "Apple",
        methods: { [methods.dice]: foods.dicedApple },
        combinations: {},
        couldBeActiveRecipe: false,
    },

    [foods.orange]: {
        name: "Orange",
        methods: { [methods.dice]: foods.dicedOrange },
        combinations: {},
        couldBeActiveRecipe: false,
    },

    [foods.watermelon]: {
        name: "Watermelon",
        methods: { [methods.dice]: foods.dicedWatermelon },
        combinations: {},
        couldBeActiveRecipe: false,
    },

    [foods.dicedBanana]: {
        name: "Diced Banana",
        methods: {},
        combinations: { milk: foods.smoothie },
        couldBeActiveRecipe: false,
    },
    [foods.dicedApple]: {
        name: "Diced Apple",
        methods: {},
        combinations: { milk: foods.smoothie },
        couldBeActiveRecipe: false,
    },
    [foods.dicedOrange]: {
        name: "Diced Orange",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: false,
    },
    [foods.dicedWatermelon]: {
        name: "Diced Watermelon",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: false,
    },
    [foods.dicedFruit]: {
        name: "Mixed Fruit",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: false,
    },

    [foods.lettuce]: {
        name: "Lettuce",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: false,
    },

    [foods.fish]: {
        name: "Raw Fish",
        methods: { [methods.steam]: foods.steamedFish },
        combinations: {},
        couldBeActiveRecipe: false,
    },

    [foods.steamedFish]: {
        name: "Steamed Fish",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: true,
        requiredIngredients: [foods.fish],
    },

    [foods.rice]: {
        name: "Rice",
        methods: { [methods.steam]: foods.steamedRice },
        combinations: {},
        couldBeActiveRecipe: false,
    },

    [foods.steamedRice]: {
        name: "Steamed Rice",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: true,
        requiredIngredients: [foods.rice],
    },

    [foods.potato]: {
        name: "Potato",
        methods: { [methods.steam]: foods.steamedPotato },
        combinations: {},
        couldBeActiveRecipe: false,
    },

    [foods.steamedPotato]: {
        name: "Steamed Potato",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: true,
        requiredIngredients: [foods.potato],
    },

    [foods.fruitSalad]: {
        name: "Fruit Salad",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: true,
        requiredIngredients: [
            foods.dicedApple,
            foods.dicedBanana,
            foods.dicedOrange,
        ],
    },

    [foods.smoothie]: {
        name: "Smoothie",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: true,
        requiredIngredients: [foods.milk, foods.dicedBanana],
    },
};


export default foodData