import { NotificationInput, NotificationEntry } from "@/utils/types"
import { defineStore } from "pinia"
import { ref } from "vue"

import { frontendEnums } from "@/utils/enums"

export const useNotificationStore = defineStore("notification", () => {
    const notifications = ref<NotificationEntry[]>([])
    const HANDLER_KEYS = frontendEnums.NOTIFICATION_HANDLER_KEYS

    let latestId = 0

    function addNotification(entry: NotificationInput) {
        const newLatestId = latestId + 1

        notifications.value.push({ ...entry, id: newLatestId })
        latestId = newLatestId
    }

    function removeNotification(id: number) {
        notifications.value = notifications.value.filter(n => n.id !== id)
    }

    return { notifications, addNotification, removeNotification, HANDLER_KEYS }
})