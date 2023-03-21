<template>
  <div class="container ">
    <Loader :loading="loading" />
    <div>
      <ApiKeyInput />
      <Tabs />

      <div class="h-[calc(100vh-200px)] overflow-y-auto">
        <ResponseSection :activeTabIndex="tabsStore.activeTabIndex" />
      </div>

      <SubmitCard class="fixed bottom-0 left-0 w-full" :responseTokens="responseTokens" :promptTokens="promptTokens"
        @submit="submitPrompt" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import Loader from "../components/Loader.vue";
import CodeInputList from "../components/CodeInputList.vue";
import ResponseSection from "../components/ResponseSection.vue";
import Tabs from "../components/Tabs.vue";
import useSubmit from "../composables/useSubmit.js";
import PageHeader from "../components/PageHeader.vue";
import ApiKeyInput from "../components/ApiKeyInput.vue";
import SubmitCard from "../components/SubmitCard.vue";
import { useTabsStore } from "../store/tabsStore.js";
import { useSettingsStore } from "../store/settingsStore.js";
import { useMessagesStore } from "../store/messagesStore.js";

const settingsStore = useSettingsStore();
const tabsStore = useTabsStore();
const messagesStore = useMessagesStore()

const { submitPrompt, loading, promptTokens, responseTokens } = useSubmit();

const activeTabIndex = computed(() => {
  return tabsStore.activeTabIndex;
});

onMounted(() => {
  tabsStore.updateActiveTab(activeTabIndex.value);
});

</script>
