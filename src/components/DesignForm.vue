<script setup lang="ts">
import { ref, computed, watch, onUnmounted, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BaseInput from '@/components/Base/BaseInput.vue';
import { type Design, useDesigns } from '@/composables/useDesigns';
import { useDesignFormStore } from '@/stores/designFormStore';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';

interface ImagePreview {
  id: string;
  url: string;
  file?: File;
  isNew: boolean;
}

const props = defineProps<{
  initialData?: Design | null;
}>();

const { addDesign, updateDesign } = useDesigns();
const router = useRouter();
const { setFormSubmitHandler } = useDesignFormStore();

const isEditMode = computed(() => !!props.initialData);
const fileInputRef = ref<HTMLInputElement | null>(null);

const formData = ref({
  name: '',
  number: '',
  designLink: ''
});

const imagePreviews = ref<ImagePreview[]>([]);

const initializeFormData = (data?: Design) => {
  if (data) {
    formData.value.name = data.title;
    formData.value.number = String(data.number);
    formData.value.designLink = data.link || '';
    imagePreviews.value = data.photos.map((url) => ({
      id: url,
      url: url,
      isNew: false
    }));
  } else {
    formData.value = {
      name: '',
      number: '',
      designLink: ''
    };

    imagePreviews.value.forEach((image) => {
      if (image.isNew) {
        URL.revokeObjectURL(image.url);
      }
    });
    imagePreviews.value = [];
  }
};
watch(
  () => props.initialData,
  (newData) => {
    initializeFormData(newData as Design);
  },
  { immediate: true }
);

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const processFiles = (files: FileList) => {
  Array.from(files).forEach((file) => {
    if (file.type.startsWith('image/')) {
      const newImage: ImagePreview = {
        id: crypto.randomUUID(), // Generate unique ID
        url: URL.createObjectURL(file),
        file: file,
        isNew: true
      };
      imagePreviews.value.push(newImage);
    }
  });
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    processFiles(target.files);
  }
};

const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files) {
    processFiles(event.dataTransfer.files);
  }
};

const removeImage = (indexToRemove: number) => {
  const imageToRemove = imagePreviews.value[indexToRemove];

  if (imageToRemove.isNew) {
    URL.revokeObjectURL(imageToRemove.url);
  }

  imagePreviews.value.splice(indexToRemove, 1);
};

const submitForm = async () => {
  const payload = new FormData();

  payload.append('name', formData.value.name);
  payload.append('number', formData.value.number);
  payload.append('designLink', formData.value.designLink);
  if (isEditMode.value && props.initialData) {
    payload.append('id', props.initialData.id.toString());
  }

  // Add only new images
  const newFiles = imagePreviews.value.filter((p) => p.isNew && p.file);
  const filesToUpload: File[] = [];
  newFiles.forEach((img) => {
    if (img.file) {
      filesToUpload.push(img.file);
    }
  });

  const existingImageUrls = imagePreviews.value
    .filter((p) => !p.isNew)
    .map((p) => p.url);
  payload.append('existingImageUrls', JSON.stringify(existingImageUrls));

  try {
    if (isEditMode.value && props.initialData) {
      // Edit design
      await updateDesign(
        props.initialData.id,
        {
          title: formData.value.name,
          number: Number(formData.value.number),
          link: formData.value.designLink
        },
        filesToUpload,
        existingImageUrls
      );
    } else {
      // Add new design
      await addDesign(
        {
          title: formData.value.name,
          number: Number(formData.value.number),
          link: formData.value.designLink
        },
        filesToUpload
      );
    }

    router.push('/');
  } catch (err) {
    console.error('DesignForm: Error during submission:', err);
  }
};

onMounted(() => {
  setFormSubmitHandler(submitForm);
});

onUnmounted(() => {
  imagePreviews.value.forEach((image) => {
    if (image.isNew) {
      URL.revokeObjectURL(image.url);
    }
  });
  setFormSubmitHandler(null);
});
</script>

<template>
  <form class="design-form" @submit.prevent="submitForm">
    <div class="form-section">
      <label for="imageInput" class="visually-hidden-label"
        >Зображення дизайну</label
      >
      <div
        class="image-uploader"
        :class="{ 'has-images': imagePreviews.length > 0 }"
        @click="triggerFileInput"
        @dragover.prevent
        @dragleave.prevent
        @drop.prevent="handleDrop"
      >
        <div v-if="imagePreviews.length === 0" class="uploader-placeholder">
          <img
            src="@/assets/images/uploader_placeholder.webp"
            width="60"
            height="48"
            alt="Image uploader placeholder"
          />
        </div>

        <div v-else class="image-preview-grid">
          <div
            v-for="(image, index) in imagePreviews"
            :key="index"
            class="preview-item"
          >
            <img
              :src="image.url"
              alt="Попередній перегляд"
              class="preview-image"
            />
            <button
              type="button"
              class="delete-button"
              @click.stop="removeImage(index)"
            >
              <DeleteIcon />
            </button>
          </div>
          <div class="add-more-button" @click.stop="triggerFileInput">
            <PlusIcon />
          </div>
        </div>
      </div>
      <input
        ref="fileInputRef"
        type="file"
        id="imageInput"
        multiple
        accept="image/*"
        style="display: none"
        @change="handleFileSelect"
      />
    </div>

    <div class="form-section">
      <div class="input-group">
        <BaseInput
          v-model="formData.number"
          id="designNumber"
          type="number"
          label="Номер дизайну"
          placeholder="###"
          class="input-number"
        />
        <BaseInput
          v-model="formData.name"
          id="designName"
          label="Назва дизайну"
          placeholder="Назва дизайну"
        />
      </div>
    </div>

    <div class="form-section">
      <BaseInput
        v-model="formData.designLink"
        id="designUrl"
        label="URL дизайну"
        placeholder="https://design###.horoshop.ua/"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.design-form {
  max-width: 600px;
  margin-left: 88px;

  @include mobile {
    margin-left: 40px;
  }
}

.form-section:not(:last-child) {
  margin-bottom: 40px;
  @include tablet {
    margin-bottom: 24px;
  }
  @include mobile {
    margin-bottom: 16px;
  }
}

.image-uploader {
  border: 2px dashed $gray-light-color;
  border-radius: 8px;
  padding: 1rem;
  background-color: $white-color;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition:
    border-color 0.3s,
    background-color 0.3s;

  &.has-images {
    border: none;
    padding: 0;
  }
}

.image-uploader:not(.has-images):hover {
  border-color: $blue-accent-color;
  background-color: #f0f8ff;
}

.placeholder-icon {
  color: #aaa;
  margin-bottom: 1rem;
}

.image-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
  width: 100%;
}

.preview-item {
  position: relative;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: $main-border-styles;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.delete-button {
  position: absolute;
  bottom: 4px;
  right: 4px;
  padding: 4px;
  background: #00000080;
  border: none;
  border-radius: 3px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.preview-item:hover .delete-button {
  opacity: 1;
}

.add-more-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #ccc;
  border-radius: 8px;
  font-size: 30px;
  color: #c4c4c4;
  cursor: pointer;
  transition: all 0.3s;
  aspect-ratio: 1 / 1;
}

.add-more-button:hover {
  background-color: #f0f0f0;
  color: #333;
}

.input-group {
  display: flex;
  gap: 8px;
  @include mobile {
    flex-direction: column;
    gap: 16px;
  }
}

.input-number {
  flex-basis: 80px;
  flex-grow: 0;
  flex-shrink: 0;
  text-align: center;
  @include mobile {
    flex-basis: 100%;
  }
}

.input-main:focus,
.input-number:focus {
  outline: none;
  border-color: #007bff;
}

input:disabled {
  background-color: #f0f0f0;
  color: #666;
  cursor: not-allowed;
}
</style>
