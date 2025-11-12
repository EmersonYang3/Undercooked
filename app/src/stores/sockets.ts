import { io } from "socket.io-client"
import { defineStore } from "pinia";
export const useChatStore = defineStore("chat", {
    state: () => ({
        messages: [],
        socket: io("ws://localhost:3000"),
        connected: false,
    }),

    actions: {
        initSocket() {
            if (this.connected) return; // avoid double connection
            this.socket.connect();

            this.socket.on("connect", () => {
                this.connected = true;
                console.log("this.socket connected:", this.socket.id);
            });

            this.socket.on("disconnect", () => {
                this.connected = false;
                console.log("this.socket disconnected");
            });

            this.socket.on("chat:message", (msg: any) => {
                this.messages.push(msg);
            });
        },

        sendMessage(content: any) {
            this.socket.emit("chat:message", { content });
        },
    },
});