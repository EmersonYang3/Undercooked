import sharedEnums from "shared/enums";

import onClientAccept from "./events/onAcceptClient"
import onAcceptStation from "./events/onAcceptStation";

const hostToServerRemotes = sharedEnums.hostToServerRemotes

export default {
    [hostToServerRemotes.acceptClientJoin]: onClientAccept,
    [hostToServerRemotes.acceptStationJoin]: onAcceptStation
}