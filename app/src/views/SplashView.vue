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
            <form @submit.prevent="connect">
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

        </div>
        <div v-show="waiting_screen" class="bg-black w-full h-full z-10 absolute">
            <div class="text-white text-xl">
                <!-- holds the current role that has been selected -->
                Role : {{ role }}
            </div>
            <div class="text-white text-xl">
               player_count :  {{ current_player_count }}
            </div>
            <button @click="startGame" class="text-xl text-white bg-red-500 w-64 h-64">
                Start 

            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
const join = ref(false);
const host = ref(false);
const joinCode:Ref<null | number> = ref(null);
const client_join_code:Ref<null | number> = ref(null);
const waiting_screen = ref(false);
const current_player_count = ref(0);
const role:Ref<null | Role> = ref(null);


type Role = "host" | "terminal" | "player";
//assume there is a method to start up a server in the backend
function startup(): number {
    host.value = false;
    waiting_screen.value = true;
    role.value = "host";
    return Math.round(Math.random() * 1000);

    //generatea random code from the backend
    //send the host to a waiting room/area for them
    //also add a couple of buttons for terminating the waiting/queueing and also a button for starting
    
}
const router = useRouter();
const goToJoin = () => {

}
function startGame() {
    router.push('/host');
}


function connect() {
    console.log(client_join_code.value)
    //waiting for backend ocde here
    //basically just submit the code to the backend to search for a game
    if(test()) {
        //route to the client view now 
        //might add atomatic device detection to determine client or terminal
        //for now imma just roue to terminal view as i needa flesh that out
        router.push('/terminal')
    }
}
function test():boolean { 
    return true;
}





//each of these functions will resolve routing to the proper views for the host
//for the clients they are routed to the role screen where thet have an option to pick a terminal or as a client
//clients will most likely use their phone to do so or 
//if phones arent allowed we can remove sending client info as the info sent to the phone is just for rendering
//and isnt an integral part of the actual game 



</script>

<style scoped>

</style>