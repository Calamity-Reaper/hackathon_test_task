<script setup lang="ts">
interface Props {
  time: string
  amount: number
  username: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="flex flex-wrap items-center justify-between rounded-xl bg-white p-3">
    <div class="text-sm">
      <b>@{{ username }} </b>
      <span>{{ time }}</span>
    </div>
    <div>
      <b>{{ amount }}₴</b>
    </div>
  </div>
</template>

<style scoped></style>
