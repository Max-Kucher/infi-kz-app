import type {NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded} from 'vue-router'
import { type RouteLocationRaw } from 'vue-router'
import {useAuthStore} from "@/stores/authStore";

export interface AppRouteAuthMeta {
    publicOnly?: boolean
}

const defaultAuthorizedRedirectRoute: RouteLocationRaw = {
    name: 'index',
}

const defaultUnauthorizedRedirectRoute: RouteLocationRaw = {
    name: 'auth-login',
}

export const authRouterHelper = async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalizedLoaded
) => {
    const routeAuthMeta = (to.meta.auth ?? {
        publicOnly: false,
    }) as AppRouteAuthMeta
    const { authToken } = useAuthStore()

    if (routeAuthMeta.publicOnly === true
        && authToken?.length
    ) {
        return from.path === to.path
            ? defaultAuthorizedRedirectRoute
            : from
    }

    if (routeAuthMeta.publicOnly === false
        && !authToken?.length
    ) {
        return from.path === to.path
            ? defaultUnauthorizedRedirectRoute
            : from
    }
}
