<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
};
</script>

<template>
  <label class="toggle-switch">
    <input type="checkbox" :checked="modelValue" @change="handleChange" />
    <span class="slider"></span>
  </label>
</template>

<style lang="scss" scoped>
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 64px;
  height: 24px;
  cursor: pointer;

  @include mobile {
    width: 48px;
    height: 20px;
  }
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $gray-light-color;
  border-radius: 32px;
  transition: background-color 0.4s;
}

.slider::before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  transition: transform 0.4s;

  @include mobile {
    height: 18px;
    width: 18px;
    left: 1px;
    bottom: 1px;
  }
}

input:checked + .slider {
  background-color: $toggler-color;
}

input:checked + .slider::before {
  transform: translateX(40px);

  @include mobile {
    transform: translateX(28px);
  }
}
</style>
