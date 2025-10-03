import type { Socket } from "socket.io";

import connected from "../modules/terminal/connect.ts"

function init(socket: Socket) {
    connected.connect(socket)

    console.log("Terminal/Station socket initialized");
}

export default { init }