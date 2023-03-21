<template>
  <div class="container ">
    <Loader :loading="loading" />
    <!-- {{ tabsStore.tabs.length }}
    {{ tabsStore }} -->
    {{ messagesStore }}
    <div>
      <!-- <PageHeader class="heading-title w-full block my-5 text-center" /> -->

      <ResponseSection :activeTabIndex="tabsStore.activeTabIndex" />
      <Tabs />
      <CodeInputList :codeInputs="tabsStore.activeTab.codeInputs" @remove="tabsStore.removeCodeInput"
        @add="tabsStore.addCodeInput" />
      <SubmitCard :responseTokens="responseTokens" :promptTokens="promptTokens" @submit="submitPrompt" />
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
