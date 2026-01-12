<template>
    <button @click="onBackButton">Go Back</button>
    <CodeInput />
    <DecisionButton text="HOST LOBBY"/>
</template>

<script setup lang="ts">
import CodeInput from './CodeInput.vue'
import DecisionButton from './DecisionButton.vue';

const events = defineEmits(['go-back'])
function onBackButton() { events('go-back') }
</script>