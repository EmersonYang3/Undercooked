import { frontendEnums } from "@/utils/enums"
import { NotificationHandler } from "@/utils/types"

const NOTIFICATION_HANDLER_KEYS = frontendEnums.NOTIFICATION_HANDLER_KEYS

import acceptClient from "./acceptClient"
import acceptStation from "./acceptStation"

export default {
    [NOTIFICATION_HANDLER_KEYS.ACCEPT_CLIENT]: acceptClient,
    [NOTIFICATION_HANDLER_KEYS.ACCEPT_STATION]: acceptStation
} as Record<string, NotificationHandler>