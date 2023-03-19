<template>
  <div class="container">
    <n-card>
      <Loader :loading="loading" />
      <PageHeader class="mb-6" />
      <n-card>
        {{ statsStore }}
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
import { useStatsStore } from "../../store/statsStore";

const tabsStore = useTabsStore();
const statsStore = useStatsStore();

const apiKey = ref(localStorage.getItem("openai_api_key") || "");


const codeInputs = ref(tabsStore.activeTab.codeInputs);
const description = ref(tabsStore.activeTab.description);
const { tokenCount } = useTokenCount(description.value, codeInputs.value);

const { submitPrompt, response, loading, promptTokens, responseTokens } = useSubmitPrompt(
  apiKey,
  tabsStore
);

const activeTabIndex = computed(() => {
  return tabsStore.activeTabIndex;
});

// Initialize the active tab on first load
onMounted(() => {
  tabsStore.updateActiveTab(activeTabIndex.value);
});

</script>
