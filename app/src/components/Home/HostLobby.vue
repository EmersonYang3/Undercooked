<template>
    <button @click="onBackButton">Go Back</button>
    <CodeInput />
</template>

<script setup lang="ts">
import CodeInput from './CodeInput.vue'

const events = defineEmits(['go-back'])
function onBackButton() { events('go-back') }
</script>