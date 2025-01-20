// import SellerPage from '@/views/SellerPage.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/sellerpage',
    // component: SellerPage,
    component: () => import('@/views/SellerPage.vue'),
  },
  {
    path: '/trendpage',
    component: () => import('@/views/TrendPage.vue')
  },
  {
    path: '/mappage',
    component: () => import('@/views/MapPage.vue')
  },
  {
    path: '/rankpage',
    component: () => import('@/views/RankPage.vue')
  },
  {
    path: '/hotpage',
    component: () => import('@/views/HotPage.vue')
  },
  {
    path: '/budgetpage',
    component: () => import('@/views/BudgetPage.vue')
  },
  ],
})

export default router
