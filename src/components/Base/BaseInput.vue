<script setup lang="ts">
const model = defineModel<string | number>();
withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    id: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    hiddenLabel?: boolean;
  }>(),
  {
    type: 'text',
    disabled: false,
    readonly: false,
    required: false,
    hiddenLabel: true
  }
);
</script>

<template>
  <div class="base-input">
    <label
      v-if="label"
      :for="id"
      class="form-label"
      :class="{ 'visually-hidden-label': hiddenLabel }"
      >{{ label }}</label
    >
    <input
      :id="id"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      class="input"
    />
  </div>
</template>

<style lang="scss" scoped>
.base-input {
  width: 100%;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.input {
  width: 100%;
  padding: 6px 12px;
  border: $main-border-styles;
  border-radius: 3px;
  font-size: 1rem;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

.input:focus {
  outline: none;
  border-color: $blue-accent-color;
}
.input::placeholder {
  color: $gray-light-20-opacity;
}
</style>
