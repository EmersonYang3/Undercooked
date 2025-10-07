<template>
    <div class="z-0 flex items-center justify-center h-screen bg-center bg-no-repeat bg-white absolute">
        <img :src="ImageLut[`pan`]">
        <div v-for="food in foods" :key="food.id" class="bg-no-repeat z-10 m-1 bg-black w-1/6 h-2/6">
            {{ food.remaining_time }}
            <img :src="bacon" alt="panini" class="w-full h-full object-contain"/>
        </div>
        <div></div>
    </div>
    <button @click="showItems = !showItems" class="bg-white h-64 w-64 absolute z-100">Text</button>
    <DisplayInventory @select-item="(e)=>{
        test(e)
    }" v-if="showItems" class="z-10"  method="chop" :clientKey="specialKey"/>
</template>


<script setup lang="ts">
import { onMounted, Reactive,  ref, reactive } from 'vue';
//assets must be high height and low width 
//add a sidebar instead if we dont wanna make the assets a specific size
//just make it a square if so so it fits within the boundary
//for this once its done cooking add a signal that tells it to the flip said thingie

import bacon from '../assets/bacon.png';
import DisplayInventory from './DisplayInventory.vue';
import { TimedItem, InventoryItem } from '@/utils/types';
const panLimit = 3;
const specialKey = 'a';
import { ImageLut } from '@/utils/lut';

const foods:Reactive<Array<TimedItem>> = reactive([]);
const showItems = ref(true);
function test(item:InventoryItem) {
    //construct a fryableitem and put it into array where it gets updated



}
function update() { //could make this update_array_timers function that takes in an array
    for(let i = foods.length - 1; i >= 0; i-- ) 
    {
        foods[i].remaining_time-=1;
        if(foods[i].remaining_time <= 0) {
            foods.splice(i, 1);
        }
    } 
}
function mock_data(limit:number) {
    for(let i = 0; i<limit; i++) {
        foods.push({
            remaining_time:10,
            id:i
        })
    }
}
function add_new_item() {
    if(foods.length < panLimit) {
        foods.push({
            remaining_time:10,
            id:foods.length
        })
    }
}
const clientArray =[];
//this will hold all the valid client keys 
function display_client_items(key:string) {


}



document.addEventListener('keydown', (e) => {
    if(clientArray.includes(e.key)) {
        //ask the host machine to establish a connection between the client and the terminal
        showItems.value = true;
        add_new_item();
    }
})



onMounted(()=> {
    mock_data(3);
    setInterval(()=>{
        update()
    }, 1000)

})




</script>

<style scoped>

</style>