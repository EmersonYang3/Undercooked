import sharedEnums from "shared/enums";

import onClientAccept from "./events/onAcceptClient"
import onAcceptStation from "./events/onAcceptStation"
import attemptGameStart from "./events/attemptGameStart"
import onRejectConnection from "./events/onRejectConnection"
import ping from "./events/pingChecker"

const hostToServerRemotes = sharedEnums.hostToServerRemotes
const hostToSharedRemotes = sharedEnums.sharedRemotes

export default {
    [hostToServerRemotes.acceptClientJoin]: onClientAccept,
    [hostToServerRemotes.acceptStationJoin]: onAcceptStation,
    [hostToServerRemotes.startLobby]: attemptGameStart,
    [hostToServerRemotes.ping]: ping,

    [hostToSharedRemotes.hostRejectedConnection]: onRejectConnection,
}