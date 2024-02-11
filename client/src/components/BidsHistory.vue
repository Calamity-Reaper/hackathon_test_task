<script setup lang="ts">
import BidInfo from '@/components/BidInfo.vue'
import type { IBid } from '@/models/IBid'

const props = defineProps<{
  participantsCount: number | undefined
  bids: IBid[] | undefined
}>()
</script>

<template>
  <div class="flex min-w-[30%] flex-col rounded-xl bg-white p-5">
    <div class="flex w-full justify-between">
      <div class="h-fit rounded-xl bg-green-primary px-4 py-2">Bids</div>
      <div class="relative h-fit w-20" v-if="participantsCount">
        <img
          src="@/assets/img/AuctionCard.png"
          alt="avatar"
          class="absolute h-7 w-7 rounded-full border-2 border-white"
        />
        <img
          src="@/assets/img/AuctionCard.png"
          alt="avatar"
          class="absolute h-7 w-7 translate-x-1/2 rounded-full border-2 border-white"
        />
        <img
          src="@/assets/img/AuctionCard.png"
          alt="avatar"
          class="absolute h-7 w-7 translate-x-full rounded-full border-2 border-white"
        />
        <img
          src="@/assets/img/AuctionCard.png"
          alt="avatar"
          class="absolute h-7 w-7 translate-x-3/2 rounded-full border-2 border-white"
        />
        <span class="absolute left-1/2 top-8 w-fit -translate-x-1/2 whitespace-nowrap text-sm"
          >{{ participantsCount }} people</span
        >
      </div>
    </div>
    <div
      v-if="bids?.length"
      class="mt-5 flex max-h-[70vh] flex-col gap-3 overflow-y-scroll rounded-xl bg-gray-primary p-3"
    >
      <BidInfo
        v-for="bid in bids"
        :key="bid.id"
        :amount="bid.amount"
        :time="`${new Date(bid.createdAt).getHours()}:${new Date(bid.createdAt).getMinutes()}`"
        :username="bid.user.username"
      />
    </div>
  </div>
</template>

<style scoped></style>
