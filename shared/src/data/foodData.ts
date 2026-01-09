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

    [foods.bread]: {
        name: "Bread",
        methods: {
            [methods.fry]: foods.toast,
        },
        considerAsRecipe: false,
        requiredItems: [],
    },

    [foods.toast]: {
        name: "Toast",
        methods: {

        },
        considerAsRecipe: true,
        requiredItems: [foods.bread],
    },
    [foods.jamToast]: {
        name: "Jam Toast",
        methods: {},
        considerAsRecipe: true,
        requiredItems: [foods.toast, foods.jam],
    },

    [foods.eggToast]: {
        name: "Egg Toast",
        methods: {},
        considerAsRecipe: true,
        requiredItems: [foods.toast, foods.friedEgg],
    },

    [foods.carrotStew]: {
        name: "Carrot Stew",
        methods: {},
        considerAsRecipe: true,
        requiredItems: [foods.carrot, foods.water],
    },

    [foods.tomatoStew]: {
        name: "Tomato Stew",
        methods: {},
        considerAsRecipe: true,
        requiredItems: [foods.tomato, foods.water],
    },

    [foods.mushroomStew]: {
        name: "Mushroom Stew",
        methods: {},
        considerAsRecipe: true,
        requiredItems: [foods.mushroom, foods.water],
    },

    [foods.pumpkinSoup]: {
        name: "Pumpkin Soup",
        methods: {},
        considerAsRecipe: true,
        requiredItems: [foods.pumpkin, foods.water],
    },

    [foods.croissant]: {
        name: "Croissant",
        methods: {},
        considerAsRecipe: true,
        requiredItems: [foods.dough, foods.butter],
    },

    [foods.chocolateCroissant]: {
        name: "Chocolate Croissant",
        methods: {},
        considerAsRecipe: true,
        requiredItems: [foods.croissant, foods.chocolate],
    },

    [foods.jamDoughnut]: {
        name: "Jam Doughnut",
        methods: {},
        considerAsRecipe: true,
        requiredItems: [foods.dough, foods.jam],
    },

    [foods.coffee]: {
        name: "Coffee",
        methods: {},
        considerAsRecipe: true,
        requiredItems: [foods.coffeeBeans, foods.water],
    },

    [foods.tea]: {
        name: "Tea",
        methods: {},
        considerAsRecipe: true,
        requiredItems: [foods.teaLeaves, foods.water],
    },

    [foods.milkAndCookies]: {
        name: "Milk & Cookies",
        methods: {},
        considerAsRecipe: true,
        requiredItems: [foods.milk, foods.cookie],
    },
}

export default foodData