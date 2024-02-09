<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarMenu from '@/components/SidebarMenu.vue'
import { ref, watch } from 'vue'
import VShowMenuIcon from '@/components/ui/VShowMenuIcon.vue'
import VFadeTransition from '@/components/ui/transitions/VFadeTransition.vue'
import AuthorizationModal from '@/components/ui/modal/AuthorizationModal.vue'

const showMenu = ref<boolean>(false)
const showAuth = ref<boolean>(false)

function handleShowAuth() {
  showMenu.value = false
  showAuth.value = true
}

function toggleScroll(show: boolean) {
  if (show) {
    document.body.classList.add('fixed')
  } else {
    document.body.classList.remove('fixed')
  }
}

watch(showMenu, toggleScroll)
watch(showAuth, toggleScroll)
</script>

<template>
  <VShowMenuIcon @click="showMenu = true" />
  <RouterView />
  <VFadeTransition>
    <SidebarMenu
      :show="showMenu"
      v-if="showMenu"
      @close="showMenu = false"
      @show-auth="handleShowAuth"
    />
  </VFadeTransition>
  <VFadeTransition>
    <AuthorizationModal :show="showAuth" v-if="showAuth" @close="showAuth = false" />
  </VFadeTransition>
</template>

<style scoped></style>
