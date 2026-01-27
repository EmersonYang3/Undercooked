<template>
    <div v-for="(message, index) in notifStore.requests">
        <div>   
            {{ message }}
            <button @click="accept(message.role, message.client_name, message.id)">Accept</button>
            <button @click="reject(message.role, message.client_name, message.id)">Rejct</button>
        </div>
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

</template>

<script setup lang="ts">
import { useRequestNotifStore } from '@/stores/rewrite/messageStore';
import { useSocketStore } from '@/stores/SocketStore';
import enums from '@shared/enums';
import { ref } from 'vue';
const selectType = ref(false);
const selectedStation = ref<null | string>(null);
const currentIdentifier = ref<null | number>(null);
const notifStore = useRequestNotifStore();
const socket = useSocketStore().socket;
function accept(role: "player" | "station", identifier: number, messageId: number) {
    if (role === "player") {
        socket.emit("acceptClientJoin", identifier);
    } else if (role === "station") {
        selectType.value = true;
        currentIdentifier.value = identifier;
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
function submitStationType() {
    socket.emit(enums.hostToServerRemotes.acceptStationJoin, currentIdentifier.value, selectedStation.value);
    currentIdentifier.value =  null;
    selectedStation.value = null;
    selectType.value = false;
}
</script>