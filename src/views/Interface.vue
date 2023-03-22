<template>
  <Loader />
  <div class="flex flex-row min-h-screen max-h-screen">
    <n-space vertical class="basis-1/4 overflow-y-auto border-2 ">
      <Tabs class="w-full" />
    </n-space>
    <div class="basis-3/4 flex flex-col relative">
      <n-space vertical class="overflow-y-scroll flex-grow">
        <ChatContainer class="chat-container" />
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
import ChatContainer from "../components/ChatContainer.vue";
import Tabs from "../components/SideBarChatMessages.vue";
import useSubmit from "../composables/useSubmit.js";
import SubmitCard from "../components/SubmitCard.vue";

import { useChatStore } from "../store/chatStore.js";
import { useStatesStore } from "../store/statesStore";



const chatStore = useChatStore();


const windowWidth = ref(window.innerWidth);

const siderWidth = computed(() => (windowWidth.value <= 640 ? "100%" : 350));
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