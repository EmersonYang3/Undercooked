<template>
    <div class="absolute w-screen h-screen bg-red-500 z-10">
        Test
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const stars = ref(0);
const props = defineProps<{
    item_name: string
    quality: number

}>();
function test() {
    //use a ranking system to determine the scren displayed
    if(props.item_name) {
        //this is just basically a cosmetic screen 
        //the backend will handle everything else 
    }
}
</script>

<style scoped>

</style>