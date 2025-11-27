import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '@/views/SplashView.vue'
import TerminalView from '@/views/TerminalView.vue'
import TerminalDropdown from '@/components/TerminalDropdown.vue'
import OvenTerminal from '@/components/OvenTerminal.vue'
import PlayerView from '@/views/PlayerView.vue'
const prefix = '/terminal'

const routes = [
  { path: '/', name: "Splash", component: SplashView },
  { path: '/host', name: 'Host', component: TerminalDropdown },
  { path: '/terminal', name: 'Terminal', component: TerminalView },
  { path: '/client', name: 'Client', component: PlayerView },
  { path: `${prefix}/slice`, name: 'Slice Terminal', component: PlayerView },
  { path: `${prefix}/keymash`, name: 'Mash Key', component: OvenTerminal },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
