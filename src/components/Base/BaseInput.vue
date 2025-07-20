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
  color: #333;
}

.input {
  width: 100%;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

.input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.input:disabled {
  background-color: #f0f0f0;
  color: #666;
  cursor: not-allowed;
}
.input::placeholder {
  color: $gray-light-20-opacity;
}

.visually-hidden-label {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
</style>
