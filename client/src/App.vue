<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SidebarMenu from "@/components/SidebarMenu.vue";
import {ref} from "vue";
import VShowMenuIcon from "@/components/ui/VShowMenuIcon.vue";
import VFadeTransition from "@/components/ui/transitions/VFadeTransition.vue";

const showMenu = ref<boolean>(false)
</script>

<template>
  <VShowMenuIcon @click="showMenu=true"/>
  <VFadeTransition>
    <SidebarMenu :show="showMenu" v-if="showMenu" @close="showMenu=false"/>
  </VFadeTransition>

  <RouterView />
</template>

<style scoped>

</style>
