import enums from "shared/enums"
import defaultRoute from "./routes/defaultRoute"
import dispenseRoute from "./routes/dispenseRoute"
import emptyRoute from "./routes/emptyRoute"
import submitRoute from "./routes/submitRoute"

export default {
    "defaultRoute": defaultRoute,
    [enums.stationTypes.submitStation]: submitRoute,
    [enums.stationTypes.dispenseStation]: dispenseRoute,
    [enums.stationTypes.emptyStation]: emptyRoute,
}