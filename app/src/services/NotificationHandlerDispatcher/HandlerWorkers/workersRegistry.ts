import { frontendEnums } from "@/utils/enums"
import { NotificationHandler } from "@/utils/types"

const NOTIFICATION_HANDLER_KEYS = frontendEnums.NOTIFICATION_HANDLER_KEYS

import acceptClient from "./acceptClient"

export default {
    [NOTIFICATION_HANDLER_KEYS.ACCEPT_CLIENT]: acceptClient
} as Record<string, NotificationHandler>