<template>
    <div>
        <div class="flex flex-center items-center justify-center w-screen h-screen flex-row text-center absolute" >
                <button @click="join = true" class="w-32 h-32 bg-black text-white rounded-full ">Join Game</button>
                <button @click="host = true" class="w-32 h-32 bg-black text-white rounded-full ">Host Game</button>
        </div>
        <!-- make this so the buttons float from the center to the top left of the screen just in case the player wants to change their choice -->
        <div id="join_game" class="absolute bg-black w-screen h-screen" v-show="join">

        </div>
        <div id="host_game" class="absolute bg-red-500 w-screen h-screen flex flex-center justify-center " v-show="host">
            <div>

            </div>
            <button @click="startup" class="bg-blue-500 h-16">Host Game(No Code Input)</button>
            <div>
                
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const join = ref(false);
const host = ref(false);

//assume there is a method to start up a server in the backend
function startup() {
    
}




const router = useRouter();
const goToJoin = () => {

}
</script>

<style scoped>

</style>