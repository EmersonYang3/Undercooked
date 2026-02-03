export type notificationEntry = {
    message: string;

    options?: Record<string, string>;
    attributes?: Record<string, any>;
    callbacks?: Record<string, string>;
}