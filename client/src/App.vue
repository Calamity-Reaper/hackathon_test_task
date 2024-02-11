<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarMenu from '@/components/SidebarMenu.vue'
import { onErrorCaptured, onMounted, ref, watch } from 'vue'
import VShowMenuIcon from '@/components/ui/VShowMenuIcon.vue'
import VFadeTransition from '@/components/ui/transitions/VFadeTransition.vue'
import AuthorizationModal from '@/components/ui/modal/AuthorizationModal.vue'
import { useUserStore } from '@/stores/user'
import ErrorModal from '@/components/ui/modal/ErrorModal.vue'
import ChangeUserInfo from '@/components/ui/modal/ChangeUserInfo.vue'
import CreateAuctionModal from '@/components/ui/modal/CreateAuctionModal.vue'
import { useAuctionsStore } from '@/stores/auctions'

interface ErrorModalInfo {
  isVisible: boolean
  error: string
}

const userStore = useUserStore()
const auctionsStore = useAuctionsStore()

const showMenu = ref<boolean>(false)
const showAuth = ref<boolean>(false)
const showChangeUserInfo = ref<boolean>(false)
const showCreateAuction = ref<boolean>(false)
const errorModal = ref<ErrorModalInfo>()

function handleShowAuth() {
  showMenu.value = false
  showAuth.value = true
}
function handleShowChangeUserInfo() {
  showMenu.value = false
  showChangeUserInfo.value = true
}
function handleShowCreateAuction() {
  showMenu.value = false
  showCreateAuction.value = true
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
watch(showChangeUserInfo, toggleScroll)
watch(showCreateAuction, toggleScroll)

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

onMounted(async () => {
  await auctionsStore.getAllCategories()
})
</script>

<template>
  <VShowMenuIcon @click="showMenu = true" />
  <RouterView />
  <VFadeTransition>
    <SidebarMenu
      v-if="showMenu"
      @close="showMenu = false"
      @show-auth="handleShowAuth"
      @show-personal-info="handleShowChangeUserInfo"
      @show-create-auction="handleShowCreateAuction"
    />
  </VFadeTransition>
  <VFadeTransition>
    <AuthorizationModal v-if="showAuth" @close="showAuth = false" />
  </VFadeTransition>
  <VFadeTransition>
    <ChangeUserInfo v-if="showChangeUserInfo" @close="showChangeUserInfo = false" />
  </VFadeTransition>
  <VFadeTransition>
    <ErrorModal v-if="errorModal?.isVisible" :message="errorModal?.error" />
  </VFadeTransition>
  <VFadeTransition>
    <CreateAuctionModal v-if="showCreateAuction" @close="showCreateAuction = false" />
  </VFadeTransition>
</template>

<style scoped></style>
