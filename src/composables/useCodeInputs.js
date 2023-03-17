import { ref, watch } from "vue";

export default function useCodeInputs() {
  const codeInputs = ref(JSON.parse(localStorage.getItem("codeInputs")) || []);

  const addCodeInput = () => {
    codeInputs.value.push({ name: "", code: "" });
  };

  const removeCodeInput = (index) => {
    codeInputs.value.splice(index, 1);
  };

  watch(
    codeInputs,
    () => {
      localStorage.setItem("codeInputs", JSON.stringify(codeInputs.value));
    },
    { deep: true }
  );

  return { codeInputs, addCodeInput, removeCodeInput };
}
