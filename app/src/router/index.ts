import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '@/views/SplashView.vue'
import TerminalView from '@/views/TerminalView.vue'
import HostView from '@/views/HostView.vue'
import ClientView from '@/views/ClientView.vue'


const routes = [
  { path: '/', name: "Splash", component: SplashView },
  { path: '/host', name: 'Host', component: HostView },
  { path: '/terminal', name: 'Terminal', component: TerminalView },
  { path: '/client', name: 'Client', component: ClientView },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
