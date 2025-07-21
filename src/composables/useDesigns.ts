import { ref, type Ref } from 'vue';
import floraImg from '@/assets/images/flora.webp';
import sunWearImg from '@/assets/images/sunwear.webp';
import islandImg from '@/assets/images/island.webp';

export interface Design {
  id: number;
  title: string;
  link: string;
  number: number;
  photos: string[];
}

const initialDesigns: Design[] = [
  {
    id: 1,
    title: 'Design 1',
    link: 'https://example.com/design1',
    number: 105,
    photos: [floraImg]
  },
  {
    id: 2,
    title: 'Design 2',
    link: 'https://example.com/design2',
    number: 106,
    photos: [sunWearImg]
  },
  {
    id: 3,
    title: 'Design 3',
    link: 'https://example.com/design3',
    number: 107,
    photos: [islandImg]
  },
  {
    id: 4,
    title: 'Design 4',
    link: 'https://example.com/design1',
    number: 108,
    photos: [floraImg]
  },
  {
    id: 5,
    title: 'Design 5',
    link: 'https://example.com/design2',
    number: 109,
    photos: [sunWearImg]
  },
  {
    id: 6,
    title: 'Design 6',
    link: 'https://example.com/design3',
    number: 110,
    photos: [islandImg]
  }
];

const designs: Ref<Design[]> = ref([...initialDesigns]);
const currentDesign: Ref<Design | null | undefined> = ref(null);

const isDesignsLoading = ref(false);
const error = ref<string | null>(null);

let nextDesignId = initialDesigns.length + 1;

// Here we are simulating the CRUD by the api. That is why you can see Promises in the functions
export const useDesigns = () => {
  const getDesigns = async () => {
    isDesignsLoading.value = true;
    error.value = null;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('Designs loaded successfully', designs.value);
    } catch (err) {
      console.error('Error loading designs:', err);
      throw new Error('Failed to load designs');
    } finally {
      isDesignsLoading.value = false;
    }
  };
  const getOneDesignById = async (designId: number) => {
    currentDesign.value = null;

    isDesignsLoading.value = true;
    error.value = null;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      currentDesign.value =
        designs.value.filter((design) => design.id === designId)[0] || null;
    } catch (err) {
      console.error('Error loading design by id:', err);
      throw new Error('Failed to load design by id');
    } finally {
      isDesignsLoading.value = false;
    }
  };
  const deleteOneDesignById = async (designId: number) => {
    isDesignsLoading.value = true;
    error.value = null;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      designs.value =
        designs.value.filter((design) => design.id !== designId) || [];
    } catch (err) {
      console.error('Error loading design by id:', err);
      throw new Error('Failed to load design by id');
    } finally {
      isDesignsLoading.value = false;
    }
  };
  const updateDesign = async (
    designId: number,
    updatedDesignData: Partial<Omit<Design, 'photos'>>,
    newPhotos: File[],
    existingPhotoUrls: string[]
  ): Promise<Design> => {
    isDesignsLoading.value = true;
    error.value = null;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay

      const index = designs.value.findIndex((d) => d.id === designId);
      if (index === -1) {
        throw new Error(`There is no design with id ${designId}`);
      }
      const currentDesignData = designs.value[index];

      // Simulate new photo uploads
      const newlyUploadedPhotoUrls: string[] = newPhotos.map((file) =>
        URL.createObjectURL(file)
      );
      const combinedPhotos = [...existingPhotoUrls, ...newlyUploadedPhotoUrls];

      const updatedDesign: Design = {
        ...currentDesignData,
        ...updatedDesignData,
        id: designId,
        photos: combinedPhotos
      };

      designs.value.splice(index, 1, updatedDesign);
      return updatedDesign;
    } catch (err) {
      console.error('Error adding design:', err);
      error.value = 'Failed to update design';
      throw new Error('Failed to update design');
    } finally {
      isDesignsLoading.value = false;
    }
  };
  const addDesign = async (
    newDesignData: Omit<Design, 'id' | 'photos'>,
    newPhotos: File[]
  ): Promise<Design> => {
    isDesignsLoading.value = true;
    error.value = null;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay

      const photoUrls: string[] = newPhotos.map((file) =>
        URL.createObjectURL(file)
      );

      const newDesign: Design = {
        id: nextDesignId++,
        title: newDesignData.title,
        link: newDesignData.link,
        number: newDesignData.number,
        photos: photoUrls
      };

      designs.value.push(newDesign);
      return newDesign;
    } catch (err) {
      console.error('Error adding design:', err);
      error.value = 'Failed to add design';
      throw new Error('Failed to add design');
    } finally {
      isDesignsLoading.value = false;
    }
  };
  const resetCurrentDesign = () => {
    currentDesign.value = null;
  };
  return {
    designs,
    currentDesign,
    isDesignsLoading,
    getDesigns,
    getOneDesignById,
    deleteOneDesignById,
    updateDesign,
    addDesign,
    resetCurrentDesign
  };
};
