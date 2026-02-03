<template>
    <p> NOTIFICATIONS ARE HERE HAHAHAHAHAHAHAHAHAHAHAHHAHAHAHA </p>
    <p> {{  notificationStore.notifications }}</p>
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/notificationStore';

const notificationStore = useNotificationStore()
notificationStore.addNotification({
    message: "THIS IS A TEST",
    callbackParameters: { testParam: 12345 },
    handlerKey: notificationStore.handlerKeys.ACCEPT_CLIENT
})
</script>