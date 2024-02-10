<script setup lang="ts">
import BlurBackdropModal from '@/components/ui/modal/BlurBackdropModal.vue'
import VCloseMenuIcon from '@/components/ui/VCloseMenuIcon.vue'
import VButton from '@/components/ui/VButton.vue'
import { ref } from 'vue'
import VInput from '@/components/ui/VInput.vue'
import VUnderlineLink from '@/components/ui/VUnderlineLink.vue'
import { useUserStore } from '@/stores/user'
import { object, string, ValidationError } from 'yup'

type authTypeValues = 'login' | 'register'
interface AuthData {
  email: string
  password: string
  username: string
}

let formLoginSchema = object({
  email: string().email().required(),
  password: string().min(8).required()
})

let formRegisterSchema = object({
  email: string().email().required(),
  username: string().required(),
  password: string().min(8).required()
})

const formType = ref<authTypeValues>('login')
const authData = ref<AuthData>({
  email: '',
  username: '',
  password: ''
})

const userStore = useUserStore()

const emit = defineEmits(['close'])

function setFormType() {
  if (formType.value === 'login') {
    formType.value = 'register'
  } else {
    formType.value = 'login'
  }
}

async function submitForm(event: Event) {
  if (formType.value === 'login') {
    try {
      formLoginSchema.validateSync(authData.value)
      await userStore.login(authData.value.email, authData.value.password)
      emit('close')
      ;(event.target as HTMLFormElement).reset()
    } catch (e) {
      if (e instanceof ValidationError || e instanceof Error) {
        throw new Error(e.message)
      }
    }
  } else {
    try {
      formRegisterSchema.validateSync(authData.value)
      await userStore.register(
        authData.value.email,
        authData.value.username,
        authData.value.password
      )
      emit('close')
      ;(event.target as HTMLFormElement).reset()
    } catch (e) {
      if (e instanceof ValidationError || e instanceof Error) {
        throw new Error(e.message)
      }
    }
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
          <VInput required v-model="authData.email" type="email" placeholder="E-mail" />
          <VInput required v-model="authData.password" type="password" placeholder="Password" />
          <VButton type="submit" color="primary" text="xl">Log In</VButton>
        </template>
        <template v-else>
          <h3 class="text-center text-2xl font-bold">Register new account</h3>
          <VInput required v-model="authData.email" type="email" placeholder="E-mail" />
          <VInput required v-model="authData.username" type="text" placeholder="username" />
          <VInput required v-model="authData.password" type="password" placeholder="Password" />
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
