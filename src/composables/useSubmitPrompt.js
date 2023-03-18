import { ref, watch } from "vue";
import axios from "axios";

export default function useSubmitPrompt(apiKey, description, codeInputs) {
  const response = ref("");
  const loading = ref(false);
  const promptTokens = ref(0);
  const responseTokens = ref(0);

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
      updateLocalStorage();
    } catch (error) {
      handleError(error);
    }
  }

  function handleResponse(result) {
    loading.value = false;
    response.value = result.data.choices[0].message.content.trim();
    promptTokens.value = result.data.usage.prompt_tokens;
    responseTokens.value = result.data.usage.completion_tokens;
    localStorage.setItem(
      "promptTokensTotal",
      parseInt(localStorage.getItem("promptTokensTotal") || 0) +
        promptTokens.value
    );
    localStorage.setItem(
      "completionTokensTotal",
      parseInt(localStorage.getItem("completionTokensTotal") || 0) +
        responseTokens.value
    );
    localStorage.setItem(
      "totalPromptsSent",
      parseInt(localStorage.getItem("totalPromptsSent") || 0) + 1
    );
    console.log("Result data:", result.data);
  }

  function handleError(error) {
    console.error("Error:", error);
    response.value = "An error occurred while fetching the response.";
  }
  function updateLocalStorage() {
    watch([promptTokens, responseTokens], () => {
      localStorage.setItem("promptTokens", promptTokens.value);
      localStorage.setItem("responseTokens", responseTokens.value);
    });
  }
  return { submitPrompt, response, loading, promptTokens, responseTokens };
}
