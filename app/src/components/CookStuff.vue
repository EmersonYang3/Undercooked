<template>
    <!-- start screen where the player clicsk to start the game -->
    <div v-show="showStart" class="bg-black h-screen w-screen flex justify-center flex-column items-center absolute z-10">
        <div class="text-red-500 text-xl w-64 h-64 z-1">Start!</div>
        <div @click="quickset" class="rounded-full bg-yellow-500 w-64 h-64 justify-center item-center flex">
            
        </div>  
        <!-- bind the player here using the bindplayer component -->
    </div>



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
                <img :src="ImageLut[fruit.image].file_path">
            
            </div>
    </div>
    <div :style="{ cursor: `url(${knife})`}"></div>
    <div></div>


</template>

<script setup lang="ts">
import { ImageLut } from '@/utils/lut';
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import placeholder from '../assets/bg.png'
import knife from '../assets/knife.png'
//possible optimization would be define fruit spin rate outside
//really minor tho considering it barely takes up any space
const time = ref(3);
const timer = ref(false);
function quickset() {
    showStart.value = false;
    for(let i = 0; i<3 ; i++) {
        setTimeout(()=>{
            time.value -= 1;
        }, 1000 * (i + 1));
    }

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
    let negative =  Math.round(Math.random()) == 1 ? 1 : -1;
    if (negative == -1) {
        if(negativeAmount <= 3) {
            negativeAmount+=1;
        }
        else {
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
            resetFruit(fruit)        
            negativeAmount -= 1;
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
onMounted(()=> {
    animationFrame = requestAnimationFrame(update)
})
onUnmounted(()=> {
    cancelAnimationFrame(animationFrame)
})

</script>

<style scoped>

</style>