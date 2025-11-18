import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '@/views/SplashView.vue'
import TerminalView from '@/views/TerminalView.vue'
import HostView from '@/views/HostView.vue'
import ClientView from '@/views/ClientView.vue'
import FruitDice from '@/components/FruitDice.vue'
import TestIcle from '@/components/TestIcle.vue'
import OvenTerm from '@/components/OvenTerm.vue'
import BoilTerminal from '@/components/BoilTerminal.vue'
import RequestNotif from '@/components/RequestNotif.vue'
import RecipeSelector from '@/components/RecipeSelector.vue'
import TerminalDropdown from '@/components/TerminalDropdown.vue'
const prefix = '/terminal'

const routes = [
  { path: '/', name: "Splash", component: SplashView },
  { path: '/host', name: 'Host', component: TerminalDropdown   },
  { path: '/terminal', name: 'Terminal', component: TerminalView },
  { path: '/client', name: 'Client', component: ClientView },
  { path: `${prefix}/slice`, name: 'Slice Terminal', component: FruitDice },
  { path: `${prefix}/keymash`, name: 'Mash Key', component: RequestNotif },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
