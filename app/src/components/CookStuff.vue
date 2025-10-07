<template>
    <!-- start screen where the player clicsk to start the game -->
    <div v-show="showStart" class="bg-black h-screen w-screen flex justify-center flex-column items-center absolute z-10">
        <div @click="quickset" class="rounded-full bg-yellow-500 w-64 h-64 flex items-center justify-center text-center">
            <div class="text-red-500 text-4xl">Start!!</div>
        </div>
        <!-- bind the player here using the bindplayer component -->
    </div>
<!-- use a diff font for this later on -->


    <!-- actual gameplay area make it so until the player actually clicks start does it start -->
    <div v-show="timer" class="w-screen h-screen bg-black text-white text-center items-center flex justify-center text-9xl">
        {{ time }}
    </div>
    <div class="relative w-screen h-screen text-center overflow-hidden" 
    :style="{ cursor: `url(${knife}) 16 16, auto`}"
    >
    <div class="absolute w-screen h-12 z-1 bg-green-400 rounded-lg=full"> Score: {{ score }}</div>
        <div
            class="w-screen h-screen bg-center bg-cover absolute"
            :style="{ backgroundImage: `url(${placeholder})` }"
        ></div>
            <div
                v-for="fruit in fruits"
                :key="fruit.id"
                v-show="fruit.active"
                class="absolute w-64 h-64" 
                :style="{
                    transform: `translate(${fruit.x}px, ${fruit.y}px) rotate(${fruit.rotation}deg)`
                }"
                @click="handleFruit(fruit)">
                <img :src="ImageLut[fruit.image]">
            
            </div>
    </div>
    <div :style="{ cursor: `url(${knife})`}"></div>
    <div></div>


</template>

<script setup lang="ts">
import { ImageLut } from '@/utils/lut';
import { onUnmounted, reactive, ref } from 'vue'
import placeholder from '../assets/bg.png'
import knife from '../assets/knife.png'
//possible optimization would be define fruit spin rate outside
//really minor tho considering it barely takes up any space
const time = ref(3);
const timer = ref(false);
async function quickset() { 
    showStart.value = false;
    timer.value = true;
    for (let i = 0; i < 3; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        time.value -= 1;
    }
    console.log("timer was completd")
    timer.value = false;
    animationFrame = requestAnimationFrame(update);
}
const showStart = ref(true);
const score = ref(0);
//to increase difficulty, either increase the amount of fruits that can be sent out at a given time
//or just make them faster
//or make more bad fruits in porportion to good fruits
//also we lwk need a better background ngl

//add an asset field later on for assets for specific fruits
//use a look up table or smth for file paths to fruit

interface Fruit {
    id: number, 
    x: number,
    y: number, 
    vx: number,
    vy: number, 
    rotation: number, 
    spin: number, 
    active: boolean, 
    score:number, 
    image:string
}
const validfruits = ["apple", "banana", "melon", "watermelon", "pineapple"];

let negativeAmount = 0;
//add bad fruits or good fruits to make it score based

function makeFruit(id:number): Fruit {
    let negative =  Math.round(Math.random() * 1.0) == 1 ? 1 : -1;
    if (negative == -1) {
        if(negativeAmount < 2) {
            negativeAmount+=1;
        }
        else {
            console.log(negativeAmount);
            console.log("too many negatives changing to a positve");

            negative = 1;
        }
    }
    const random_index = Math.floor(Math.random() * validfruits.length - 1) + 1;
    const asset_path = negative == -1 ? "bomb" : validfruits[random_index];
    //limit the amount of bombs that can appear 

    return {
        id,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight,
        vx: (Math.random() - 0.5) * 3,
        vy: -15 - Math.random() * 2,
        rotation: 0,
        spin: (Math.random() - 0.5) * 12,
        active: true, 
        score: (Math.round(Math.random()*100) + 1) * negative,
        image: asset_path
    }
}
const fruits = reactive(Array.from({length: 6}, (_, i)=> makeFruit(i)));
const gravity = 0.22;
let animationFrame:number;
function update() {
    
    fruits.forEach(fruit=> {
        if(!fruit.active) return
        fruit.x += fruit.vx;
        fruit.y += fruit.vy;
        fruit.vy+= gravity
        fruit.rotation += fruit.spin
        if(fruit.y > window.innerHeight + 500 || fruit.y < 10) {
            if (Math.sign(fruit.score) == -1) {
                console.log(negativeAmount)
                negativeAmount -= 1;
            }     
            resetFruit(fruit);
        }
    })
    requestAnimationFrame(update)
}
//reuse the preexisting object to avoid remaking the div which would be a performance hit cuz dom update or smth
//use a setTimeout function to prevent the fruits from respawning too quikcly which can overwhelm the player



function handleFruit(fruit:Fruit) {
    fruit.active = false;
    if(Math.sign(fruit.score)==-1) negativeAmount -=1;
    score.value+=fruit.score;
    setTimeout(()=> {
        Object.assign(fruit, makeFruit(fruit.id))
    }, 1000 + Math.random() * 2000)
}


function resetFruit(fruit:Fruit) {
    Object.assign(fruit, makeFruit(fruit.id))
}
onUnmounted(()=> {
    cancelAnimationFrame(animationFrame)
})

</script>

<style scoped>

</style>