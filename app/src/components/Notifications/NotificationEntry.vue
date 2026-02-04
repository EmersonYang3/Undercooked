<template>
    <p> {{ props.entry.message }}</p>
    <p> {{ props.entry.callbackParameters }}</p>

    <DecisionButton v-for="notificationOption in props.entry.options" :text="notificationOption.optionText" @on-click="onCallback(notificationOption.handlerKey)"/>
</template>

<script setup lang="ts">
import { notificationEntry } from '@/utils/types';
import DecisionButton from '../Shared/DecisionButton.vue';

const props = defineProps<{ entry: notificationEntry }>()

function onCallback(handlerKey: string) {
    console.log(handlerKey, props.entry.callbackParameters)
}
</script>