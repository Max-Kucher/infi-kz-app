<script setup lang="ts">
import {IonPage, IonRouterOutlet, IonHeader, IonContent, IonRow, IonCol} from '@ionic/vue'
import AppLogo from '@/components/AppLogo.vue'
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonRow>
        <IonCol class="flex gap-2">
          <AppLogo :to="{ name: 'auth-login' }" />
        </IonCol>
      </IonRow>
    </IonHeader>

    <IonContent>
      <IonRouterOutlet />
    </IonContent>
  </IonPage>
</template>
