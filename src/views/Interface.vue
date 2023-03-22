<template>
  <div class=" ">
    <Loader />
    <n-space vertical>
      {{ activeKey }}
      <n-layout has-sider>
        <n-layout-sider bordered collapse-mode="width" :collapsed-width="0" :width="300" :collapsed="collapsed"
          show-trigger @collapse="collapsed = true" @expand="collapsed = false">
          <button @click="addTab">Add Tab</button>
          <n-menu v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
            :options="menuOptions" :on-update:value="updateActiveTab" />
          <n-collapse>
            <n-collapse-item title="Settings">
              <n-card>
                <Tabs />
                <ApiKeyInput />
              </n-card>
            </n-collapse-item>
          </n-collapse>
        </n-layout-sider>
        <n-layout>
          <div>
            <div class="h-[calc(100vh-200px)] overflow-y-auto">
              <ChatContainer :activeTabIndex="tabsStore.activeTabIndex" />
            </div>
            <SubmitCard class="fixed bottom-0 w-full" :responseTokens="responseTokens" :promptTokens="promptTokens"
              @submit="submitPrompt" />
          </div>
        </n-layout>
      </n-layout>
    </n-space>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, h } from "vue";
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



const statesStore = useStatesStore();
// const loadingStore = computed(() => statesStore.isLoading);
// const messagesStore = useMessagesStore()
// const settingsStore = useSettingsStore();

const { submitPrompt, loading, error, promptTokens, responseTokens } = useSubmit();

const activeTabIndex = computed(() => {
  return tabsStore.activeTabIndex;
});

onMounted(() => {
  tabsStore.updateActiveTab(activeTabIndex.value);
});

</script>
<style scoped>
.n-collapse {
  height: 100% !important;
}
</style>