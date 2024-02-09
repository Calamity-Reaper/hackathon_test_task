<script setup lang="ts">
import BlurBackdropModal from '@/components/ui/modal/BlurBackdropModal.vue'
import VCloseMenuIcon from '@/components/ui/VCloseMenuIcon.vue'
import VButton from '@/components/ui/VButton.vue'

const emit = defineEmits(['close'])
</script>

<template>
  <BlurBackdropModal @click="emit('close')" position="right" size="large">
    <VCloseMenuIcon class="absolute" @click="emit('close')" />
    <div class="flex grow flex-col items-center justify-center">
      <form class="flex w-[70%] flex-col gap-4" @submit.prevent>
        <h3 class="text-center text-2xl font-bold">login to account</h3>
        <input
          type="email"
          class="w-full rounded-xl border-2 border-black p-3"
          placeholder="E-mail"
        />
        <input
          type="password"
          class="w-full rounded-xl border-2 border-black p-3"
          placeholder="Password"
        />
        <VButton type="submit" color="primary" text="xl"> Log In</VButton>
      </form>
    </div>
  </BlurBackdropModal>
</template>

<style scoped></style>
