<script setup lang="ts">
import { IonPage, IonRow, IonCol } from '@ionic/vue'

import LoginForm from '@/components/auth/LoginForm.vue'

</script>

<template>
  <IonPage>
    <IonRow>
      <IonCol>
        <LoginForm class="flex flex-col gap-y-2" />
      </IonCol>
    </IonRow>
  </IonPage>
</template>
