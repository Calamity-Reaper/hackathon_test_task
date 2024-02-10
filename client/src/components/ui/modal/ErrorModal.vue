<script setup lang="ts">
interface Props {
  message: string
}

const props = defineProps<Props>()
</script>

<template>
  <div
    class="fixed left-1/2 top-4 z-20 h-fit w-[40%] -translate-x-1/2 rounded-2xl border-2 border-red-600 bg-white py-1.5 text-center text-red-600"
  >
    <h2 class="font-bold">Error occurred!</h2>
    <p>{{ message }}</p>
  </div>
</template>

<style scoped></style>
