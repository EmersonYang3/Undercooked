import sharedEnums from "shared/enums";
import onClientAccept from "./events/onAcceptClient"

const hostToServerRemotes = sharedEnums.hostToServerRemotes

export default {
    [hostToServerRemotes.acceptClientJoin]: onClientAccept
}
