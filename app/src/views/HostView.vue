<!--
    Host View, this will display the current code (if in loading mode) or the active recipes and game logic
-->
<template>
    <div class="bg-black w-screen h-screen">
        <div>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { BasicIngredients } from '@/utils/ingredients';
import { CookedIngredients } from '@/utils/ingredients';
import { PossibleMeals } from '@/utils/ingredients';
import { Meal } from '@/utils/ingredients';
import { recipes } from '@/utils/ingredients';
const amounts_of_meals = 5;
const current_meals =  new Map();
function start_loop() {
    for(let i  = 0; i < amounts_of_meals; i++ ) {
        let recipe = select_recipes();
        current_meals.set("recipe",)
    }    


    requestAnimationFrame(update);
    //this is the jmain
    //determine the max possible recipes that can be made
}
function update() {
    requestAnimationFrame(update);
}


function determine_possible_recipes() {

}



function select_recipes() {
    const random_index = Math.floor(Math.random() * recipes.size);
    const random_item = recipes.entries[random_index];
    return random_item;
}




function submit_ingredient_to_meal(meal_name: PossibleMeals, ingredient: Ingredient): number {
    //do a check with a
    const meal = currentMeals.get(meal_name);
    if (!meal.ingredients.includes(ingredient.name)) {
        communicate_client()
        //return that the ingredient cannot be submitted to it
        return;
    };
    meal.quality += ingredient.quality;
    const index = meal.ingredients.indexOf(ingredient.name);
    meal.ingredients.splice(index, 1);
    //remove the ingredient from valid ingredients to be used
    if (meal.ingredients.length == 0) {

        return meal.quality / meal.max_quality;
    };
}
function communicate_terminal() {
    //this is just a plaeholder
}
function communicate_client(data:any) {
    //this is just a plaeholder
    JSON.stringify(data);
    //do some socket stuff 
}




</script>

<style scoped>

</style>