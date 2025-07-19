<script setup lang="ts">
import { onMounted } from 'vue';
import DesignsList from '@/components/DesignsList.vue';
import { useDesigns } from '@/composables/useDesigns';

const { getDesigns, designs } = useDesigns();

onMounted(async () => {
  await getDesigns();
});
</script>

<template>
  <DesignsList :designs="designs" />
</template>

<style lang="scss" scoped></style>
