import enums from "@shared/enums"
import { initialPlayerEvents, playerEvents } from "./player/playerEvents"
import { initialTerminalEvents, terminalEvents } from "./terminal/terminalEvents"
import { initialHostEvents, hostEvents } from "./host/hostEvents"
import { RoleStore } from "@/stores/roleStores"
export const initialRoleEvents: Record<string, (store: RoleStore) => Record<string, (...args: any[]) => void>> = {
    [enums.gameRoles.host]: initialHostEvents,
    [enums.gameRoles.client]: initialPlayerEvents,
    [enums.gameRoles.station]: initialTerminalEvents,
}
export const RoleEvents: Record<string, (store: RoleStore) => Record<string, (...args: any[]) => void>> = {
    [enums.gameRoles.host]: hostEvents,
    [enums.gameRoles.client]: playerEvents,
    [enums.gameRoles.station]: terminalEvents,
}