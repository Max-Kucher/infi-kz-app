<script setup lang="ts">
import { IonImg, IonButton } from '@ionic/vue'
import { type HTMLAttributes } from 'vue'
import { RouteLocationRaw, useRouter } from 'vue-router'
import { cn } from '@/helpers/ui'

const props = withDefaults(defineProps<{
  to?: RouteLocationRaw
  linkClass?: HTMLAttributes['class']
  imageClass?: HTMLAttributes['class']
}>(), {
  to: {
    name: 'index',
  },
})

const router = useRouter()
const href = router.resolve(props.to)
</script>

<template>
  <IonButton
    :href="href.fullPath"
    fill="clear"
    :class="cn('m-0', linkClass)"
    style="--padding-bottom:0;--padding-end:0;--padding-start:0;--padding-top:0"
  >
    <!-- ToDo: Refactor, use local stored images -->
    <IonImg
      src="https://infi-kz.maxi-cart.com/images/logo/logo_hor_black.png"
      :alt="$t('components.logo.imageAlt')"
      :class="cn('w-24', imageClass)"
    />
  </IonButton>
</template>
