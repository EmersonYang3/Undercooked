<template>
    <div class="flex items-center justify-center h-screen">
        <div class="rounded-full h-screen aspect-square bg-black">
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, Reactive, reactive } from 'vue';


const foods:Reactive<Array<Fryable>> = reactive({});

type Fryable = {
    remaining_time:
}

function update() { //could make this update_array_timers function that takes in an array
    for(let i = foods.length; i >= 0; i-- ) 
    {
        foods[i].
    } 
}
onMounted(()=> {
    setInterval(()=>{
        update()
    }, 1000)
})




</script>

<style scoped>

</style>