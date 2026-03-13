import { NotificationCallbackParameters, NotificationHandler, NotificationOptionEntry } from "@/utils/types";

import { useNotificationStore } from "@/stores/notificationStore";

import sharedEnums from "@shared/enums"
import { frontendEnums } from "@/utils/enums";

const stationRoles = sharedEnums.stationTypes
const NOTIFICATION_HANDLER_KEYS = frontendEnums.NOTIFICATION_HANDLER_KEYS

function CreateStationRoleOption(optionText: string, stationRole: string): NotificationOptionEntry {
    return { optionText: optionText, handlerKey: NOTIFICATION_HANDLER_KEYS.ASSIGN_STATION_ROLE, handlerArgs: [stationRole] }
}

const stationRoleOptions: NotificationOptionEntry[] = [
    CreateStationRoleOption("EMPTY STATION", stationRoles.emptyStation),
    CreateStationRoleOption("BOILING STATION", stationRoles.boilingStation),
    CreateStationRoleOption("FRYING STATION", stationRoles.fryingStation)
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
