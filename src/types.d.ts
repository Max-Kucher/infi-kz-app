import { HttpResponse } from '@capacitor/core'

const appObjectTypes = ['hotel', 'restaurant', 'banquetHall', 'sauna'] as const

declare global {
    export interface AppHttpResponse<T> extends HttpResponse {
        data: T
    }

    export interface ABackendResponse<T> {
        count: number
        next: null | string
        prev: null | string
        results: T[]
    }

    type AppObjectType = typeof appObjectTypes[number]
}
