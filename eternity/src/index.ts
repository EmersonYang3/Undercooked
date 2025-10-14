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

// For testing purposes only
import { io } from "socket.io-client"

const socketEvents = sharedEnums.socketEvents

const authData = {auth: {intendedRole: 'host', lobbyCode: "ABCDEF"}}
const clientSocket = io(`http://localhost:${sharedEnums.portServer.port}`, authData)

clientSocket.on("connect_error", (err) => {
    console.log(`Connection error: ${err.message}`)
})

clientSocket.on(socketEvents.hostConnected, (data) => {
    console.log("Connected as host to lobby:", data.lobbyCode, "with identifier:", data.hostIdentifier)
})

setTimeout(() => {
    clientSocket.disconnect()
}, 2500)