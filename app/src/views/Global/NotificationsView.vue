<template>
    <NotificationEntry v-for="notification in notificationStore.notifications" :entry="notification" />
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/NotificationStore'
import NotificationEntry from '@/components/Notifications/NotificationEntry.vue';

const notificationStore = useNotificationStore()

notificationStore.addNotification({
    message: "THIS IS A TEST",
    callbackParameters: { testParam: 12345 },
    options: [
        {"optionText": "Option 1", "handlerKey": "option1"},
        {"optionText": "Option 2", "handlerKey": "option2"}
    ]
})

</script>