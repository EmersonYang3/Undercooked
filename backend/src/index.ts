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
    console.log(`Backend server running on port: ${sharedEnums.portServer.port}`)
})

// import { io } from "socket.io-client"

// const handshakeDataHost = { auth: { intendedRole: 'host', lobbyCode: "ABCDEF" } }
// const clientSocketHost = io(`http://localhost:${sharedEnums.portServer.port}`, handshakeDataHost)

// clientSocketHost.on(sharedEnums.sharedRemotes.connectError, (err) => {
//     console.log(`Connection error: ${err.message}`)
// })

// const handshakeDataClient = { auth: { intendedRole: 'station', lobbyCode: "ABCDEF" } }
// const clientSocketClient = io(`http://localhost:${sharedEnums.portServer.port}`, handshakeDataClient)

// clientSocketHost.on(sharedEnums.serverToHostRemotes.clientPendingJoin, (data: any) => {
//     clientSocketHost.emit(sharedEnums.hostToServerRemotes.acceptClientJoin, data.identifier)
// })

// clientSocketClient.on(sharedEnums.serverToClientRemotes.clientAccepted, (specialKey: string) => {
//     console.log(`Client accepted with special key: ${specialKey}`)
// })

// clientSocketClient.on(sharedEnums.sharedRemotes.connectError, (err) => {
//     console.log(`Connection error: ${err.message}`)
// })

// clientSocketClient.on(sharedEnums.sharedRemotes.connect, () => {
//     console.log("Client connected successfully")
// })
