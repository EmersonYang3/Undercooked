import Temporary1 from "@/components/Stations/Temporary1.vue";
import Temporary2 from "@/components/Stations/Temporary2.vue";
import { StationType } from "@/stores/rewrite/roleStores";
import { Component } from "vue";
export const componentMap: Record<StationType, Component> = {
    "stove": Temporary1,
    "assembler": Temporary1,
    "boiler": Temporary1,
    "brewer": Temporary1,
    "dispenser": Temporary1,
    "oven": Temporary1,
    "mixer": Temporary1,
    "toaster": Temporary1,

}