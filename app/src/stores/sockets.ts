import { defineStore } from "pinia";
import { ref } from "vue";
import { io, type Socket } from "socket.io-client";
import { initialRoleEvents, RoleEvents } from "@/connections/table";
import { onEvents } from "@/utils/utils";
import type { handshakeData } from "@shared/types";

export const useSocketStore = defineStore("socket", () => {
    const socket = ref<Socket | null>(null);    // kept in a ref so the store retains it
    const identifier = ref<string | null>(null);
    function createSocket(handshake: handshakeData, roleStore: any): Socket {
        console.log("attempting to create socket");

        // Already created? Return the same one
        if (socket.value) return socket.value;

        // Create the socket
        const s = io("http://localhost:3000", {
            autoConnect: false,
            auth: handshake,
        }) as Socket;

        socket.value = s;

        // Bind initial role-specific events
        const initBinder = initialRoleEvents[handshake.intendedRole];
        const initEvents = initBinder(roleStore);
        onEvents(s, initEvents);

        // Connect
        s.connect();
        console.log("attempting to connect");

        s.on("connect_error", () => {
            console.log("failed to connect");
        });

        s.on("connect", () => {
            roleStore.isReady = true;
            console.log("connected");
        });

        // Bind all other role events
        const binder = RoleEvents[handshake.intendedRole];
        const events = binder(roleStore);
        onEvents(s, events);

        return s;
    }

    function getSocket(): Socket | null {
        return socket.value;
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
