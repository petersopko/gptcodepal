<template>
  <div class="container">

    <n-card>
      <Loader :loading="loading" />
      <PageHeader class="mb-6" />
      <n-card>
        <Tabs />
        <TextInput placeholder="Enter your description" :activeTab="activeTabIndex" />
        <CodeInputList :codeInputs="tabsStore.activeTab.codeInputs" @remove="tabsStore.removeCodeInput"
          @add="tabsStore.addCodeInput" />
        <SubmitCard :responseTokens="responseTokens" :promptTokens="promptTokens" @submit="submitPrompt" />
        <ResponseSection v-if="response" :response="response" />
      </n-card>
    </n-card>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import Loader from "../components/Loader.vue";
import TextInput from "../components/TextInput.vue";
import CodeInputList from "../components/CodeInputList.vue";
import ResponseSection from "../components/ResponseSection.vue";
import Tabs from "../components/Tabs.vue";
import useSubmitPrompt from "../composables/useSubmitPrompt.js";
import PageHeader from "../components/PageHeader.vue";
import SubmitCard from "../components/SubmitCard.vue";
import { useTabsStore } from "../../store/tabsStore.js";
import { useApiKeyStore } from "../../store/apiKeyStore.js";

const tabsStore = useTabsStore();
const apiKeyStore = useApiKeyStore();

const { submitPrompt, response, loading, promptTokens, responseTokens } = useSubmitPrompt(apiKeyStore, tabsStore);

const activeTabIndex = computed(() => {
  return tabsStore.activeTabIndex;
});

onMounted(() => {
  tabsStore.updateActiveTab(activeTabIndex.value);
});

</script>
