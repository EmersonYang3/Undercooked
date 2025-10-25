<!--
    Client View, only for viewing a player's currently held item, no actual functionality.
-->
<template>
    <div class="h-screen w-screen bg-black flex-col flex">
        <div class="flex-row">
            <div class="text-white">Ready</div>
                <div v-for="timers in activeTimers" :key="timers.id" 
                class="m-3"
                :style="{
                    
                }"> 
                    <div
                class="h-8 w-40 rounded-t-lg transition-colors duration-1000"
                :style="{
                    backgroundColor: getProgressColor(timers)
                }"
                >
                    {{ timers.IngredientName }}
                </div>
                <div class="z-10 w-40 bg-white h-48 rounded-b-lg items-center justify-center items-center ">
                    {{ timers.time_remaining }}s / {{ timers.cook_time }}s
                    <img :src="timers.asset" class="w-32 h-32">      
                </div>
            </div>
        </div>
        <div class="text-white">Not Ready</div>
    </div>
</template>




<script setup lang="ts">
//use the progression level to change thergba value of the heaer thingie to make it trnasition from red to green to demonstrate its complete 
//whens its done make a noise or smth to indicate it 

//add a recipes area for orders to build up



import { Timer } from '@/utils/types';
import { onMounted, Reactive, reactive} from 'vue';
const activeTimers:Reactive<Array<Timer>> =  reactive([]);
const inactiveTimers:Reactive<Array<Timer>> = reactive([]);
const activeRecipes:Reactive<Array<Timer>> =  reactive([]);

//has an expiry time to encourage players not to just leave it sitting which ruins the setting of the game
//this should only be terminal to host to ensure it doesnt ha


//recieve timer info from socket and push to the activeTimers queue which will display the currently valid timers
//doesnt actually have any order of time priority in terms of amount of time left for the ingreidint to be done
//might implement later on if needed. 
//to avoid excessive sending of information the time info is sent on either
//a coolddown timeout or on a completion basis when the timer has completed
//the client itself will just decrement the timer every secon


//this should probably be moved to the host server cuz its a lot more viewable from the projector screen
//also avoids having to send to much info from backend to client
function getProgressColor(timer:Timer):string {
    const progress = (timer.cook_time - timer.time_remaining) / timer.cook_time;
    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    const hue = clampedProgress * 120;
    console.log(hue);
    return `hsl(${hue}, 100%, 50%)`
}



function mockTimer() : Timer {
    const timer:Timer= {
        IngredientName: "fruits",
        time_remaining: 20,
        cook_time: 20,
        id: 1, 
        asset: "test"

    }
    return timer;
}
onMounted(()=> {
    activeTimers.push(mockTimer());
    const test_timer = mockTimer();
    test_timer.id = 10;
    activeTimers.push(test_timer);
    //test timer to get the ui up
    setInterval(()=>{
        for (let i = activeTimers.length - 1; i >= 0; i--) {
            activeTimers[i].time_remaining-=1;
            if (activeTimers[i].time_remaining == 0) activeTimers.splice(i, 1) 
            //puts the ready item into the new array which displays when their ready
            //dont use this replace it with a method that tells the user that the ingreidient has been completed

        }
    }, 1000)
})




//the host will manage all the timers and broadcast timer timers to all clients
//this will allow anybody to pick up the material once its done



</script>

<style scoped>

</style>