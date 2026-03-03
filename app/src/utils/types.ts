export type NotificationOptionEntry = {
    optionText?: string;
    handlerKey?: string;
    handlerArgs?: any[];
}

export type NotificationCallbackParameters = Record<string, any>;

export type NotificationInput = {
    message: string;

    options?: NotificationOptionEntry[];
    callbackParameters?: NotificationCallbackParameters;
}

export type NotificationEntry = NotificationInput & {
    id: number;
}

export type NotificationHandler = {
    onCallback: (parameters: NotificationCallbackParameters, id: number, ...args: any[]) => void;
}

