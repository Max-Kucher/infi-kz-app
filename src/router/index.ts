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

import { SUPPORT_LOCALES, loadLocaleMessages, setI18nLanguage } from '@/i18n'

export const createAppRouter = (i18n: I18n) => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })

  router.beforeEach(async (to, from, next) => {
    const locale = to.params.locale ?? i18n.global.locale

    if (locale && !SUPPORT_LOCALES.includes(locale)) {
      return next(`/${i18n.global.locale}`)
    }

    if (!i18n.global.availableLocales.includes(locale)) {
      await loadLocaleMessages(i18n, locale)
    }

    setI18nLanguage(i18n, locale)

    return next()
  })

  return router
}
