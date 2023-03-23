<template>
  <Loader />
  <div class="flex flex-row min-h-screen max-h-screen">
    <n-scrollbar class="basis-1/5 min-h-screen max-h-screen"
      :style="`border-right-color: ${themeVar.primaryColor}; border-right-width: 1px; border-right-style: solid;`">
      <Tabs class="" />
    </n-scrollbar>
    <n-scrollbar class="basis-4/5 min-h-screen max-h-screen">
      <n-space vertical>
        <ChatContainer class=" chat-container" />
      </n-space>
      <SubmitCard class="absolute bottom-0 left-0 w-full" :responseTokens="responseTokens" :promptTokens="promptTokens"
        :style="`border-top-color: ${themeVar.primaryColor}; border-top-width: 1px; border-top-style: solid;`"
        @submit="submitPrompt" />
    </n-scrollbar>
  </div>
</template>


<script setup>
import { onMounted, onUnmounted, ref, computed, h } from "vue";
import { NCollapse, NCollapseItem, NCard, NScrollbar, NSpace } from "naive-ui";
import Loader from "../components/Loader.vue";
import ChatContainer from "../components/ChatContainer.vue";
import Tabs from "../components/SideBarChatMessages.vue";
import useSubmit from "../composables/useSubmit.js";
import SubmitCard from "../components/SubmitCard.vue";

import { useChatStore } from "../store/chatStore.js";
import { useStatesStore } from "../store/statesStore";
import { useThemeVars } from "naive-ui";

const themeVar = useThemeVars()
const chatStore = useChatStore();
const windowWidth = ref(window.innerWidth);

const siderWidth = computed(() => (windowWidth.value <= 640 ? "100%" : 300));
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
.chat-container {
  margin-bottom: 76px;
}
</style>