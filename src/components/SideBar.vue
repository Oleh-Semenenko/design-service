<script setup lang="ts">
import BaseLogo from './icons/BaseLogo.vue';
</script>

<template>
  <aside class="sidebar">
    <BaseLogo />
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 40px;
  min-height: 100vh;
  background-color: $bg-sidebar-color;
  padding: 8px;
}
</style>
