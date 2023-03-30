import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useStatesStore = defineStore("statesStore", () => {
  const loading = ref(false);

  const isLoading = computed(() => loading.value);

  const updateLoading = (newLoading) => {
    console.log("newLoading:", newLoading);
    loading.value = newLoading;
  };

  return {
    isLoading,
    updateLoading,
  };
});
