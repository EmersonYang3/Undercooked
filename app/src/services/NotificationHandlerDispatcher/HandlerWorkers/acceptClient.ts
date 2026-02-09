import { NotificationCallbackParameters, NotificationHandler } from "@/utils/types";

import { useNotificationStore } from "@/stores/notificationStore";

function onCallback(parameters: NotificationCallbackParameters, id: number) {
    useNotificationStore().removeNotification(id)
}

export default { onCallback: onCallback } as NotificationHandler;