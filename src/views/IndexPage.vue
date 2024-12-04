<script lang="ts" setup>
import { IonPage, IonTitle, IonHeader, IonContent } from '@ionic/vue'
import AppLogo from '@/components/AppLogo.vue'
import HomeObjectsList from '@/components/home/HomeObjectsList.vue'
</script>

<template>
  <IonPage>
    <IonHeader class="flex">
      <AppLogo class="p-1" />
      <IonTitle>
        {{ $t('home.title') }}
      </IonTitle>
    </IonHeader>
    <IonContent>
      <Suspense>
        <HomeObjectsList />
      </Suspense>
    </IonContent>
  </IonPage>
</template>
