import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '@/views/SplashView.vue'
import TerminalView from '@/views/TerminalView.vue'
import HostView from '@/views/HostView.vue'
import ClientView from '@/views/ClientView.vue'
import FruitDice from '@/components/FruitDice.vue'
import OvenTerm from '@/components/OvenTerm.vue'
import BoilTerminal from '@/components/BoilTerminal.vue'
import RequestNotif from '@/components/RequestNotif.vue'
import RecipeSelector from '@/components/RecipeSelector.vue'
import TerminalDropdown from '@/components/TerminalDropdown.vue'
import SubmitStation from '@/components/TimerExample.vue'
import OvenTerminal from '@/components/OvenTerminal.vue'
const prefix = '/terminal'

const routes = [
  { path: '/', name: "Splash", component: SplashView },
  { path: '/host', name: 'Host', component: TerminalDropdown },
  { path: '/terminal', name: 'Terminal', component: TerminalView },
  { path: '/client', name: 'Client', component: ClientView },
  { path: `${prefix}/slice`, name: 'Slice Terminal', component: FruitDice },
  { path: `${prefix}/keymash`, name: 'Mash Key', component: OvenTerminal },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
