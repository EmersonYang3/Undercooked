// @ts-nocheck

import { createServer } from 'http'
import { Server as IOServer } from 'socket.io'
import { io as Client } from 'socket.io-client'
const assert = require('assert')

import sharedEnums from 'shared/enums'
import validateConnection from 'services/connValidator'
import connectionRouter from 'services/connRouter'

async function startServer() {
    const httpServer = createServer()
    const ioServer = new IOServer(httpServer, { cors: { origin: '*' } })

    ioServer.use((socket: any, next: any) => validateConnection(socket, next))
    ioServer.on('connection', (socket: any) => connectionRouter(socket))

    await new Promise<void>((resolve) => httpServer.listen(0, () => resolve()))

    const addr = httpServer.address()
    const port = typeof addr === 'object' && addr ? addr.port : addr
    const url = `http://localhost:${port}`
    return { httpServer, ioServer, url }
}

async function runTest() {
    const { httpServer, ioServer, url } = await startServer()

    // Connect host
    const host = Client(url, { auth: { intendedRole: sharedEnums.gameRoles.host }, transports: ['websocket'] })

    // Wait for lobbyStarted
    const lobbyStarted = new Promise<any>((resolve, reject) => {
        host.once(sharedEnums.serverToHostRemotes.lobbyStarted, (data: any) => resolve(data))
        host.once(sharedEnums.sharedRemotes.connectError, (err: any) => reject(err))
        host.once('error', (err: any) => reject(err))
    })

    try {
        const data = await lobbyStarted
        assert(data && data.lobbyCode, 'Expected lobbyStarted with lobbyCode')
        const lobbyCode = data.lobbyCode
        console.log(`Host created lobby: ${lobbyCode}`)

        // Host auto-accepts clients and stations
        host.on(sharedEnums.serverToHostRemotes.clientPendingJoin, (payloadHost: any) => {
            try {
                assert(payloadHost && payloadHost.identifier)
                host.emit(sharedEnums.hostToServerRemotes.acceptClientJoin, payloadHost.identifier)
                console.log('Host accepted client')
            } catch (e) {
                console.error('Host client accept failed', e)
            }
        })

        host.on(sharedEnums.serverToHostRemotes.stationPendingJoin, (payloadHost: any) => {
            try {
                assert(payloadHost && payloadHost.identifier)
                // Accept station as 'emptyStation' for test
                host.emit(sharedEnums.hostToServerRemotes.acceptStationJoin, payloadHost.identifier, sharedEnums.stationTypes.emptyStation)
                console.log('Host accepted station')
            } catch (e) {
                console.error('Host station accept failed', e)
            }
        })

        // Connect first client
        const client1 = Client(url, { auth: { intendedRole: sharedEnums.gameRoles.client, lobbyCode }, transports: ['websocket'] })

        const client1Accepted = new Promise<any>((resolve, reject) => {
            client1.once(sharedEnums.serverToClientRemotes.clientAccepted, (specialKey: any) => resolve(specialKey))
            client1.once(sharedEnums.sharedRemotes.connectError, (err: any) => reject(err))
            client1.once('error', (err: any) => reject(err))
        })

        const specialKey1 = await client1Accepted
        assert.strictEqual(typeof specialKey1, 'string', 'Expected special key (string)')
        console.log('Client 1 special key:', specialKey1)
        console.log('Client 1 joined successfully')

        // Connect second client
        const client2 = Client(url, { auth: { intendedRole: sharedEnums.gameRoles.client, lobbyCode }, transports: ['websocket'] })

        const client2Accepted = new Promise<any>((resolve, reject) => {
            client2.once(sharedEnums.serverToClientRemotes.clientAccepted, (specialKey: any) => resolve(specialKey))
            client2.once(sharedEnums.sharedRemotes.connectError, (err: any) => reject(err))
            client2.once('error', (err: any) => reject(err))
        })

        const specialKey2 = await client2Accepted
        assert.strictEqual(typeof specialKey2, 'string', 'Expected special key (string)')
        console.log('Client 2 special key:', specialKey2)
        console.log('Client 2 joined successfully')

        // Connect first station
        const station1 = Client(url, { auth: { intendedRole: sharedEnums.gameRoles.station, lobbyCode }, transports: ['websocket'] })

        const station1Assigned = new Promise<any>((resolve, reject) => {
            station1.once(sharedEnums.serverToStationRemotes.stationAssigned, (stationType: any) => resolve(stationType))
            station1.once(sharedEnums.sharedRemotes.connectError, (err: any) => reject(err))
            station1.once('error', (err: any) => reject(err))
        })

        const assignedType1 = await station1Assigned
        assert.strictEqual(assignedType1, sharedEnums.stationTypes.emptyStation, 'Expected station assigned as emptyStation')
        console.log('Station 1 assigned type:', assignedType1)
        console.log('Station 1 joined successfully')

        // Connect second station
        const station2 = Client(url, { auth: { intendedRole: sharedEnums.gameRoles.station, lobbyCode }, transports: ['websocket'] })

        const station2Assigned = new Promise<any>((resolve, reject) => {
            station2.once(sharedEnums.serverToStationRemotes.stationAssigned, (stationType: any) => resolve(stationType))
            station2.once(sharedEnums.sharedRemotes.connectError, (err: any) => reject(err))
            station2.once('error', (err: any) => reject(err))
        })

        const assignedType2 = await station2Assigned
        assert.strictEqual(assignedType2, sharedEnums.stationTypes.emptyStation, 'Expected station assigned as emptyStation')
        console.log('Station 2 assigned type:', assignedType2)
        console.log('Station 2 joined successfully')

        // Now, host starts the game
        host.emit(sharedEnums.hostToServerRemotes.startLobby)

        // Wait for game started on clients and stations
        const gameStartedClient1 = new Promise<void>((resolve) => {
            client1.once(sharedEnums.serverToClientRemotes.gameStarted, (data: any) => {
                console.log('Client 1 gameStarted payload:', data);
                resolve();
            })
        })

        const gameStartedClient2 = new Promise<void>((resolve) => {
            client2.once(sharedEnums.serverToClientRemotes.gameStarted, (data: any) => {
                console.log('Client 2 gameStarted payload:', data);
                resolve();
            })
        })

        const gameStartedStation1 = new Promise<void>((resolve) => {
            station1.once(sharedEnums.serverToStationRemotes.gameStarted, (data: any) => {
                console.log('Station 1 gameStarted payload:', data);
                resolve();
            })
        })

        const gameStartedStation2 = new Promise<void>((resolve) => {
            station2.once(sharedEnums.serverToStationRemotes.gameStarted, (data: any) => {
                console.log('Station 2 gameStarted payload:', data);
                resolve();
            })
        })

        await Promise.all([gameStartedClient1, gameStartedClient2, gameStartedStation1, gameStartedStation2])

        console.log('✅ Further expanded connection test passed — host, 2 clients, 2 stations joined, and game started')

        // cleanup
        try { client1.disconnect() } catch (e) { }
        try { client2.disconnect() } catch (e) { }
        try { station1.disconnect() } catch (e) { }
        try { station2.disconnect() } catch (e) { }
        try { host.disconnect() } catch (e) { }
        try { ioServer.close() } catch (e) { }
        await new Promise<void>((resolve) => httpServer.close(() => resolve()))
        process.exit(0)
    } catch (err) {
        console.error('❌ Connection test failed:', err)
        try { ioServer && ioServer.close() } catch (e) { }
        try { httpServer && httpServer.close(() => { }) } catch (e) { }
        process.exit(1)
    }
}

runTest()

