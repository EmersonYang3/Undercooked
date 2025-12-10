import enums from "@shared/enums"
import { useRequestNotifStore } from "@/stores/messageStore";
import { HostStore } from "@/stores/roleStores";
//operates on the assumption that the notifStore instace has been constructed or smth
export const hostEvents = (hostStore: HostStore): Record<string, (...args: any[]) => void> => {
    const notifStore = useRequestNotifStore();
    return {
        [enums.serverToHostRemotes.clientPendingJoin]: (identifier: { identifier: string }) => {
            console.log("client requesting to join:", identifier.identifier);
            notifStore.addRequest({
                client_name: identifier.identifier,
                message: `Allow ${identifier.identifier} to join?`,
                expiry: 10,
            });
        },
        [enums.serverToHostRemotes.newClientJoined]: (client: number) => {
            console.log("new client joined", client);
            hostStore.players.push(client);
        },

        [enums.serverToHostRemotes.stationPendingJoin]: (identifier: { identifier: string }) => {
            notifStore.addRequest({
                client_name: identifier.identifier,
                message: `Allow station ${identifier.identifier} to join?`,
                expiry: 10,
            });
        },
        [enums.serverToHostRemotes.newStationJoined]: (station: number) => {
            console.log("new station joined", station);
            hostStore.stations.push(station);
        },
    };
};
export const initialHostEvents = (store: HostStore): Record<string, (...args: any[]) => void> => ({
    [enums.serverToHostRemotes.lobbyStarted]: (lobbyCode: { lobbyCode: string }) => {
        console.log("Lobby code received : ", lobbyCode);
    },
    //fix this thing
    "some_replacer": (id: number) => {
        store.joinRequest(id);
    }
});