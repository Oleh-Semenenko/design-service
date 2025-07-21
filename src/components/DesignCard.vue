<script setup lang="ts">
import { ref } from 'vue';
import { type Design } from '@/composables/useDesigns';
import { useRouter } from 'vue-router';
const props = defineProps<{
  design: Design;
}>();

const router = useRouter();

const imageLoaded = ref(false);

const handleDesignClick = async () => {
  await router.push({
    name: 'edit-design',
    params: { designId: props.design.id }
  });
};

const onImageLoad = () => {
  imageLoaded.value = true;
};
</script>

<template>
  <div class="design-card" @click="handleDesignClick">
    <div class="design-card__image-wrapper">
      <div v-show="!imageLoaded" class="design-card__image-skeleton"></div>

      <img
        class="design-card__image"
        :class="{ 'design-card__image--loaded': imageLoaded }"
        :src="design.photos[0]"
        :alt="`${design.title} design poster`"
        width="300"
        height="400"
        @load="onImageLoad"
        loading="lazy"
      />
    </div>
    <div class="design-card__info">
      <span class="design-card__info-number">{{ design.number }}</span>
      <h2 class="design-card__info-title long-ellipsis">{{ design.title }}</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.design-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
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
  position: relative;
}
.design-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
}
.design-card__image--loaded {
  opacity: 1;
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

.design-card__image-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  border-radius: 8px;
  overflow: hidden;

  animation: pulse-bg 1.5s infinite;
  background-image: linear-gradient(
    to right,
    #e0e0e0 0%,
    #f0f0f0 20%,
    #e0e0e0 40%,
    #e0e0e0 100%
  );
  background-size: 200% 100%;
}
@keyframes pulse-bg {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
