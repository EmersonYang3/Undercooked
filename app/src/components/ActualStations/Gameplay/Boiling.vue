<template>
    <div class="w-screen h-screen bg-black z-0">
        <div
            class="z-1 flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-zinc-900 to-black text-white select-none"
            :class="shake && 'animate-shake'"
        >
            <h2 class="text-3xl font-extrabold mb-4 tracking-wide">
            BOIL
            </h2>
            <!-- Timer -->
            <div class="mb-3 text-lg font-mono">
            Time Left: <span class="text-red-400">{{ timeLeft.toFixed(1) }}</span>s
            </div>
            <!-- Pot -->
            <div
            class="relative w-32 h-64 border-4 border-zinc-300 rounded-b-3xl overflow-hidden mb-4"
            :class="pulse && 'animate-pulse'"
            >
            <div
                class="absolute bottom-0 w-full transition-all duration-75"
                :style="{ height: heat + '%' }"
                :class="heatColor"
            />
            </div>

            <p class="text-lg font-bold mb-1">
            Heat: {{ heat.toFixed(0) }}%
            </p>

            <p class="text-sm opacity-70 mb-4">
            Sweet Spot: {{ sweetMin.toFixed(0) }}–{{ sweetMax.toFixed(0) }}%
            </p>

            <p v-if="gameOver" class="text-red-400 text-xl font-bold text-center">
            GAME OVER <br />
            Score: {{ score.toFixed(1) }}s
            </p>

            <p v-else-if="victory" class="text-green-400 text-xl font-bold text-center">
            YOU SURVIVED <br />
            Score: {{ score.toFixed(1) }}s
            </p>

            <p v-else class="opacity-70">
            Hold <strong class="text-yellow-400">SPACE</strong> to survive
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue"
import { createHoldTracker } from "@/services/keyHandlers"

const heat = ref(50)
const score = ref(0)
const gameOver = ref(false)
const victory = ref(false)

const GAME_DURATION = 20 // seconds
const timeLeft = ref(GAME_DURATION)

let sweetMin = ref(40)
let sweetMax = ref(70)

const HEAT_INCREASE = 70
const HEAT_DECREASE = 45
const JITTER = 15

const hold = createHoldTracker(" ", () => {}, () => {})

const heatColor = computed(() => {
    if (heat.value < sweetMin.value) return "bg-blue-500"
    if (heat.value > sweetMax.value) return "bg-red-500"
    return "bg-green-500"
})

const pulse = computed(() =>
    heat.value > 85 || heat.value < 15
)

const shake = computed(() =>
    heat.value > 90 || heat.value < 10
)

let lastTime = performance.now()
let loopId: number

function gameLoop(time: number) {
    const delta = (time - lastTime) / 1000
    lastTime = time

    timeLeft.value -= delta
    if (timeLeft.value <= 0) {
        victory.value = true
        endGame()
        return
    }

    sweetMin.value += delta * 0.6
    sweetMax.value -= delta * 0.6

    const chaos = (Math.random() - 0.5) * JITTER

    if (hold.isPressed()) {
        heat.value += (HEAT_INCREASE + chaos) * delta
    } else {
        heat.value -= (HEAT_DECREASE - chaos) * delta
    }

    heat.value = Math.max(0, Math.min(100, heat.value))

    if (
        heat.value >= sweetMin.value &&
        heat.value <= sweetMax.value
    ) {
        score.value += delta
    }

    if (heat.value <= 0 || heat.value >= 100) {
        gameOver.value = true
        endGame()
        return
    }

    loopId = requestAnimationFrame(gameLoop)
}

function endGame() {
    cancelAnimationFrame(loopId)
    hold.disarm()
}

onMounted(() => {
    hold.arm()
    loopId = requestAnimationFrame(gameLoop)
})

onUnmounted(() => {
    endGame()
})
</script>
<style>
/* Screen shake thingie */
@keyframes shake {
    0% { transform: translate(0) }
    25% { transform: translate(-3px, 2px) }
    50% { transform: translate(3px, -2px) }
    75% { transform: translate(-2px, -3px) }
    100% { transform: translate(0) }
}
.animate-shake {
    animation: shake 0.15s infinite;
    background: #000000;
}
</style>
