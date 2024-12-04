import { ref } from 'vue'
import { computedAsync } from '@vueuse/core'
import { defineStore } from 'pinia'
import { CapacitorCookies } from '@capacitor/core'
import { Preferences } from '@capacitor/preferences'


export interface AppUserPermission {

}

export interface AppUserGroup {
    id: number,
    name: string
    permissions: AppUserPermission[]
}

export interface AppUser {
    id: number
    email: string
    first_name: string
    last_name: string
    full_name: string
    groups: AppUserGroup[]
    is_otp_enabled: boolean
}

export const AUTH_KEYS = {
    tokenCookieKey: 'auth-cookie',
    userPreferencesKey: 'auth-user',
} as const

export const useAuthStore = defineStore('auth', () => {
    const tokenTrigger = ref<number>(0)
    const userTrigger = ref<number>(0)

    const authToken = computedAsync<string | undefined>(async () => {
        tokenTrigger.value
        const authCookie = await CapacitorCookies.getCookies()

        return authCookie[AUTH_KEYS.tokenCookieKey]
    })

    const user = computedAsync<AppUser | undefined>(async () => {
        userTrigger.value
        const storedUser = await Preferences.get({ key: AUTH_KEYS.userPreferencesKey })
        if (storedUser.value) {
            return JSON.parse(storedUser.value) as AppUser
        }

        return undefined
    })

    const setAuthToken = async (token: string) => {
        await CapacitorCookies.setCookie({
            key: AUTH_KEYS.tokenCookieKey,
            value: token,
        })

        tokenTrigger.value = tokenTrigger.value + 1
    }

    const setAppUser = async (appUser: AppUser) => {
        await Preferences.set({
            key: AUTH_KEYS.userPreferencesKey,
            value: JSON.stringify(appUser),
        })

        userTrigger.value = userTrigger.value + 1
    }

    const clearAuthData = async () => {
        try {
            await CapacitorCookies.deleteCookie({ key: AUTH_KEYS.tokenCookieKey });
            await Preferences.remove({ key: AUTH_KEYS.userPreferencesKey });
        } catch (error) {
            console.error('Error on auth clear:', error);
        }
    }

    return {
        authToken,
        user,

        setAuthToken,
        setAppUser,
        clearAuthData,
    }
})
