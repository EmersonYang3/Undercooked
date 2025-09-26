<template>
    <div class= "text-center absolute bg-black w-screen h-screen">
        <h1 class="m-2 text-white text-xl">Inventory for {{ clientKey }}</h1>
        <div class="w-full h-full flex flex-row justify-center gap-2 item-center">
        <div v-for="item in items" :key="item.id" class="flex flex-row justify-center">
        <div
            v-if="valid_food(item)"
            class="relative group text-white text-xs h-32 w-32 bg-white items-center rounded-lg p-2 m-2 relative"
        >
            <!-- Item Name -->
            <img class="w-full h-full" src="../assets/tomato.png"  alt="tomato"/>
            <!-- Quantity -->
            <div class="absolute bottom-0  right-0 bg-white w-10 h-10 rounded-full text-black text-center content-center">{{ item.quantity }}</div>

            <!-- Methods (Only visible on hover) -->
            <div
            class="hidden group-hover:block absolute top-full left-0 w-40 bg-white text-black rounded-lg shadow-lg mt-2 p-2 z-10"
            >
            <div class="font-semibold text-sm mb-1">Methods:</div>
            <div v-for="method in item.methods" :key="method" class="inline-block m-1 p-1 bg-blue-300 rounded">
                {{ method }}
            </div>
            <div class="font-bold">Item Name: {{ item.name }}</div>
            </div>
        </div>
        </div>

        </div>
    </div>
</template>

<script setup lang="ts">
//this is only for the terminals specifically
import { paths } from '@/utils/enum';
const tomatoImg = (paths['tomato']);
console.log(tomatoImg);



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
    items.push({
        id:1,
        name:"Lettuce",
        quantity:3,
        methods:["chop", "fry"]
    });
    items.push({
        id:2,
        name:"Cheese",
        quantity:2,
        methods:["chop", "fry"]
    });
    items.push({
        id:3,
        name:"Bread",
        quantity:10,
        methods:["chop", "fry"]
    });
});


</script>

<style scoped>

</style>