import { NotificationCallbackParameters, NotificationHandler, NotificationOptionEntry } from "@/utils/types";

import { useNotificationStore } from "@/stores/NotificationStore";
import { useSocketStore } from "@/stores/SocketStore";

function onCallback(parameters: NotificationCallbackParameters, id: number, stationRole: string) {
    const socketStore = useSocketStore()
    const HostToServerRemotes = socketStore.ToServerRemotes.FromHost

    socketStore.emitEvent(HostToServerRemotes.acceptStationJoin, parameters.stationIdentifier, stationRole)

    console.log(id, stationRole)
    useNotificationStore().removeNotification(id)
}

export default { onCallback: onCallback } as NotificationHandler;