<script setup lang="ts">
import { type Design } from '@/composables/useDesigns';
import DesignCard from '@/components/DesignCard.vue';

defineProps<{
  designs: Design[];
}>();
</script>

<template>
  <ul class="designs-list">
    <li v-for="design in designs" :key="design.id">
      <DesignCard :design="design" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.designs-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-content: space-between;
  column-gap: 20px;
  row-gap: 40px;
}
</style>
