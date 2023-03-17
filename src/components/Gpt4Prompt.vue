
<template>
  <div class="flex flex-col items-center justify-center relative text-gray-100 w-full max-w-3xl">
    <Loader :loading="loading" />
    <TextInput v-model="description" placeholder="Enter your description" class="w-full max-w-3xl" :rows="5" />
    <div v-for="(codeChunk, index) in codeChunks" class="w-full max-w-3xl" :key="index">
      <CodeInput v-model="codeChunks[index]" name-placeholder="Name your code chunk" code-placeholder="Enter your code"
        :rows="20" :index="index" @remove="removeCodeChunk(index)" />
    </div>
    <button class="text-sm px-6 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600 mt-2 mb-4 mx-4"
      @click="addCodeChunk">
      Add Code Section
    </button>
    <div class="flex items-center mt-2 mb-4">
      <div class="text-sm font-bold mr-4">
        Estimated Prompt Tokens: {{ tokenCount }} (${{ (tokenCount * 0.001 * 0.03).toFixed(3) }})
      </div>
      <button class="text-lg px-6 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600"
        @click="submitPrompt">
        Submit
      </button>
    </div>
    <div class="rounded p-5 mt-5 w-full max-w-3xl bg-gray-900">
      <ResponseTokensInfo :responseTokens="responseTokens" :actualTokens="actualTokens" />
      <HighlightedCode :response="response" />
      <!-- {{ response }} -->
    </div>
    <Settings @save-api-key="saveApiKey" class="w-full max-w-3xl mt-4" />

  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import Loader from "./Loader.vue";
import Settings from "./Settings.vue";
import TextInput from "./TextInput.vue";
import CodeInput from "./CodeInput.vue";
import ResponseTokensInfo from "./ResponseTokensInfo.vue";
import HighlightedCode from "./HighlightedCode.vue";

const description = ref("");
const response = ref("");
const tokenCount = ref(0);
const actualTokens = ref(0);
const responseTokens = ref(0);
const loading = ref(false);
const apiKey = ref(localStorage.getItem("openai_api_key") || "");
const codeChunks = ref([]);

const saveApiKey = (key) => {
  localStorage.setItem("openai_api_key", key);
  apiKey.value = key;
};

const addCodeChunk = () => {
  codeChunks.value.push({ name: "", code: "" });
};

const removeCodeChunk = (index) => {
  codeChunks.value.splice(index, 1);
};

async function submitPrompt() {
  response.value = "";
  if (!description.value || codeChunks.value.length === 0) return;
  loading.value = true;

  const formattedCodeChunks = codeChunks.value
    .map((chunk) => `\n${chunk.name}\n\`\`\`${chunk.code}\`\`\``)
    .join("");

  const formattedPrompt = `${description.value}${formattedCodeChunks}`;
  const url = "https://api.openai.com/v1/chat/completions";
  console.log("Prompt:", formattedPrompt)
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
  console.log("Response:", response.value)
}

async function fetchTokenCount() {
  const text = `${description.value}${codeChunks.value.map((chunk) => `\n${chunk.name}\n\`\`\`${chunk.code}\`\`\``).join("")}`;

  if (!text) {
    return 0;
  }

  try {
    const response = await axios.post("http://localhost:5000/count_tokens", { text });
    return response.data.token_count;
  } catch (error) {
    console.error("Error fetching token count:", error);
    return 0;
  }
}
watch([description, codeChunks], async () => {
  tokenCount.value = await fetchTokenCount();
}, { deep: true });
</script>
