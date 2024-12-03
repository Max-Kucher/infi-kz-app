import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import { type I18n } from 'vue-i18n'
import { type AppRouteAuthMeta, authRouterHelper } from '@/helpers/auth'
import { localeRouterHelper } from '@/i18n/i18n'

// Pages
import IndexPage from '../views/IndexPage.vue'
import AuthPage from "@/views/auth/AuthPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: IndexPage,
  },
  {
    path: '/auth/',
    component: AuthPage,
    redirect: { name: 'auth-login' },
    children: [
      {
        path: '',
        name: 'auth',
        redirect: { name: 'auth-login' },
      },
      {
        path: 'login',
        name: 'auth-login',
        component: () => import('@/views/auth/LoginPage.vue'),
        meta: {
          auth: {
            publicOnly: true,
          } as AppRouteAuthMeta,
        },
      },
      {
        path: 'register',
        name: 'auth-register',
        component: () => import('@/views/auth/RegisterPage.vue'),
        meta: {
          auth: {
            publicOnly: true,
          },
        },
      },
    ],
  },
]

export const createAppRouter = (i18n: I18n) => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })

  router.beforeEach(async (to, from, next) => {
    await localeRouterHelper(i18n, to, from, next)
    await authRouterHelper(to, from, next)

    return next()
  })

  return router
}
