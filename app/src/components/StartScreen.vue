<template>
    <div class="text-white w-screen h-screen z-10 bg-black absolute flex flex-col justify-center text-center">
        <!-- error message -->
        Click your client key
        <div v-if="error" class="bg-red-500 absolute w-full h-full flex flex-col justify-center text-center">Wrong key</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, Reactive, reactive, ref } from 'vue';
onMounted(()=> {
    
})
const error = ref(false);
const emit = defineEmits(['start'])
const clients = fetch_client_keys();
function fetch_client_keys():Array<string> {
    //backend request here
    return Array.from({ length: 12 }, (_, i) => String.fromCharCode(97 + i));
}
function establish_connection(client_key:string) {
    //placeholder function
    console.log(client_key);
}

function hasValidItem(char:string):boolean {
    return true;
}
//checks if the client is in the client list and also has a valid item for use at the terminal specified
function validate_client(char:string):boolean {
    if (clients.includes(char) || hasValidItem(char)) {
        return true;
    }
}
//im prob overcomplicating it
async function toggle_error() {
    error.value = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    error.value = false;
}
type Executor =  (char:string) => boolean;
function onetimekey(callback: Executor) {
  //rearms itself if condition isnt met
    const handler = (event:KeyboardEvent) => {
        const key = event.key.toLowerCase();
        const isCorrect = callback(key);
        if (!isCorrect) {
            toggle_error();
            console.log("rearming");
            onetimekey(callback);
        } else {
            establish_connection(key);
            
            emit('start', {
                client_key:key,
            });
            
        }
    }
  document.addEventListener("keydown", handler, {once : true})
}
onetimekey(validate_client);
</script>

<style scoped>

</style>