let currentLobbyData = {}
let currentLobbyCode = ''

function generateLobbyCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;

    let result = '';

    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;

}

function lobbyExists(lobbyCode: string): boolean {
    return (lobbyCode === currentLobbyCode && lobbyCode !== '')
}

export default { generateLobbyCode, lobbyExists }