import type { Socket } from "socket.io"
import type { eventsRegistering } from "utils/types"

function hookEvents(socket: Socket, events: eventsRegistering) {
    socket.onAny((eventName, ...args) => {
        const eventHandler = events[eventName]
        if (!eventHandler) { return }

        eventHandler(socket, ...args)
    })
}

export default hookEvents