<script setup lang="ts">
import BlurBackdropModal from '@/components/ui/modal/BlurBackdropModal.vue'
import VCloseMenuIcon from '@/components/ui/VCloseMenuIcon.vue'
import VButton from '@/components/ui/VButton.vue'
import { ref } from 'vue'
import VInput from '@/components/ui/VInput.vue'
import VUnderlineLink from '@/components/ui/VUnderlineLink.vue'
import { useUserStore } from '@/stores/user'

type authTypeValues = 'login' | 'register'
interface AuthData {
  email: string
  password: string
  username: string
}

const formType = ref<authTypeValues>('login')

const userStore = useUserStore()
const authData = ref<AuthData>({
  email: '',
  username: '',
  password: ''
})

const emit = defineEmits(['close'])

function setFormType() {
  if (formType.value === 'login') {
    formType.value = 'register'
  } else {
    formType.value = 'login'
  }
}

function submitForm() {
  if (formType.value === 'login') {
    userStore.login(authData.value.email, authData.value.password)
  } else {
    userStore.register(authData.value.email, authData.value.username, authData.value.password)
  }
}
</script>

<template>
  <BlurBackdropModal @click="emit('close')" position="right" size="large">
    <VCloseMenuIcon class="absolute" @click="emit('close')" />
    <div class="flex grow flex-col items-center justify-center">
      <form class="flex w-[70%] flex-col items-center gap-4" @submit.prevent="submitForm">
        <template v-if="formType === 'login'">
          <h3 class="text-center text-2xl font-bold">Login to account</h3>
          <VInput v-model="authData.email" type="email" placeholder="E-mail" />
          <VInput v-model="authData.password" type="password" placeholder="Password" />
          <VButton type="submit" color="primary" text="xl">Log In</VButton>
        </template>
        <template v-else>
          <h3 class="text-center text-2xl font-bold">Register new account</h3>
          <VInput v-model="authData.email" type="email" placeholder="E-mail" />
          <VInput v-model="authData.username" type="text" placeholder="username" />
          <VInput v-model="authData.password" type="password" placeholder="Password" />
          <VButton type="submit" color="primary" text="xl">Register</VButton>
        </template>
        <VUnderlineLink
          @click.prevent="setFormType"
          :text="formType === 'login' ? 'No account yet?' : 'Already have account?'"
        />
      </form>
    </div>
  </BlurBackdropModal>
</template>

<style scoped></style>
