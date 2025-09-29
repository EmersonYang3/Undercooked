import type { Socket } from "socket.io";

function init(socket: Socket) {
    console.log("Player socket initialized");
}

export default { init }