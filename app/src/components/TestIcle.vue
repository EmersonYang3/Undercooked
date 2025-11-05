<template>
    <StartScreen v-if="start_screen" @start="start" :key="start_screen_key" ></StartScreen>
    <div v-if="!start_screen" :key="start_screen_key" class="flex flex-row flex-center item-center justify-center flex-col absolute">
        <div class="w-64 h-64 bg-black text-white m-1 text-center justify-center flex flex-col" v-for="(item, index) in keys" :key="index">
            {{ item }}
        </div>
    </div>
    <SuccessScreen :item_name="item_name" :quality="quality" v-if="success"></SuccessScreen>
</template>

<script setup lang="ts">
import { onMounted, Reactive, reactive, ref } from 'vue';
import StartScreen from './StartScreen.vue';
import SuccessScreen from './SuccessScreen.vue';
const start_screen = ref(true);
const start_screen_key = ref(0);
const success = ref(false);
const item_name = ref("item");
const quality = ref(0);
type Paylod = {
    client_key:string,
};
function start(data:Paylod) {
    start_screen.value = false;
    const client_key = data.client_key;
    start_screen_key.value += 1;
    //get the inventory item from client
    item_name.value = getInventoryItem(client_key);
    for(let i = 0; i < 6; i++ ){
        keys.push(randomLetter());    
    }
}
function getInventoryItem(char:string):string {
    return char + "aasdadadasd";
}
function rearm() {
    start_screen.value = true;
}



const keys:Reactive<Array<string>> = reactive([]);
function randomLetter(): string {
    return String.fromCharCode(97 + Math.floor(Math.random() * 26));
}
let total_score = 0;
onMounted(()=> {
    document.addEventListener("keydown", (event)=> {
        const key = event.key.toLowerCase();
        if(keys[0] == key) {
            keys.shift(); 
            total_score += 1;
            if (keys.length == 0) {
                //exit or smth
                //success or smth screen
                console.log(total_score);
                console.log(item_name.value);
                rearm()
            }
        } else {
            total_score -= 1;
            //penalty
        }
    })
})



</script>

<style scoped>

</style>