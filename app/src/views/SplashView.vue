<template>
    <!-- will add animations for buttons later -->
    <div class="flex flex-centers justify-center text-center text-red-500">
        <div v-show="!(join || host)" class="m-10 absolute z-10 text-6xl">Game</div>
        <div class="flex flex-center items-center justify-center w-screen h-screen flex-row text-center absolute bg-blue-200">
            <button @click="join = true" class="m-1 w-64 h-64 bg-black text-red-500 rounded-xl text-3xl">Join Game</button>
            <button @click="host = true" class="m-1 w-64 h-64 bg-black text-red-500 rounded-xl text-3xl">Host Game</button>
        </div>
        <!-- make this so the buttons float from the center to the top left of the screen just in case the player wants to change their choice -->
        
        <div id="join_game" class="text-4xl absolute bg-black w-screen h-screen flex items-center justify-center flex-col" v-show="join">
            Enter Join Code 
            <form>
                <input type="text" v-model="client_join_code" placeholder="Code" class="text-center rounded-xl m-10 text-black z-10 bg-white w-64 h-16">    
                <button type="submit">Submit</button>        
            </form>
        
        </div>

        <div id="host_game" class="absolute bg-red-500 w-screen h-screen flex flex-center flex-col items-center justify-center " v-show="host">
            <div v-show="!joinCode" class="text-black" >
                Game code : {{ joinCode }}
                1212313131
            </div>
            <button @click="startup" class="bg-blue-500 h-12 rounded-xl w-64">Host Game(No Code Input)</button>
            <div>

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
const join = ref(false);
const host = ref(false);
const joinCode:Ref<null | number> = ref(null);
//assume there is a method to start up a server in the backend
function startup(): number {
    return Math.round(Math.random() * 1000);
    //generatea random code from the backend
}
const router = useRouter();
const goToJoin = () => {

}
function connect(e:Event) {
    
}



</script>

<style scoped>

</style>