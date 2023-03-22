<template>
  <Loader />
  <div class="flex flex-row min-h-screen">
    <n-space vertical class="basis-1/4 overflow-y-auto border-2 border-sky-500">
      <Tabs class="w-full" />
    </n-space>
    <div class="basis-3/4 flex flex-col relative">
      <n-space vertical class="overflow-y-scroll flex-grow">
        <ChatContainer :activeTabIndex="tabsStore.activeTabIndex" />
      </n-space>
      <SubmitCard class="absolute bottom-0 left-0 w-full" :responseTokens="responseTokens" :promptTokens="promptTokens"
        @submit="submitPrompt" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed, h } from "vue";
import { NCollapse, NCollapseItem, NCard, NLayout, NSwitch, NSpace, NLayoutSider, NMenu } from "naive-ui";
import Loader from "../components/Loader.vue";
import CodeInputList from "../components/CodeInputList.vue";
import ChatContainer from "../components/ChatContainer.vue";
import Tabs from "../components/Tabs.vue";
import useSubmit from "../composables/useSubmit.js";
import PageHeader from "../components/PageHeader.vue";
import ApiKeyInput from "../components/ApiKeyInput.vue";
import SubmitCard from "../components/SubmitCard.vue";
import { useTabsStore } from "../store/tabsStore.js";
import { useSettingsStore } from "../store/settingsStore.js";
import { useMessagesStore } from "../store/messagesStore.js";
import { useStatesStore } from "../store/statesStore";
import { NIcon } from "naive-ui";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from "@vicons/ionicons5";
import { indexOf } from "lodash";
// <!-- <n-layout has-sider>
// <n-layout-sider class="custom-layout-sider" bordered collapse-mode="width" :collapsed-width="0"
//   :width="siderWidth" :collapsed="collapsed" show-trigger @collapse="collapsed = true"
//   @expand="collapsed = false">
//   <n-menu class="overflow-y-scroll" v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="0"
//     :collapsed-icon-size="0" :options="menuOptions" :on-update:value="updateActiveTab" />
//   <ApiKeyInput />
//   <button @click="addTab">Add Tab</button>
// </n-layout-sider>
// <n-layout> -->

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const tabsStore = useTabsStore();

const updateActiveTab = (index) => {
  tabsStore.updateActiveTab(index);
};

const addTab = () => {
  tabsStore.addTab();
  console.log(activeKey.value)
};

const deleteTab = (index) => {
  tabsStore.deleteTab(index);
};

const menuOptions = computed(() => {
  return tabsStore.tabs.map((tab, index) => {
    return {
      label: `Chat ${index + 1}`,
      key: index,
      icon: renderIcon(BookIcon)
    };
  });
});


const activeKey = ref(null);
const collapsed = ref(true);
const windowWidth = ref(window.innerWidth);

const siderWidth = computed(() => (windowWidth.value <= 640 ? "100%" : 350));
const layoutTogglePosition = computed(() => ({
  right: windowWidth.value <= 640 ? '-20px' : '40px',
}));

const statesStore = useStatesStore();
// const loadingStore = computed(() => statesStore.isLoading);
// const messagesStore = useMessagesStore()
// const settingsStore = useSettingsStore();

const { submitPrompt, loading, error, promptTokens, responseTokens } = useSubmit();

const activeTabIndex = computed(() => {
  return tabsStore.activeTabIndex;
});
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};
onMounted(() => {
  window.addEventListener("resize", handleResize);
  tabsStore.updateActiveTab(activeTabIndex.value);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
<style>
.n-layout-sider .n-layout-toggle-button {
  top: 40px !important;
  /* this right value needs to be dynamic
  */
  right: -20px !important;
}
</style>