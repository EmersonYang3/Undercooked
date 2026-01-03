<template>
    <div v-if="currentScreen == 'code'">
        <input type="text" v-model="code" class="bg-gray-300">
        <button @click="submitCode">Submit Code</button>
        <button @click="generateCode">Generate Random Code</button>
    </div>

    <div v-if="currentScreen == 'lobby'">
        Waiting For players to Join lobby...
        Current Lobby Count: {{ hostStore.players.length + hostStore.stations.length }}
        <div class="" v-for="(message, index) in notifStore.requests" :index="message.id">
            {{ message }}
            <button @click="accept(message.role, message.client_name, message.id)">Accept</button>
            <button @click="reject(message.role, message.client_name, message.id)">Rejct</button>
        </div>
        <div v-if="selectType">
            <select v-model="selectedStation">
                <option disabled value="">Select station</option>
                <option v-for="station in enums.stationTypes" :key="station" :value="station">
                    {{ station }}
                </option>
            </select>
            <button @click="submitStationType">Submit</button>
        </div>
        <button @click="currentScreen = 'started'">Start Game</button>
    </div>
    <div>
        Current Code : {{ code }}
    </div>
    <div v-if="currentScreen == 'started'">
        <div v-for="[key, value] in hostStore.activeRecipes">
            {{ value.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRequestNotifStore } from '@/stores/messageStore';
import { reactive, Ref, ref } from 'vue';
import enums from '@shared/enums';
import type { handshakeData, stationTypes } from '@shared/types';
import { useSocketStore } from '@/stores/sockets';
import { Socket } from 'socket.io-client';
import { useHostStore } from '@/stores/roleStores';
const hostStore = useHostStore();
const notifStore = useRequestNotifStore();
const socketStore = useSocketStore();
let socket: null | Socket = socketStore.getSocket();
type Screen = "code" | "lobby" | "started";
const currentScreen = ref<Screen>("code");

const code:Ref<string> = ref("");
const CODELENGTH:number = 6;
const letters:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function submitCode() {
    if (code.value.length != CODELENGTH) {

    } 
    let authData: handshakeData = {
        intendedRole: enums.gameRoles.host,
        lobbyCode: code.value,
    };
    socket = socketStore.createSocket(authData, hostStore);
    currentScreen.value = "lobby";
}
function generateCode() {
    let string = "";
    for (let i = 0; i < CODELENGTH; i++) {
        string += letters[Math.floor(Math.random() * letters.length)];
    }
    code.value = string;
} 
const selectType = ref(false);
const selectedStation = ref<null | string>(null);
const currentIdentifier = ref<null | number>(null);
//this setup fails when it comes to multiple station selection
//will change to stationMap later on
const stationMap = reactive(new Map());

function submitStationType() {
    socket.emit("acceptTerminalJoin", currentIdentifier.value, selectedStation.value);
    currentIdentifier.value =  null;
    selectedStation.value = null;
    selectType.value = false;
}
function accept(role: "player" | "station", identifier: number, messageId: number) {
    if (role === "player") {
        socket.emit("acceptClientJoin", identifier);
    } else if (role === "station") {
        selectType.value = true;
    }

    notifStore.removeRequest(messageId);
}
function reject(role: "player" | "station", identifier: number, messageId: number) {
    if (role == "player") {
        socket.emit("rejectPlayerJoin", identifier);  
    } else if (role == "station") {
        socket.emit("rejectStationJoin", identifier);
    }
    notifStore.removeRequest(messageId);
}


</script>

<style scoped>

</style>