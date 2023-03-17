import { ref, watch, onMounted } from "vue";
import axios from "axios";

export default function useTokenCount(description, codeInputs) {
  const tokenCount = ref(0);

  async function fetchTokenCount() {
    const text = `${description.value}${codeInputs.value
      .map((chunk) => `\n${chunk.name}\n\`\`\`${chunk.code}\`\`\``)
      .join("")}`;

    if (!text) {
      return 0;
    }

    try {
      const response = await axios.post("http://localhost:5000/count_tokens", {
        text,
      });
      return response.data.token_count;
    } catch (error) {
      console.error("Error fetching token count:", error);
      return 0;
    }
  }

  onMounted(async () => {
    tokenCount.value = await fetchTokenCount();
  });

  watch(
    [description, codeInputs],
    async () => {
      tokenCount.value = await fetchTokenCount();
    },
    { deep: true }
  );

  return { tokenCount, fetchTokenCount };
}
