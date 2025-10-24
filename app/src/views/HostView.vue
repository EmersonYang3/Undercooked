<!--
    Host View, this will display the current code (if in loading mode) or the active recipes and game logic
-->
<template>
  <!-- set the background here if we wanna do a map of the players -->
  <div>

  </div>
  <div class="bg-black w-screen min-h-screen flex flex-wrap justify-center items-start gap-4">
    
    <div
      v-for="[key, value] in current_meals"
      :key="key"
      class="z-10 text-xs text-black bg-white rounded-t-xl shadow-lg overflow-hidden flex flex-col"
    >
      <!-- Meal header -->
      <div class="bg-red-600 text-center text-white text-sm font-bold p-2 rounded-t-xl">
        {{ value[0]}}
      </div>
      
      <!-- Ingredients section -->
      <div class="flex flex-wrap justify-center p-2 gap-2">
        <div class="w-full h-8">
          <div class="bg-green-500 h-4"
          :style="
          {
            width: progressPx + '%'
          }">
          <!-- switch progressPx to the reactiveTable -->
          </div>
          <!-- put da timer here -->
        </div>  
        <div class="w-full bg-blue-100 h-16">
          <!-- put fully assembled ingredient here -->
        </div>
        <div
          v-for="(item, index) in value[1].ingredients"
          :key="index"
          class="bg-gray-100 text-black text-xs font-semibold w-12 h-12 flex items-center justify-center rounded-full shadow-sm"
        >

          <!-- no text just the asset to avoid clutter -->
          <!-- should probably try and condense the ingredients via  acounter in the bottom of the asset -->
          <img :src="ImageLut['apple']">
        </div>
      </div>
    </div>
    
    <div>


      <!-- switches to another screen that displays player stats or other stuff thats important -->


    </div>
  </div>
</template>


<script setup lang="ts">
import { ImageLut } from '@/utils/lut';


import { BasicIngredients } from '@/utils/ingredients';
import { CookedIngredients } from '@/utils/ingredients';
import { PossibleMeals } from '@/utils/ingredients';
import { Meal } from '@/utils/ingredients';
import { onMounted, reactive, ref } from 'vue';
const amounts_of_meals = 10;
const current_meals =  reactive(new Map());
const progressPx = ref(100);
//for each new item attach a timer object to it

function start_loop() {
    for(let i  = 0; i < amounts_of_meals; i++ ) {
        const recipe = select_recipes();
        const name =  recipe[0];
        //could do0 some stirng cleaning here to make it look better
        current_meals.set(`recipe_${i}`, recipe);
        
    }    
    requestAnimationFrame(update);
    //this is the jmain
    //determine the max possible recipes that can be made
}
onMounted(()=>{
    start_loop();
})
function update() {
    requestAnimationFrame(update);
}
const recipes: Map<string, Meal> = new Map([
  [
    "british_meal",
    {
      id: 0,
      ingredients: ["cooked_egg"],
      quality: 0,
      max_quality: 1,
    },
  ],
  [
    "italian_pasta",
    {
      id: 1,
      ingredients: ["noodles", "tomato_sauce", "parmesan"],
      quality: 2,
      max_quality: 5,
    },
  ],
  [
    "japanese_sushi",
    {
      id: 2,
      ingredients: ["rice", "fish", "seaweed"],
      quality: 4,
      max_quality: 5,
    },
  ],
  [
    "mexican_taco",
    {
      id: 3,
      ingredients: ["tortilla", "beef", "lettuce", "cheese"],
      quality: 3,
      max_quality: 5,
    },
  ],
  [
    "french_crepe",
    {
      id: 4,
      ingredients: ["flour", "milk", "egg", "sugar"],
      quality: 1,
      max_quality: 5,
    },
  ],
  [
    "american_burger",
    {
      id: 5,
      ingredients: ["bun", "beef_patty", "lettuce", "cheddar"],
      quality: 3,
      max_quality: 5,
    },
  ],
  [
    "indian_curry",
    {
      id: 6,
      ingredients: ["chicken", "curry_powder", "coconut_milk"],
      quality: 4,
      max_quality: 5,
    },
  ],
  [
    "chinese_noodles",
    {
      id: 7,
      ingredients: ["noodles", "soy_sauce", "vegetables"],
      quality: 2,
      max_quality: 5,
    },
  ],
  [
    "fish_chips",
    {
        id: 8,
        ingredients: ["a"],
        quality: 1,
        max_quality: 1,

    }
  ]
])

function select_recipes() {
  const random_index = Math.floor(Math.random() * recipes.size)
  console.log("Random index:", random_index)

  const entries = Array.from(recipes.entries())
  const random_item = entries[random_index]

  console.log("Random item:", random_item)
  return random_item
}




function submit_ingredient_to_meal(meal_name: PossibleMeals, ingredient: Ingredient): number {
    //do a check with a
    const meal = current_meals.get(meal_name);
    if (!meal.ingredients.includes(ingredient.name)) {
        communicate_client("a");
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