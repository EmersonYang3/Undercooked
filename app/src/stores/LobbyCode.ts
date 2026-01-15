import { defineStore } from "pinia"
import { ref } from "vue"

export const useLobbyCodeStore = defineStore("lobbyCode", () => {
    const lobbyCode = ref<string>("")

    function setLobbyCode(code: string) {
        lobbyCode.value = code
    }

    return { lobbyCode, setLobbyCode }
})