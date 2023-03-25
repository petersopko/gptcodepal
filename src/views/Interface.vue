<template>
  <div class="whole-screen min-h-screen max-h-screen flex flex-row">
    <div
      class="side-bar flex flex-col basis-1/5 border-r border-gray-200"
      :style="`width: ${sideBarWidth}px; border-right-color: ${themeVar.primaryColor};`"
    >
      <div class="side-bar-add-chat flex-shrink-0">
        <SideBarTop />
      </div>
      <div
        class="side-bar-chat-messages flex-grow overflow-y-auto"
        :style="`border-right-color: ${themeVar.primaryColor};`"
      >
        <SideBarChatList />
      </div>
      <div class="side-bar-settings flex-shrink-0">
        <SideBarSettings />
      </div>
    </div>
    <div class="chat-container flex flex-col justify-between basis-4/5">
      <div class="chat-messages-container overflow-y-auto">
        <ChatContainer />
      </div>
      <div
        class="chat-submit-card flex-shrink-0 border-t border-gray-200"
        :style="`border-top-color: ${themeVar.primaryColor};`"
      >
        <SubmitCard
          :responseTokens="responseTokens"
          :promptTokens="promptTokens"
          :style="`border-top-color: ${themeVar.primaryColor};`"
          @submit="submitPrompt"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed, h } from "vue";
import {
  NCollapse,
  NCollapseItem,
  NCard,
  NScrollbar,
  NSpace,
  NDivider,
  NButton,
  NIcon,
} from "naive-ui";
import ChatContainer from "../components/Chat/ChatContainer.vue";
import SideBarChatList from "../components/Sidebar/SideBarChatList.vue";
import SideBarTop from "../components/Sidebar/SideBarTopControls.vue";
import useSubmit from "../composables/useSubmit.js";
import SubmitCard from "../components/SubmitCard.vue";
import SideBarSettings from "../components/Sidebar/SideBarMenu.vue";

import { useChatStore } from "../store/chatStore.js";
import { useStatesStore } from "../store/statesStore";
import { useThemeVars } from "naive-ui";
import { TrashOutline } from "@vicons/ionicons5";

const themeVar = useThemeVars();
const chatStore = useChatStore();
const windowWidth = ref(window.innerWidth);

const sideBarWidth = computed(() => (windowWidth.value <= 640 ? "100%" : 300));
const layoutTogglePosition = computed(() => ({
  right: windowWidth.value <= 640 ? "-20px" : "40px",
}));

const statesStore = useStatesStore();

const { submitPrompt, promptTokens, responseTokens } = useSubmit();

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};
onMounted(() => {
  window.addEventListener("resize", handleResize);
  chatStore.updateActiveChat(chatStore.activeChatIndex);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
