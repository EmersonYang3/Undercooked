<template>
        <!-- make this a scroll bar thingie majingie where  -->
        <div class="bg-white w-full h-full flex flex-col items-center">
            <div v-for="terminals in valTerms" :key="terminals.id"
            class="bg-black h-48 w-48 items-center flex flex-col"
            >
                <div class="text-center text-white items-center flex flex-col text-black">{{ terminals.name }}</div>
                <img :src="ImageLut[terminals.name].file_path"  class="w-10 h-10">
            </div>
        </div>


</template>

<script setup lang="ts">
import { onMounted, reactive, Reactive } from 'vue';

import { ImageLut } from '@/utils/lut';

type Terminal = {
    id:string, 
    name:string,
};
type ValidTerminals = Array<Terminal>;
const valTerms:Reactive<ValidTerminals> = reactive([]);  
document.addEventListener("scroll",function (e) {
    
})
onMounted(()=>{
    valTerms.push({
        id:"12",
        name:"orange"
    })
})

</script>

<style scoped>

</style>