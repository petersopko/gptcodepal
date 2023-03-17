<template>
  <div class="container">
    <Loader :loading="loading" />
    <Tabs :tabs="tabs" :activeTab="activeTabIndex" @update:activeTab="updateActiveTab" @add-tab="addTab"
      @delete-tab="deleteTab" />
    <TextInput v-model="descriptionRef" placeholder="Enter your description" class="input" :rows="5" />
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
import { ref, reactive, watch, onMounted } from "vue";
import Loader from "../components/Loader.vue";
import Settings from "../components/Settings.vue";
import TextInput from "../components/TextInput.vue";
import CodeInputList from "../components/CodeInputList.vue";
import SubmitButton from "../components/SubmitButton.vue";
import TokenEstimations from "../components/TokenEstimations.vue";
import ResponseSection from "../components/ResponseSection.vue";
import Tabs from "../components/Tabs.vue";
import useSubmitPrompt from "../composables/useSubmitPrompt.js";
import useCodeInputs from "../composables/useCodeInputs.js";
import useTokenCount from "../composables/useTokenCount.js";

const apiKey = ref(localStorage.getItem("openai_api_key") || "");

const description = ref("");

const { codeInputs, addCodeInput, removeCodeInput } = useCodeInputs();
const { tokenCount, fetchTokenCount } = useTokenCount(description, codeInputs);

const descriptionRef = ref(description.value);
const saveApiKey = (key) => {
  localStorage.setItem("openai_api_key", key);
  apiKey.value = key;
};

const { submitPrompt, response, loading, actualTokens, responseTokens } = useSubmitPrompt(apiKey, descriptionRef, codeInputs);

const tabs = reactive(
  JSON.parse(localStorage.getItem("tabs") || '[{ "description": "", "response": "", "codeInputs": [] }]'));

const activeTabIndex = ref(0);

function updateActiveTab(index) {
  activeTabIndex.value = index;
  descriptionRef.value = tabs[index].description;
  response.value = tabs[index].response;
  codeInputs.value = tabs[index].codeInputs;
}

function addTab() {
  tabs.push({ description: "", response: "", codeInputs: [] });
  updateActiveTab(tabs.length - 1);
  localStorage.setItem("tabs", JSON.stringify(tabs));
}

function deleteTab(index) {
  tabs.splice(index, 1);
  activeTabIndex.value = Math.min(activeTabIndex.value, tabs.length - 1);
  localStorage.setItem("tabs", JSON.stringify(tabs));
  updateActiveTab(activeTabIndex.value);
}

// Watch descriptionRef value and update current tab
watch(descriptionRef, (newDescription) => {
  tabs[activeTabIndex.value].description = newDescription;
});

watch(
  () => [descriptionRef.value, codeInputs.value],
  ([newDescription, newCodeInputs]) => {
    tabs[activeTabIndex.value].description = newDescription;
    tabs[activeTabIndex.value].codeInputs = newCodeInputs;
    localStorage.setItem("tabs", JSON.stringify(tabs));
  },
  { deep: true }
);

watch(
  () => response.value,
  (newResponse) => {
    tabs[activeTabIndex.value].response = newResponse;
    localStorage.setItem("tabs", JSON.stringify(tabs));
  }
);

onMounted(() => {
  // Initialize the active tab on first load
  updateActiveTab(activeTabIndex.value);
});

</script>
