<template>
  <div class="flex flex-col items-center justify-center relative text-gray-100">
    <Loader :loading="loading" />
    <div class="text-sm font-bold mb-1">
      Estimated Prompt Tokens: {{ tokenCount }} (${{ (tokenCount * 0.001 * 0.03).toFixed(3) }})
    </div>
    <ApiKeyInput @save-api-key="saveApiKey" />
    <TextInput v-model="description" placeholder="Enter your description" :rows="5" />
    <TextInput v-model="code" placeholder="Enter your code" :rows="20" />
    <button class="text-lg px-6 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600 mt-2"
      @click="submitPrompt">
      Submit
    </button>
    <div class="rounded p-5 mt-5 w-full max-w-xl bg-gray-900">
      <ResponseTokensInfo :responseTokens="responseTokens" :actualTokens="actualTokens" />
      <div class="whitespace-pre-wrap text-lg">{{ response }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import Loader from "./Loader.vue";
import ApiKeyInput from "./ApiKeyInput.vue";
import TextInput from "./TextInput.vue";
import ResponseTokensInfo from "./ResponseTokensInfo.vue";

const description = ref("");
const code = ref("");
const response = ref("");
const tokenCount = ref(0);
const actualTokens = ref(0);
const responseTokens = ref(0);
const loading = ref(false);
const apiKey = ref(localStorage.getItem("openai_api_key") || "");

const saveApiKey = (key) => {
  localStorage.setItem("openai_api_key", key);
  apiKey.value = key;
};

async function submitPrompt() {
  if (!description.value || !code.value) return;
  loading.value = true;

  const formattedPrompt = `${description.value}\n\`\`\`${code.value}\`\`\``;
  const url = "https://api.openai.com/v1/chat/completions";

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
    loading.value = false;
    response.value = result.data.choices[0].message.content.trim();
    actualTokens.value = result.data.usage.prompt_tokens;
    responseTokens.value = result.data.usage.completion_tokens;
  } catch (error) {
    console.error("Error:", error);
    response.value = "An error occurred while fetching the response.";
  }
}

async function fetchTokenCount() {
  try {
    const response = await axios.post("http://localhost:5000/count_tokens", {
      text: `${description.value}\n\`\`\`${code.value}\`\`\``
    });
    return response.data.token_count;
  } catch (error) {
    console.error("Error fetching token count:", error);
    return 0;
  }
}

watch([description, code], async () => {
  tokenCount.value = await fetchTokenCount();
});
</script>
