import express from "express"

import { createServer } from "http"
import { Server } from "socket.io"
import { io } from "socket.io-client"

import connValidatorService from "./services/connValidator.ts"
import connRouterService from "./services/connRouter.ts"

const app = express()
const httpServer = createServer(app)

const serverPort = new Server(httpServer, {cors: {origin: "*"}})
const clientPort = io("http://localhost:4000", {auth: { intendedRole: "host", targetLobbyCode: "JOHNNYSUCKS" }});

serverPort.use(connValidatorService.validateConnection);

serverPort.on("connection", (socket) => {
  connRouterService.onConnected(socket)
});

httpServer.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
})

clientPort.on("host:connected", (data) => {
  console.log("Connected as host to lobby:", data.lobbyCode, "with identifier:", data.hostIdentifier);
});

setTimeout(() => {
  clientPort.disconnect();
}, 2500);
