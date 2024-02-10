<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarMenu from '@/components/SidebarMenu.vue'
import { onErrorCaptured, onMounted, ref, watch } from 'vue'
import VShowMenuIcon from '@/components/ui/VShowMenuIcon.vue'
import VFadeTransition from '@/components/ui/transitions/VFadeTransition.vue'
import AuthorizationModal from '@/components/ui/modal/AuthorizationModal.vue'
import { useUserStore } from '@/stores/user'
import ErrorModal from '@/components/ui/modal/ErrorModal.vue'
import { ValidationError } from 'yup'
import { AxiosError } from 'axios'

interface ErrorModalInfo {
  isVisible: boolean
  error: string
}

const userStore = useUserStore()

const showMenu = ref<boolean>(false)
const showAuth = ref<boolean>(false)
const errorModal = ref<ErrorModalInfo>()

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

onMounted(async () => {
  await userStore.refresh()
})

onErrorCaptured((err) => {
  errorModal.value = {
    isVisible: true,
    error: err.message
  }
  setTimeout(() => {
    errorModal.value = {
      isVisible: false,
      error: ''
    }
  }, 5000)
  return false
})
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
  <VFadeTransition>
    <ErrorModal v-if="errorModal?.isVisible" :message="errorModal?.error" />
  </VFadeTransition>
</template>

<style scoped></style>
