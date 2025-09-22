<template>
    <div class="z-1 flex items-center justify-center h-screen bg-center bg-no-repeat bg-[url(../assets/panini.png)]">
        <div v-for="food in foods" :key="food.id" class="bg-no-repeat z-10 m-1 bg-black w-1/6 h-2/6">
            {{ food.remaining_time }}
        
        </div>
        <div></div>
    </div>
</template>


<script setup lang="ts">
import { onMounted, Reactive, reactive } from 'vue';
import panini from '../assets/panini.png'
//assets must be high height and low width 
//add a sidebar instead if we dont wanna make the assets a specific size
//just make it a square if so so it fits within the boundary
//for this once its done cooking add a signal that tells it to the flip said thingie


const panLimit = 3;
const foods:Reactive<Array<Fryable>> = reactive([]);

type Fryable = {
    remaining_time:number,
    id:number
}

function update() { //could make this update_array_timers function that takes in an array
    for(let i = foods.length - 1; i >= 0; i-- ) 
    {
        foods[i].remaining_time-=1;
    } 
}
function mock_data(limit:number) {
    for(let i = 0; i<limit; i++) {
        foods.push({
            remaining_time:10,
            id:1
        })
    }
}
onMounted(()=> {
    mock_data(3);
    setInterval(()=>{
        update()
    }, 1000)

})




</script>

<style scoped>

</style>