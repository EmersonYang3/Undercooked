<template>
    <p> {{ props.entry.message }}</p>
    <p> {{ props.entry.callbackParameters }}</p>

    <DecisionButton v-for="notificationOption in props.entry.options" :text="notificationOption.optionText" @on-click="onCallback(notificationOption.handlerKey)"/>
</template>

<script setup lang="ts">
import { NotificationEntry } from '@/utils/types';
import DecisionButton from '../Shared/DecisionButton.vue';

import dispatchNotificationHandler from '@/services/NotificationHandlerDispatcher/dispatcher'

const props = defineProps<{ entry: NotificationEntry }>()

function onCallback(handlerKey: string) {
    dispatchNotificationHandler(handlerKey, props.entry.callbackParameters, props.entry.id)
}
</script>