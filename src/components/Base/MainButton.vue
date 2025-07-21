<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'primary' | 'secondary';
    text: string;
    disabled?: boolean;
    btnCallback?: () => void;
  }>(),
  {
    type: 'primary',
    disabled: false,
    btnCallback: () => {}
  }
);
</script>

<template>
  <button
    class="main-button"
    :class="`main-button--${type}`"
    @click="btnCallback"
    type="button"
    :disabled="disabled"
  >
    {{ text }}
  </button>
</template>

<style lang="scss" scoped>
.main-button {
  background-color: $blue-accent-color;
  color: $white-color;
  border: $main-border-styles;
  padding: 6px 10px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.43;
  text-wrap: nowrap;

  &--secondary {
    background-color: $white-color;
    color: $error-color;
  }

  @include mobile-small {
    padding: 4px 6px;
    font-size: 12px;
  }
}
.main-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
