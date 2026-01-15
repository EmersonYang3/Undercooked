import { defineStore } from "pinia"
import { ref } from "vue"

export const useLobbyCodeStore = defineStore("lobbyCode", () => {
    const lobbyCode = ref<string>("")

    function isLobbyCodeValid(): boolean {
        return lobbyCode.value.length === 6
    }

    function setLobbyCode(code: string) {
        lobbyCode.value = code
    }

    return { lobbyCode, isLobbyCodeValid, setLobbyCode }
})