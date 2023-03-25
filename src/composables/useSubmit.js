import { ref } from "vue";
import { useStatsStore } from "../store/statsStore";
import { useSettingsStore } from "../store/settingsStore";
import { useStatesStore } from "../store/statesStore";
import { useNotification } from "naive-ui";
import { useInputStore } from "../store/inputStore";
import { useChatStore } from "../store/chatStore";
import { usePromptStore } from "../store/promptStore";
import { postCompletion } from "../utils/apiService";

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

  function formatInputText() {
    const formattedCodeInputs = inputStore.inputStorage.codeInputs
      .map((chunk) => `\n${chunk.name}\n\`\`\`${chunk.code}\`\`\``)
      .join("");
    if (chatStore.allChats.length === 0) {
      chatStore.addChat();
    }
    if (chatStore.allChats[chatStore.activeChatIndex].messages !== 0) {
      return `${inputStore.inputStorage.inputText}${formattedCodeInputs}`;
    } else {
      return `${promptStorage.promptSelection}${inputStore.inputStorage.inputText}${formattedCodeInputs}`;
    }
  }
  function countTokens(promptTokens, completionTokens) {
    chatStore.updateTokenCount(
      chatStore.activeChatIndex,
      promptTokens + completionTokens
    );
  }
  async function submitPrompt() {
    statesStore.updateLoading(true);
    if (!inputStore.inputStorage.inputText) return;

    const formattedPrompt = formatInputText();
    chatStore.addMessage(chatStore.activeChatIndex, "user", formattedPrompt);
    inputStore.updateInputText("");

    try {
      const result = await postCompletion(
        chatStore.allChats[chatStore.activeChatIndex].messages,
        0.7,
        settingsStore.apiKey
      );
      handleResponse(result);
    } catch (error) {
      handleError(error);
    }
  }

  const notification = useNotification();

  function showErrorNotification(error) {
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
    response.value = result.data.choices[0].message.content.trim();
    chatStore.addMessage(
      chatStore.activeChatIndex,
      "assistant",
      response.value
    );
    promptTokens.value = result.data.usage.prompt_tokens;
    responseTokens.value = result.data.usage.completion_tokens;
    statsStore.updateStats(promptTokens.value, responseTokens.value);

    countTokens(promptTokens.value, responseTokens.value); // Update token count for the active chat
  }

  return {
    submitPrompt,
    response,
    promptTokens,
    responseTokens,
  };
}
