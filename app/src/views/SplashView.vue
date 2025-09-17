<!--
    Splash screen where players can select to join or host their own game.
-->

<template>
    <div>
        <button class="bg-red-500 rounded-xl " @click="$emit('host')">Host Game</button>
        <button class="appearance-auto" @click="debug('ligma')">Join Game</button>
        <SelectRole></SelectRole>
        
        <!--This will allow you to set whether you're a player or a terminal-->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SelectRole from '@/components/SelectRole.vue';

const join_game = ref(false);
const code = ref("Enter Game Code");
function debug(stringy:string) {
    console.log(stringy);
}
function getValidGame() {
    //check if the code.value is a valid code against the registry (access the backend or smth idk)
    //if code valid allow them to go to the next sequence which is the select terminal or player view
}
function createNewClient() {
    //generate a unique id for the client
    //then make a request to the backend to request that a new client be made
}
function createNewTerminal() {
    //generate a unique id for the terminal
    //generate a terminal type or pick idk which one 
    //then make a reuqest to the backend to request new terminal be mad
}



</script>

<style scoped>

</style>