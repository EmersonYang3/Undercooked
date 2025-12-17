import sharedEnums from "shared/enums";

import onClientAccept from "./events/onAcceptClient"
import onAcceptStation from "./events/onAcceptStation"
import attemptGameStart from "./events/attemptGameStart"
import onRejectConnection from "./events/onRejectConnection"

const hostToServerRemotes = sharedEnums.hostToServerRemotes
const hostToSharedRemotes = sharedEnums.sharedRemotes

export default {
    [hostToServerRemotes.acceptClientJoin]: onClientAccept,
    [hostToServerRemotes.acceptStationJoin]: onAcceptStation,
    [hostToServerRemotes.startLobby]: attemptGameStart,
    [hostToSharedRemotes.hostRejectedConnection]: onRejectConnection
}