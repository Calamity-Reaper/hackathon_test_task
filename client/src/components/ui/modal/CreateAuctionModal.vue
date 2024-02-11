<script setup lang="ts">
import BlurBackdropModal from '@/components/ui/modal/BlurBackdropModal.vue'
import VInput from '@/components/ui/VInput.vue'
import VTextarea from '@/components/ui/VTextarea.vue'
import VSelect from '@/components/ui/VSelect.vue'
import VButton from '@/components/ui/VButton.vue'
import { ref } from 'vue'
import { array, number, object, string, ValidationError } from 'yup'
import { useAuctionsStore } from '@/stores/auctions'
import type { IAuctionCreate } from '@/models/IAuctionCreate'

const auctionDataSchema = object({
  name: string().required().min(10),
  description: string().required().min(255),
  startBid: number().required().positive().min(100),
  minPitch: number().required().positive().min(10),
  categories: array(),
  closesAt: string().required()
})

const auctionsStore = useAuctionsStore()

const auctionData = ref<IAuctionCreate>({
  name: '',
  description: '',
  startBid: '',
  minPitch: '',
  categories: [],
  closesAt: ''
})
const selectedFiles = ref<FileList | null>()

function triggerFileInput() {
  document.getElementById('fileInput')?.click()
}
function selectFile(event: Event) {
  selectedFiles.value = (event.target as HTMLInputElement).files
}

async function submitForm(event: Event) {
  try {
    auctionDataSchema.validateSync(auctionData.value)
    if (selectedFiles.value) {
      const formData = new FormData()
      for (let i = 0; i < selectedFiles.value?.length; i++) {
        formData.append('images[]', selectedFiles.value[i])
      }
      formData.append('lot-data', JSON.stringify(auctionData.value))
      await auctionsStore.createAuction(formData)
    }
    ;(event.target as HTMLFormElement).reset()
  } catch (e) {
    if (e instanceof ValidationError || e instanceof Error) {
      throw new Error(e.message)
    }
  }
}

function decline() {
  auctionData.value = {
    name: '',
    description: '',
    startBid: '',
    minPitch: '',
    categories: [],
    closesAt: ''
  }
  selectedFiles.value = undefined
  emit('close')
}

const emit = defineEmits(['close'])
</script>

<template>
  <BlurBackdropModal @click="emit('close')" position="right" size="full">
    <form
      class="h-full overflow-y-scroll md:flex md:flex-row md:gap-10"
      @submit.prevent="submitForm"
    >
      <div
        class="mb-4 flex h-[315px] cursor-pointer items-center justify-center rounded-2xl bg-green-primary md:mb-0 md:h-full md:grow md:basis-0"
        @click="triggerFileInput"
      >
        <div class="flex h-fit flex-col items-center">
          <img src="@/assets/img/icon/Upload.svg" alt="Upload files" />
          <p class="font-bold text-green-primary-dark">Upload up to 10 photos</p>
        </div>
        <VInput
          name="images"
          required
          id="fileInput"
          @change="selectFile"
          type="file"
          class="hidden"
          multiple
        />
      </div>
      <div class="flex flex-col gap-2 md:mb-0 md:grow md:basis-0">
        <div class="mb-4 flex flex-col gap-2 md:mb-0 md:grow md:basis-0">
          <VInput required v-model="auctionData.name" placeholder="Title" />
          <VTextarea required v-model="auctionData.description" placeholder="Description" />
          <div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <VInput
              required
              v-model="auctionData.startBid"
              type="number"
              placeholder="Start price"
            />
            <VInput
              required
              v-model="auctionData.minPitch"
              type="number"
              placeholder="Minimum pitch"
            />
          </div>
          <VSelect
            v-model="auctionData.categories"
            placeholder="Categories"
            :options="auctionsStore.categories"
          />
          <VInput required v-model="auctionData.closesAt" type="date" placeholder="Minimum pitch" />
        </div>
        <div class="flex gap-4">
          <VButton type="reset" color="danger" text="xl" @click="decline"> Decline </VButton>
          <VButton type="submit" color="primary" text="xl"> Accept </VButton>
        </div>
      </div>
    </form>
  </BlurBackdropModal>
</template>

<style scoped></style>
