<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'cross' | 'menu'
  }>(),
  {
    type: 'menu'
  }
)
</script>

<template>
  <img
    class="h-5 w-5 cursor-pointer transition-all hover:scale-125"
    :src="type === 'menu' ? `/MenuClose.svg` : `/Cross.svg`"
    alt=""
  />
</template>

<style scoped></style>
