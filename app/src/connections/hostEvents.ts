import enums from "@shared/enums"
import { useRequestNotifStore } from "@/stores/messageStore";
import { HostStore } from "@/stores/roleStores";
import type { activeRecipe, foodItem } from "@shared/types";
//operates on the assumption that the notifStore instace has been constructed or smth
export const hostEvents = (hostStore: HostStore): Record<string, (...args: any[]) => void> => {
    const notifStore = useRequestNotifStore();
    return {
        [enums.serverToHostRemotes.clientPendingJoin]: (identifier: { identifier: number }) => {
            console.log("client requesting to join:", identifier.identifier);
            notifStore.addRequest({
                client_name: identifier.identifier,
                message: `Allow client ${identifier.identifier} to join?`,
                expiry: 10,
                role: "player"
            });
        },
        [enums.serverToHostRemotes.newClientJoined]: (client: number) => {
            console.log("new client joined", client);
            hostStore.players.push(client);
        },
        [enums.serverToHostRemotes.stationPendingJoin]: (identifier: { identifier: number }) => {
            notifStore.addRequest({
                client_name: identifier.identifier,
                message: `Allow station ${identifier.identifier} to join?`,
                expiry: 10,
                role: "station"
            });
            console.log("station attempting to join");
        },
        [enums.serverToHostRemotes.newStationJoined]: (station: number) => {
            console.log("new station joined", station);
            hostStore.stations.push(station);
        },

        [enums.serverToHostRemotes.newRecipe]: (recipe: activeRecipe) => {
            hostStore.setActiveRecipe(recipe.id, recipe);
        },
        [enums.serverToHostRemotes.recipeFinished]: (id: number) => {
            hostStore.deleteActiveRecipe(id);
        },
        [enums.serverToHostRemotes.scoreUpdate]: (newScore: number) => {
            hostStore.setScore(newScore);
        }
        //add the recipe shower 
        //the server emits out an array of recipes sent to the host screen
    };
};
export const initialHostEvents = (store: HostStore): Record<string, (...args: any[]) => void> => ({
    [enums.serverToHostRemotes.lobbyStarted]: (lobbyCode: { lobbyCode: string }) => {
        console.log("Lobby code received : ", lobbyCode);
    },
});
