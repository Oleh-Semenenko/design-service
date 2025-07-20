import { ref, type Ref } from 'vue';

type SubmitFormHandler = () => void;

const currentFormSubmitHandler: Ref<SubmitFormHandler | null> = ref(null);

export const useDesignFormStore = () => {
  const setFormSubmitHandler = (handler: SubmitFormHandler | null) => {
    currentFormSubmitHandler.value = handler;
  };

  return {
    currentFormSubmitHandler,
    setFormSubmitHandler
  };
};
