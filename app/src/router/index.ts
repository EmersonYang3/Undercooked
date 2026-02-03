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
    },
    {
        path: '/client',
        name: "ClientRoom",
        component: () => import('@/views/ClientRoom.vue'),
    },
    {
        path: '/terminal',
        name: "TerminalRoom",
        component: () => import('@/views/TerminalRoom.vue')
    },
    {
        path: '/host',
        name: "HostingView",
        component: () => import('@/views/HostView.vue')
    }
]
const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })
export default router
