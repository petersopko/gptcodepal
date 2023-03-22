import { ref } from "vue";
import { useStatsStore } from "../store/statsStore";
import { useSettingsStore } from "../store/settingsStore";
import { useTabsStore } from "../store/tabsStore";
import { useMessagesStore } from "../store/messagesStore";
import { useStatesStore } from "../store/statesStore";

import axios from "axios";
import {
  promptSelection,
  contextForGpt,
  noContext,
} from "../store/promptStore";

export default function useSubmit() {
  const statsStore = useStatsStore();
  const settingsStore = useSettingsStore();
  const tabsStore = useTabsStore();
  const statesStore = useStatesStore();
  const response = ref("");
  const promptTokens = ref(0);
  const responseTokens = ref(0);
  const messagesStore = useMessagesStore();

  async function submitPrompt() {
    statesStore.updateLoading(true);
    response.value = "";
    if (!tabsStore.activeTab.description) return;

    const formattedCodeInputs = tabsStore.activeTab.codeInputs
      .map((chunk) => `\n${chunk.name}\n\`\`\`${chunk.code}\`\`\``)
      .join("");
    promptSelection.value === "contextForGpt";

    const formattedPrompt = `${
      promptSelection.value === "contextForGpt" ? contextForGpt : noContext
    }\n${tabsStore.activeTab.description}${formattedCodeInputs}\n`;

    const url = "https://api.openai.com/v1/chat/completions";

    messagesStore.addMessage(tabsStore.activeTabIndex, "user", formattedPrompt);
    try {
      const result = await axios.post(
        url,
        {
          model: "gpt-4",
          messages: messagesStore.allMessages[tabsStore.activeTabIndex],
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
    messagesStore.addMessage(
      tabsStore.activeTabIndex,
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
    tabsStore.updateResponse(response.value);
  }

  return {
    submitPrompt,
    response,
    promptTokens,
    responseTokens,
  };
}
