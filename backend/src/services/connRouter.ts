import type { Socket } from "socket.io"
import type { intendedRoles } from "shared/types"
import type { fixedSocketData } from "utils/types"

import sharedEnums from "shared/enums"

import hostRouter from "routers/host/init"
import clientRouter from "routers/client/init"
import stationRouter from "routers/station/init"

const rolesToRouters: Record<intendedRoles, (socket: Socket) => void> = {
    [sharedEnums.gameRoles.host]: hostRouter.initHostSocket,
    [sharedEnums.gameRoles.client]: clientRouter.initClientSocket,
    [sharedEnums.gameRoles.station]: stationRouter.initStationSocket
}

function routeConnection(socket: Socket) {
    const socketData: fixedSocketData = socket.data
    rolesToRouters[socketData.intendedRole](socket)
}

export default routeConnection