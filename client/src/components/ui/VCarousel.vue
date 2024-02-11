<script setup lang="ts">
import { API_STATIC } from '@/http'
import Carousel, { type CarouselResponsiveOptions } from 'primevue/carousel'

const responsiveOptions: CarouselResponsiveOptions[] = [
  {
    breakpoint: '1280px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '768px',
    numVisible: 1,
    numScroll: 1
  }
]
const props = defineProps<{
  value: string[] | undefined
}>()
</script>

<template>
  <Carousel
    :value="value"
    :numScroll="1"
    :num-visible="3"
    contentClass="flex justify-center items-center"
    containerClass="flex justify-center items-center border-2 border-black rounded-xl"
    :circular="true"
    :responsiveOptions="responsiveOptions"
    class="flex items-center lg:w-[90vw]"
  >
    <template #item="slotProps">
      <img
        class="mx-auto h-[50vh] w-[50vh] rounded-xl object-cover"
        :src="`${API_STATIC + slotProps.data}`"
        alt="Img"
        crossorigin="use-credentials"
      />
    </template>
  </Carousel>
</template>

<style scoped></style>
