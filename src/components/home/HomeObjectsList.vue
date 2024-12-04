<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonImg, IonCardContent } from '@ionic/vue'
import { useAppObjects } from '@/composables/useAppObjects'

const { objectsSearch } = useAppObjects()
const objects = await objectsSearch({
  type: 'restaurant',
  skip_facets: true,
})
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
        </IonCard>
      </IonCol>
    </IonRow>
  </IonGrid>
</div>
</template>
