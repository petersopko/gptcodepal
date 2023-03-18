import { ref, watch } from "vue";
import axios from "axios";
import { useStatsStore } from "../../store/statsStore"; // Add this import

export default function useSubmitPrompt(apiKey, description, codeInputs) {
  const response = ref("");
  const loading = ref(false);
  const promptTokens = ref(0);
  const responseTokens = ref(0);
  const statsStore = useStatsStore(); // Add this line

  async function submitPrompt() {
    response.value = "";

    if (!description.value) return;
    loading.value = true;

    const formattedCodeInputs = codeInputs.value
      .map((chunk) => `\n${chunk.name}\n\`\`\`${chunk.code}\`\`\``)
      .join("");

    const specialText =
      "Please note: If you are replying with code make sure to wrap the code with ``` . Make sure that the code contents is ready to be pasted as is. Don't mark the code with the language name. The application will automatically detect the language.";

    const formattedPrompt = `${description.value}${formattedCodeInputs}\n${specialText}`;
    const url = "https://api.openai.com/v1/chat/completions";
    console.log("Prompt:", formattedPrompt);
    try {
      const result = await axios.post(
        url,
        {
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: formattedPrompt,
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey.value}`,
          },
        }
      );
      console.log("Result:", result);
      handleResponse(result);
    } catch (error) {
      handleError(error);
    }
  }

  function handleResponse(result) {
    loading.value = false;
    response.value = result.data.choices[0].message.content.trim();
    promptTokens.value = result.data.usage.prompt_tokens;
    responseTokens.value = result.data.usage.completion_tokens;
    statsStore.incrementPromptTokens(promptTokens.value);
    statsStore.incrementCompletionTokens(responseTokens.value);
    statsStore.incrementTotalPromptsSent();
    localStorage.setItem("statsStore", JSON.stringify(statsStore));
    console.log(localStorage.getItem("statsStore"));
  }

  function handleError(error) {
    console.error("Error:", error);
    response.value = "An error occurred while fetching the response.";
  }
  return { submitPrompt, response, loading, promptTokens, responseTokens };
}
