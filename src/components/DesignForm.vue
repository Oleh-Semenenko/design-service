<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue';
import BaseInput from '@/components/Base/BaseInput.vue';
import { type Design } from '@/composables/useDesigns';

interface ImagePreview {
  id: string;
  url: string;
  file?: File;
  isNew: boolean;
}

const props = defineProps<{
  initialData?: Design;
}>();

const emit = defineEmits<{
  (e: 'submit', payload: FormData): void;
}>();

const isEditMode = computed(() => !!props.initialData);
const fileInputRef = ref<HTMLInputElement | null>(null);

const formData = ref({
  name: '',
  number: '',
  designLink: ''
});

const imagePreviews = ref<ImagePreview[]>([]);

watch(
  () => props.initialData,
  (data) => {
    if (data) {
      // Режим редагування: заповнюємо форму даними
      formData.value.name = data.title;
      formData.value.number = String(data.number);
      formData.value.designLink = data.link || '';
      imagePreviews.value = data.photos.map((url) => ({
        id: url, // Використовуємо URL як унікальний ключ для існуючих зображень
        url: url,
        isNew: false
      }));
    }
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

  // Якщо це був об'єктний URL, звільняємо пам'ять
  if (imageToRemove.isNew) {
    URL.revokeObjectURL(imageToRemove.url);
  }

  imagePreviews.value.splice(indexToRemove, 1);
};

const submitForm = () => {
  const payload = new FormData();

  payload.append('name', formData.value.name);
  payload.append('number', formData.value.number);
  payload.append('designLink', formData.value.designLink);
  if (isEditMode.value && props.initialData) {
    payload.append('id', props.initialData.id.toString());
  }

  // Додаємо тільки нові файли
  const newFiles = imagePreviews.value.filter((p) => p.isNew && p.file);
  newFiles.forEach((img) => {
    payload.append('images[]', img.file!);
  });

  // Ідентифікатори зображень, які залишилися (для режиму редагування)
  const existingImageUrls = imagePreviews.value
    .filter((p) => !p.isNew)
    .map((p) => p.url);
  payload.append('existingImageUrls', JSON.stringify(existingImageUrls));

  emit('submit', payload);
};

onUnmounted(() => {
  imagePreviews.value.forEach((image) => {
    if (image.isNew) {
      URL.revokeObjectURL(image.url);
    }
  });
});
</script>

<template>
  <form class="design-form" @submit.prevent="submitForm">
    <div class="form-section">
      <label for="imageInput" class="visually-hidden">Зображення дизайну</label>
      <div
        class="image-uploader"
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
              &#x1F5D1;
            </button>
          </div>
          <div class="add-more-button" @click.stop="triggerFileInput">+</div>
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
}

.form-section {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
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
}

.image-uploader:hover {
  border-color: #007bff;
  background-color: #f0f8ff;
}

.placeholder-icon {
  color: #aaa;
  margin-bottom: 1rem;
}

.uploader-placeholder p {
  color: #666;
  margin: 0;
}

.image-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  width: 100%;
  padding: 1rem;
}

.preview-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.delete-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 14px;
  line-height: 24px;
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
  font-size: 2rem;
  color: #aaa;
  cursor: pointer;
  transition: all 0.3s;
  min-height: 120px;
}

.add-more-button:hover {
  background-color: #f0f0f0;
  color: #333;
}

.input-group {
  display: flex;
  gap: 8px;
}

.input-number {
  flex-basis: 80px;
  flex-grow: 0;
  flex-shrink: 0;
  text-align: center;
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
