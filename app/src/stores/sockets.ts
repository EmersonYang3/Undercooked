import { Socket } from "socket.io-client";
import { defineStore } from "pinia";
type Path = string;
//define the sockets that can be used 
//each terminal/client has their own socket type and each client/terminal has their own unique socket 
//ided by an unqi



export const routerStore = defineStore('socket', {
    state: () => {
        return { num: 0 }
    },
    actions: {
        connect(path: Path) {

        },
        send_message(data: any) {

        }
    }

})