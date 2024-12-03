import {isRef, nextTick} from 'vue'
import {createI18n, I18n, I18nOptions} from 'vue-i18n'
import type { NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router'

export const SUPPORT_LOCALES = ['en'] as const
export type AppLocale = typeof SUPPORT_LOCALES[number]

export async function setupI18n(options: I18nOptions = { locale: 'en' }) {
    const i18n = createI18n(options)
    setI18nLanguage(i18n, options.locale as string)
    await loadLocaleMessages(i18n, options.locale as string)

    return i18n
}

function setI18nLanguage(i18n: I18n, locale: AppLocale) {
    if (i18n.mode === 'legacy') {
        i18n.global.locale = locale
    } else if (isRef(i18n.global.locale)) {
        i18n.global.locale.value = locale
    }

    /**
     * NOTE:
     * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
     * The following is an example for axios.
     *
     * axios.defaults.headers.common['Accept-Language'] = locale
     */
    document.querySelector('html')?.setAttribute('lang', locale)
}

async function loadLocaleMessages(i18n: I18n, locale: AppLocale) {
    const messages = await import(`./locales/${locale}.json`)

    i18n.global.setLocaleMessage(locale, messages.default)

    return nextTick()
}

export const localeRouterHelper = async (
    i18n: I18n,
    to: RouteLocationNormalized,
    from: RouteLocationNormalizedLoaded,
    next: NavigationGuardNext
) => {
    const locale = to.params.locale ?? i18n.global.locale

    if (locale && !SUPPORT_LOCALES.includes(locale)) {
        return next(`/${i18n.global.locale}`)
    }

    if (!i18n.global.availableLocales.includes(locale)) {
        await loadLocaleMessages(i18n, locale)
    }

    setI18nLanguage(i18n, locale)
}