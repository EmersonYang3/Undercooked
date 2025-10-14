<template>
    <div class="z-0 flex items-center justify-center w-screen h-screen bg-center bg-[url('/public/checkeredbg.png')] outline outline-10 outline-blue-300 border-blue-300  rounded-4xl border-10 absolute">
        <img :src="ImageLut[`pan`]" class="w-full absolute">
        <div class="bg-black rounded-full w-[720px] h-[720px] relative z-10 border-gray-700 border-[60px] outline outline-[20px]">
        </div>

        <div></div>
    </div>
</template>


<script setup lang="ts">
import { onMounted, Reactive,  ref, reactive } from 'vue';
import { TimedItem } from '@/utils/types';
const panLimit = 3;
import { ImageLut } from '@/utils/lut';
const foods:Reactive<Array<TimedItem>> = reactive([]);
const showItems = ref(true);
let currentFood:Reactive<TimedItem> = reactive(
    {
        remaining_time:0,
        id: 0,
        status: null,
        LUT_KEY: "null",
    }
);



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
const clientArray = [];
//this will hold all the valid client keys 
document.addEventListener('keydown', (e) => {
    if(clientArray.includes(e.key)) {
        //ask the host machine to establish a connection between the client and the terminal
        showItems.value = true;
        //fetch the item the client is currently holding from the backend and then set it
        currentFood = 
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