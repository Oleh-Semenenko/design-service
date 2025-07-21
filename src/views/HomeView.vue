<script setup lang="ts">
import { onMounted } from 'vue';
import DesignsList from '@/components/DesignsList.vue';
import { useDesigns } from '@/composables/useDesigns';
import AppLoader from '@/components/Base/AppLoader.vue';

const { getDesigns, designs, isDesignsLoading } = useDesigns();

onMounted(async () => {
  await getDesigns();
});
</script>

<template>
  <DesignsList v-if="!isDesignsLoading" :designs="designs" />
  <AppLoader v-else />
</template>

<style lang="scss" scoped></style>
