import type { Socket } from "socket.io";

function init(socket: Socket) {
    console.log("Terminal/Station socket initialized");
}

export default { init }