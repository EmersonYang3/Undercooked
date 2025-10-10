<template>
    <div class="z-0 flex items-center justify-center w-screen h-screen bg-center bg-[url('/public/checkeredbg.png')] outline outline-10 outline-blue-300 border-blue-300  rounded-4xl border-10 absolute">
        <img :src="ImageLut[`pan`]" class="w-full absolute">
        <div class="bg-black rounded-full w-[720px] h-[720px] relative z-10 border-gray-700 border-[60px] outline outline-[20px]">
            <!-- <div
            v-for="(food, index) in foods"
            :key="food.id"
            class="absolute w-[80px] h-[80px] flex items-center justify-center"
            :style="getPositionStyle(index, foods.length)"
            >
            <div class="text-white text-xs text-center">
                {{ food.remaining_time }}
                <img :src="bacon" alt="panini" class="w-full h-full object-contain" />
            </div>
            </div> -->
        </div>

        <div></div>
    </div>
    <!-- change this to show only one slot, gets reset via a key that gets updated at the end of the game -->
</template>


<script setup lang="ts">
//leaving in the multiple items functionality just in case we need it 
//for now its just one item

import { onMounted, Reactive,  ref, reactive } from 'vue';






import bacon from '../assets/bacon.png';
import DisplayInventory from './DisplayInventory.vue';
import { TimedItem, InventoryItem } from '@/utils/types';
const panLimit = 3;
const specialKey = 'a';
import { ImageLut } from '@/utils/lut';
import SlotItem from './SlotItem.vue';

const foods:Reactive<Array<TimedItem>> = reactive([]);
const showItems = ref(true);
function test(item:InventoryItem) {
    //construct a fryableitem and put it into array where it gets updated



}

function getPositionStyle (index:number, total:number) {
    const radius = 300; // Adjust based on circle size (720px - borders)
    const angle = (index / total) * 2 * Math.PI;
    const x = radius + radius * Math.cos(angle) - 40; // 40 = half of item width
    const y = radius + radius * Math.sin(angle) - 40;

    return {
        left: `${x}px`,
        top: `${y}px`,
    };
};



function update() { //could make this update_array_timers function that takes in an array
    for(let i = foods.length - 1; i >= 0; i-- ) 
    {
        foods[i].remaining_time-=1;
        if(foods[i].remaining_time <= 0) {
            foods[i].LUT_KEY = "";
            foods[i].status = true;
            foods.splice(i, 1);
        }
    } 
}
function mock_data(limit:number) {
    for(let i = 0; i<limit; i++) {
        foods.push({
            remaining_time:10,
            id:i,
            status:false,
            LUT_KEY:"orange",
        })
    }
}
function add_new_item() {
    if(foods.length < panLimit) {
        foods.push({
            remaining_time:10,
            id:foods.length,
            status:false,
            LUT_KEY:"orange",
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
    mock_data(1);
    setInterval(()=>{
        update()
    }, 1000)

})




</script>

<style scoped>

</style>