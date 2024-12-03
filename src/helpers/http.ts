import { type HttpResponse } from '@capacitor/core'

export const processResponse = async (
    response: HttpResponse,
    successCallback: () => void | Promise<vois>
) => {
    if (response.status >= 200 && response.status < 300) {
        await successCallback()
    }
}
