<script setup lang="ts">
import VButton from "@/components/ui/VButton.vue";
import BlurBackdropModal from "@/components/ui/modal/BlurBackdropModal.vue";
import VCloseMenuIcon from "@/components/ui/VCloseMenuIcon.vue";
import {provide, ref} from "vue";


const emit = defineEmits(['close'])

</script>

<template>
    <BlurBackdropModal>
          <VCloseMenuIcon @click="emit('close')"/>
          <div class="grow flex flex-col justify-between">
            <div class="flex flex-col gap-2">
              <VButton color="secondary" text="xl">
                Sign in
              </VButton>
              <VButton color="secondary" text="xl">
                Auctions
              </VButton>
            </div>
            <VButton color="primary" text="xl">
              Create +
            </VButton>
          </div>
    </BlurBackdropModal>
</template>

<style scoped>

</style>