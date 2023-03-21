<template>
  <div class="container ">
    <Loader :loading="loading" />
    <div>
      <PageHeader class="heading-title w-full block my-5 text-center" />

      <Tabs />
      <CodeInputList :codeInputs="tabsStore.activeTab.codeInputs" @remove="tabsStore.removeCodeInput"
        @add="tabsStore.addCodeInput" />
      <SubmitCard :responseTokens="responseTokens" :promptTokens="promptTokens" @submit="submitPrompt" />
      <ResponseSection v-if="tabsStore.activeTab.response" :response="tabsStore.activeTab.response" />
    </div>
  </div>
</template>

<script setup>
import { NCard, NSpace } from "naive-ui";
import { onMounted, ref, computed } from "vue";
import Loader from "../components/Loader.vue";
import TextInput from "../components/TextInput.vue";
import CodeInputList from "../components/CodeInputList.vue";
import ResponseSection from "../components/ResponseSection.vue";
import Tabs from "../components/Tabs.vue";
import useSubmit from "../composables/useSubmit.js";
import PageHeader from "../components/PageHeader.vue";
import SubmitCard from "../components/SubmitCard.vue";
import { useTabsStore } from "../store/tabsStore.js";
import { useSettingsStore } from "../store/settingsStore.js";

const settingsStore = useSettingsStore();



const tabsStore = useTabsStore();

const { submitPrompt, loading, promptTokens, responseTokens } = useSubmit();

const activeTabIndex = computed(() => {
  return tabsStore.activeTabIndex;
});

onMounted(() => {
  tabsStore.updateActiveTab(activeTabIndex.value);
});

</script>
