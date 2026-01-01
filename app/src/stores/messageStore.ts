import { defineStore } from "pinia";
import { reactive } from "vue";
export type joinRole = "player" | "station";
export type JoinRequest = {
    id: number;
    client_name: number;
    message: string;
    role: joinRole;
    expiry?: number;
};

export const useRequestNotifStore = defineStore("requestNotif", () => {
    const requests = reactive<JoinRequest[]>([]);
    const timers = new Map<number, any>();

    function addRequest(req: Omit<JoinRequest, "id">) {
        const id = Date.now();
        const request: JoinRequest = { id, ...req };
        requests.push(request);

        if (request.expiry && request.expiry > 0) {
            startExpiryTimer(id);
        }
    }

    function startExpiryTimer(id: number) {
        const timer = setInterval(() => {
            const r = requests.find(m => m.id === id);
            if (!r) {
                clearInterval(timer);
                return;
            }

            if (r.expiry !== undefined) {
                r.expiry--;

                if (r.expiry <= 0) {
                    removeRequest(id);
                    clearInterval(timer);
                }
            }
        }, 1000);

        timers.set(id, timer);
    }

    function removeRequest(id: number) {
        const i = requests.findIndex(m => m.id === id);
        if (i !== -1) requests.splice(i, 1);

        if (timers.has(id)) {
            clearInterval(timers.get(id));
            timers.delete(id);
        }
    }

    return {
        requests,
        addRequest,
        removeRequest,
    };
});
export type MessageStore = ReturnType<typeof useRequestNotifStore>; 