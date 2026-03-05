<template>
    <div>
        Item to submit: {{ items }}
    </div>
    <div v-if="props.failure">
        Item was not submitted. Not the correct item
    </div>
    <div v-else>
        Item was sucessfully submitted!
    </div>
</template>

<script setup lang="ts">
import { holdableItem } from '@shared/types';

const props = defineProps<{
    items: holdableItem,
    failure: boolean,
}>();


</script>
