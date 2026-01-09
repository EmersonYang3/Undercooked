import { defineStore } from "pinia";
import { ref, useHost } from "vue";
import { io, type Socket } from "socket.io-client";
import { initialRoleEvents, RoleEvents } from "@/connections/rewrite/table";
import { onEvents } from "@/utils/utils";
import type { handshakeData, intendedRoles } from "@shared/types";
import { RoleStore } from "./roleStores";

export const useSocketStore = defineStore("socket", () => {
    const socket = ref<Socket | null>(null);    // kept in a ref so the store retains it
    const identifier = ref<string | null>(null);
    function createSocket(handshake: handshakeData, roleStore: RoleStore): Socket {
        console.log("attempting to create socket");
        if (socket.value) return socket.value as Socket;
        const socketAttempt = io("http://localhost:3000", {
            autoConnect: false,
            auth: handshake,
        }) as Socket;
        console.log(handshake);
        socket.value = socketAttempt;
        const initBinder = initialRoleEvents[handshake.intendedRole];
        const initEvents = initBinder(roleStore);
        onEvents(socketAttempt, initEvents);
        socketAttempt.connect();
        socketAttempt.on("connect_error", () => {
            return new Error("failed to connect");
        });
        socketAttempt.on("connect", () => {
            console.log("connected");
        });
        const binder = RoleEvents[handshake.intendedRole];
        const events = binder(roleStore);
        onEvents(socketAttempt, events);
        return socketAttempt;
    }
    function getSocket(): Socket | null {
        return socket.value as Socket;
    }
    function disconnect() {
        if (!socket.value) return;
        socket.value.disconnect();
        socket.value.removeAllListeners();
        socket.value = null;
        identifier.value = null;
    }

    return {
        socket,
        identifier,
        createSocket,
        getSocket,
        disconnect,
    };
});

