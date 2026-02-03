import { notificationEntry } from "@/utils/types"
import { defineStore } from "pinia"
import { ref } from "vue"

import { frontendEnums } from "@/utils/enums"

export const useNotificationStore = defineStore("notification", () => {
    const notifications = ref<notificationEntry[]>([])
    const handlerKeys = frontendEnums.notificationHandlerKeys

    function addNotification(entry: notificationEntry) {
        notifications.value.push(entry)
    }

    return { notifications, addNotification, handlerKeys }
})