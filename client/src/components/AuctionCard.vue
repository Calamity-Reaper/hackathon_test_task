<script setup lang="ts">
import VButton from '@/components/ui/VButton.vue'
</script>

<template>
  <div class="flex h-[365px] w-[530px] rounded-xl bg-white">
    <img src="@/assets/img/AuctionCard.png" alt="auction card" class="rounded-xl" />
    <div class="flex flex-col gap-3 p-3.5">
      <h2 class="text-xl font-bold">
        Random lot name with deep meaning random lot name with deep meaning
      </h2>
      <p class="text-xs">
        Random description of the lot with deep meaning random description of the lot with deep
        meaning random description of the lot with deep meaning...
      </p>
      <div class="flex items-center gap-2">
        <img src="@/assets/img/AuctionCard.png" alt="avatar" class="h-10 w-10 rounded-full" />
        <p class="text-xs font-bold">@kittymint</p>
      </div>
      <div class="flex justify-between">
        <div class="text-xs">
          <p>Initial bid: <b>₴1.000</b></p>
          <p>Minimum pitch: <b>₴100</b></p>
          <p>Current bid: <b>₴1.700</b></p>
        </div>
        <div class="w-16">
          <div class="relative">
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
          </div>
          <p class="mt-7 text-xs">7 people</p>
        </div>
      </div>
      <VButton color="primary" text="sm"> Place a bet </VButton>
    </div>
  </div>
</template>

<style scoped></style>
