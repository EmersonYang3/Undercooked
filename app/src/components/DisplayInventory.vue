<template>
    <div class= "text-center absolute bg-black w-screen h-screen">
        <h1 class="m-2 text-white text-xl">Inventory for {{ clientKey }}</h1>
        <div clas="w-full h-full flex flex-row justify-center gap-2 item-center">
        <div v-for="item in items" :key="item.id">
            <div v-if="valid_food(item)" class="text-white text-xs w-32 bg-red-500">
                <div class="font-bold ">{{ item.name }}</div>
                <div>Quantity: {{ item.quantity }} </div>
                <div>Methods: 
                    <div v-for="method in item.methods" :key="method" class="inline-block m-1 p-1 bg-blue-300 rounded">
                        {{ method }}
                    </div>
                <img class="w-16 h-16" src="../assets/tomtao.png">
            </div>
                </div>
        
                        
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
//this is only for the terminals specifically
import { onMounted, Reactive, reactive } from 'vue';
const props = defineProps<{
    clientKey:string,
    method:string
}>();
type Methods = Array<string>
const items:Reactive<Array<InventoryItem>> = reactive([]);
type InventoryItem = {
    id:number,
    name:string,
    quantity:number,
    methods:Methods
}
function valid_food(item:InventoryItem) {
    if(item.methods.includes(props.method)) {
        return true;
    }
}
//within the v-for deternine if the method for the item is valid for it 
//if yes render it else nah
onMounted(() => {
    //mock data for now
    items.push({
        id:0,
        name:"Tomato",
        quantity:5,
        methods:["chop", "fry"]
    });
});


</script>

<style scoped>

</style>