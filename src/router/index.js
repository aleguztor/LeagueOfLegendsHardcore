import { createRouter, createWebHistory } from 'vue-router'
import champions from "../components/champions.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: champions
    },
    {
      path: '/about',
      name: 'about',
     
    },
    {
      path: '/ranking',
      name: 'ranking',
     
    }
  ]
})

export default router
