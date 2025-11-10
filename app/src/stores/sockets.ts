import { io } from "socket.io-client"
import { defineStore } from "pinia";
import { eventNames } from "process";
import { callbackify } from "util";
enum gameRoles {
    host = 'host',
    client = 'client',
    station = 'station'
}

//basic needed components
//simple store to keep persistent sockets each componentn can access
//define multiple sockets 

function terminalToBackendSocket() {
    const socket = io('https://localhost:3000');
    //try to connect to the backend
    let id = null;
    socket.on("connect", () => {
        console.log("connecting to server")
    })
    socket.on("getuniq", (uniqueID: number) => {
        console.log("unique id", uniqueID);
        id = uniqueID;
    })
    socket.on("disconnect", () => {
        console.log("disconnecting from server")
    })
    return { socket, id }
}
function clienToBackendSocket() {
    const socket = io('https://localhost:3000')

}


const eventsToFunc = {
    "eventName": function(..) {}
}


for eventNames, callback in eventsToFunc {
    socket.on(eventNames, callbackify)

}

export const useChat = defineStore("chat", {
    state: () => ({
        sockets: new Map(),

    }),
    actions: {
        createSocket(socketName: string, socketType: gameRoles) {
            if (this.sockets.has(socketName)) {
                return "Socket already exists"
            }


        },
        getSocket(socktName: string) {

        }
    }
})




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