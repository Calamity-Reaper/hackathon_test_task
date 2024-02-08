<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SidebarMenu from '@/components/SidebarMenu.vue'
import { ref } from 'vue'
import VShowMenuIcon from '@/components/ui/VShowMenuIcon.vue'
import VFadeTransition from '@/components/ui/transitions/VFadeTransition.vue'

const showMenu = ref<boolean>(false)
</script>

<template>
  <div :class="{ 'overflow-y-hidden': showMenu }" class="h-dvh gutter-stable">
    <VShowMenuIcon @click="showMenu = true" />
    <VFadeTransition>
      <SidebarMenu :show="showMenu" v-if="showMenu" @close="showMenu = false" />
    </VFadeTransition>

    <RouterView />
  </div>
</template>

<style scoped></style>
