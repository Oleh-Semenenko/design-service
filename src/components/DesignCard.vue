<script setup lang="ts">
import { type Design } from '@/composables/useDesigns';
import { useRouter } from 'vue-router';
const props = defineProps<{
  design: Design;
}>();

const router = useRouter();

const handleDesignClick = async () => {
  await router.push({
    name: 'edit-design',
    params: { designId: props.design.id }
  });
};
</script>

<template>
  <div class="design-card" @click="handleDesignClick">
    <div class="design-card__image-wrapper">
      <img
        class="design-card__image"
        :src="design.photos[0]"
        :alt="`${design.title} design poster`"
        width="300"
        height="400"
      />
    </div>
    <div class="design-card__info">
      <span class="design-card__info-number">{{ design.number }}</span>
      <h2 class="design-card__info-title">{{ design.title }}</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.design-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}
.design-card__image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
  background-color: #f0f0f0;
}
.design-card__image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}
.design-card__info {
  display: flex;
  gap: 8px;
}
.design-card__info-number {
  background-color: $white-color;
  border-radius: 8px;
  padding: 0 5px;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.design-card__info-title {
  color: $white-color;
}
</style>
