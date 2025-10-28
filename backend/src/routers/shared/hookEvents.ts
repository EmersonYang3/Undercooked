import type { Socket } from "socket.io"
import type { eventsRegistering } from "utils/types"

function hookEvents(socket: Socket, events: eventsRegistering) {
    socket.onAny((eventName, ...args) => {
        const eventHandler = events[eventName]

        console.log(`Event received: ${eventName}`, ...args)

        if (eventHandler) {
            eventHandler(socket, ...args)
        }
    })
}

export default hookEvents