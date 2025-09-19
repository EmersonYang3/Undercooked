import type { food, Food, order } from "./types";

const foods:Record<Food, food> = { 
    "curry": {
        foodName:"curry",
        requiredIngredients: ["fruits"],
        quality:0,
    },
    "british_meal": {
        foodName:"bacon_eggs",
        requiredIngredients: ["bacon", "bacon", "egg", "egg", "sausage"],
        quality:0,
    },
    "rice": {
        foodName: "rice",
        requiredIngredients: ["raw_rice"],
        quality: 0,
    },
}
//could use an object instead of an array for requiredIngreidients 
//would improve readability and make checking faster



//for the display timer thingie the quality is gonna be default 0 qual
// ity is calculated at the end when the ingreidients required to assembl the
//  food is acquired and put in hte rgespective area to do so
