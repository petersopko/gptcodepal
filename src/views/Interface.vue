<template>
  <div class="container">
    <Loader :loading="loading" />
    <n-card>
      <PageHeader class="mb-6" />
      <Tabs :tabs="tabs" :activeTab="activeTabIndex" @update:activeTab="updateActiveTab" @add-tab="addTab"
        @delete-tab="deleteTab" />
      <TextInput v-model.value="descriptionRef" placeholder="Enter your description" :activeTab="activeTabIndex" />
      <CodeInputList :codeInputs="codeInputs" @remove="removeCodeInput" @add="addCodeInput" />
      <n-card class="flex">
        <n-button @click="submitPrompt">Submit 🚀</n-button>
        <TokenEstimations :tokenCount="tokenCount" :responseTokens="responseTokens" :actualTokens="actualTokens" />
      </n-card>
      <ResponseSection :response="response" />
    </n-card>
  </div>
</template>


<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import Loader from "../components/Loader.vue";
import TextInput from "../components/TextInput.vue";
import CodeInputList from "../components/CodeInputList.vue";
import TokenEstimations from "../components/TokenEstimations.vue";
import ResponseSection from "../components/ResponseSection.vue";
import Tabs from "../components/Tabs.vue";
import useSubmitPrompt from "../composables/useSubmitPrompt.js";
import useCodeInputs from "../composables/useCodeInputs.js";
import useTokenCount from "../composables/useTokenCount.js";
import PageHeader from "../components/PageHeader.vue";

const apiKey = ref(localStorage.getItem("openai_api_key") || "");

const description = ref("");

const { codeInputs, addCodeInput, removeCodeInput } = useCodeInputs();
const { tokenCount } = useTokenCount(description, codeInputs);

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
