import { NotificationCallbackParameters, NotificationHandler } from "@/utils/types";


import { useSocketStore } from "@/stores/SocketStore";
import { useNotificationStore } from "@/stores/notificationStore";

function onCallback(parameters: NotificationCallbackParameters, id: number) {
    const socketStore = useSocketStore()
    const notificationStore = useNotificationStore()

    const hostToServerRemotes = socketStore.ToServerRemotes.FromHost

    socketStore.emitEvent(hostToServerRemotes.acceptClientJoin, parameters.clientIdentifier)
    notificationStore.removeNotification(id)
}

export default { onCallback: onCallback } as NotificationHandler;