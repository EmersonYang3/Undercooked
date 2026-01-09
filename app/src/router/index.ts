import { createRouter, createWebHistory } from 'vue-router'

import HomeScreen from '@/views/HomeScreen.vue'

const routes = [{ path: '/', name: "Main", component: HomeScreen }]
const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })

export default router
