import { activeRecipe, uniqueIdentifier } from "@shared/types";
import { defineStore } from "pinia";
import { Reactive, reactive } from "vue";

export const useRecipeStore = defineStore("recipes", () => {
    const recipes = reactive<Map<uniqueIdentifier, activeRecipe>>(new Map());
    function addRecipe(newRecipes: activeRecipe) {
        recipes.set(newRecipes.id, newRecipes);
    }
    function removeRecipe(id: uniqueIdentifier) {
        recipes.delete(id);
    }
    function getRecipes(): Reactive<Map<uniqueIdentifier, activeRecipe>> {
        return recipes;
    }
    return { addRecipe, removeRecipe, getRecipes }
})
