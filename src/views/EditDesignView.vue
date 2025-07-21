<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import DesignForm from '@/components/DesignForm.vue';
import { useDesigns } from '@/composables/useDesigns';
import AppLoader from '@/components/Base/AppLoader.vue';

const { currentDesign, getOneDesignById } = useDesigns();
const route = useRoute();

const isPageLoadingLocal = ref(true);

const fetchDesignData = async (designId: number) => {
  isPageLoadingLocal.value = true;
  if (isNaN(designId)) {
    isPageLoadingLocal.value = false;
    return;
  }
  try {
    await getOneDesignById(designId);
  } catch (err) {
    console.error('Failed to fetch design:', err);
  } finally {
    isPageLoadingLocal.value = false;
  }
};

onMounted(async () => {
  const currentDesignId = Number(route.params.designId);
  await fetchDesignData(currentDesignId);
});
</script>

<template>
  <DesignForm v-if="!isPageLoadingLocal" :initial-data="currentDesign" />
  <AppLoader v-else is-edit-page />
</template>

<style lang="scss" scoped></style>
