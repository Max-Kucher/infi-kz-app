import type {NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded} from 'vue-router'
import { type RouteLocationRaw } from 'vue-router'

export interface AppRouteAuthMeta {
    publicOnly?: boolean
}

const defaultUnauthorizedRedirectRoute: RouteLocationRaw = {
    name: 'auth-login',
}

export const authRouterHelper = async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalizedLoaded,
    next: NavigationGuardNext
) => {
    const routeAuthMeta = (to.meta.auth ?? {
        publicOnly: false,
    }) as AppRouteAuthMeta

    if (routeAuthMeta.publicOnly !== true) {
        const redirecTo = from.path === to.path
            ? defaultUnauthorizedRedirectRoute
            : from

        next(redirecTo)
    }
}
