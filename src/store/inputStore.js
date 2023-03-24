import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useInputStore = defineStore("inputStore", () => {
  const inputStorage = ref(
    JSON.parse(
      localStorage.getItem("inputStore") ||
        '{ "inputText": "", "codeInputs": [] }'
    )
  );

  const updateInput = (inputText) => {
    inputStorage.value.inputText = inputText;
    localStorage.setItem("inputStore", JSON.stringify(inputStorage.value));
    console.log(inputStorage.value);
  };

  const inputText = computed(() => inputStorage.value.inputText);

  const codeInputs = computed(() => inputStorage.value.codeInputs);
  return {
    inputText,
    codeInputs,
    updateInput,
  };
});
