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
const currentDesign: Ref<Design | undefined> = ref();

const isDesignsLoading = ref(false);
const error = ref<string | null>(null);

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
      await new Promise((resolve) => setTimeout(resolve, 5000));
      designs.value =
        designs.value.filter((design) => design.id !== designId) || [];
    } catch (err) {
      console.error('Error loading design by id:', err);
      throw new Error('Failed to load design by id');
    } finally {
      isDesignsLoading.value = false;
    }
  };
  return {
    designs,
    currentDesign,
    isDesignsLoading,
    getDesigns,
    getOneDesignById,
    deleteOneDesignById
  };
};
