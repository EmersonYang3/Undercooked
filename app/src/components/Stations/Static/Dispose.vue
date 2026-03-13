<template>
    <!-- Only shows the -->
    <div v-if="props.items">
        Disposed Item: {{ props.items }}
    </div>
</template>

<script setup lang="ts">
import { holdableItem } from '@shared/types';

const props = defineProps<{
    items?: holdableItem
}>();

</script>

<style scoped>

</style>
