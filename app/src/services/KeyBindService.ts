import { useSocketStore } from "@/stores/SocketStore";
import { Signal, SignalConnection } from "@shared/utils/signal";
import sharedEnums from "@shared/enums"

let specialKeys: Set<string> = new Set<string>();
let LISTEN_FOR_SPECIAL_KEY_FLAG: boolean = false;

let heldDownTimers: Record<string, number> = {}
let onHeldDownListeners: Record<string, Signal> = {}
let onReleasedListeners: Record<string, Signal> = {}

const StationToServerRemotes = sharedEnums.stationToServerRemotes

function _Initialize() {
    document.addEventListener("keydown", (event) => {
        if (event.repeat) { return }

        const loweredKey = event.key.toLowerCase()
        heldDownTimers[loweredKey] = Date.now()

        if (LISTEN_FOR_SPECIAL_KEY_FLAG && specialKeys.has(loweredKey)) {
            useSocketStore().emitEvent(StationToServerRemotes.specialKeyPressed, loweredKey)
        }

        const heldDownSignal = onHeldDownListeners[loweredKey]
        if (!heldDownSignal) { return }

        heldDownSignal.Fire()
    })

    document.addEventListener("keyup", (event) => {
        const loweredKey = event.key.toLowerCase()
        const heldDownSignal = onReleasedListeners[loweredKey]
        if (!heldDownSignal) { return }

        const now = Date.now()
        const heldDownTime = now - (heldDownTimers[loweredKey] || now)
        heldDownSignal.Fire(heldDownTime)

        delete heldDownTimers[loweredKey]
    })
}

function _GetSignalOrCreate(key: string, listeners: Record<string, Signal>): Signal {
    if (!listeners[key]) {
        listeners[key] = new Signal()
    }

    return listeners[key]
}

function OnKeyHeldDown(key: string, callback: () => void): SignalConnection {
    const signal = _GetSignalOrCreate(key, onHeldDownListeners)

    return signal.Connect(callback)
}

function OnKeyReleased(key: string, callback: (number) => void): SignalConnection {
    const signal = _GetSignalOrCreate(key, onReleasedListeners)

    return signal.Connect(callback)
}

function RegisterSpecialKeys(keys: string[]) {
    for (const key of keys) {
        specialKeys.add(key.toLowerCase())
    }
}

function SetSpecialKeyListenFlag(value: boolean) {
    LISTEN_FOR_SPECIAL_KEY_FLAG = value;
}

_Initialize()

export default {
    OnKeyHeldDown,
    OnKeyReleased,
    RegisterSpecialKeys,
    SetSpecialKeyListenFlag
}