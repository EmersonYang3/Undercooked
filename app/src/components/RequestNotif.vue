<template>
    <div class="bg-black rounded-xl w-16 h-16 absolute ">
        <div class="font-white bg-black w-48 h-16" v-for="(message, index) in messages" :key="index">
            <div @click=""></div>
            {{ message.client_name }}
            {{ message.message }}
            <input type="button">Accept</input>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { Reactive, reactive } from 'vue';
defineProps(['message']);
type Message =  { 
    client_name:string, 
    message:string,
    expiry?:number,
    id:number,
}
let messages:Reactive<Array<Message>> = reactive([]);
function get_messages_from_back(message:Message) {
    messages.push(message);
}
//temp solution for socket
//dismiss the me
function dismiss_message(index:number) {
    messages.splice(index, 1);
    //remove setInterval
}
document.addEventListener('keydown', (event)=> {
    if (event.key.toLowerCase() != "~") {
        return;
    }
    let message:Message = {
        client_name:"a",
        message:"test message",
        expiry:10,
    }
    let last_index = messages.length;
    messages.push(message);
    setInterval(()=> {
        let expiration = messages[last_index].expiry;
        //
        if (expiration < 0) {
            //means the message is now 0 
        } else if (expiration == 0) {
            messages.splice(last_index, 1);
        } else {
            messages[last_index].expiry -= 1;
        }
    }, 1000);
})
function create_new_interval(last_index:number) {
    const self = setInterval(()=> {
        let expiratin = messages[last_index].expiry -= 1
    });
    return function() {
        let data = messages[last_index];
        let id = data.id;
        //if the id of the current item is is the
    }
}


</script>

<style scoped>

</style>