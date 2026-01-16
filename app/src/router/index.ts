import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: "Main",
        component: () => import('@/views/HomeScreen.vue')
    },
    {
        path: '/hosting',
        name: "HostingLobby",
        component: () => import('@/views/HostingLobby.vue')
    },
    {
        path: '/waiting',
        name: "WaitingRoom",
        component: () => import('@/views/WaitingRoom.vue')
    }
]

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })

export default router
