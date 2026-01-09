import { createRouter, createWebHistory } from 'vue-router'
import StartScreen from '@/views/Rewrite/StartScreen.vue'
import StationScreen from '@/views/Rewrite/StationScreen.vue'
import HostScreen from '@/views/Rewrite/HostScreen.vue'
import PlayerScreen from '@/views/Rewrite/PlayerScreen.vue'
const routes = [
  { path: '/', name: "Main", component: StartScreen },
  { path: '/station', name: "Join", component: StationScreen },
  { path: '/host', name: 'Host', component: HostScreen },
  { path: '/player', name: 'Client', component: PlayerScreen },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
