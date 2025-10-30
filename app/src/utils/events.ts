type Callback = () => void;
export function tempwrapper(callback: Callback, client_array: Array<string>) {
    document.addEventListener('keydown', (event) => {
        const keyPressed = event.key.toLowerCase();
        if (client_array.includes(keyPressed)) {
            callback()
        };
    }, { once: true });
}
//add in the shared folder variables here for data matching
//the data could be anything tbh as long as it's serialized beforehand
//the only issue is determining if the backend will accept the data

export function communicate_with_backend(data: any) {
    
}
//determine event links