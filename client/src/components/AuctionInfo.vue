<script setup lang="ts">
import VButton from '@/components/ui/VButton.vue'
import type { IAuction } from '@/models/IAuction'
import type { IUser } from '@/models/IUser'
import { API_STATIC } from '@/http'

const props = defineProps<{
  getCurrentAuction: IAuction
  owner: IUser | undefined
}>()

const emit = defineEmits(['make-bid'])
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-center text-xl font-bold lg:text-4xl">{{ getCurrentAuction.name }}</h1>
    <div class="flex flex-wrap items-center gap-5 lg:gap-10">
      <div class="flex items-center gap-2">
        <img
          :src="owner?.avatar ? `${API_STATIC + owner?.avatar}` : `/avatar.webp`"
          alt="avatar"
          class="h-10 w-10 rounded-full"
        />
        <p class="font-bold lg:text-xl">@{{ owner?.username }}</p>
      </div>
      <div class="md:text-xl">
        Closes at: <b>{{ new Date(Date.parse(getCurrentAuction.closesAt)).toLocaleString() }}</b>
      </div>
    </div>
    <div class="text-sm md:text-xl">
      {{ getCurrentAuction.description }}
    </div>
    <div class="flex flex-wrap gap-3">
      <div
        v-for="category in getCurrentAuction.categories"
        :key="category"
        class="rounded-xl bg-gray-300 p-1 md:p-3"
      >
        {{ category }}
      </div>
    </div>
  </div>
  <div
    v-if="getCurrentAuction.state === 'OPEN'"
    class="mt-[100px] flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
  >
    <div class="grow basis-0">
      <p>
        Start price: <b>₴{{ getCurrentAuction.startBid }}</b>
      </p>
      <p>
        Minimum pitch: <b>₴{{ getCurrentAuction.minPitch }}</b>
      </p>
      <p>
        Last bid: <b>₴{{ getCurrentAuction.lastBid ? getCurrentAuction.lastBid : 0 }}</b>
      </p>
    </div>
    <VButton class="grow basis-0" color="primary" text="xl" @click="emit('make-bid')">
      Make a bid
    </VButton>
  </div>
  <div v-else class="mt-[100px] text-center text-2xl">
    Sold for <b>₴{{ getCurrentAuction.lastBid ? getCurrentAuction.lastBid : 0 }}</b>
  </div>
</template>

<style scoped></style>
