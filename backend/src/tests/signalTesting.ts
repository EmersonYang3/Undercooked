import { Signal } from "../../../shared/src/utils/signal"

const newSignal = new Signal()

newSignal.Connect((message: string) => {
    console.log("Received message:", message)
})

newSignal.Fire("Hello, world!")

newSignal.Fire("This is a test of the Signal class.")