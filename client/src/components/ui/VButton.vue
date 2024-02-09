<script setup lang="ts">
interface Props {
  color: 'primary' | 'secondary' | 'danger'
  text: 'sm' | 'xl'
}

const buttonColors = {
  primary: ['bg-green-primary'],
  secondary: ['bg-white border-2 border-black'],
  danger: ['bg-red-500']
}
const buttonTextSize = {
  sm: 'text-sm',
  xl: 'text-xl'
}

const props = defineProps<Props>()
</script>

<template>
  <button
    class="w-full rounded-xl py-1.5 transition-all duration-200 hover:brightness-90"
    :class="[buttonColors[color], buttonTextSize[text]]"
  >
    <slot></slot>
  </button>
</template>

<style scoped></style>
