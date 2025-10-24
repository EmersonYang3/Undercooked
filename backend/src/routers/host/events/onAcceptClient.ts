import type { uniqueIdentifier } from "shared/types";
import type { Socket } from "socket.io";

import socketRegistry from "services/socketRegistry";

function onAcceptClient(socket: Socket, identifier: uniqueIdentifier) {
    const clientConnection = socketRegistry.getSocketConnectionById(identifier);

    console.log('Host accepted client with identifier:', identifier);
    console.log('Client connection details:', clientConnection.socket.data);
}

export default onAcceptClient