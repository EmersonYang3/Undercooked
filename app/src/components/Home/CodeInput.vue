<template>
    <input v-model="code" maxlength="6" @input="validateCode" placeholder="Enter Lobby Code"/>
</template>

<script setup lang="ts">
import { ref } from "vue"

const code = ref("")

function validateCode() { code.value = code.value.toUpperCase().replace(/[^A-Z0-9]/g, "") }
</script>