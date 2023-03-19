import { ref } from "vue";
import { useStatsStore } from "../../store/statsStore";
import axios from "axios";

export default function useSubmitPrompt(apiKeyStore, tabsStore) {
  const statsStore = useStatsStore();
  const loading = ref(false);
  const response = ref("");
  const promptTokens = ref(0);
  const responseTokens = ref(0);

  async function submitPrompt() {
    loading.value = true;
    response.value = "";

    if (!tabsStore.activeTab.description) return;
    loading.value = true;

    const formattedCodeInputs = tabsStore.activeTab.codeInputs
      .map((chunk) => `\n${chunk.name}\n\`\`\`${chunk.code}\`\`\``)
      .join("");

    const contextForGpt =
      "You are an advanced AI code assistant based on GPT-4, specifically designed to assist me in resolving code issues, identifying bugs, and creating new code tailored to given descriptions and future plans. I will supply you with a detailed description of my code-related challenges, desired features, or any pertinent information that could help you understand my requirements.\n\nTo guarantee that your code suggestions are not only accurately interpreted but also visually appealing and easy to read, please enclose the code snippets within three backticks (```) as demonstrated below:\n\n```\n<code suggestion here>\n```\n\nFeel encouraged to provide error messages, alternative solutions, or any relevant context that might clarify your suggestions and facilitate my understanding. Always remember to use triple backticks when sharing code snippets, ensuring that I receive the most effective and accurate assistance possible. Here comes my first request:";

    const formattedPrompt = `${contextForGpt}\n${tabsStore.activeTab.description}${formattedCodeInputs}\n`;
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
            Authorization: `Bearer ${apiKeyStore.apiKey}`,
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

    const simplifiedStatsStore = {
      promptTokensTotal: statsStore.promptTokensTotal.value,
      completionTokensTotal: statsStore.completionTokensTotal.value,
      totalPromptsSent: statsStore.totalPromptsSent.value,
    };

    localStorage.setItem("statsStore", JSON.stringify(simplifiedStatsStore));
  }

  function handleError(error) {
    console.error("Error:", error);
    response.value = "An error occurred while fetching the response.";
  }
  return { submitPrompt, response, loading, promptTokens, responseTokens };
}
