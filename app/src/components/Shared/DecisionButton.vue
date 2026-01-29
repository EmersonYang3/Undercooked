<template>
    <button @click="$emit('onClick')">{{ text }}</button>
</template>

<script setup lang="ts">
const props = defineProps<{text: string}>()
const emits = defineEmits(['onClick'])
</script>