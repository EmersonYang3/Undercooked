import { notificationEntry } from "@/utils/types"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useNotificationStore = defineStore("notification", () => {
    const notifications = ref<notificationEntry[]>([])

    function addNotification(entry: notificationEntry) {
        notifications.value.push(entry)
    }

    return { notifications, addNotification }
})