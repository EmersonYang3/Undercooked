<template>
    <div class="flex flex-col items-center justify-center h-screen w-screen">
        <div :style="circle" class="circle"></div>
    </div>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
const emits = defineEmits(['items', 'quality']);

//determine the best radial circle for tracing
let offset = 30; 
//subtract 30 px for padding to avoid too big of a circle
let radius = 100;
let center = [screen.availWidth/2, screen.availHeight/2];
const rsquared = radius**2;
//will have to


function matchAccuracy() {
    //instead of checking every frame we delegate all the points traced in a second and we try and match based off of a coordinate lookup approach
    //for example we can use the (x-h)^2 + (y-k)^2 = r^2 to match if the point is within the circle
    //set a slight offset for tolerance to

}
type Payload = {
    client_key:string
};
function start(data:Payload) {
    timer.value =  30 * 1000;
    current_time = performance.now();
    requestAnimationFrame(update);
}

let circle = computed(() => {
    const height = `${radius * 2}px`
    const width = `${radius * 2}px`
    return {
        height, width
    }
})
//have a circle (pot) where the user must try and draw in it as accurately as possible
//add a slight amount of padding to ensure its not too hard
//if the user gets out of the acceptable circle area remove/deduct a point
//lasts for 30 seconds to properly boil the item


let mouseX = 0;
let mouseY = 0;
//given a single point solve for the equation
document.addEventListener('mousemove', throttle(function(event:MouseEvent) {
    console.log(event.clientX);
    console.log(event.clientY);
}, 500));
let score = ref(100);
let circular_padding = 2;
let timer = ref(30 * 1000);
let current_time = performance.now();
let last_interval = 0;
function update() {
    if (timer.value <= 0) {
        end();
    }
    const delta_time = performance.now() - current_time;
    timer.value -= delta_time;
    current_time = performance.now();
    
    if (last_interval >= 0.5) {
        //after 0.5 seconds poll for mouseMove
    }

    
    let actual_y = get_x_from_y(mouseY);
    
    if(!( mouseY <= actual_y + circular_padding || mouseY >= actual_y + circular_padding)) {
        console.log(actual_y);
        score.value -= 1.0;
        console.log("suck");
    }

    requestAnimationFrame(update);

}
function end() {
    //analayze the final score and determine ingredient quality
    //send it to the 
}


function get_y_from_x(x:number):number {
    const value = rsquared - (x - center[0])**2;
    const y_value = Math.sqrt(value) + center[1];
    return y_value;
}
function get_x_from_y(y:number): number {
    const value = rsquared - (y - center[1])**2;
    const x_value = Math.sqrt(value) + center[0];
    return x_value;
}
requestAnimationFrame(update);
function throttle(func, interval) {
    let lastCall = 0;
    return function() {
        let now = Date.now();
        if (lastCall + interval < now) {
            lastCall = now;
            return func(this , arguments);
        }
    }
}

</script>

<style scoped>
.circle {
  background-color: lightblue; /* bg-black */
  border-radius: 9999px;   /* rounded-full */
  position: absolute;      /* absolute */
  z-index: 10;             /* z-10 */
}

</style>