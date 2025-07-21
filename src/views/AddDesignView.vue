<script setup lang="ts">
import DesignForm from '@/components/DesignForm.vue';
import { useDesigns } from '@/composables/useDesigns';

const { resetCurrentDesign, currentDesign } = useDesigns();

if (currentDesign.value) resetCurrentDesign();
</script>

<template>
  <DesignForm />
</template>

<style lang="scss" scoped></style>
