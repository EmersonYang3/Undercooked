export type notificationEntry = {
    message: string;

    options?: Record<string, string>;
    callbackParameters?: Record<string, any>;
    handlerKey?: string;
}