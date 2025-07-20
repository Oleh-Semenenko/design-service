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
      <main class="main-content">
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </Transition>
        </RouterView>
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
.main-content {
  padding-bottom: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
