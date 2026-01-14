import { createRouter, createWebHistory } from 'vue-router'

import HomeScreen from '@/views/HomeScreen.vue'
import HostingLobby from '@/views/HostingLobby.vue'

const routes = [
    {
        path: '/',
        name: "Main",
        component: HomeScreen
    },
    {
        path: '/hosting',
        name: "HostingLobby",
        component: HostingLobby
    }
]

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })

export default router
