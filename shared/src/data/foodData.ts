import sharedEnums from "../enums"
import type { internalFoodData } from "../types"

const foods = sharedEnums.foods
const methods = sharedEnums.methods

const foodData: Record<string, internalFoodData> = {
    [foods.uncookedEgg]: {
        name: "Uncooked Egg",
        methods: { [methods.boil]: foods.boiledEgg },
        combinations: {},
        couldBeActiveRecipe: false
    },

    [foods.boiledEgg]: {
        name: "Boiled Egg",
        methods: {},
        combinations: {},
        couldBeActiveRecipe: true
    }
}

export default foodData