<template>
    <SuccessScreen @start="start"></SuccessScreen>
    <div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SuccessScreen from './SuccessScreen.vue';
const emits = defineEmits(['items', 'quality']);

//determine the best radial circle for tracing
let offset = 30; 
//subtract 30 px for padding to avoid too big of a circle
let radius = screen.availHeight/2 - offset;
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
    current_timer = performance.now();
    requestAnimationFrame(update);
}
let mouseX = 0;
let mouseY = 0;
//given a single point solve for the equation
document.addEventListener('mousemove', function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
})
let score = ref(100);
let circular_padding = 10;
let timer = ref(30 * 1000);
let current_time = performance.now();
function update() {
    if (timer.value <= 0) {
        end();
    }
    const delta_time = performance.now() - current_time;
    timer.value -= delta_time;
    current_time = performance.now();
    
    let actual_y = get_x_from_y(mouseY);
    if( mouseY >= actual_y + circular_padding || mouseY <= actual_y + circular_padding) {
        score.value -= 1.0;
    }  

    requestAnimationFrame(update);

}
function end() {
    //analayze the final score and determine ingredient quality
    //send it to the 
}


function get_y_from_x(x:number):number {
    const value = rsquared - (x - center[0])**2;
    const y_value = Math.sqrt(value) - center[1];
    return y_value;
}
function get_x_from_y(y:number): number {
    const value = rsquared - (y - center[1])**2;
    const x_value = Math.sqrt(value) - center[0];
    return x_value;
}



</script>

<style scoped>

</style>