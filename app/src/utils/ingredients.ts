//this file specifies the file paths for images for the respective ingredients
//could make a dedicated assets file and then make this file just something that holds methods and whatnot
//would prevent accessing unneeded information not relevant

import { ingredient, food, Ingredients } from "./types";
const ingredients:Record<Ingredients, ingredient>  = {
    "bacon" : {
        ingredientName:"bacon",
        methods: []
    }
}

