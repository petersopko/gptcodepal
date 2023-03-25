import { ref, watch, computed } from "vue";
import GPT3Tokenizer from "gpt3-tokenizer";
import { useChatStore } from "../store/chatStore";
import { useInputStore } from "../store/inputStore";

const tokenizer = new GPT3Tokenizer({ type: "gpt3" });

export function countTokens(text) {
  const encoded = tokenizer.encode(text);
  return encoded.bpe.length;
}

export default function useTokenCount() {
  const chatStore = useChatStore();
  const inputStore = useInputStore();
  const activeChatTokenCount = computed(() => chatStore.activeChat?.tokenCount);
  const tokenEstimate = ref(0);

  const inputText = computed(() => inputStore.inputStorage.inputText);
  const codeInputs = computed(() => inputStore.inputStorage.codeInputs);

  const updateTokenEstimate = (newTokenEstimate) => {
    tokenEstimate.value = newTokenEstimate;
  };

  const resetTokenEstimate = () => {
    tokenEstimate.value = 0;
  };

  const updateTokenCount = () => {
    const text = `${inputText.value}${codeInputs.value
      .map((chunk) => `\n${chunk.name}\n\`\`\`${chunk.code}\`\`\``)
      .join("")}`;

    if (!text) {
      updateTokenEstimate(0);
      return;
    }
    const activeChatTokens = activeChatTokenCount.value || 0;
    updateTokenEstimate(countTokens(text) + activeChatTokens);
  };

  watch([inputText, codeInputs, activeChatTokenCount], updateTokenCount, {
    immediate: true,
  });

  return {
    tokenEstimate,
    resetTokenEstimate,
  };
}
