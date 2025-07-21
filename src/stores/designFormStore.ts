import { ref, type Ref } from 'vue';

type SubmitFormHandler = () => void;

// Here we are simulating the store. The best way is a Pinia, but for this small project it is unnecessary

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
