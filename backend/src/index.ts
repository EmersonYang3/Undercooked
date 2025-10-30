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
    console.log(`Backend server running on http://localhost:${sharedEnums.portServer.port}`)
})

// For testing purposes only
import { io } from "socket.io-client"

const authData = {auth: {intendedRole: 'host', lobbyCode: "ABCDEF"}}
const clientSocketHost = io(`http://localhost:${sharedEnums.portServer.port}`, authData)

clientSocketHost.on("connect_error", (err) => {
    console.log(`Connection error: ${err.message}`)
})

const clientSocketClient = io(`http://localhost:${sharedEnums.portServer.port}`, {auth: {intendedRole: 'client', lobbyCode: "ABCDEF"}})

clientSocketHost.on(sharedEnums.serverToHostRemotes.clientPendingJoin, (data: any) => {
    clientSocketHost.emit(sharedEnums.hostToServerRemotes.acceptClientJoin, data.identifier)
})

clientSocketClient.on(sharedEnums.serverToClientRemotes.clientAccepted, (specialKey: string) => {
    console.log(`Client accepted with special key: ${specialKey}`)
})