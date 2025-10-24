import type { uniqueIdentifier } from "shared/types";
import type { Socket } from "socket.io";

function onAcceptClient(socket: Socket, identifier: uniqueIdentifier) {
    console.log('Host accepted client with identifier:', identifier);
}

export default onAcceptClient