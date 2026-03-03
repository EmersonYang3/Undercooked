import { NotificationCallbackParameters, NotificationHandler, NotificationOptionEntry } from "@/utils/types";

import { useNotificationStore } from "@/stores/NotificationStore";

import sharedEnums from "@shared/enums"
import { frontendEnums } from "@/utils/enums";

const stationRoles = sharedEnums.stationTypes
const NOTIFICATION_HANDLER_KEYS = frontendEnums.NOTIFICATION_HANDLER_KEYS

const stationRoleOptions: NotificationOptionEntry[] = [
    { optionText: "EMPTY STATION", handlerKey: NOTIFICATION_HANDLER_KEYS.ASSIGN_STATION_ROLE, handlerArgs: [stationRoles.emptyStation] },
]

function onCallback(parameters: NotificationCallbackParameters, id: number) {
    const notificationStore = useNotificationStore()

    notificationStore.removeNotification(id)

    notificationStore.addNotification({
        message: `Please choose a role for station ${parameters.stationIdentifier}`,
        callbackParameters: { stationIdentifier: parameters.stationIdentifier },
        options: stationRoleOptions
    })
}

export default { onCallback: onCallback } as NotificationHandler;