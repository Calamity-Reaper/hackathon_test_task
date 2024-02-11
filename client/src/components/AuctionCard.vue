<script setup lang="ts">
import VButton from '@/components/ui/VButton.vue'
import type { IAuction } from '@/models/IAuction'
import { API_STATIC } from '@/http'
import { useRouter } from 'vue-router'
interface Props {
  auction: IAuction
}
const router = useRouter()
const props = defineProps<Props>()
</script>

<template>
  <div class="flex h-fit w-full flex-col rounded-xl bg-white sm:h-[365px] sm:w-[530px] sm:flex-row">
    <!--    <img-->
    <!--      :src="`${API_STATIC + auction.images[0]}`"-->
    <!--      alt="auction card"-->
    <!--      class="h-[40%] w-full rounded-xl sm:h-full"-->
    <!--    />-->
    <div
      class="h-[30vh] w-full rounded-xl bg-cover bg-center bg-no-repeat sm:h-full sm:grow sm:basis-0"
      :class="`bg-[url(${API_STATIC + auction.images[0]})]`"
      v-bind:style="{ 'background-image': `url(${API_STATIC + auction.images[0]})` }"
    ></div>
    <div class="flex flex-col gap-3 p-3.5 sm:grow sm:basis-0">
      <h2 class="text-xl font-bold">
        {{ auction.name }}
      </h2>
      <p class="text-xs">{{ auction.description?.slice(0, 150) }}...</p>
      <div class="flex items-center gap-2">
        <img
          :src="auction.seller.avatar ? `${API_STATIC + auction.seller.avatar}` : `/avatar.webp`"
          alt="avatar"
          class="h-10 w-10 rounded-full"
        />
        <p class="text-xs font-bold">@{{ auction.seller?.username }}</p>
      </div>
      <div class="flex justify-between">
        <div class="text-xs">
          <p>
            Start price: <b>₴{{ auction.startBid }}</b>
          </p>
          <p>
            Minimum pitch: <b>₴{{ auction.minPitch }}</b>
          </p>
          <p>
            Current bid: <b>₴{{ auction.lastBid }}</b>
          </p>
        </div>
        <div class="w-16">
          <div class="relative">
            <img
              src="/avatar.webp"
              alt="avatar"
              class="absolute h-7 w-7 rounded-full border-2 border-white"
            />
            <img
              src="/avatar.webp"
              alt="avatar"
              class="absolute h-7 w-7 translate-x-1/2 rounded-full border-2 border-white"
            />
            <img
              src="/avatar.webp"
              alt="avatar"
              class="absolute h-7 w-7 translate-x-full rounded-full border-2 border-white"
            />
            <img
              src="/avatar.webp"
              alt="avatar"
              class="absolute h-7 w-7 translate-x-3/2 rounded-full border-2 border-white"
            />
          </div>
          <p class="mt-7 text-xs">{{ auction.participantsCount }} people</p>
        </div>
      </div>
      <VButton
        color="primary"
        text="sm"
        @click="router.push({ name: 'auction', params: { id: auction.id } })"
      >
        Place a bet
      </VButton>
    </div>
  </div>
</template>

<style scoped></style>
