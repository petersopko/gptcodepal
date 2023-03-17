
<template>
  <div class="container">
    <Loader :loading="loading" />
    <TextInput v-model="description" placeholder="Enter your description" class="input" :rows="5" />
    <CodeChunkList :codeChunks="codeChunks" @remove="removeCodeChunk" />
    <AddCodeChunkButton @add="addCodeChunk" />
    <TokenInfo :tokenCount="tokenCount" @submit="submitPrompt" />
    <ResponseSection :response="response" :responseTokens="responseTokens" :actualTokens="actualTokens" />
    <Settings @save-api-key="saveApiKey" class="settings" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import Loader from "../components/Loader.vue";
import Settings from "../components/Settings.vue";
import TextInput from "../components/TextInput.vue";
import CodeChunkList from "../components/CodeChunkList.vue";
import AddCodeChunkButton from "../components/AddCodeChunkButton.vue";
import TokenInfo from "../components/TokenInfo.vue";
import ResponseSection from "../components/ResponseSection.vue";

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
    handleResponse(result);
  } catch (error) {
    handleError(error);
  }
}

function handleResponse(result) {
  loading.value = false;
  response.value = result.data.choices[0].message.content.trim();
  actualTokens.value = result.data.usage.prompt_tokens;
  responseTokens.value = result.data.usage.completion_tokens;
}

function handleError(error) {
  console.error("Error:", error);
  response.value = "An error occurred while fetching the response.";
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

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #fff;
  width: 100%;
  max-width: 3xl;
}

.input {
  width: 100%;
  max-width: 3xl;
}

.settings {
  width: 100%;
  max-width: 3xl;
  margin-top: 1rem;
}
</style>
