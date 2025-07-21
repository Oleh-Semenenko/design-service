<script setup lang="ts">
import { computed, ref, defineAsyncComponent, watch } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useDesigns } from '@/composables/useDesigns';
import MainButton from '@/components/Base/MainButton.vue';
import { useDesignFormStore } from '@/stores/designFormStore';

// In our app it is not necessary to load these small components asynchronously, but it is a good practice for the future application scaling
const GoBackIcon = defineAsyncComponent(
  () => import('@/components/icons/GoBackIcon.vue')
);
const ToggleSwitch = defineAsyncComponent(
  () => import('@/components/Base/ToggleSwitch.vue')
);

const route = useRoute();
const router = useRouter();
const { deleteOneDesignById, isDesignsLoading } = useDesigns();
const { currentFormSubmitHandler } = useDesignFormStore();

// V-model for the ToggleSwitcher
const isDesignPublished = ref(false);

const isHomePage = computed(() => route.name === 'home');
const isEditDesignPage = computed(() => route.name === 'edit-design');

const deleteOneDesign = async () => {
  if (route.params.designId) {
    await deleteOneDesignById(Number(route.params.designId));
    router.push({ name: 'home' });
  }
};

// Watcher for the set/reset isDesignPublished
watch(
  () => route.name,
  (newName) => {
    if (newName === 'add-design') {
      isDesignPublished.value = false;
    } else if (newName === 'edit-design') {
      isDesignPublished.value = true;
    }
  },
  { immediate: true }
);
</script>

<template>
  <header class="header" :class="{ 'is-home-page': isHomePage }">
    <template v-if="isHomePage">
      <h1 class="home-header__title">Всі дизайни</h1>
      <MainButton
        text="Додати дизайн"
        :btn-callback="() => router.push({ name: 'add-design' })"
      />
    </template>

    <template v-else>
      <RouterLink
        to="/"
        aria-label="Повернутись на головну"
        class="header__back-link"
      >
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
        <MainButton
          text="Зберегти і вийти"
          :disabled="isDesignsLoading"
          @click="currentFormSubmitHandler"
        />
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

  @include mobile {
    gap: 16px;
    padding: 16px 0;
  }
}
.header:not(.is-home-page) {
  @include mobile-small {
    align-items: flex-start;
  }
}
.home-header__title {
  font-size: 24px;
  line-height: 1.67;
  color: $white-color;
  font-weight: 400;
}

.header__back-link {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__switch {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-grow: 1;

  & span.published {
    color: $toggler-color;
    @include mobile-small {
      font-size: 12px;
    }
  }

  @include mobile {
    gap: 6px;
  }
}
.header__actions {
  display: flex;
  gap: 8px;

  @include mobile-small {
    flex-direction: column-reverse;
  }
}
</style>
