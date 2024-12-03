import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import IndexPage from '../views/IndexPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: IndexPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  console.log(to)
})

export default router
