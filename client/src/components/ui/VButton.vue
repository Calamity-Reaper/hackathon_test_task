<script setup lang="ts">
interface Props {
  color: 'primary' | 'secondary' | 'danger'
  text: 'sm' | 'xl'
  rounded?: 'none' | 'rounded'
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

const buttonRounded = {
  none: 'rounded-none',
  rounded: 'rounded-xl'
}

const props = withDefaults(defineProps<Props>(), {
  rounded: 'rounded'
})
</script>

<template>
  <button
    class="h-fit w-full py-1.5 transition-all duration-200 hover:brightness-90"
    :class="[buttonColors[color], buttonTextSize[text], buttonRounded[rounded]]"
  >
    <slot></slot>
  </button>
</template>

<style scoped></style>
