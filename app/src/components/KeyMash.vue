<template>
  <div class="bg-black w-screen h-screen z-10 absolute">
    <div v-show="items != null" v-for="segment in items.segments" :key="segment.id" class="">
      <div class="bg-black w-16 h-16">
        {{ segment.id }}
        {{ onetimekey(segment.key, execute) }}
        {{ segment.key }}
      </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, Reactive, reactive } from 'vue';
//have a sequence of foods go down a
const items:Reactive<Item | null> = reactive(testData);
const testData:Item =  {
    segments:[
      {
        id:0, 
        type:"Str",
        key:"a",
      }
    ],
    name:"item"
}
type Segment = {
  id: number, 
  type: string,
  key: string,
}

function execute() {
  console.log("test")
}
onMounted(()=> {
})
type Executor = () => void;
function onetimekey(char:string , callback: Executor) {
  document.addEventListener("keydown", (event) => {
    if(event.key.toLowerCase() ==  char.toLowerCase()) {
      callback();
    }
  }, {once : true})
}
//we send the respedctive key to poll for via segments

type Item = {
  segments:Array<Segment>,
  name:string, 
}

</script>

<style scoped>

</style>