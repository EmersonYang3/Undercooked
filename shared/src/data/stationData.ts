import sharedEnums from "../enums"
import type { internalStationData } from "../types"

const methods = sharedEnums.methods
const stationsTypes = sharedEnums.stationTypes

const stationData: Record<string, internalStationData> = {
    [stationsTypes.emptyStation]: { method: "" },
    [stationsTypes.boilingStation]: { method: methods.boil }
}

export default stationData