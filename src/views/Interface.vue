<template>
  <div class="container">
    <n-card>
      <Loader :loading="loading" />
      <PageHeader class="mb-6" />
      <n-card>
        <Tabs />
        <TextInput v-model.value="tabsStore.activeTab.description" placeholder="Enter your description"
          :activeTab="activeTabIndex" @update:model-value="tabsStore.updateDescription($event)" />
        <CodeInputList :codeInputs="tabsStore.activeTab.codeInputs" @remove="tabsStore.removeCodeInput"
          @add="tabsStore.addCodeInput" />
        <SubmitCard :tokenCount="tokenCount" :responseTokens="responseTokens" :promptTokens="promptTokens"
          @submit="submitPrompt" />
        <ResponseSection :response="response" />
      </n-card>
    </n-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Loader from "../components/Loader.vue";
import TextInput from "../components/TextInput.vue";
import CodeInputList from "../components/CodeInputList.vue";
import ResponseSection from "../components/ResponseSection.vue";
import Tabs from "../components/Tabs.vue";
import useSubmitPrompt from "../composables/useSubmitPrompt.js";
import useTokenCount from "../composables/useTokenCount.js";
import PageHeader from "../components/PageHeader.vue";
import SubmitCard from "../components/SubmitCard.vue";
import { useTabsStore } from "../../store/tabsStore.js";

const tabsStore = useTabsStore();

const apiKey = ref(localStorage.getItem("openai_api_key") || "");

const description = ref("");

const codeInputs = ref(tabsStore.activeTab.codeInputs);
const { tokenCount } = useTokenCount(description, codeInputs);

const descriptionRef = ref(description.value);

const { submitPrompt, response, loading, promptTokens, responseTokens } = useSubmitPrompt(
  apiKey,
  tabsStore.activeTab.description,
  tabsStore.activeTab.codeInputs
);

const activeTabIndex = computed(() => {
  return tabsStore.activeTabIndex;
});

// Initialize the active tab on first load
onMounted(() => {
  tabsStore.updateActiveTab(activeTabIndex.value);
});

</script>
