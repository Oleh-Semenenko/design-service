<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useDesigns } from '@/composables/useDesigns';
import MainButton from '@/components/Base/MainButton.vue';
import GoBackIcon from '@/components/icons/GoBackIcon.vue';
import ToggleSwitch from '@/components/Base/ToggleSwitch.vue';

const route = useRoute();
const router = useRouter();
const { deleteOneDesignById, isDesignsLoading } = useDesigns();

const isHomePage = computed(() => route.name === 'home');
const isEditDesignPage = computed(() => route.name === 'edit-design');

const isDesignPublished = ref(false);

const deleteOneDesign = async () => {
  if (route.params.designId) {
    await deleteOneDesignById(Number(route.params.designId));
    router.push({ name: 'home' });
  }
};
</script>

<template>
  <header class="header">
    <template v-if="isHomePage">
      <h1 class="home-header__title">Всі дизайни</h1>
      <MainButton text="Додати дизайн" />
    </template>

    <template v-else>
      <RouterLink to="/" aria-label="Повернутись на головну">
        <GoBackIcon />
      </RouterLink>
      <div class="header__switch">
        <ToggleSwitch v-model="isDesignPublished" />
        <span :class="{ published: isDesignPublished }">{{
          isDesignPublished ? 'Опублікований' : 'Неопублікований'
        }}</span>
      </div>
      <div class="header__actions">
        <MainButton
          v-if="isEditDesignPage"
          text="Видалити"
          type="secondary"
          :disabled="isDesignsLoading"
          :btn-callback="deleteOneDesign"
        />
        <MainButton text="Зберегти і вийти" :disabled="isDesignsLoading" />
      </div>
    </template>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  gap: 64px;
}
.home-header__title {
  font-size: 24px;
  line-height: 1.67;
  color: $white-color;
}

.header__switch {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-grow: 1;

  & span.published {
    color: $toggler-color;
  }
}
.header__actions {
  display: flex;
  gap: 8px;
}
</style>
