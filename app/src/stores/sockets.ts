import { defineStore, Store } from "pinia";
import { io, Socket } from "socket.io-client";
import { ref } from "vue";
//three frontends to consider 
//other two are self explanatory. 
//the only difference between the screen and the other two is the amount of info they get
//screen gets basically all the info possible
//clients and stations only get the info needed


//define waht events the backend would need to send to the player
//the player must know if they're currently at a station or working
//if they're working
function createPlayerEvents(store) {
    return {
        //gets back data from the backend?
        "result"(success: boolean, station: String) {
            store.currentStation = station;
            store.success = success;
        },
        //this is for when theyre in the waiting area
        "start"() {
            store.start.value = true;
        }
    }
}

const stationEvents = {

}
const screenEvents = {

}
function onAnyEvent(socket: Socket, eventMap: Record<string, (event, ...args: any[]) => void>) {
    Object.entries(eventMap).forEach(([eventNames, callback]) => {
        socket.onAny((event, ...args) => {
            const handler = eventMap[event];
            if (handler) handler(args);
        });
    })
}
//dumb backend example or smth
//idk
// function test(io: Socket) {
//     io.on("connection", (socket: Socket) => {
//         //example of idea refine it later
//         const role = socket.handshake.query.role;
//         const stationType = socket.handshake.query.stationType;
//         //really dont need to group the stations together
//         if (role === "station") {
//             socket.join(`station:${stationType}`)
//         }
//         else if (role === "player") {
//             socket.join("players")
//         }
//         if (role === "screen") {

//         }
//     })
// }
const playerSockets = new Map();
const playerState = new Map();
//basic idea is to have the backend keep track of the informatiojn stuff
//when it wants to target a specific player look it up in the playerSocket map
//get the respective socketId and use that to send a message
//for player specific 


//backend stores playerSockets

//backend uniq thingie

export function getUniqId() {
    return 10;
}



export const useSocketStore = defineStore("socketStore", () => {
    let socket: Socket | null = null;
    const currentStation = ref(null);
    const completedTasks = ref([]);
    const playerId = ref(null);
    const start = ref(false);
    //initiation stuff
    function connect(role: string) {
        playerId.value = getUniqId();
        socket = io("ws://backend:3000", {
            query: { role, playerId: playerId.value },
        });
        // BUILT EVENT TABLE USING STORE AS CONTEXT
        const handlers = role === "player"
            ? createPlayerEvents({ currentStation, completedTasks })
            : {};
        // Register handlers dynamically
        for (const eventName in handlers) {
            socket.on(eventName, (...args) => handlers[eventName](...args));
        }
    }

    return {
        connect,
        start,
        currentStation,
        completedTasks,
    };
});