<template>
    <div>
        <button @click="showItems = !showItems">Open Inventory</button>
        <div class="border-4 bg-white h-32 w-32 m-10 rounded-xl absolute z-100 bottom-0 right-0">
            <img class="w-full h-full" :src='ImageLut["apple"]'>
            <div></div>
        </div>
    
    </div>
</template>

<script setup lang="ts">
import { ImageLut } from '@/utils/lut';

//tell the backend u want information for this player
//backend sends the info back to both terminal and then establishes a connection between terminal and cleint
import { ref } from 'vue';
//initial calls will give player keys so no need to continously ask unless a player leaves
const PlayerKeys:Array<string> = [];
const showItems = ref(false);
function syncKeys() {

}
function setAsset() {

}



function getInfo(playerId:string):Record<string, string> {
    //returns back a type specifiying the item currently heldby the player
    PlayerKeys.push("string");
}
//we have a event listerner that continoulsy polls for a key letter
//when that ke

const emit = defineEmits<{
    (select_item:"select-item", item:string): void
}>();
function handleKeys (event:KeyboardEvent) {
    if(PlayerKeys.includes(event.key)) {
        getInfo(event.key);
        emit("select-item", event.key);
        document.removeEventListener("keydown", handleKeys);
    }     
}
document.addEventListener('keydown', handleKeys)
</script>

<style scoped>

</style>