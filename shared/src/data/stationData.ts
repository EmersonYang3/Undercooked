import sharedEnums from "../enums"
import type { internalStationData } from "../types"

const methods = sharedEnums.methods
const stationsTypes = sharedEnums.stationTypes

const stationData: Record<string, internalStationData> = {
    [stationsTypes.emptyStation]: {},
    [stationsTypes.disposeStation]: {},

    [stationsTypes.boilingStation]: { method: methods.boil },
    [stationsTypes.fryingStation]: { method: methods.fry },
    [stationsTypes.dicingStation]: { method: methods.dice }
}

export default stationData