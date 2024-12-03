<script setup lang="ts">
import {IonPage, IonRouterOutlet, IonHeader, IonContent} from '@ionic/vue'
import AppLogo from '@/components/AppLogo.vue'
</script>

<template>
  <IonPage>
    <IonHeader>
      <AppLogo :to="{ name: 'auth-register' }" />
    </IonHeader>

    <IonContent>
      <IonRouterOutlet />
    </IonContent>
  </IonPage>
</template>
