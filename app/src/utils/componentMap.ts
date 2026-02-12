
import { Component } from "vue";
import sharedEnums from "@shared/enums";
import Submit from "@/components/ActualStations/Static/Submit.vue";
import Dispense from "@/components/ActualStations/Static/Dispense.vue";
import Dispose from "@/components/ActualStations/Static/Dispose.vue";
import Empty from "@/components/ActualStations/Static/Empty.vue";
import Blending from "@/components/ActualStations/Gameplay/Blending.vue";
import Dicing from "@/components/ActualStations/Gameplay/Dicing.vue";
import Boiling from "@/components/ActualStations/Gameplay/Boiling.vue";
import Frying from "@/ActualStations/Gameplay/Frying.vue";

let stationTypes = sharedEnums.stationTypes;

export const staticComponentsMap: Record<string, Component> = {
    [stationTypes.submitStation]: Submit,
    [stationTypes.dispenseStation]: Dispense,
    [stationTypes.disposeStation]: Dispose,
    [stationTypes.emptyStation]: Empty,
}
export const dynamicComponentsMap: Record<string, Component> = {
    [stationTypes.blendingStation]: Blending,
    [stationTypes.dicingStation]: Dicing,
    [stationTypes.boilingStation]: Boiling,
    [stationTypes.fryingStation]: Frying,
}