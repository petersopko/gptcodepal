<template>
  <div class="container">
    <Loader :loading="loading" />
    <Tabs :tabs="tabs" :activeTab="activeTabIndex" @update:activeTab="activeTabIndex = $event" @add-tab="addTab"
      @delete-tab="deleteTab" />
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
import { ref, reactive, watch } from "vue";
import Loader from "../components/Loader.vue";
import Settings from "../components/Settings.vue";
import TextInput from "../components/TextInput.vue";
import CodeInputList from "../components/CodeInputList.vue";
import SubmitButton from "../components/SubmitButton.vue";
import TokenEstimations from "../components/TokenEstimations.vue";
import ResponseSection from "../components/ResponseSection.vue";
import Tabs from "../components/Tabs.vue";
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
function deleteTab(index) {
  tabs.splice(index, 1);
  activeTabIndex.value = Math.min(activeTabIndex.value, tabs.length - 1);
  localStorage.setItem("tabs", JSON.stringify(tabs));
}
const { submitPrompt, response, loading, actualTokens, responseTokens } = useSubmitPrompt(apiKey, description, codeInputs);

const tabs = reactive(
  JSON.parse(localStorage.getItem("tabs") || '[{ "description": "", "response": "" }]')
);
const activeTabIndex = ref(0);
watch(
  () => tabs[activeTabIndex.value],
  (tab) => {
    description.value = tab.description;
    response.value = tab.response;
  },
  { immediate: true }
);

function addTab() {
  tabs.push({ description: "", response: "" });
  activeTabIndex.value = tabs.length - 1;
  localStorage.setItem("tabs", JSON.stringify(tabs));
}

watch(
  () => description.value,
  (newDescription) => {
    tabs[activeTabIndex.value].description = newDescription;
    localStorage.setItem("tabs", JSON.stringify(tabs));
  }
);

watch(
  () => response.value,
  (newResponse) => {
    tabs[activeTabIndex.value].response = newResponse;
    localStorage.setItem("tabs", JSON.stringify(tabs));
  }
);
</script>
