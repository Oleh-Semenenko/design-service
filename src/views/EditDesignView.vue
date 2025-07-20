<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DesignForm from '@/components/DesignForm.vue';
import { useDesigns } from '@/composables/useDesigns';

const { currentDesign, getOneDesignById } = useDesigns();
const route = useRoute();

onMounted(async () => {
  const currentDesignId = Number(route.params.designId);
  if (currentDesignId) {
    await getOneDesignById(currentDesignId);
  }
});
</script>

<template>
  <DesignForm :initial-data="currentDesign" />
</template>

<style lang="scss" scoped></style>
