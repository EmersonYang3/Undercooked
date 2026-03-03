import { NotificationCallbackParameters } from "@/utils/types";

import workersRegistry from "./HandlerWorkers/workersRegistry";

function dispatchNotificationHandler(handlerKey: string, parameters: NotificationCallbackParameters, id: number, ...args: any[]) {
    const handlerWorker = workersRegistry[handlerKey];
    if (!handlerWorker || !handlerWorker.onCallback) { return }

    handlerWorker.onCallback(parameters, id, ...args)
}

export default dispatchNotificationHandler