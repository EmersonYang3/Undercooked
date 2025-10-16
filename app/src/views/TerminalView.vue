<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
//select a terminal
//make a request to the backend asking it for a valid terminal to select
//then route the right terminal to it so for example if the slice component is selected
//the path would resolve to terminal/slice
//will need to leverage pinia or we can just send info to the bakcend to keep track of instead
type TerminalType  = {
    terminal_path:string,
    terminal_name:string, 
}

const router = useRouter();
function select_terminal_type() {
    //get the terminal type
    let test:TerminalType = {
        terminal_name:"slice",
        terminal_path:"/terminal/slice"
    }
    router.push(test.terminal_path);
    //load the component at that path
    //
}
onMounted(()=> {
    select_terminal_type();
    //loads everything from here 
})

</script>

<style scoped>

</style>