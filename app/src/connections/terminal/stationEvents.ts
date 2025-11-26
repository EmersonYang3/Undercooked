import { Socket } from "socket.io-client";


//both clients and terminal will have the start event as they will both be in a a waiting area/room prior

export const stationEvents: Record<string, (...args: any[]) => void> = {
    "start": () => {

    },
    "end": () => {
        //graceful clean up of stuff
    },
    "disconnect": () => {
        //backend breaks so everything else has to try and figure out what to do
    },
    "error": () => {
        //idk basic debugging or smth 
    },
    "update": () => {
        //
    },
    "request": () => {
        //make a request of the backends state 
    },
    "sync": () => {
        //force the terminal to sync with what the backend knows
        //updates state and what not
    }
}

//this should not be a callback as its emitting parameters/values instead of recieving them
//doing this temporarily for easier prototyping
const TerminalToBackend: Record<string, (...args: any[]) => void> = {
    "update": () => {
        //takes an id
        //makes a basic request to the backend to update its state or infom it of some clients state
        //2 way verificiation where both terminal and client both establish that the other wants to connect
        //prevents somenbody else activiating another persons key? 
        //dk how to figure this out
    },
    "request": () => {
        //simple request for information on a player
        //takes in the players uniqueId
    },
    "state": () => {
        //sends either a true or false (ready or not) or for more complex
        //sends an array of the stuff open
        //example dfrying pan station: [true, true, false] indicates last frying pan isnt occupied
        //send the state of the terminal back
        //this happens on the start of the game and when a game finishes
        //allows the backend to update its screen on what terminals are available to be used    
        //specific implementation based on the terminal type 
    },
    "error": () => {
        //tells the backend something bad has happened (only really debugging tbh)
    },
    "heartbeat": () => {
        //some sort of sync check to indicate the terminal is still running or smth

    },
    "sync": () => {
        //explicit sync event incase the terminal ever panics and has desynced from the backend in terms of what it knows
    }
}




//INFO THE BACKEND(BIG SCREEN) will display
//Terminal readiness (which are used rn)
//terminal items - some terminals are constnatly open, items are continously placed on it
//ex: frying pan terminal (just waiting so u can go do other stuff, while the terminal is running)
//this might require a unique event specifically for it
//



export function registerEvents(socket: Socket, eventMap: Record<string, (...args: any[]) => void>) {
    Object.entries(eventMap).forEach(([eventNames, callback]) => {
        socket.on(eventNames, (...args: any[]) => {
            callback(...args);
        });
    });
}

//obviously cant do the same thing for emits1
export function onAnyEvent(socket: Socket, eventMap: Record<string, (event, ...args: any[]) => void>) {
    Object.entries(eventMap).forEach(([eventNames, callback]) => {
        socket.onAny((event, ...args) => {
            const handler = eventMap[event];
            if (handler) handler(args);
        });
    })
}