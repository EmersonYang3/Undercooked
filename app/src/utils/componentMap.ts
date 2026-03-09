
import { Component } from "vue";
import sharedEnums from "@shared/enums";
import Submit from "@/components/Stations/Static/Submit.vue";
import Dispense from "@/components/Stations/Static/Dispense.vue";
import Dispose from "@/components/Stations/Static/Dispose.vue";
import Empty from "@/components/Stations/Static/Empty.vue";
import Blending from "@/components/Stations/Gameplay/Blending.vue";
import Dicing from "@/components/Stations/Gameplay/Dicing.vue";
import Boiling from "@/components/Stations/Gameplay/Boiling.vue";
import Frying from "@/components/Stations/Gameplay/Frying.vue";

let stationTypes = sharedEnums.stationTypes;



/* Static components 
- Defined as components that don't implement any sort of gameplay and 
only really do animations or show stuff.
*/
export const staticComponentsMap: Record<string, Component> = {
    [stationTypes.submitStation]: Submit,
    [stationTypes.dispenseStation]: Dispense,
    [stationTypes.disposeStation]: Dispose,
    [stationTypes.emptyStation]: Empty,
}

/* Dynamic components 
- Defined as components that do implement some sort of gameplay and requires transfering 
total screen control to the component for gameplay. 
*/
export const dynamicComponentsMap: Record<string, Component> = {
    [stationTypes.blendingStation]: Blending,
    [stationTypes.dicingStation]: Dicing,
    [stationTypes.boilingStation]: Boiling,
    [stationTypes.fryingStation]: Frying,
}
