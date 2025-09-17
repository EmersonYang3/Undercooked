<template>
    <div>
        <div class="absolute h-full w-full z-1 bg-center bg-cover bg-contain" :style="{ backgroundImage: `url(${pan})`}"></div>
    </div>
</template>

<script setup lang="ts">
import pan from '../assets/pan.png'
</script>

<style scoped>

</style>