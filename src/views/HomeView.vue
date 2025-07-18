<script setup lang="ts">
import MainButton from '@/components/Base/MainButton.vue';
</script>

<template>
  <div class="container home-view">
    <header class="home-header">
      <h1 class="home-header__title">Всі дизайни</h1>
      <MainButton text="Додати дизайн" />
    </header>
    <main></main>
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  background-color: $bg-green-color;
  width: 100%;
}
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}
.home-header__title {
  font-size: 24px;
  line-height: 1.67;
  color: $white-color;
}
</style>
