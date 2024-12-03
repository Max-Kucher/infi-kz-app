import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import IndexPage from '../views/IndexPage.vue'

import {I18n, useI18n} from 'vue-i18n'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: IndexPage,
  },
  {
    path: '/auth',
    name: 'auth',
    redirect: { name: 'auth-login' },
    children: [
      {
        path: '/login',
        name: 'auth-login',
        component: () => import('@/views/auth/LoginPage.vue'),
      },
    ],
  },
]

import { localeRouterHelper } from '@/i18n'

export const createAppRouter = (i18n: I18n) => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })

  router.beforeEach(async (to, from, next) => {
    await localeRouterHelper(i18n, to, from, next)
    return next()
  })

  return router
}
