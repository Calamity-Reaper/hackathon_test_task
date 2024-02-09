<script setup lang="ts">
interface Props {
  text: string
}

const props = defineProps<Props>()
</script>

<template>
  <a
    class="after:bg-green-primary-dark relative w-fit cursor-pointer text-center after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:transition-all after:content-[''] hover:after:w-full"
  >
    {{ text }}
  </a>
</template>

<style scoped></style>
