<script setup lang="ts">
import VButton from '@/components/ui/VButton.vue'
import BlurBackdropModal from '@/components/ui/modal/BlurBackdropModal.vue'
import VCloseMenuIcon from '@/components/ui/VCloseMenuIcon.vue'
import { useUserStore } from '@/stores/user'
import { API_STATIC } from '@/http'

const userStore = useUserStore()

const emit = defineEmits(['close', 'showAuth', 'showPersonalInfo'])

async function logout() {
  await userStore.logout()
  emit('close')
}
</script>

<template>
  <BlurBackdropModal @click="emit('close')">
    <VCloseMenuIcon @click="emit('close')" />
    <div class="mx-auto flex w-[70%] grow flex-col justify-between md:w-full">
      <template v-if="userStore.isLogin && userStore.user">
        <div class="flex flex-col items-center justify-center gap-2">
          <img
            class="h-40 w-40 rounded-full"
            crossorigin="use-credentials"
            :src="userStore.user?.avatar ? `${API_STATIC + userStore.user.avatar}` : `/avatar.webp`"
            alt="Avatar"
          />
          <p class="text-2xl font-bold">@{{ userStore.user?.username }}</p>
          <VButton color="secondary" text="xl"> Personal Area </VButton>
          <VButton color="secondary" text="xl"> Auctions </VButton>
          <VButton color="secondary" text="xl" @click="emit('showPersonalInfo')">
            Edit profile
          </VButton>
        </div>
        <div class="flex flex-col gap-2">
          <VButton color="primary" text="xl"> Create + </VButton>
          <VButton @click="logout" color="danger" text="xl"> Log out </VButton>
        </div>
      </template>
      <template v-else>
        <div class="flex flex-col gap-2">
          <VButton color="secondary" text="xl" @click="emit('showAuth')"> Sign in </VButton>
          <VButton color="secondary" text="xl"> Auctions </VButton>
        </div>
        <div class="flex flex-col gap-2">
          <VButton color="primary" text="xl"> Create + </VButton>
        </div>
      </template>
    </div>
  </BlurBackdropModal>
</template>

<style scoped></style>
