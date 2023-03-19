import { watch } from "vue";
import GPT3Tokenizer from "gpt3-tokenizer";
import { useTokenEstimateStore } from "../../store/tokenEstimateStore.js";

const tokenizer = new GPT3Tokenizer({ type: "gpt3" });

export function countTokens(text) {
  const encoded = tokenizer.encode(text);
  return encoded.bpe.length;
}

export default function useTokenCount(description, codeInputs) {
  const tokenEstimateStore = useTokenEstimateStore();

  const updateTokenCount = () => {
    const text = `${description.value}${codeInputs.value
      .map((chunk) => `\n${chunk.name}\n\`\`\`${chunk.code}\`\`\``)
      .join("")}`;

    if (!text) {
      tokenEstimateStore.updateTokenEstimate(0);
      return;
    }
    tokenEstimateStore.updateTokenEstimate(countTokens(text));
  };

  watch([description, codeInputs], updateTokenCount, { immediate: true });

  return {
    tokenEstimate: tokenEstimateStore.tokenEstimate,
  };
}
