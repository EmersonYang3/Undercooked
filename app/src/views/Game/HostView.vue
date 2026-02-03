<template>
    <div>
        <div v-for="[id, recipe] in activeRecipes" :key="id">
            <div>
                {{ recipe.targetFoodItem }}
            </div>
            <div>
                {{ Math.floor(recipe.timeRemaining / 1000) }} seconds left
            </div>
        </div>
    </div>
    <div>
        Current Score : {{ currentScore }}
    </div>
</template>

<script setup lang="ts">
import { useSocketStore } from '@/stores/SocketStore';
import enums from '@shared/enums';
import { activeRecipe } from '@shared/types';
import { reactive, ref } from 'vue';
//put the message store here

const activeRecipes = reactive(new Map());
//map stores by uniqueidentifier
//statistics 
const currentScore = ref(0);
const messageStore = "temporary";
const socketStore = useSocketStore();
socketStore.attachEventListener(enums.serverToHostRemotes.newRecipe, (recipe: activeRecipe) => {
    activeRecipes.set(recipe.id, recipe);
})

socketStore.attachEventListener(enums.serverToHostRemotes.recipeFinished, (id: number) => {
    activeRecipes.delete(id);
})

socketStore.attachEventListener(enums.serverToHostRemotes.scoreUpdate, (newScore: number) => {
    currentScore.value =  newScore;
})



//this definitely will not function 

</script>

<style scoped>

</style>