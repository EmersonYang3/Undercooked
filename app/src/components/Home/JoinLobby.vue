<template>
    <button @click="onBackButton">Go Back</button>
    <CodeInput />
    <RolePicker @role-selected="onRoleSelected"/>
</template>

<script setup lang="ts">
import CodeInput from './CodeInput.vue'
import RolePicker from './RolePicker.vue';

const events = defineEmits(['go-back'])

function onBackButton() { events('go-back') }
function onRoleSelected(role: string) { console.log("Selected role: ", role) }
</script>