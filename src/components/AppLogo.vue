<script setup lang="ts">
import { IonImg, IonButton } from '@ionic/vue'
import { type HTMLAttributes } from 'vue'
import {RouteLocationRaw, useRouter} from 'vue-router'
import { cn } from '@/helpers/ui'

const props = withDefaults(defineProps<{
  to?: RouteLocationRaw
  linkClass?: HTMLAttributes['class']
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
    <IonImg src="https://example.com" />
  </IonButton>
</template>
