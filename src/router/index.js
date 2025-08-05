import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/OrderView.vue')
    },
{
      path: '/policy',
      name: 'policy',
      component: () => import('../components/policy.vue')
    },
{
      path: '/laws',
      name: 'laws',
      component: () => import('../views/laws.vue')
    },
    {
  path: '/products',
  name: 'product',
  component: () => import('../views/Products.vue')
}
  ]
})

export default router

