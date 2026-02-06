<template>
    <NotificationEntry v-for="notification in notificationStore.notifications" :entry="notification" />
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/NotificationStore'
import NotificationEntry from '@/components/Notifications/NotificationEntry.vue';

const notificationStore = useNotificationStore()
</script>