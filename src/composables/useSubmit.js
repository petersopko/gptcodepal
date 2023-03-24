import { ref, computed } from "vue";
import { useStatsStore } from "../store/statsStore";
import { useSettingsStore } from "../store/settingsStore";
import { useStatesStore } from "../store/statesStore";
import { useNotification } from "naive-ui";
import { useInputStore } from "../store/inputStore";
import { useChatStore } from "../store/chatStore";

import axios from "axios";
import { usePromptStore } from "../store/promptStore";

export default function useSubmit() {
  const statsStore = useStatsStore();
  const settingsStore = useSettingsStore();
  const statesStore = useStatesStore();
  const inputStore = useInputStore();
  const response = ref("");
  const promptTokens = ref(0);
  const responseTokens = ref(0);
  const chatStore = useChatStore();
  const promptStorage = usePromptStore();

  async function submitPrompt() {
    statesStore.updateLoading(true);
    if (!inputStore.inputStorage.inputText) return;

    const formattedCodeInputs = inputStore.inputStorage.codeInputs
      .map((chunk) => `\n${chunk.name}\n\`\`\`${chunk.code}\`\`\``)
      .join("");
    let formattedPrompt;
    if (chatStore.allMessages[chatStore.activeChatIndex] !== 0) {
      formattedPrompt = `${inputStore.inputStorage.inputText}${formattedCodeInputs}`;
    } else {
      formattedPrompt = `${promptStorage.promptSelection}${inputStore.inputStorage.inputText}${formattedCodeInputs}`;
    }

    const url = "https://api.openai.com/v1/chat/completions";

    chatStore.addMessage(chatStore.activeChatIndex, "user", formattedPrompt);
    console.log("chatStore.allMessages:", chatStore.allMessages);
    try {
      const result = await axios.post(
        url,
        {
          model: "gpt-4",
          messages: chatStore.allMessages[chatStore.activeChatIndex],
          temperature: 0.7,
          max_tokens: settingsStore.maxTokens,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${settingsStore.apiKey}`,
          },
        }
      );

      console.log("Result:", result);
      handleResponse(result);
    } catch (error) {
      handleError(error);
    }
  }
  const notification = useNotification();

  function showErrorNotification(error) {
    console.log("error:", error);
    notification.error({
      title: "Error",
      content: error || "An error occurred while fetching the response.",
      duration: 5000,
    });
  }

  function handleError(error) {
    statesStore.updateLoading(false);
    response.value = error.response.data.error.message;
    showErrorNotification(response.value);
    chatStore.addMessage(
      chatStore.activeChatIndex,
      "assistant",
      response.value
    );
    inputStore.inputStorage.inputText = "";
  }

  function handleResponse(result) {
    statesStore.updateLoading(false);
    console.log(
      "number of tokens used for completion:",
      result.data.usage.completion_tokens,
      "number of tokens used for prompt:",
      result.data.usage.prompt_tokens
    );
    console.log(result);
    response.value = result.data.choices[0].message.content.trim();
    chatStore.addMessage(
      chatStore.activeChatIndex,
      "assistant",
      response.value
    );
    promptTokens.value = result.data.usage.prompt_tokens;
    responseTokens.value = result.data.usage.completion_tokens;
    statsStore.incrementPromptTokens(promptTokens.value);
    statsStore.incrementCompletionTokens(responseTokens.value);
    statsStore.incrementTotalPromptsSent();
    const simplifiedStatsStore = {
      promptTokensTotal: statsStore.promptTokensTotal,
      completionTokensTotal: statsStore.completionTokensTotal,
      totalPromptsSent: statsStore.totalPromptsSent,
    };

    localStorage.setItem("statsStore", JSON.stringify(simplifiedStatsStore));
    inputStore.inputStorage.inputText = "";
  }

  return {
    submitPrompt,
    response,
    promptTokens,
    responseTokens,
  };
}
