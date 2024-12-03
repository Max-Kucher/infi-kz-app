<script setup lang="ts">
import { IonInput, IonText, IonButton } from '@ionic/vue'
import { ref } from 'vue'
import AppDivider from "@/components/AppDivider.vue";

const isLoading = ref<boolean>(false)

const handleSubmit = async () => {}
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
      :disabled="isLoading"
    />

    <IonInput
      :label="$t('components.authForm.password')"
      label-placement="floating"
      fill="outline"
      :disabled="isLoading"
    />

    <IonButton
      type="submit"
    >
      {{ $t('components.authForm.submit') }}
    </IonButton>

    <AppDivider
      class="my-4"
      :text="$t('components.authForm.fingerprintLogin')"
    />
  </form>
</template>
