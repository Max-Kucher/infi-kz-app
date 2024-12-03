<script setup lang="ts">
import { IonText } from '@ionic/vue'

defineProps<{
  text?: string
}>()
</script>

<template>
<div class="text-center">
  <div class="flex items-center w-full">
    <div class="flex-1 h-px bg-gray-400" />

    <IonText
      v-if="text"
      class="text-sm px-2"
      color="medium"
    >
      {{ text }}
    </IonText>

    <div class="flex-1 h-px bg-gray-400" />
  </div>
</div>
</template>
