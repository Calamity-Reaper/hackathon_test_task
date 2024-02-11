<script setup lang="ts">
import type { ICategory } from '@/models/ICategorie'

interface Props {
  options: ICategory[]
}

const props = defineProps<Props>()
</script>

<template>
  <v-select class="style-chooser" multiple :options="options" label="name" />
</template>

<style>
.style-chooser .vs__dropdown-toggle {
  height: 100%;
  border: 2px solid black;
  border-radius: 12px;
  padding: 12px;
}
.style-chooser .vs__dropdown-menu {
  max-height: 100px !important;
}
</style>
