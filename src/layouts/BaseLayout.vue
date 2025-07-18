<script setup lang="ts">
import SideBar from '@/components/SideBar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="base-layout">
    <SideBar />
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.base-layout {
  display: flex;
  height: 100vh;
}
</style>
