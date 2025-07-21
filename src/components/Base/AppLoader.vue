<script setup lang="ts">
withDefaults(
  defineProps<{
    isEditPage?: boolean;
  }>(),
  {
    isEditPage: false
  }
);
</script>

<template>
  <div class="loader-wrapper">
    <div class="loader" :class="{ 'is-edit-page': isEditPage }"></div>
  </div>
</template>

<style lang="scss" scoped>
.loader-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.loader {
  width: 40px;
  height: 40px;
  --c: no-repeat linear-gradient(#fff 0 0);
  background: var(--c), var(--c), var(--c), var(--c);
  background-size: 21px 21px;
  animation: l5 2s infinite cubic-bezier(0.3, 1, 0, 1);

  &.is-edit-page {
    --c: no-repeat linear-gradient(#2c3d39 0 0);
  }
}
@keyframes l5 {
  0% {
    background-position:
      0 0,
      100% 0,
      100% 100%,
      0 100%;
  }
  33% {
    background-position:
      0 0,
      100% 0,
      100% 100%,
      0 100%;
    width: 60px;
    height: 60px;
  }
  66% {
    background-position:
      100% 0,
      100% 100%,
      0 100%,
      0 0;
    width: 60px;
    height: 60px;
  }
  100% {
    background-position:
      100% 0,
      100% 100%,
      0 100%,
      0 0;
  }
}
</style>
