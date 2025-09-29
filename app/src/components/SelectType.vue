<template>
    <div class="bg-black w-screen h-screen">
        <!-- make this a scroll bar thingie majingie where  -->
        <div class="bg-white w-full flex flex-col items-center">
            <div v-for="terminals in valTerms" :key="terminals.id"
            class="bg-white h-20 w-20"
            >
                <div>{{ terminals.name }}</div>
                <img :src="ImageLut[terminals.name].file_path">
            </div>
        </div>
    </div>


</template>

<script setup lang="ts">
import { reactive, Reactive, } from 'vue';

type Image = {
    name:string,
    file_path: string,

}
const ImageLut:Record<string, Image> = {
    "tomato":"../assets/tomato.png"
}//example of a lut entry



type Terminal = {
    id:string, 
    name:string,
};
type ValidTerminals = Array<Terminal>;
const valTerms:Reactive<ValidTerminals> = reactive([]);  
document.addEventListener("scroll",function (e) {
    
})



</script>

<style scoped>

</style>