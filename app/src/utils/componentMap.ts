import BlendingStation from "@/components/Stations/BlendingStation.vue";
import BoilingStation from "@/components/Stations/BoilingStation.vue";
import DicingStation from "@/components/Stations/DicingStation.vue";
import DispenseStation from "@/components/Stations/DispenseStation.vue";
import DisposeStation from "@/components/Stations/DisposeStation.vue";
import EmptyStation from "@/components/Stations/EmptyStation.vue";
import FryingStation from "@/components/Stations/FryingStation.vue";
import SubmitStation from "@/components/Stations/SubmitStation.vue";

import { Component } from "vue";
import sharedEnums from "@shared/enums";

let stationTypes = sharedEnums.stationTypes;
export const componentMap: Record<string, Component> = {
    [stationTypes.submitStation]: SubmitStation,
    [stationTypes.dispenseStation]: DispenseStation,
    [stationTypes.emptyStation]: EmptyStation,
    [stationTypes.dicingStation]: DicingStation,
    [stationTypes.disposeStation]: DisposeStation,
    [stationTypes.fryingStation]: FryingStation,
    [stationTypes.blendingStation]: BlendingStation,
    [stationTypes.boilingStation]: BoilingStation,
}