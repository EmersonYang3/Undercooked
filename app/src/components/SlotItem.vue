<template>
    <div>
        <button @click="showItems = !showItems" class="border-4 bg-white h-32 w-32 m-10 rounded-xl absolute z-100 bottom-0 right-0 ">Open Inventory</button>
        
        <div></div>
    </div>
</template>

<script setup lang="ts">


//tell the backend u want information for this player
//backend sends the info back to both terminal and then establishes a connection between terminal and cleint

//initial calls will give player keys so no need to continously ask unless a player leaves
let PlayerKeys:Array<string>  = [];

function getInfo(playerId:string):Record<string, string> {
    //returns back a type specifiying the item currently heldby the player


}
//we have a event listerner that continoulsy polls for a key letter
//when that ke

const emit = defineEmits<{
    (select_item:"select-item", item:string): void
}>();
document.addEventListener('keydown', (event)=> {
    if(PlayerKeys.includes(event.key)) {
        //continue
        getInfo(event.key);
        
        emit("select-item", event.key);
        document.removeEventListener("keydown");
    }
      
})





function change the 



</script>

<style scoped>

</style>