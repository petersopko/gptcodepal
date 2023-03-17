import { ref, watch } from "vue";

export default function useDescription() {
  const description = ref(localStorage.getItem("description") || "");

  watch(
    description,
    () => {
      localStorage.setItem("description", description.value);
    },
    { immediate: true }
  );

  return { description };
}
