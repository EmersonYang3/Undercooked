export type SignalConnection = {
    Disconnect: () => void,
    DisconnectAll: () => void,
}

export type SignalType = {
    Connect: (callback: (...args: any) => void) => SignalConnection,
    Once: (callback: (...args: any) => void) => void,
    Wait: () => Promise<any>,

    DisconnectAll: () => void,

    Fire: (...args: any) => void,
}

export class Signal implements SignalType {
    private subscribers: Set<(...args: any) => void> = new Set();

    Connect(callback: (...args: any) => void): SignalConnection {
        this.subscribers.add(callback);

        return {
            Disconnect: () => this.subscribers.delete(callback),
            DisconnectAll: () => this.subscribers.clear()
        };
    }

    DisconnectAll: () => void = () => {
        this.subscribers.clear();
    }

    Once(callback: (...args: any) => void): void {
        const wrapper = (...args: any) => {
            callback(...args);
            this.subscribers.delete(wrapper);
        };

        this.subscribers.add(wrapper);
    }

    Wait(callback?: () => void): Promise<any> {
        return new Promise((resolve) => {
            const wrapper = (...args: any) => {
                resolve(args);
                this.subscribers.delete(wrapper);
            };

            this.subscribers.add(wrapper);

            if (callback) callback();
        })
    }

    Fire(...args: any): void {
        this.subscribers.forEach((callback) => callback(...args));
    }

    IsConnected(): boolean {
        return this.subscribers.size > 0;
    }
}