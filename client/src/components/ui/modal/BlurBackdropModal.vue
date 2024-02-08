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
  size: 'medium',
})
</script>

<template>
  <div class="h-full w-full p-14 fixed top-0 z-10 backdrop-blur-md">
    <div class="bg-white flex flex-col gap-5 p-5 h-full rounded-2xl" :class="modalSize['medium']">
      <slot/>
    </div>
  </div>
</template>

<style scoped>

</style>