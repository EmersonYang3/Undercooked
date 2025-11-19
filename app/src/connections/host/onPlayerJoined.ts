//tbh the only state management we really need is inventory synchronization
//timer is relatively simple as only backend has to really do anything for it
//everything else can be independent
//once the game timer finishes it sends a message to all the clients/terminals to stop

//socket test ig
const port = 3000;
import { io } from "socket.io-client";
const socket = io(`https://localhost:${port}`)
socket.on("connect", () => {
    console.log("Connected to server");
})
socket.emit("ping");



//establish some basic constants
const maxRecipes = 10;
//in ms 
const maxGameTime = 10 * 60 * 60 * 1000;




function updateInventory() {

}