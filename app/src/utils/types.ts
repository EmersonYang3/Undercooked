export type notificationOptionEntry = {
    optionText?: string;
    handlerKey?: string;
}

export type notificationEntry = {
    message: string;

    options?: notificationOptionEntry[];
    callbackParameters?: Record<string, any>;
}