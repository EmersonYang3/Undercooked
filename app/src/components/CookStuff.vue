<template>
    <div class="relative w-screen h-screen text-center overflow-hidden" 
    :style="{ cursor: `url(${knife}) 16 16, auto`}"
    >
    <div class="absolute w-screen h-12 z-1 bg-green-300"> Score: {{ score }}</div>
        <div
            class="w-screen h-screen bg-center bg-cover absolute"
            :style="{ backgroundImage: `url(${placeholder})` }"
        ></div>
            <div
                v-for="fruit in fruits"
                :key="fruit.id"
                v-show="fruit.active"
                class="absolute w-64 h-32 rounded-full bg-yellow-400"
                :style="{
                    transform: `translate(${fruit.x}px, ${fruit.y}px) rotate(${fruit.rotation}deg)`
                }"
                @click="handleFruit(fruit)"></div>
    </div>
    <div :style="{ cursor: `url(${knife})`}"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import placeholder from '../assets/bg.png'
import knife from '../assets/knife.png'
//possible optimization would be define fruit spin rate outside
//really minor tho considering it barely takes up any space

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

}

//add bad fruits or good fruits to make it score based

function makeFruit(id:number): Fruit {
    const negative =  Math.round(Math.random()) == 1 ? 1 : -1;
    if (negative)
    return {
        id,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight,
        vx: (Math.random() - 0.5) * 6,
        vy: -15 - Math.random() * 4,
        rotation: 0,
        spin: (Math.random() - 0.5) * 12,
        active: true, 
        score: (Math.round(Math.random()*100) + 1) * negative
    }
}
const fruits = reactive(Array.from({length: 4}, (_, i)=> makeFruit(i)));
const gravity = 0.2;
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
        }
    
    })
    requestAnimationFrame(update)
}
//reuse the preexisting object to avoid remaking the div which would be a performance hit cuz dom update or smth
//use a setTimeout function to prevent the fruits from respawning too quikcly which can overwhelm the player
const promsies = [];




function handleFruit(fruit:Fruit) {
    fruit.active = false;
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