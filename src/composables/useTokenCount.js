import { ref, onMounted } from "vue";
import GPT3Tokenizer from "gpt3-tokenizer";
import { useTokenEstimateStore } from "../../store/tokenEstimateStore.js";

const tokenizer = new GPT3Tokenizer({ type: "gpt3" });

function countTokens(text) {
  const encoded = tokenizer.encode(text);
  return encoded.bpe.length;
}

export default function useTokenCount(description, codeInputs) {
  const tokenEstimateStore = useTokenEstimateStore();

  function fetchTokenCount() {
    const text = `${description}${codeInputs
      .map((chunk) => `\n${chunk.name}\n\`\`\`${chunk.code}\`\`\``)
      .join("")}`;

    if (!text) {
      return 0;
    }
    return countTokens(text);
  }

  onMounted(() => {
    setInterval(() => {
      console.log("check", description);
      tokenEstimateStore.updateTokenEstimate(fetchTokenCount());
    }, 3000);
  });

  return { tokenEstimate: tokenEstimateStore.tokenEstimate };
}
