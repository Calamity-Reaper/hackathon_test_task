<script setup lang="ts">
import { useAuctionsStore } from '@/stores/auctions'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VCarousel from '@/components/ui/VCarousel.vue'
import { storeToRefs } from 'pinia'
import AuctionInfo from '@/components/AuctionInfo.vue'
import BidsHistory from '@/components/BidsHistory.vue'
import BlurBackdropModal from '@/components/ui/modal/BlurBackdropModal.vue'
import VCloseMenuIcon from '@/components/ui/VCloseMenuIcon.vue'
import VButton from '@/components/ui/VButton.vue'
import VInput from '@/components/ui/VInput.vue'
import AuctionService from '@/services/AuctionService'
import type { IBid } from '@/models/IBid'
import type { IUser } from '@/models/IUser'
import UsersService from '@/services/UsersService'
import { useUserStore } from '@/stores/user'
import UpdateAuction from '@/components/ui/modal/UpdateAuction.vue'

const router = useRouter()
const auctionsStore = useAuctionsStore()
const userStore = useUserStore()
const { getCurrentAuction } = storeToRefs(auctionsStore)
const route = useRoute()
const showBidModal = ref(false)
const showInfoModal = ref(false)
const bid = ref<number>(getCurrentAuction.value.startBid + getCurrentAuction.value.minPitch)
const bids = ref<IBid[]>()
const owner = ref<IUser>()
const isOwner = ref(false)
const isEditModal = ref(false)

function validateBid(value: number) {
  if (value < getCurrentAuction.value.startBid) {
    console.log('Bid must be higher than start price')
    throw new Error('Bid must be higher than start price')
  }
  if (
    getCurrentAuction.value.lastBid &&
    getCurrentAuction.value.lastBid + getCurrentAuction.value.minPitch > value
  ) {
    console.log('Bid must be higher than last bid on min pitch')
    throw new Error('Bid must be higher than last bid on min pitch')
  }
}

function triggerInfoModal() {
  showInfoModal.value = !showInfoModal.value
}

async function deleteLot() {
  await AuctionService.deleteLot(getCurrentAuction.value.id)
  router.push('/')
}

async function makeBid() {
  validateBid(bid.value)
  await AuctionService.postBid(getCurrentAuction.value.id, bid.value)
  showBidModal.value = false
}

onBeforeMount(async () => {
  if (typeof route.params.id === 'string') {
    await auctionsStore.getById(route.params.id)
    bids.value = (await AuctionService.lotBids(getCurrentAuction.value.id)).data
    if (getCurrentAuction.value.lastBid) {
      bid.value = getCurrentAuction.value.lastBid + getCurrentAuction.value.minPitch
    }
    const ownerData = (await UsersService.getUser(auctionsStore.currentAuction.sellerId)).data
    owner.value = ownerData
    if (userStore.isLogin && userStore.user.id === ownerData.id) {
      isOwner.value = true
    }
  }
})
</script>

<template>
  <VCarousel class="mx-auto" :value="getCurrentAuction.images" />
  <div class="flex max-h-[80vh] flex-col gap-5 lg:flex-row">
    <div class="relative flex h-fit flex-col justify-between rounded-xl bg-white p-5">
      <div v-if="isOwner" class="relative">
        <img
          src="/Info.svg"
          alt="Info"
          class="ml-auto h-4 w-1 cursor-pointer transition-all hover:scale-125"
          @click="triggerInfoModal"
        />
        <div
          v-if="showInfoModal"
          class="absolute right-4 top-0 h-[64px] w-[140px] overflow-hidden rounded-xl"
        >
          <VButton rounded="none" color="primary" text="sm" @click="isEditModal = true">
            Edit
          </VButton>
          <VButton rounded="none" color="primary" text="sm" @click="deleteLot"> Delete </VButton>
        </div>
      </div>
      <AuctionInfo
        :owner="owner"
        :get-current-auction="getCurrentAuction"
        @make-bid="showBidModal = true"
      />
    </div>
    <BidsHistory :bids="bids" :participants-count="getCurrentAuction.participantsCount" />
  </div>
  <transition>
    <BlurBackdropModal
      v-if="showBidModal"
      @close="showBidModal = false"
      position="center"
      height="half"
      @click="showBidModal = false"
    >
      <VCloseMenuIcon :type="'cross'" @click="showBidModal = false" />
      <div class="flex h-full flex-col justify-between">
        <VInput
          :step="getCurrentAuction.minPitch"
          type="number"
          min="1200"
          placholder="Your bid"
          v-model="bid"
        />
        <VButton color="primary" text="xl" @click="makeBid"> Make bid </VButton>
      </div>
    </BlurBackdropModal>
  </transition>
  <transition>
    <UpdateAuction :lot-id="getCurrentAuction.id" v-if="isEditModal" @close="isEditModal = false" />
  </transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
