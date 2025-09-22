import express from "express"

import { createServer } from "http"
import { Server } from "socket.io"
import { io } from "socket.io-client"

import connValidatorService from "./services/connValidator.ts"

const app = express()
const httpServer = createServer(app)

const serverPort = new Server(httpServer, {cors: {origin: "*"}})
const clientPort = io("http://localhost:4000", {auth: { hacker: "JOHNNY " }});

serverPort.use(connValidatorService.validateConnection);

serverPort.on("connection", (socket) => {
  console.log("Client connected:", socket.id, socket.data);

  socket.on("disconnect", (reason) => {
    console.log(`Client disconnected: ${socket.id}, reason: ${reason}`);
  });
});

httpServer.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
})

setTimeout(() => {
  clientPort.disconnect();
}, 1000);
