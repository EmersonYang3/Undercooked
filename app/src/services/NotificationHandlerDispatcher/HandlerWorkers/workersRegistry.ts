import { frontendEnums } from "@/utils/enums"
import { NotificationHandler } from "@/utils/types"

const NOTIFICATION_HANDLER_KEYS = frontendEnums.NOTIFICATION_HANDLER_KEYS

import acceptClient from "./acceptClient"
import acceptStation from "./acceptStation"
import assignStationRole from "./assignStationRole"

export default {
    [NOTIFICATION_HANDLER_KEYS.ACCEPT_CLIENT]: acceptClient,
    [NOTIFICATION_HANDLER_KEYS.ACCEPT_STATION]: acceptStation,
    [NOTIFICATION_HANDLER_KEYS.ASSIGN_STATION_ROLE]: assignStationRole
} as Record<string, NotificationHandler>