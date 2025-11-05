<template>
    <StartScreen v-if="start_screen" @start="start" :key="start_screen_key" ></StartScreen>
    <div class="flex flex-col absolute">
       Temperature:  {{ Math.floor(temperature * 10)/10 }}° Celsius 
       Current Score : {{ final_score }}
       Time Left : {{ Math.floor((game_duration * 10)/1000)/10 }}
    </div>
    <div class="bar-container">
        <div class="bar" :style="barStyle"></div>
    </div>
    <SuccessScreen :item_name="item_name" :quality="quality" v-if="success"></SuccessScreen>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { getRandomFloat } from '@/utils/utils';
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
type GameState = {
    isRunning:boolean,
}
const game = { isRunning: true};
const handleKeyDown = createKeyHandler(game);
function start(data:Paylod) {
    start_screen.value = false;
    const client_key = data.client_key;
    start_screen_key.value += 1;
    item_name.value = getInventoryItem(client_key);
    document.addEventListener("keydown", handleKeyDown);
    //set the temperature range
    temperature_range[0] = getRandomFloat(75,80);
    temperature_range[1] = getRandomFloat(95,100);
    game_duration.value = 30 * 1000;
    current_time = performance.now();
    requestAnimationFrame(update);
}
function update_player() {
    //request to backend again to update the player inventory
}
async function end() {
    console.log(final_score);
    game.isRunning = false;
    document.removeEventListener("keydown", handleKeyDown);
    success.value = true;
    update_player();
    await new Promise(resolve => setTimeout(resolve, 1000));
    rearm();
}
function getInventoryItem(char:string):string {
    return char + "aasdadadasd";
}
function rearm() {
    start_screen.value = true;
}
const temperature_range = reactive([80,90]);
const temperature = ref(85.0);
const change_per_second = 1.0;
let final_score = 100;
const game_duration = ref(30 * 1000);
let current_time = 0;
const barStyle = computed(() => {
  const height = `${temperature.value}%`
  let color;
  if (temperature.value < temperature_range[0]) {
    const ratio = temperature.value / temperature_range[0]
    color = `rgb(${Math.floor(255 * (1 - ratio))}, ${Math.floor(150 * ratio)}, 0)`
  } else if (temperature.value > temperature_range[1]) {
    const ratio = (100 - temperature.value) / (100 - temperature_range[1])
    color = `rgb(255, ${Math.floor(150 * ratio)}, 0)`
  } else {
    color = 'limegreen'
  }
  return {
    height,
    backgroundColor: color
  }
})
function update() {
    const time_elapsed = performance.now() - current_time;
    game_duration.value -= time_elapsed;
    current_time = performance.now();
    if( game_duration.value <= 0 || final_score <= 0) {
        console.log("you suck");
        end();
    }
    if (temperature.value < temperature_range[0] || temperature.value > temperature_range[1]) {
        final_score -= 0.1;
    } 
    temperature.value -= time_elapsed/1000 * change_per_second;;
    requestAnimationFrame(update);
}
function createKeyHandler(game:GameState) {
   return function(event:KeyboardEvent) {
        if (!game.isRunning) return;
        if (event.key == " ") {
            temperature.value += 0.3;
        }
        console.log("pressed:", event.key);
    }
}
</script>

<style scoped>
.bar-container {
  width: 20px;
  height: 300px;
  background: #222;
  border-radius: 10px;
  overflow: hidden;
}

.bar {
  height: 100%;
  transition: width 0.2s ease, background-color 0.3s ease;
}
</style>