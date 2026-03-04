
<template>
    <div
        class="flex flex-col items-center gap-4 p-6 rounded-xl bg-zinc-900 text-white w-80"
    >
        <h2 class="text-xl font-bold">
            🍳 Fry the Item
        </h2>

        <!-- Pan -->
        <div class="w-full h-4 bg-zinc-700 rounded-full overflow-hidden">
            <div
                class="h-full transition-all duration-100"
                :class="{
                    'bg-yellow-400': heat < 60,
                    'bg-orange-500': heat >= 60 && heat < 100,
                    'bg-red-600': heat >= 100
                }"
                :style="{ width: Math.min(heat, 120) + '%' }"
            />
        </div>
        <p
            v-if="state === 'idle'"
            class="text-zinc-400"
        >
            Press <span class="font-bold text-white">F</span> to fry
        </p>

        <p
            v-if="state === 'frying'"
            class="animate-pulse text-orange-400 font-semibold"
        >
            MASH F
        </p>

        <p
            v-if="state === 'perfect'"
            class="text-green-400 font-bold text-lg"
        >
            ✨ PERFECT FRY ✨
        </p>
        <p
            v-if="state === 'undercooked'"
            class="text-blue-400 font-bold text-lg"
        >
            🧊 UNDERCOOKED 🧊
        </p>

        <p
            v-if="state === 'burnt'"
            class="text-red-500 font-bold text-lg animate-shake"
        >
            💀 BURNT 💀
        </p>

        <button
            @click="start"
            class="mt-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
        >
            Restart
        </button>
    </div>
</template>
<script setup lang="ts">
import { trackKeyPress } from "@/services/KeyBindService"
import { ref, onMounted, onUnmounted } from "vue"
const heat = ref(0)
const timeLeft = ref(5000)
const state = ref<
    "idle" | "frying" | "perfect" | "burnt" | "undercooked"
>("idle")

let decayInterval: number | undefined
let timerInterval: number | undefined

const fryer = trackKeyPress(
    "f",
    () => {
        if (state.value !== "frying") return
        state.value = "perfect"
        stop()
    },
    (count) => count >= 20,
    () => {
        if (state.value === "perfect" || state.value === "burnt") return

        heat.value += 6
        state.value = "frying"

        if (heat.value >= 110) {
            state.value = "burnt"
            stop()
        }
    }
)

function start() {
    stop()

    heat.value = 0
    timeLeft.value = 5000
    state.value = "idle"

    fryer.reset()
    fryer.arm()

    decayInterval = window.setInterval(() => {
        if (state.value === "frying") {
            heat.value = Math.max(0, heat.value - 3)
        }
    }, 100)

    timerInterval = window.setInterval(() => {
        if (state.value === "perfect" || state.value === "burnt") return

        timeLeft.value -= 100

        if (timeLeft.value <= 0) {
            state.value = "undercooked"
            stop()
        }
    }, 100)
}

function stop() {
    fryer.disarm()

    if (decayInterval) {
        clearInterval(decayInterval)
        decayInterval = undefined
    }

    if (timerInterval) {
        clearInterval(timerInterval)
        timerInterval = undefined
    }
}

onMounted(start)
onUnmounted(stop)
</script>
