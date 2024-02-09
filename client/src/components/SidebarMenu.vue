<script setup lang="ts">
import VButton from '@/components/ui/VButton.vue'
import BlurBackdropModal from '@/components/ui/modal/BlurBackdropModal.vue'
import VCloseMenuIcon from '@/components/ui/VCloseMenuIcon.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const emit = defineEmits(['close', 'showAuth'])
</script>

<template>
  <BlurBackdropModal @click="emit('close')">
    <VCloseMenuIcon @click="emit('close')" />
    <div class="flex grow flex-col justify-between">
      <div class="flex flex-col gap-2">
        <VButton color="secondary" text="xl" @click="emit('showAuth')"> Sign in </VButton>
        <VButton color="secondary" text="xl"> Auctions </VButton>
      </div>
      <div class="flex flex-col gap-2">
        <VButton color="primary" text="xl"> Create + </VButton>
        <VButton v-if="userStore.isLogin" @click="userStore.logout()" color="danger" text="xl">
          Log out
        </VButton>
      </div>
    </div>
  </BlurBackdropModal>
</template>

<style scoped></style>
