import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '@/views/SplashView.vue'
import TerminalView from '@/views/TerminalView.vue'
import TerminalDropdown from '@/components/TerminalDropdown.vue'
import PlayerView from '@/views/PlayerView.vue'
import TestView from '@/views/TestView.vue'
import HostView from '@/views/HostView.vue'
const prefix = '/terminal'

export type StationType =
  | "stove"
  | "oven"
  | "toaster"
  | "boiler"
  | "mixer"
  | "brewer"
  | "assembler"
  | "dispenser";

// IMPORT YOUR TERMINAL COMPONENTS HERE
// (Example imports — replace with your real file paths)
import StoveTerminal from "@/components/terminals/StoveTerminal.vue"
import OvenTerminal from "@/components/terminals/OvenTerminal.vue"
import ToasterTerminal from "@/components/terminals/ToasterTerminal.vue"
import BoilerTerminal from "@/components/terminals/BoilerTerminal.vue"
import MixerTerminal from "@/components/terminals/MixerTerminal.vue"
import AssemblerTerminal from "@/components/terminals/AssemblerTerminal.vue"
import DispenserTerminal from "@/components/terminals/DispenserTerminal.vue"
const routes = [
  { path: '/', name: "Main", component: TestView },
  { path: '/join', name: "Join", component: SplashView },
  { path: '/host', name: 'Host', component: HostView },
  { path: '/terminal', name: 'Terminal', component: AssemblerTerminal },
  { path: '/player', name: 'Client', component: PlayerView },
]
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const stationRoutes = [
  { type: "stove", component: StoveTerminal },
  { type: "oven", component: OvenTerminal },
  { type: "toaster", component: ToasterTerminal },
  { type: "boiler", component: BoilerTerminal },
  { type: "mixer", component: MixerTerminal },
  { type: "assembler", component: AssemblerTerminal },
  { type: "dispenser", component: DispenserTerminal },
].map(s => ({
  path: `${prefix}/${s.type}`,
  name: `${capitalize(s.type)} Terminal`,
  component: s.component
}));


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
