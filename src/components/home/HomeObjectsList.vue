<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonImg, IonCardContent, IonButton } from '@ionic/vue'
import { Share } from '@capacitor/share'

import { useAppObjects } from '@/composables/useAppObjects'

const { objectsSearch } = useAppObjects()
const objects = await objectsSearch({
  type: 'restaurant',
  skip_facets: true,
})

const canShare = await Share.canShare()
</script>

<template>
<div>
  <IonGrid>
    <IonRow>
      <IonCol
        v-for="object in objects.data?.results"
        :key="`homepage-object-${object.id}`"
        size-xl="3"
        size-lg="4"
        size-sm="6"
        size="12"
      >
        <IonCard>
          <IonImg
            v-if="object.photos?.length"
            :src="object.photos[0].image"
          />
          <IonCardHeader>
            <IonCardTitle>
              {{ object.name }}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div class="line-clamp-3">
              {{ object.shortDescription }}
            </div>
          </IonCardContent>

          <IonButton
            v-if="canShare"
            fill="clear"
            @click="async () => {
              /**
                * ToDo: Refactor this
                */
              await Share.share({
                title: object.name,
                url: `http://localhost:3000/restaurants/${object.slug}`,
              })
            }"
          >
            {{ $t('general.share') }}
          </IonButton>
        </IonCard>
      </IonCol>
    </IonRow>
  </IonGrid>
</div>
</template>
