<script setup lang="ts">
interface Props {
  size?: 'medium' | 'large'
  position?: 'right' | 'center' | 'left'
}

const modalPosition = {
  right: ['ml-auto'],
  center: ['mx-auto'],
  left: ['mr-auto']
}

const modalSize = {
  medium: ['md:w-[50vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[20vw]'],
  large: ['md:w-[60vw] lg:w-[50vw] xl:w-[40vw] 2xl:w-[40vw]']
}

const props = withDefaults(defineProps<Props>(), {
  position: 'left',
  size: 'medium'
})
</script>

<template>
  <div class="fixed left-0 top-0 z-10 h-full w-full backdrop-blur-md md:p-14">
    <div
      class="flex h-full flex-col gap-5 bg-white p-5 md:rounded-2xl"
      :class="[modalSize[size], modalPosition[position]]"
      @click.stop
    >
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
