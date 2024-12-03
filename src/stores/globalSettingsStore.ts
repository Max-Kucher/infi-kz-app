import { defineStore } from 'pinia'
import {asyncComputed} from '@vueuse/core'

export const useGlobalSettingsStore = defineStore('globalSettings', () => {
    /**
     * ToDo: Add typed interface for global settings
     */
    const globalSettings = asyncComputed<Record<string, any>>({

    })

    return {
        globalSettings
    }
})
