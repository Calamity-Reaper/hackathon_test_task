<script setup lang="ts">

interface Props {
  color: 'primary' | 'secondary'
  text: 'sm' | 'xl'
}

const buttonColors = {
  primary: ['bg-green-primary'],
  secondary: ['bg-white border-2 border-black']
}
const buttonTextSize = {
  sm: 'text-sm',
  xl: 'text-xl'
}

const props = defineProps<Props>()
</script>

<template>
  <button class="w-full py-1.5 rounded-xl hover:brightness-90 transition-all duration-200" :class="[buttonColors[color], buttonTextSize[text]]">
    <slot></slot>
  </button>
</template>

<style scoped>

</style>