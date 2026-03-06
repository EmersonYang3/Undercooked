import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: "Main",
        component: () => import('@/views/Waiting/HomeScreen.vue')
    },
    {
        path: '/hosting',
        name: "HostingLobby",
        component: () => import('@/views/Waiting/HostingLobby.vue')
    },
    {
        path: '/waiting',
        name: "WaitingRoom",
        component: () => import('@/views/Waiting/WaitingRoom.vue')
    },
    {
        path: '/client',
        name: "ClientRoom",
        component: () => import('@/views/Game/ClientRoom.vue'),
    },
    {
        path: '/terminal',
        name: "TerminalRoom",
        component: () => import('@/views/Game/TerminalRoom.vue')
    },
    {
        path: '/host',
        name: "HostingRoom",
        component: () => import('@/views/Game/HostView.vue')
    },
    {
        path: "/approved",
        name: "ApprovedRoom",
        component: () => import("@/views/Waiting/ApprovedRoom.vue")
    }
]
const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })
export default router
