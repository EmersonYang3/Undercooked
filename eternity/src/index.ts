import express from "express"

import validateConnection from "services/connValidator"
import connectionRouter from "services/connRouter"

import { createServer } from "http"
import { Server } from "socket.io"

import sharedEnums from "shared/enums"

const app = express()
const httpServer = createServer(app)

const serverPort = new Server(httpServer, { cors: { origin: "*" } })

serverPort.use(validateConnection)

serverPort.on("connection", (socket) => { connectionRouter(socket) })

httpServer.listen(sharedEnums.portServer.port, () => {
    console.log(`Eternity server running on http://localhost:${sharedEnums.portServer.port}`)
})