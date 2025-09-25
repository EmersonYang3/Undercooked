<template>
    <div class="z-1 flex items-center justify-center h-screen bg-center bg-no-repeat bg-[url(../assets/panini.png)] absolute">
        <div v-for="food in foods" :key="food.id" class="bg-no-repeat z-10 m-1 bg-black w-1/6 h-2/6">
            {{ food.remaining_time }}
            <img :src="bacon" alt="panini" class="w-full h-full object-contain"/>
        </div>
        <div></div>
    </div>
    <DisplayInventory v-if="showItems" class="z-10"  method="chop" clientKey="a"/>
</template>


<script setup lang="ts">
import { onMounted, Reactive,  ref, reactive } from 'vue';
import panini from '../assets/panini.png'
//assets must be high height and low width 
//add a sidebar instead if we dont wanna make the assets a specific size
//just make it a square if so so it fits within the boundary
//for this once its done cooking add a signal that tells it to the flip said thingie
import bacon from '../assets/bacon.png';
import DisplayInventory from './DisplayInventory.vue';
const panLimit = 3;
const specialKey = 'a';


const foods:Reactive<Array<Fryable>> = reactive([]);
const showItems = ref(true);



type Fryable = {
    remaining_time:number,
    id:number,

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