<template>
  <div class="container">
    <Loader :loading="loading" />
    <TextInput v-model="description" placeholder="Enter your description" class="input" :rows="5" />
    <CodeInputList :codeInputs="codeInputs" @remove="removeCodeInput" @add="addCodeInput" />
    <div class="flex justify-between items-center">
      <SubmitButton @submit="submitPrompt" class="mx-4" />
      <TokenEstimations :tokenCount="tokenCount" :responseTokens="responseTokens" :actualTokens="actualTokens" />
    </div>
    <ResponseSection :response="response" />
    <Settings @save-api-key="saveApiKey" class="settings" />
  </div>
</template>


<script setup>
import { ref } from "vue";
import Loader from "../components/Loader.vue";
import Settings from "../components/Settings.vue";
import TextInput from "../components/TextInput.vue";
import CodeInputList from "../components/CodeInputList.vue";
import SubmitButton from "../components/SubmitButton.vue";
import TokenEstimations from "../components/TokenEstimations.vue";
import ResponseSection from "../components/ResponseSection.vue";
import useSubmitPrompt from "../composables/useSubmitPrompt.js";
import useDescription from "../composables/useDescription.js";
import useCodeInputs from "../composables/useCodeInputs.js";
import useTokenCount from "../composables/useTokenCount.js";

const apiKey = ref(localStorage.getItem("openai_api_key") || "");

const { description, saveDescription } = useDescription();
const { codeInputs, addCodeInput, removeCodeInput } = useCodeInputs();
const { tokenCount, fetchTokenCount } = useTokenCount(description, codeInputs);

const saveApiKey = (key) => {
  localStorage.setItem("openai_api_key", key);
  apiKey.value = key;
};

const { submitPrompt, response, loading, actualTokens, responseTokens } = useSubmitPrompt(apiKey, description, codeInputs);
</script>
