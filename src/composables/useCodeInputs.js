import { ref } from "vue";

export default function useCodeInputs(initialCodeInputs = []) {
  const codeInputs = ref(initialCodeInputs);

  const addCodeInput = () => {
    codeInputs.value.push({ name: "", code: "" });
  };

  const removeCodeInput = (index) => {
    codeInputs.value.splice(index, 1);
  };

  return { codeInputs, addCodeInput, removeCodeInput };
}
