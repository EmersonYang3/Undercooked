import { defineStore } from "pinia";
import { Ref, ref } from "vue";

import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { initialRoleEvents, RoleEvents } from "@/connections/table";
import { RoleStore } from "./roleStores";
import { onEvents } from "@/utils/utils";
import type { uniqueIdentifier, handshakeData } from '@shared/types';
export type socketConnection = {
    socket: Socket,
    identifier: uniqueIdentifier
}

export const useSocketStore = defineStore("socket", () => {
    let socket: Socket | null = null;
    //if u ever need reactive state for the socket for whatever reason use identifier for
    let identifier: Ref<string | null> = ref(null);
    function createSocket(handshakeData: handshakeData, store: RoleStore): Socket {
        console.log("attempting to create socket")
        if (socket) return socket;
        socket = io("http://localhost:3000", {
            autoConnect: false,
            auth: handshakeData,
        }) as Socket;
        const initialEventBinder = initialRoleEvents[handshakeData.intendedRole];
        const initialEvents = initialEventBinder(store);
        onEvents(socket, initialEvents);
        socket.connect();
        //just bind everything i think
        //if wanna seperate the gameEvents from the initiationEvents
        //write some external logic for that
        //too lazy to do it rn and it does seem to run so
        const eventBinder = RoleEvents[handshakeData.intendedRole];
        const eventMap = eventBinder(store);
        onEvents(socket, eventMap);
        return socket;
    }
    function getSocket(): Socket | null {
        return socket;
    }
    function disconnect() {
        if (!socket) return;

        socket.disconnect();
        socket.removeAllListeners();
        socket = null;
        identifier.value = null;
    }
    return {
        socket,
        identifier,
        createSocket,
        getSocket,
        disconnect,
    }
})

export type SocketStore = ReturnType<typeof useSocketStore>;