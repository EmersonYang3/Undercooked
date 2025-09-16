import express from "express"

import { createServer } from "http"
import { Server } from "socket.io"
import { io } from "socket.io-client"

const app = express()
const httpServer = createServer(app)

const serverPort = new Server(httpServer, {cors: {origin: "*"}})
const clientPort = io("http://localhost:4000")

serverPort.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("howdy", (args) => {
    console.log(args)
  })
});

httpServer.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});