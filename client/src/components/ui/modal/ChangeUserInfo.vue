<script setup lang="ts">
import BlurBackdropModal from '@/components/ui/modal/BlurBackdropModal.vue'
import VCloseMenuIcon from '@/components/ui/VCloseMenuIcon.vue'
import VInput from '@/components/ui/VInput.vue'
import { API_STATIC } from '@/http'
import VButton from '@/components/ui/VButton.vue'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { object, string, ValidationError } from 'yup'

interface IChangeData {
  [key: string]: string | undefined
  email: string | undefined
  username: string | undefined
  password: string | undefined
}

const updateDataSchema = object({
  email: string().email(),
  username: string(),
  password: string().min(8)
})

const userStore = useUserStore()

const selectedFile = ref<File>()
const selectedFileUrl = ref<string>()
const patchData = ref<IChangeData>({
  email: '',
  username: '',
  password: ''
})

function triggerFileInput() {
  document.getElementById('fileInput')?.click()
}

function selectFile(event: Event) {
  selectedFile.value = (event.target as HTMLInputElement).files[0]
  if (selectedFile.value) {
    selectedFileUrl.value = URL.createObjectURL(selectedFile.value)
  }
}

async function submitForm(event: Event) {
  for (const key in patchData.value) {
    patchData.value[key] = patchData.value[key] === '' ? undefined : patchData.value[key]
  }
  try {
    updateDataSchema.validateSync(patchData.value)
    if (selectedFile.value) {
      const formData = new FormData()
      formData.append('img', selectedFile.value)
      await userStore.postMeAvatar(formData)
    }
    await userStore.patchMe(patchData.value)
    ;(event.target as HTMLFormElement).reset()
  } catch (e) {
    if (e instanceof ValidationError || e instanceof Error) {
      throw new Error(e.message)
    }
  }
}

function decline() {
  patchData.value = {
    email: '',
    username: '',
    password: ''
  }
  selectedFile.value = undefined
  emit('close')
}

const emit = defineEmits(['close'])
</script>

<template>
  <BlurBackdropModal @click="emit('close')">
    <VCloseMenuIcon @click="emit('close')" />
    <form
      @submit.prevent="submitForm"
      class="mx-auto flex w-[70%] grow flex-col justify-between md:w-full"
    >
      <div class="flex flex-col items-center justify-center gap-2">
        <div
          @click="triggerFileInput"
          class="relative cursor-pointer after:absolute after:top-0 after:z-20 after:flex after:h-full after:w-full after:items-center after:justify-center after:rounded-full after:bg-green-primary after:text-4xl after:opacity-0 after:transition-all after:content-['✎'] hover:after:opacity-50"
        >
          <img
            class="h-40 w-40 cursor-pointer rounded-full"
            crossorigin="use-credentials"
            :src="
              selectedFileUrl
                ? selectedFileUrl
                : userStore.user?.avatar
                  ? `${API_STATIC + userStore.user.avatar}`
                  : `/avatar.webp`
            "
            alt="Avatar"
          />
        </div>
        <VInput
          autocomplete="one-time-code"
          v-model="patchData.username"
          placeholder="New username"
        />
        <VInput
          autocomplete="one-time-code"
          v-model="patchData.email"
          placeholder="New email"
          type="email"
        />
        <VInput
          autocomplete="one-time-code"
          v-model="patchData.password"
          placeholder="New password"
          type="password"
        />
        <VInput
          id="fileInput"
          @change="selectFile"
          placeholder="New password"
          type="file"
          class="hidden"
        />
      </div>
      <div class="flex flex-col gap-2">
        <VButton type="submit" color="primary" text="xl"> Save </VButton>
        <VButton color="danger" text="xl" @click="decline"> Decline changes </VButton>
      </div>
    </form>
  </BlurBackdropModal>
</template>

<style scoped></style>
