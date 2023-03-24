import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useInputStore = defineStore("inputStore", () => {
  const inputStorage = ref(
    JSON.parse(
      localStorage.getItem("inputStore") ||
        '{ "inputText": "", "codeInputs": [] }'
    )
  );

  const updateInputText = (inputText) => {
    inputStorage.value.inputText = inputText;
    localStorage.setItem("inputStore", JSON.stringify(inputStorage.value));
    console.log(inputStorage.value);
  };

  return {
    inputStorage,
    updateInputText,
  };
});
