import { NotificationCallbackParameters, NotificationHandler } from "@/utils/types";

import { useNotificationStore } from "@/stores/NotificationStore";
import { useSocketStore } from "@/stores/SocketStore";

function onCallback(parameters: NotificationCallbackParameters, id: number) {
    const socketStore = useSocketStore()
    const notificationStore = useNotificationStore()

    const hostToServerRemotes = socketStore.ToServerRemotes.FromHost

    socketStore.emitEvent(hostToServerRemotes.acceptClientJoin, parameters.clientIdentifier)
    notificationStore.removeNotification(id)
}

export default { onCallback: onCallback } as NotificationHandler;