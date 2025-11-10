import { Socket } from "socket.io-client";



//pinia store to store external state variables not specified in the callback
//ex: start ref which triggers everything in terms of state
//pinia stores can store both variables and function making it ideal for this 
//allows easy reusuability of stores based off the type of store requested


export const clientEventTable: Record<string, (...args: any[]) => void> = {
    "start": () => {

    },

}