import express from "express"

import { createServer } from "http"
import { Server } from "socket.io"
import { io } from "socket.io-client"

import connValidatorService from "./services/connValidator.ts"
import connRouterService from "./services/connRouter.ts"

const app = express()
const httpServer = createServer(app)

const serverPort = new Server(httpServer, {cors: {origin: "*"}})
const clientPort = io("http://localhost:4000", {auth: { intendedRole: "host", targetLobbyCode: "ABCD1234" }});

serverPort.use(connValidatorService.validateConnection);

serverPort.on("connection", (socket) => {
  connRouterService.onConnected(socket)
  
  socket.on("disconnect", (reason) => connRouterService.onDisconnected(socket, reason));
});

httpServer.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
})

setTimeout(() => {
  clientPort.disconnect();
}, 1000);
