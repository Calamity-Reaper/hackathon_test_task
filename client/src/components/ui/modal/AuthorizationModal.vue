<script setup lang="ts">
import BlurBackdropModal from '@/components/ui/modal/BlurBackdropModal.vue'
import VCloseMenuIcon from '@/components/ui/VCloseMenuIcon.vue'
import VButton from '@/components/ui/VButton.vue'
import { ref } from 'vue'
import VInput from '@/components/ui/VInput.vue'
import VUnderlineLink from '@/components/ui/VUnderlineLink.vue'

type authTypeValues = 'login' | 'register'

const authType = ref<authTypeValues>('login')

const emit = defineEmits(['close'])

function setFormType() {
  if (authType.value === 'login') {
    authType.value = 'register'
  } else {
    authType.value = 'login'
  }
}
</script>

<template>
  <BlurBackdropModal @click="emit('close')" position="right" size="large">
    <VCloseMenuIcon class="absolute" @click="emit('close')" />
    <div class="flex grow flex-col items-center justify-center">
      <form class="flex w-[70%] flex-col items-center gap-4" @submit.prevent>
        <template v-if="authType === 'login'">
          <h3 class="text-center text-2xl font-bold">Login to account</h3>
          <VInput type="email" placeholder="E-mail" />
          <VInput type="password" placeholder="Password" />
          <VButton type="submit" color="primary" text="xl">Log In</VButton>
        </template>
        <template v-else>
          <h3 class="text-center text-2xl font-bold">Register new account</h3>
          <VInput type="email" placeholder="E-mail" />
          <VInput type="text" placeholder="username" />
          <VInput type="password" placeholder="Password" />
          <VButton type="submit" color="primary" text="xl">Register</VButton>
        </template>
        <VUnderlineLink
          @click.prevent="setFormType"
          :text="authType === 'login' ? 'No account yet?' : 'Already have account?'"
        />
      </form>
    </div>
  </BlurBackdropModal>
</template>

<style scoped></style>
