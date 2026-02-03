<template>
    <div>
        <div v-for="[id, recipe] in hostStore.activeRecipes" :key="id">
            <div>
                {{ recipe.targetFoodItem }}
            </div>
            <div>
                {{ Math.floor(recipe.timeRemaining / 1000) }} seconds left
            </div>
            <div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useHostStore } from '@/stores/rewrite/roleStores';
const hostStore = useHostStore();
let recipes = hostStore.activeRecipes;
let last_current = performance.now();
function update() {
    let delta_time = performance.now() - last_current;
    last_current =  performance.now();
    recipes.forEach((value, key) => {
        value.timeRemaining -= delta_time;
        if (value.timeRemaining <= 0) {
            recipes.delete(key);
        }
    })
    requestAnimationFrame(update);
}
//reset the time
last_current = performance.now();
update();





//this definitely will not function 

</script>

<style scoped>

</style>