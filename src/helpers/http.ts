import { type HttpResponse } from '@capacitor/core'

export const processResponse = async (
    response: HttpResponse,
    successCallback: () => void | Promise<void>
) => {
    if (response.status >= 200 && response.status < 300) {
        await successCallback()
    }
}

export const objectToQueryString = (initialObj: Record<string, any>) => {
    const reducer = (obj: Record<string, any>, parentPrefix = null) => (prev: any, key: string) => {
        const val = obj[key]
        key = encodeURIComponent(key)
        const prefix = parentPrefix ? `${parentPrefix}[${key}]` : key

        if (val == null || typeof val === 'function') {
            prev.push(`${prefix}=`)
            return prev
        }

        if (['number', 'boolean', 'string'].includes(typeof val)) {
            prev.push(`${prefix}=${encodeURIComponent(val)}`)
            return prev
        }

        // prev.push(Object.keys(val).reduce(reducer(val, prefix ?? null), []).join('&'))
        return prev
    };

    return Object.keys(initialObj).reduce(reducer(initialObj), []).join('&')
};

