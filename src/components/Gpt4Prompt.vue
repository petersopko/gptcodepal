<template>
  <div class="flex flex-col items-center justify-center w-full relative text-gray-100">
    <div
      class="animate-spin absolute top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 border-t-4 border-white border-opacity-50 w-14 h-14 rounded-full"
      v-show="loading"></div>
    {{ loading }}
    <div class="text-sm font-bold mb-1">
      Estimated PROMPT token usage: {{ tokenCount }}
    </div>
    <div class="text-sm font-bold mb-1">
      Real PROMPT token usage: {{ actualTokens }}
    </div>
    <div class="flex items-center mb-5">
      <label for="api-key-input" class="font-bold mr-2">OpenAI API Key:</label>
      <input id="api-key-input" v-model="apiKey" type="text"
        class="w-full max-w-md p-1 text-sm border border-green-500 rounded mr-2 bg-gray-800" />
      <button class="text-sm px-2 py-1 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600"
        @click="saveApiKey">
        Save API Key
      </button>
    </div>

    <textarea v-model="prompt" placeholder="Enter your prompt" rows="5"
      class="w-full max-w-xl min-h-24 p-2 text-lg border border-green-500 rounded resize-y mb-2 mx-auto bg-gray-800"></textarea>
    <button class="text-lg px-6 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600 mt-2"
      @click="submitPrompt">Submit</button>
    <div class="rounded p-5 mt-5 w-full max-w-xl bg-gray-900">
      <div class="text-sm font-bold mb-1">
        Real RESPONSE token usage: {{ responseTokens }}
      </div>
      <div class="font-bold text-xl mb-2">Response:</div>
      <div class="whitespace-pre-wrap text-lg">{{ response }}</div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import axios from "axios";

const prompt = ref("");
const response = ref("");
const tokenCount = ref(0);
const actualTokens = ref(0);
const responseTokens = ref(0);
const loading = ref(false);
const apiKey = ref(localStorage.getItem("openai_api_key") || "");

const saveApiKey = () => {
  localStorage.setItem("openai_api_key", apiKey.value);
};

async function submitPrompt() {
  if (!prompt.value) return;
  loading.value = true;

  const url = "https://api.openai.com/v1/chat/completions";

  try {
    const result = await axios.post(
      url,
      {
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: prompt.value,
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
      text: prompt.value
    });
    return response.data.token_count;
  } catch (error) {
    console.error("Error fetching token count:", error);
    return 0;
  }
}

watch(prompt, async () => {
  tokenCount.value = await fetchTokenCount();
});
</script>