import onSpecialKeyPressed from "./events/onSpecialKeyPressed/onSpecialKeyPressed"
import sharedEnums from "shared/enums"

const stationToServerEvents = sharedEnums.stationToServerRemotes

export default {
    [stationToServerEvents.specialKeyPressed]: onSpecialKeyPressed
}