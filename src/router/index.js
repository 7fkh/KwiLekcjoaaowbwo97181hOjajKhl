import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsPlace from '@/components/ProductsPlace.vue'
import OrderView from '@/views/OrderView.vue'

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
      props: true
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

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
