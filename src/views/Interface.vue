<template>
  <div class="container">
    <Loader :loading="loading" />
    <TextInput v-model="description" placeholder="Enter your description" class="input" :rows="5" />
    <CodeInputList :codeInputs="codeInputs" @remove="removeCodeInput" @add="addCodeInput" />
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
import CodeInputList from "../components/CodeInputList.vue";
import TokenInfo from "../components/TokenInfo.vue";
import ResponseSection from "../components/ResponseSection.vue";
import useSubmitPrompt from "../composables/useSubmitPrompt.js";

const description = ref("");
const tokenCount = ref(0);
const apiKey = ref(localStorage.getItem("openai_api_key") || "");
const codeInputs = ref([]);

const saveApiKey = (key) => {
  localStorage.setItem("openai_api_key", key);
  apiKey.value = key;
};

const addCodeInput = () => {
  codeInputs.value.push({ name: "", code: "" });
};

const removeCodeInput = (index) => {
  codeInputs.value.splice(index, 1);
};

const { submitPrompt, response, loading, actualTokens, responseTokens } = useSubmitPrompt(apiKey, description, codeInputs);

async function fetchTokenCount() {
  const text = `${description.value}${codeInputs.value.map((chunk) => `\n${chunk.name}\n\`\`\`${chunk.code}\`\`\``).join("")}`;

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
watch([description, codeInputs], async () => {
  tokenCount.value = await fetchTokenCount();
}, { deep: true });
watch(loading, (newValue) => {
  console.log("Loading value changed:", newValue);
});

</script>