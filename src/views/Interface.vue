
<template>
  <!-- <Loader /> -->
  <div class="whole-screen min-h-screen max-h-screen flex flex-row">
    <div class="side-bar flex flex-col basis-1/5 border-r border-gray-200"
      :style="`width: ${sideBarWidth}px; border-right-color: ${themeVar.primaryColor};`">
      <div class="side-bar-add-chat flex-shrink-0">
        <n-button class="w-full" size="large" @click="addChat">
          <p class="">Add Chat</p>
        </n-button>
      </div>
      <div class="side-bar-chat-messages flex-grow overflow-y-auto"
        :style="`border-right-color: ${themeVar.primaryColor};`">
        <SideBarChatMessages />
      </div>
      <div class="side-bar-settings flex-shrink-0">
        <n-card class="w-full">
          <div>Hello? How is it going? Yada yada aa</div>
        </n-card>
      </div>
    </div>
    <div class="chat-container flex flex-col basis-4/5">
      <div class="chat-messages-container overflow-y-auto">
        <ChatContainer />
      </div>
      <div class="chat-submit-card border-t border-gray-200" :style="`border-top-color: ${themeVar.primaryColor};`">
        <SubmitCard :responseTokens="responseTokens" :promptTokens="promptTokens"
          :style="`border-top-color: ${themeVar.primaryColor};`" @submit="submitPrompt" />
      </div>
    </div>
  </div>
</template>



<script setup>
import { onMounted, onUnmounted, ref, computed, h } from "vue";
import { NCollapse, NCollapseItem, NCard, NScrollbar, NSpace, NDivider, NButton, NIcon } from "naive-ui";
import Loader from "../components/Loader.vue";
import ChatContainer from "../components/ChatContainer.vue";
import SideBarChatMessages from "../components/SideBarChatMessages.vue";
import useSubmit from "../composables/useSubmit.js";
import SubmitCard from "../components/SubmitCard.vue";

import { useChatStore } from "../store/chatStore.js";
import { useStatesStore } from "../store/statesStore";
import { useThemeVars } from "naive-ui";
import { TrashOutline } from "@vicons/ionicons5";


const themeVar = useThemeVars()
const chatStore = useChatStore();
const windowWidth = ref(window.innerWidth);

const sideBarWidth = computed(() => (windowWidth.value <= 640 ? "100%" : 300));
const layoutTogglePosition = computed(() => ({
  right: windowWidth.value <= 640 ? '-20px' : '40px',
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
<style>
/* .chat-container {
  margin-bottom: 76px;
} */
</style>