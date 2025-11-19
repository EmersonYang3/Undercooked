<template>
    <div class="w-screen h-screen bg-green-300" v-if="!started">
        <!-- waiting screen -->
        <div class="w-full h-full flex flex-col justify-center item-center text-center text-9xl">
            <!-- use a different font for this -->
            Press your Client Key
        </div>
    </div>
    <div class="absolute z-0 w-screen h-screen bg-black" v-if="started">
        <div class="absolute w-screen h-screen text-center overflow-hidden" >
        <div 
            v-for="(fruit, id) in currentFruits"
            :key="id"
            v-show="fruit[1].active"
            class="absolute w-64 h-64 bg-white z-10"
            :style="{
                transform: `translate(${fruit[1].x}px, ${fruit[1].y}px) rotate(${fruit[1].rotation}deg)`
            }"
            @click="handleFruit(fruit[1])"
        ></div>
        </div>   
        <!-- this outter div should not be used as a container its to ensure proper styles -->
        <!-- actual game logic stuff -->
    </div>
</template>

<script setup lang="ts">
import { watch, ref, Reactive, reactive } from 'vue';
import { useClientConnection } from './clientTerm';

const started = ref(false);
const clientKeys = new Map([["a", true]]);
const { keyClient, startListening } = useClientConnection(clientKeys);
const duration  = 5 * 1000;
let rafHandle: number | null = null;
let currentTime = 0;
let elapsedTime = ref(0);

let currentFruits:Reactive<Map<number, Fruit>> = reactive(new Map());
watch(keyClient, (key)=> {
    if (key) { 
        console.log("started game");
        startGame(key)
    } else { 
        console.log("failed to start???")
    };
})

function startGame(key: string) {
    console.log("Starting game for client: ", key);
    for (let i = 0; i < 6; i++) {
        makeFruit();
    }
    started.value = true;    
    currentTime = performance.now();
    update();
}
function endCondition():boolean {
    if (elapsedTime.value >= duration) { 
        return true;
    }
    return false;
}
let idSet =  new Set();
for(let i = 0; i++; i<20) {
    idSet.add(i);
}
//should probably remove this 
function getUniqueId(): number {
    const arr = idSet.entries;
    const random_index = Math.floor(Math.random() * arr.length);
    const uniqueId = arr[random_index];
    idSet.delete(uniqueId);
    return uniqueId;
}
 
const gravity =  9.81;
function update() {
    const now = performance.now();
    const deltaTime = now - currentTime;
    currentTime = now;
    elapsedTime.value += deltaTime;
    if(endCondition()) {
        endGame();
        return;
    }
    currentFruits.forEach(fruit => {
        if(!fruit.active) return
        fruit.x += fruit.vx;
        fruit.y += fruit.vy;
        fruit.vy += gravity;
        fruit.vx += gravity;
        fruit.rotation += fruit.spin;
        if(fruit.y > window.innerHeight + 500 || fruit.y < 10) { 
            if(Math.sign(fruit.score) == -1 ) {
                console.log(negativeAmount);
                negativeAmount -= 1;
                removeFruit(fruit);
            }
        }
    });
    rafHandle = requestAnimationFrame(update);
}
function endGame() {
    console.log("ending game");
    if (rafHandle !== null) {
        cancelAnimationFrame(rafHandle);
        rafHandle = null;
    }  
    //reset all the states
    elapsedTime.value = 0;
    keyClient.value = null;
    started.value = false;
    //re-arm to accept another client after finished
    startListening();
}
const validfruits = ["apple", "banana", "melon", "watermelon", "pineapple"];
let negativeAmount = 0;
function makeFruit() {
    let negative =  Math.round(Math.random() * 1.0) == 1 ? 1 : -1;
    if (negative == -1) {
        if(negativeAmount < 2) {
            negativeAmount += 1;
        }
        else {
            negative = 1;
        }
    }
    const random_index = Math.floor(Math.random() * validfruits.length);
    const asset_path = negative == -1 ? "bomb" : validfruits[random_index];
    //limit the amount of bombs that can appear 
    let id = getUniqueId();
    let newFruit =  {
        id,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight,
        vx: (Math.random() - 0.5) * 3,
        vy: -15 - Math.random() * 2,
        rotation: 0,
        spin: (Math.random() - 0.5) * 12,
        active: true,
        score: 1 * negative,
        image: asset_path
    }
    currentFruits.set(id, newFruit);
}
function handleFruit(fruit:Fruit) {
    //add the score to the counter and whatnot
    removeFruit(fruit);
}
function removeFruit(fruit: Fruit) {
    let id = fruit.id;
    idSet.add(id);
    currentFruits.delete(fruit.id);
}

type Fruit =  {
    id: number, 
    x: number,
    y: number,
    vx: number,
    vy: number,
    rotation: number,
    spin: number,
    active: boolean,
    score: number,
    image:string
}

//main structure complete
//just figure out backend/socket logic 

</script>

<style scoped>

</style>