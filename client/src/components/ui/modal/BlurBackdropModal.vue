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
  large: ['']
}

const props = withDefaults(defineProps<Props>(), {
  position: 'left',
  size: 'medium'
})
</script>

<template>
  <div class="fixed top-0 z-10 h-full w-full p-14 backdrop-blur-md">
    <div
      class="flex h-full flex-col gap-5 rounded-2xl bg-white p-5"
      :class="modalSize['medium']"
      @click.stop
    >
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
