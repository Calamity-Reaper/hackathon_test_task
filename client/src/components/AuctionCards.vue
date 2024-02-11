<script setup lang="ts">
import AuctionCard from '@/components/AuctionCard.vue'
import { useAuctionsStore } from '@/stores/auctions'
import { onBeforeMount } from 'vue'

const auctionStore = useAuctionsStore()

onBeforeMount(async () => {
  await auctionStore.getAllLots()
})
</script>

<template>
  <div class="grid justify-center gap-5 sm:grid-cols-fit-3">
    <AuctionCard v-for="auction in auctionStore.auctions" :key="auction.id" :auction="auction" />
  </div>
</template>

<style scoped></style>
