<script setup lang="ts">
import BlurBackdropModal from '@/components/ui/modal/BlurBackdropModal.vue'
import VInput from '@/components/ui/VInput.vue'
import VTextarea from '@/components/ui/VTextarea.vue'
import VSelect from '@/components/ui/VSelect.vue'
import VButton from '@/components/ui/VButton.vue'
import { ref } from 'vue'
import { array, number, object, string, ValidationError } from 'yup'
import { useAuctionsStore } from '@/stores/auctions'
import type { ICategory } from '@/models/ICategorie'
import { useRouter } from 'vue-router'
import type { IAuctionPatch } from '@/models/IAuctionPatch'

const auctionDataSchema = object({
  name: string().min(10),
  description: string().min(255),
  startBid: number().positive().min(100),
  minPitch: number().positive().min(10),
  categories: array(),
  closesAt: string()
})

const auctionsStore = useAuctionsStore()

const router = useRouter()

const auctionData = ref<IAuctionPatch>({
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
  for (const key in auctionData.value) {
    //Set empty fields to undefined for ignoring changes
    auctionData.value[key] = auctionData.value[key] === '' ? undefined : auctionData.value[key]
  }
  try {
    auctionDataSchema.validateSync(auctionData.value)
    auctionData.value.categories = (auctionData.value.categories as ICategory[]).map((el) => {
      return el.id
    })
    if (selectedFiles.value) {
      const formData = new FormData()
      for (let i = 0; i < selectedFiles.value?.length; i++) {
        formData.append('imgs', selectedFiles.value[i])
      }
      formData.append('data', JSON.stringify(auctionData.value))
      await auctionsStore.patchAuction(props.lotId, formData)
      emit('close')
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

const props = defineProps<{
  lotId: string
}>()
const emit = defineEmits(['close'])
</script>

<template>
  <BlurBackdropModal @click="emit('close')" position="right" size="full">
    <form
      class="h-full overflow-y-scroll md:flex md:flex-row md:gap-10 md:overflow-y-auto"
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
          id="fileInput"
          @change="selectFile"
          type="file"
          class="hidden"
          multiple
        />
      </div>
      <div class="flex flex-col gap-2 md:mb-0 md:grow md:basis-0">
        <div class="mb-4 flex flex-col gap-2 md:mb-0 md:grow md:basis-0">
          <VInput v-model="auctionData.name" placeholder="Title" />
          <VTextarea v-model="auctionData.description" placeholder="Description" />
          <div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <VInput v-model="auctionData.startBid" type="number" placeholder="Start price" />
            <VInput v-model="auctionData.minPitch" type="number" placeholder="Minimum pitch" />
          </div>
          <VSelect
            v-model="auctionData.categories"
            placeholder="Categories"
            :options="auctionsStore.categories"
          />
          <VInput v-model="auctionData.closesAt" type="date" placeholder="Minimum pitch" />
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
