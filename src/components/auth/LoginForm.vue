<script setup lang="ts">
import { IonInput, IonText, IonButton } from '@ionic/vue'
import { CapacitorHttp, type HttpResponse } from '@capacitor/core'
import { ref } from 'vue'
import AppDivider from '@/components/AppDivider.vue'
import { processResponse } from '@/helpers/http'
import {storeToRefs} from 'pinia'
import { useAuthStore } from '@/stores/authStore'

const isLoading = ref<boolean>(false)

const authStore = useAuthStore()
const { user, authToken } = storeToRefs(authStore)

const handleSubmit = async (e: SubmitEvent) => {
  isLoading.value = true
  const form = e.target as HTMLFormElement

  const formData = new FormData(form)
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    /**
     * ToDo: Move to AuthService
     */
    const response: HttpResponse = await CapacitorHttp.post({
      url: `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login/`,
      headers: { 'Content-Type': 'application/json' },
      data: { email, password },
    })

    await processResponse(response, async () => {
      await authStore.setAuthToken(response.data.access)
      await authStore.setAppUser(response.data.user)
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form
    action=""
    method="post"
    :aria-disabled="isLoading"
    @submit.prevent="handleSubmit"
  >
    <div>
      <div class="text-2xl font-medium">
        <IonText>
          {{ $t('components.authForm.title') }}
        </IonText>
      </div>
      <p>
        <IonText color="medium">
          {{ $t('components.authForm.subtitle') }}
        </IonText>
      </p>
    </div>

    <IonInput
      :label="$t('components.authForm.login')"
      label-placement="floating"
      fill="outline"
      name="email"
      :disabled="isLoading"
    />

    <IonInput
      :label="$t('components.authForm.password')"
      label-placement="floating"
      fill="outline"
      name="password"
      type="password"
      :disabled="isLoading"
    />

    <IonButton
      type="submit"
      :disabled="isLoading"
    >
      {{ $t('components.authForm.submit') }}
    </IonButton>

    <AppDivider
      class="my-4"
      :text="$t('components.authForm.fingerprintLogin')"
    />
  </form>
</template>
