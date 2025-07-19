<script setup lang="ts">
import AppHeader from '@/components/Base/AppHeader.vue';
import SideBar from '@/components/SideBar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="base-layout">
    <SideBar />
    <div
      class="container home-view"
      :class="{
        'home-view': $route.name === 'home',
        'design-view': $route.name !== 'home'
      }"
    >
      <AppHeader />
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-layout {
  display: flex;
  min-height: 100vh;
}
.home-view {
  background-color: $bg-green-color;
}
.design-view {
  background-color: $white-color;
}
</style>
