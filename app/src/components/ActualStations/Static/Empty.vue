<template>
    <div>
        Final Item: {{ props.items.foodItems[0].name }}
    </div>
    <div>
        Combining these items :
        <div v-for="(value, key) in foodData[props.items.foodItems[0].name].requiredItems">
            Item {{ key }}: {{value}}
            <img src="{{ props.items.foodItems[0].name }}">
        </div>
    </div>
</template>

<script setup lang="ts">
//doesnt need external data all it does is just use the 
//data lookup to get the items required

import { holdableItem } from '@shared/types';
import data from '@shared/data';
const foodData = data.foodData;
// purely a visual component as theres no gameplay.
const props = defineProps<{
    items?: holdableItem,
}>();
if (!props.items) {
    throw new Error("An item wasn't passed")
    //instead of a hard fail make it exit gracefully
    //route back 
}
//check if there even is an item in the item passed
if (props.items.foodItems.length >= 0) {
    throw new Error("Empty item, nothing to display")
}

</script>
